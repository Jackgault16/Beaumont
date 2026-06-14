const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const siteUrl = 'https://beaumontarchives.co.uk';
const siteName = 'Beaumont Archives';
const defaultImage = `${siteUrl}/og-image.jpg`;
const siteLogo = `${siteUrl}/favicon-512.png`;

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function readJson(file) {
  try {
    return JSON.parse(read(file));
  } catch {
    return null;
  }
}

function write(file, content) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

function cleanGeneratedDirectories(validRoutes) {
  const ownedDirs = ['catalogue', 'articles', 'pdf-vault'];
  const valid = new Set(validRoutes.map((route) => route.replace(/\/$/, '')));
  ownedDirs.forEach((dir) => {
    const base = path.join(root, dir);
    if (!fs.existsSync(base)) return;
    fs.readdirSync(base, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .forEach((entry) => {
        const relative = `${dir}/${entry.name}`;
        const indexFile = path.join(base, entry.name, 'index.html');
        if (fs.existsSync(indexFile) && !valid.has(relative)) {
          fs.rmSync(path.join(base, entry.name), { recursive: true, force: true });
        }
      });
  });
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
  const author = itemAuthor(item);
  const publisher = itemPublisher(item);
  const publicationDate = itemPublicationDate(item);
  const publicationPlace = itemPublicationPlace(item);
  const edition = itemEdition(item);
  const bibliographic = [
    edition ? `${edition} of ${author ? `${author}'s ` : ''}${item.title}.` : '',
    publisher ? `Published by ${publisher}${publicationPlace ? `, ${publicationPlace}` : ''}${publicationDate ? `, ${publicationDate}` : ''}.` : '',
  ].filter(Boolean).join(' ');
  const description = item.catalogue_description || item.short_description || item.full_description || '';
  return excerpt([
    bibliographic || description,
    !bibliographic && itemPublicationDate(item) ? `Published ${itemPublicationDate(item)}.` : '',
    item.reference_number ? `Reference ${item.reference_number}.` : '',
    'Available from Beaumont Archives.',
  ].filter(Boolean).join(' '));
}

function cleanText(value) {
  return String(value || '').trim();
}

function firstItemValue(item, fields) {
  return fields.map((field) => cleanText(item[field])).find(Boolean) || '';
}

function labelledItemValue(item, labels) {
  const source = [item.physical_details, item.catalogue_description, item.full_description]
    .map((value) => String(value || ''))
    .join('\n');
  for (const label of labels) {
    const pattern = new RegExp(`${label}\\s*[:\\-]\\s*([^\\n.;]+)`, 'i');
    const match = source.match(pattern);
    if (match && cleanText(match[1])) return cleanText(match[1]);
  }
  return '';
}

function itemAuthor(item) {
  return firstItemValue(item, ['author', 'author_name', 'creator', 'artist'])
    || labelledItemValue(item, ['author', 'creator', 'artist']);
}

function itemPublisher(item) {
  return firstItemValue(item, ['publisher', 'publisher_name', 'imprint'])
    || labelledItemValue(item, ['publisher', 'published by', 'imprint']);
}

function itemPublicationDate(item) {
  return firstItemValue(item, ['publication_year', 'publication_date', 'published_date', 'date_published', 'year']);
}

function itemEdition(item) {
  return firstItemValue(item, ['edition', 'edition_statement'])
    || labelledItemValue(item, ['edition', 'edition statement']);
}

function itemPublicationPlace(item) {
  return firstItemValue(item, ['publication_place', 'place_of_publication'])
    || labelledItemValue(item, ['publication place', 'place of publication', 'published at']);
}

function isReproductionPrint(item) {
  const text = [
    item.title,
    item.category,
    item.catalogue_description,
    item.short_description,
    item.full_description,
    item.physical_details,
    item.item_tags?.map((entry) => entry.tags?.name).join(' '),
  ].join(' ').toLowerCase();
  return /\breproduction\b|\bmodern print\b|\breproduction print\b|\bfacsimile\b/.test(text);
}

function itemConditionSchema(item) {
  if (isReproductionPrint(item)) return 'https://schema.org/NewCondition';
  const condition = cleanText(item.condition).toLowerCase();
  if (!condition) return undefined;
  if (condition.includes('new')) return 'https://schema.org/NewCondition';
  if (condition.includes('damaged')) return 'https://schema.org/DamagedCondition';
  if (condition.includes('used') || condition.includes('good') || condition.includes('fine') || condition.includes('very')) return 'https://schema.org/UsedCondition';
  return 'https://schema.org/UsedCondition';
}

function itemSchema(item, canonical, image, description) {
  const author = itemAuthor(item);
  const publisher = itemPublisher(item);
  const publicationDate = itemPublicationDate(item);
  const publicationPlace = itemPublicationPlace(item);
  const edition = itemEdition(item);
  const condition = cleanText(item.condition);
  return {
    '@context': 'https://schema.org',
    '@type': ['Book', 'Product'],
    name: item.title,
    url: canonical,
    image,
    description,
    sku: item.reference_number || item.id,
    productID: item.reference_number || item.id,
    identifier: item.reference_number || item.id,
    category: item.category,
    datePublished: publicationDate || undefined,
    bookEdition: edition || undefined,
    author: author ? { '@type': 'Person', name: author } : undefined,
    publisher: publisher ? { '@type': 'Organization', name: publisher } : undefined,
    brand: { '@type': 'Organization', name: siteName, logo: siteLogo },
    locationCreated: publicationPlace ? { '@type': 'Place', name: publicationPlace } : undefined,
    itemCondition: itemConditionSchema(item),
    additionalProperty: [
      item.reference_number ? { '@type': 'PropertyValue', name: 'Reference number', value: item.reference_number } : null,
      author ? { '@type': 'PropertyValue', name: 'Author', value: author } : null,
      publisher ? { '@type': 'PropertyValue', name: 'Publisher', value: publisher } : null,
      publicationDate ? { '@type': 'PropertyValue', name: 'Publication date', value: publicationDate } : null,
      publicationPlace ? { '@type': 'PropertyValue', name: 'Publication place', value: publicationPlace } : null,
      edition ? { '@type': 'PropertyValue', name: 'Edition', value: edition } : null,
      item.collection_name ? { '@type': 'PropertyValue', name: 'Collection', value: item.collection_name } : null,
      item.provenance ? { '@type': 'PropertyValue', name: 'Provenance', value: item.provenance } : null,
      condition ? { '@type': 'PropertyValue', name: 'Condition', value: condition } : null,
      item.item_tags?.length ? { '@type': 'PropertyValue', name: 'Subjects', value: item.item_tags.map((entry) => entry.tags?.name).filter(Boolean).join(', ') } : null,
    ].filter(Boolean),
    offers: {
      '@type': 'Offer',
      price: item.price || undefined,
      priceCurrency: item.price ? 'GBP' : undefined,
      availability: item.sold ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      itemCondition: itemConditionSchema(item),
      sku: item.reference_number || item.id,
      url: canonical,
      seller: { '@type': 'Organization', name: siteName, url: siteUrl },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'GB',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/ReturnShippingFees',
      },
    },
  };
}

function routePage(templateFile, routeId, title, description, canonical, image, schema) {
  const prefix = '../../';
  let html = read(templateFile)
    .replace(/href="styles\.css[^"]*"/g, `href="${prefix}styles.css?v=20260604-editor-fix"`)
    .replace(/src="supabase\.js"/g, `src="${prefix}supabase.js"`)
    .replace(/src="script\.js[^"]*"/g, `src="${prefix}script.js?v=20260604-editor-fix"`)
    .replace(/href="index\.html/g, 'href="/')
    .replace(/href="catalogue\.html/g, 'href="/catalogue.html')
    .replace(/href="collection-services\.html/g, 'href="/collection-services.html')
    .replace(/href="about\.html/g, 'href="/about.html')
    .replace(/href="journal\.html/g, 'href="/journal.html')
    .replace(/href="digital-archive\.html/g, 'href="/digital-archive.html')
    .replace(/href="admin-login\.html/g, 'href="/admin-login.html')
    .replace(/href="admin\.html/g, 'href="/admin.html')
    .replace(/\s*<meta name="description" content="[^"]*" \/>\r?\n?/g, '\n')
    .replace(/\s*<link rel="canonical" href="[^"]*" \/>\r?\n?/g, '\n')
    .replace(/\s*<meta name="robots" content="noindex, follow" \/>\r?\n?/, '\n');

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

function generatedAt(routes) {
  const previous = readJson('seo-routes.json');
  if (previous && JSON.stringify(previous.routes) === JSON.stringify(routes)) {
    return previous.generated_at || new Date().toISOString();
  }
  return new Date().toISOString();
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
    { url: absolute('/shipping-delivery/'), lastmod: today, changefreq: 'monthly', priority: '0.5' },
    { url: absolute('/returns-refunds/'), lastmod: today, changefreq: 'monthly', priority: '0.5' },
    { url: absolute('/terms-of-sale/'), lastmod: today, changefreq: 'monthly', priority: '0.5' },
    { url: absolute('/privacy-policy/'), lastmod: today, changefreq: 'yearly', priority: '0.4' },
    { url: absolute('/cookie-policy/'), lastmod: today, changefreq: 'yearly', priority: '0.4' },
  ];

  items.filter((item) => !item.archive_reference).forEach((item) => {
    const route = `/catalogue/${slugify(item.title || item.reference_number || item.id)}/`;
    const canonical = absolute(route);
    const image = item.main_image_url || item.item_images?.[0]?.image_url || defaultImage;
    const description = itemDescription(item);
    const schema = [itemSchema(item, canonical, image, description)];
    const pageTitle = [item.title, itemAuthor(item), siteName].filter(Boolean).join(' | ');
    write(path.join(route.slice(1), 'index.html'), routePage('catalogue.html', item.id, pageTitle, description, canonical, image, schema));
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
      publisher: { '@type': 'Organization', name: siteName, logo: siteLogo },
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

  cleanGeneratedDirectories(routes
    .map((route) => new URL(route.url).pathname.slice(1))
    .filter((route) => route.includes('/')));

  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => sitemapUrl(route.url, route.lastmod, route.changefreq, route.priority)).join('\n')}
</urlset>
`);

  write('robots.txt', `User-agent: *
Allow: /

Sitemap: ${absolute('/sitemap.xml')}
`);

  write('seo-routes.json', `${JSON.stringify({ generated_at: generatedAt(routes), routes }, null, 2)}\n`);
  console.log(`Generated ${routes.length} sitemap URLs, ${items.length} catalogue records, ${articles.length} articles and ${archiveItems.length} PDF Vault entries.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
