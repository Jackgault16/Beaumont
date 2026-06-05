const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const siteUrl = 'https://beaumontarchives.co.uk';
const siteName = 'Beaumont Archives';
const defaultImage = `${siteUrl}/og-image.jpg`;

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function write(file, content) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

function escapeXml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
  }[char]));
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90) || 'item';
}

function excerpt(value, maxLength = 170) {
  const text = String(value || '')
    .replace(/!\[[^\]]*]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[*_`>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text;
}

function absolute(urlPath) {
  return new URL(urlPath, siteUrl).href;
}

function supabaseConfig() {
  const source = read('supabase.js');
  const url = source.match(/url:\s*'([^']+)'/)?.[1];
  const key = source.match(/publishableKey:\s*'([^']+)'/)?.[1];
  if (!url || !key) throw new Error('Missing Supabase url or publishableKey in supabase.js');
  return { url, key };
}

async function fetchTable(table, query = '') {
  const { url, key } = supabaseConfig();
  const endpoint = `${url}/rest/v1/${table}${query}`;
  const response = await fetch(endpoint, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
  });
  if (!response.ok) throw new Error(`${table} fetch failed: ${response.status} ${await response.text()}`);
  return response.json();
}

function itemDescription(item) {
  const description = item.catalogue_description || item.short_description || item.full_description || '';
  return excerpt([
    description,
    item.year ? `Published ${item.year}.` : '',
    item.reference_number ? `Reference ${item.reference_number}.` : '',
    'Available from Beaumont Archives.',
  ].filter(Boolean).join(' '));
}

function routePage(templateFile, routeId, title, description, canonical, image, schema) {
  let html = read(templateFile)
    .replace(/href="styles\.css[^"]*"/g, 'href="/styles.css?v=20260604-editor-fix"')
    .replace(/src="supabase\.js"/g, 'src="/supabase.js"')
    .replace(/src="script\.js[^"]*"/g, 'src="/script.js?v=20260604-editor-fix"')
    .replace(/href="index\.html/g, 'href="/index.html')
    .replace(/href="catalogue\.html/g, 'href="/catalogue.html')
    .replace(/href="collection-services\.html/g, 'href="/collection-services.html')
    .replace(/href="about\.html/g, 'href="/about.html')
    .replace(/href="journal\.html/g, 'href="/journal.html')
    .replace(/href="digital-archive\.html/g, 'href="/digital-archive.html');

  const headTags = `
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(image || defaultImage)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image || defaultImage)}" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
    <script>window.BEAUMONT_ROUTE_ID = ${JSON.stringify(routeId)};</script>`;

  html = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace('</head>', `${headTags}\n  </head>`);
  return html;
}

function sitemapUrl(url, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function modified(row) {
  return new Date(row.updated_at || row.created_at || row.article_date || Date.now()).toISOString().slice(0, 10);
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  const [items, articles, archiveItems] = await Promise.all([
    fetchTable('items', '?select=*,item_images(image_url),item_tags(tags(name))&order=created_at.desc'),
    fetchTable('journal_articles', '?select=*&published=eq.true&order=article_date.desc'),
    fetchTable('digital_archive_items', '?select=*&is_published=eq.true&order=created_at.desc'),
  ]);

  const routes = [
    { url: absolute('/'), lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { url: absolute('/catalogue.html'), lastmod: today, changefreq: 'daily', priority: '0.9' },
    { url: absolute('/journal.html'), lastmod: today, changefreq: 'weekly', priority: '0.8' },
    { url: absolute('/digital-archive.html'), lastmod: today, changefreq: 'weekly', priority: '0.8' },
    { url: absolute('/collection-services.html'), lastmod: today, changefreq: 'monthly', priority: '0.8' },
    { url: absolute('/material-search.html'), lastmod: today, changefreq: 'monthly', priority: '0.7' },
    { url: absolute('/about.html'), lastmod: today, changefreq: 'monthly', priority: '0.7' },
    { url: absolute('/contact.html'), lastmod: today, changefreq: 'monthly', priority: '0.6' },
  ];

  items.filter((item) => !item.archive_reference).forEach((item) => {
    const route = `/catalogue/${slugify(item.title || item.reference_number || item.id)}/`;
    const canonical = absolute(route);
    const image = item.main_image_url || item.item_images?.[0]?.image_url || defaultImage;
    const description = itemDescription(item);
    const schema = [{
      '@context': 'https://schema.org',
      '@type': ['Book', 'Product'],
      name: item.title,
      url: canonical,
      image,
      description,
      sku: item.reference_number || item.id,
      category: item.category,
      datePublished: item.year || undefined,
      offers: {
        '@type': 'Offer',
        price: item.price || undefined,
        priceCurrency: item.price ? 'GBP' : undefined,
        availability: item.sold ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
        url: canonical,
      },
    }];
    write(path.join(route.slice(1), 'index.html'), routePage('catalogue.html', item.id, `${item.title} | ${siteName}`, description, canonical, image, schema));
    routes.push({ url: canonical, lastmod: modified(item), changefreq: 'weekly', priority: '0.8' });
  });

  articles.forEach((article) => {
    const route = `/articles/${slugify(article.title || article.id)}/`;
    const canonical = absolute(route);
    const description = excerpt(article.summary || article.content);
    const image = article.featured_image_url || defaultImage;
    const schema = [{
      '@context': 'https://schema.org',
      '@type': ['Article', 'BlogPosting'],
      headline: article.title,
      description,
      image,
      datePublished: article.article_date || undefined,
      dateModified: article.updated_at || article.article_date || undefined,
      author: { '@type': 'Organization', name: siteName },
      publisher: { '@type': 'Organization', name: siteName },
      mainEntityOfPage: canonical,
    }];
    write(path.join(route.slice(1), 'index.html'), routePage('journal.html', article.id, `${article.title} | ${siteName}`, description, canonical, image, schema));
    routes.push({ url: canonical, lastmod: modified(article), changefreq: 'monthly', priority: '0.7' });
  });

  archiveItems.forEach((item) => {
    const route = `/pdf-vault/${slugify(item.title || item.id)}/`;
    const canonical = absolute(route);
    const description = excerpt(item.short_description || item.description);
    const image = item.thumbnail_url || defaultImage;
    const schema = [{
      '@context': 'https://schema.org',
      '@type': ['CreativeWork', 'DigitalDocument'],
      name: item.title,
      description,
      url: canonical,
      image,
      encodingFormat: item.file_type || 'PDF',
    }];
    write(path.join(route.slice(1), 'index.html'), routePage('digital-archive-item.html', item.id, `${item.title} | ${siteName}`, description, canonical, image, schema));
    routes.push({ url: canonical, lastmod: modified(item), changefreq: 'monthly', priority: '0.7' });
  });

  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => sitemapUrl(route.url, route.lastmod, route.changefreq, route.priority)).join('\n')}
</urlset>
`);

  write('robots.txt', `User-agent: *
Allow: /

Sitemap: ${absolute('/sitemap.xml')}
`);

  write('seo-routes.json', `${JSON.stringify({ generated_at: new Date().toISOString(), routes }, null, 2)}\n`);
  console.log(`Generated ${routes.length} sitemap URLs, ${items.length} catalogue records, ${articles.length} articles and ${archiveItems.length} PDF Vault entries.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
