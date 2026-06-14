const CONFIG = window.BEAUMONT_SUPABASE_CONFIG || {};
const SITE_URL = 'https://beaumontarchives.co.uk';
const SITE_NAME = 'Beaumont Archives';
const DEFAULT_SHARE_IMAGE = `${SITE_URL}/og-image.jpg`;
const ADMIN_USERNAME = 'admin';
const DEFAULT_CATEGORIES = ['Books', 'Maps', 'Documents', 'Historical Objects'];
const DEFAULT_TAGS = [
  'Rare Books', 'Provenance', 'First World War', 'Second World War', 'Military History',
  'Maps', 'Trench Maps', 'Cartography', 'Manuscripts', 'Antiquarian Books', 'Collecting',
  'Bibliography', 'Historical Documents', 'Archives', 'Research', 'Conservation',
  'Book History', 'Printing History', 'Ephemera', 'Battlefield Archaeology',
];
const DEFAULT_COLLECTIONS = [
  'Western Front Collection',
  'Irish History Collection',
  'Exploration Collection',
  'Estate Library Collection',
  'Travel Collection',
];
const ACQUISITION_SOURCES = ['Auction', 'Private Collection', 'Estate Sale', 'Dealer', 'Book Fair', 'Direct Purchase'];
const ARCHIVE_CATEGORIES = [
  'Rare Books', 'Military History', 'First World War', 'Second World War', 'Maps & Cartography',
  'Manuscripts', 'Historical Documents', 'Pamphlets', 'Periodicals', 'Archive Material',
  'Research Notes', 'Estate Libraries', 'Local History', 'Irish History', 'Travel & Exploration',
];
const ARCHIVE_FILE_TYPES = ['PDF', 'Scan', 'Image Set', 'JPG', 'PNG', 'WEBP', 'TIFF', 'ZIP'];
const ARCHIVE_PAGE_SIZE = 12;
const ARCHIVE_MAX_FILE_SIZE = 500 * 1024 * 1024;
const ARCHIVE_ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/tiff',
  'application/zip',
  'application/x-zip-compressed',
]);
const SAMPLE_ARTICLES = [
  {
    id: 'sample-article-maps',
    title: 'Understanding First World War Trench Maps',
    category: 'Cartography',
    article_date: '2026-01-10',
    featured_image_url: '',
    summary: 'How battlefield charts were created, used and preserved for modern collectors.',
    content: 'Trench maps combine operational necessity with historical evidence. Their grids, annotations and issue details help reconstruct how ground was understood during conflict.',
    tags: ['WWI', 'Maps', 'Trench Maps'],
    featured: true,
    published: true,
  },
  {
    id: 'sample-article-provenance',
    title: 'Why Provenance Matters in Rare Book Collecting',
    category: 'Provenance',
    article_date: '2026-01-04',
    featured_image_url: '',
    summary: 'Ownership history can transform how a book, map or object is understood and valued.',
    content: 'Provenance connects an object to people, places and institutions. It can support authenticity, explain significance and clarify market value.',
    tags: ['Rare Book', 'First Edition'],
    featured: false,
    published: true,
  },
  {
    id: 'sample-article-estates',
    title: 'Approaching an Estate Library Review',
    category: 'Estate Libraries',
    article_date: '2025-12-20',
    featured_image_url: '',
    summary: 'Practical considerations for families and collection stewards responsible for historical collections.',
    content: 'Estate library reviews benefit from orderly documentation, condition notes, collection context and a clear decision about sale, retention or consignment.',
    tags: ['Archive Material', 'British History'],
    featured: false,
    published: true,
  },
];
const CATEGORY_FALLBACK_IMAGES = {
  Books: '',
  Maps: '',
  Documents: '',
  'Historical Objects': '',
};
const SAMPLE_STOCK = [
  {
    id: 'sample-western-front',
    title: 'Official Trench Map - Ypres Salient',
    reference_number: 'BM-2026-001',
    category: 'Maps',
    year: '1917',
    price: 2200,
    short_description: 'A period battlefield map with trench lines, artillery positions and later collector annotations.',
    full_description: 'A representative example of Great War operational cartography, presented as sample stock until live catalogue records are added.',
    provenance: 'Private London collection of military cartography.',
    condition: 'Very good; original folds with light handling wear.',
    collection_name: 'Western Front Collection',
    featured: true,
    sold: false,
    main_image_url: CATEGORY_FALLBACK_IMAGES.Maps,
    item_images: [],
    item_tags: [{ tags: { name: 'WWI' } }, { tags: { name: 'Trench Maps' } }, { tags: { name: 'Military History' } }],
  },
  {
    id: 'sample-regimental-history',
    title: 'History of the 36th (Ulster) Division',
    reference_number: 'BM-2026-002',
    category: 'Books',
    year: '1919',
    price: 3400,
    short_description: 'A substantial regimental history documenting service, campaigns and memorial record.',
    full_description: 'A sample catalogue entry showing the style of book description used for significant military history material.',
    provenance: 'Estate library of a military historian.',
    condition: 'Very good; original cloth with gilt spine detail.',
    collection_name: 'Irish History Collection',
    featured: true,
    sold: false,
    main_image_url: CATEGORY_FALLBACK_IMAGES.Books,
    item_images: [],
    item_tags: [{ tags: { name: 'Regimental History' } }, { tags: { name: 'Irish History' } }, { tags: { name: 'Rare Book' } }],
  },
  {
    id: 'sample-exploration-archive',
    title: 'Victorian Expedition Papers',
    reference_number: 'BM-2026-003',
    category: 'Documents',
    year: 'c. 1880',
    price: null,
    short_description: 'A small archive of manuscript notes and correspondence relating to late Victorian travel.',
    full_description: 'A sample archive entry for exploration, travel and historical document material.',
    provenance: 'Private family collection.',
    condition: 'Good; age-toning and expected fold marks.',
    collection_name: 'Exploration Collection',
    featured: true,
    sold: false,
    main_image_url: CATEGORY_FALLBACK_IMAGES.Documents,
    item_images: [],
    item_tags: [{ tags: { name: 'Victorian' } }, { tags: { name: 'Exploration' } }, { tags: { name: 'Historical Document' } }],
  },
  {
    id: 'sample-war-memoirs',
    title: 'First World War Memoirs of a Staff Officer',
    reference_number: 'BM-2026-004',
    category: 'Books',
    year: '1922',
    price: 875,
    short_description: 'Privately printed memoirs with campaign observations and a small number of inserted notes.',
    full_description: 'A representative example of inter-war military memoir literature, suitable for collectors of First World War personal narratives.',
    provenance: 'From a private military history library.',
    condition: 'Good; original cloth with light rubbing and clean contents.',
    collection_name: 'Western Front Collection',
    featured: false,
    sold: false,
    main_image_url: CATEGORY_FALLBACK_IMAGES.Books,
    item_images: [],
    item_tags: [{ tags: { name: 'WWI' } }, { tags: { name: 'Memoir' } }, { tags: { name: 'Military History' } }],
  },
  {
    id: 'sample-exploration-narrative',
    title: 'Narrative of a Victorian Expedition',
    reference_number: 'BM-2026-005',
    category: 'Books',
    year: '1887',
    price: 1450,
    short_description: 'Illustrated travel account with folding map and plates relating to late Victorian exploration.',
    full_description: 'A sample exploration narrative showing how travel and discovery material will be presented in the catalogue.',
    provenance: 'Ex-libris country house library.',
    condition: 'Very good; original decorated cloth, hinges sound.',
    collection_name: 'Exploration Collection',
    featured: false,
    sold: false,
    main_image_url: CATEGORY_FALLBACK_IMAGES.Books,
    item_images: [],
    item_tags: [{ tags: { name: 'Victorian' } }, { tags: { name: 'Exploration' } }, { tags: { name: 'Travel' } }],
  },
  {
    id: 'sample-campaign-map',
    title: 'Campaign Map of Northern France',
    reference_number: 'BM-2026-006',
    category: 'Maps',
    year: '1918',
    price: 650,
    short_description: 'Printed campaign map with period fold lines and operational annotations.',
    full_description: 'Representative campaign cartography for collectors of military maps and operational history.',
    provenance: 'Dealer acquisition, London.',
    condition: 'Good; folds stable with minor edge wear.',
    collection_name: 'Western Front Collection',
    featured: false,
    sold: false,
    main_image_url: CATEGORY_FALLBACK_IMAGES.Maps,
    item_images: [],
    item_tags: [{ tags: { name: 'Maps' } }, { tags: { name: 'WWI' } }, { tags: { name: 'Military History' } }],
  },
  {
    id: 'sample-survey-map',
    title: 'Nineteenth-Century Survey Map',
    reference_number: 'BM-2026-007',
    category: 'Maps',
    year: 'c. 1860',
    price: 525,
    short_description: 'Detailed regional survey map with engraved topographical detail.',
    full_description: 'A sample survey map entry representing antiquarian cartography outside the military field.',
    provenance: 'Private collection.',
    condition: 'Very good; light toning only.',
    collection_name: 'Travel Collection',
    featured: false,
    sold: false,
    main_image_url: CATEGORY_FALLBACK_IMAGES.Maps,
    item_images: [],
    item_tags: [{ tags: { name: 'Maps' } }, { tags: { name: '19th Century' } }],
  },
  {
    id: 'sample-military-document',
    title: 'Military Appointment Document',
    reference_number: 'BM-2026-008',
    category: 'Documents',
    year: '1942',
    price: 295,
    short_description: 'Official wartime document with signatures, stamps and service context.',
    full_description: 'A representative historical document suitable for collectors of twentieth-century military archives.',
    provenance: 'Family papers, by descent.',
    condition: 'Good; old folds and handling marks.',
    collection_name: 'Estate Library Collection',
    featured: false,
    sold: false,
    main_image_url: CATEGORY_FALLBACK_IMAGES.Documents,
    item_images: [],
    item_tags: [{ tags: { name: 'WWII' } }, { tags: { name: 'Historical Document' } }, { tags: { name: 'Archive Material' } }],
  },
  {
    id: 'sample-field-equipment',
    title: 'Brass Field Compass',
    reference_number: 'BM-2026-009',
    category: 'Historical Objects',
    year: 'c. 1910',
    price: 420,
    short_description: 'Early twentieth-century field compass with patinated brass case.',
    full_description: 'A sample historical object entry showing how selected objects with provenance will be catalogued.',
    provenance: 'Private collection, Northern Ireland.',
    condition: 'Good; age-related patina, hinge intact.',
    collection_name: 'Western Front Collection',
    featured: false,
    sold: false,
    main_image_url: CATEGORY_FALLBACK_IMAGES['Historical Objects'],
    item_images: [],
    item_tags: [{ tags: { name: 'Historical Object' } }, { tags: { name: 'Military History' } }],
  },
  {
    id: 'sample-curiosity',
    title: 'Historical Desk Curiosity',
    reference_number: 'BM-2026-010',
    category: 'Historical Objects',
    year: '19th Century',
    price: null,
    short_description: 'A small historical object with display interest and collector appeal.',
    full_description: 'A sample curiosity entry for unusual objects with provenance or historical association.',
    provenance: 'Estate sale.',
    condition: 'Good; commensurate with age.',
    collection_name: 'Estate Library Collection',
    featured: false,
    sold: true,
    archive_reference: true,
    main_image_url: CATEGORY_FALLBACK_IMAGES['Historical Objects'],
    item_images: [],
    item_tags: [{ tags: { name: 'Historical Object' } }, { tags: { name: '19th Century' } }],
  },
];

const state = {
  client: null,
  items: [],
  tags: [],
  collections: [],
  articles: [],
  archiveItems: [],
  enquiries: [],
  settings: null,
  archivePage: 1,
  featuredCarousel: {
    items: [],
    index: 0,
    perView: 3,
  },
  detailImages: [],
  detailImageIndex: 0,
  editingItemId: null,
  editingTagId: null,
  editingCollectionId: null,
  articleEditor: null,
  articleEditorReady: null,
  articleAdditionalImages: [],
  editingArchiveId: null,
  itemBibliographicFieldsUnsupported: false,
};

function hasSupabaseConfig() {
  return Boolean(window.supabase && CONFIG.url && CONFIG.publishableKey);
}

function getClient() {
  if (!hasSupabaseConfig()) return null;
  if (!state.client) state.client = window.supabase.createClient(CONFIG.url, CONFIG.publishableKey);
  return state.client;
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

function absoluteUrl(path = '') {
  const canonicalPath = String(path || '/').replace(/^\/Beaumont\//i, '/');
  return new URL(canonicalPath, SITE_URL).href;
}

function localPath(path = '') {
  const cleanPath = String(path || '').replace(/^\/+/, '');
  const basePath = window.location.pathname.startsWith('/Beaumont/') ? '/Beaumont/' : '/';
  return `${basePath}${cleanPath}`;
}

function catalogueItemUrl(item) {
  return localPath(`catalogue/${slugify(item.title || item.reference_number || item.id)}/`);
}

function articleUrl(article) {
  return localPath(`articles/${slugify(article.title || article.id)}/`);
}

function archiveItemUrl(item) {
  return localPath(`pdf-vault/${slugify(item.title || item.id)}/`);
}

function routeSlug(prefix) {
  const parts = window.location.pathname.split('/').filter(Boolean);
  const index = parts.indexOf(prefix);
  return index >= 0 ? parts[index + 1] || '' : '';
}

function metaContent(name, content, property = false) {
  if (!content) return;
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(property ? 'property' : 'name', name);
    document.head.appendChild(node);
  }
  node.setAttribute('content', content);
}

function linkHref(rel, href) {
  if (!href) return;
  let node = document.head.querySelector(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement('link');
    node.setAttribute('rel', rel);
    document.head.appendChild(node);
  }
  node.setAttribute('href', href);
}

function setJsonLd(id, data) {
  let node = document.getElementById(id);
  if (!node) {
    node = document.createElement('script');
    node.type = 'application/ld+json';
    node.id = id;
    document.head.appendChild(node);
  }
  node.textContent = JSON.stringify(data);
}

function applySeo({ title, description, url, image = DEFAULT_SHARE_IMAGE, type = 'website', schema = [] }) {
  const pageTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonical = absoluteUrl(url || `${window.location.pathname}${window.location.search}`);
  document.title = pageTitle;
  metaContent('description', description);
  metaContent('og:title', pageTitle, true);
  metaContent('og:description', description, true);
  metaContent('og:image', image, true);
  metaContent('og:url', canonical, true);
  metaContent('og:type', type, true);
  metaContent('twitter:card', image ? 'summary_large_image' : 'summary');
  metaContent('twitter:title', pageTitle);
  metaContent('twitter:description', description);
  metaContent('twitter:image', image);
  linkHref('canonical', canonical);
  if (schema.length) setJsonLd('beaumont-jsonld', schema.length === 1 ? schema[0] : schema);
}

function setStatus(message, type = 'info') {
  document.querySelectorAll('[data-status]').forEach((node) => {
    node.textContent = message;
    node.dataset.type = type;
  });
}

function supabaseRequiredMessage() {
  return 'Supabase connection error. Check supabase.js and the project keys.';
}

function requireClient() {
  const client = getClient();
  if (!client) throw new Error(supabaseRequiredMessage());
  return client;
}

function formatPrice(price) {
  return price || price === 0 ? `£${Number(price).toLocaleString('en-GB')}` : 'Price on request';
}

function itemTags(item) {
  return (item.item_tags || []).map((entry) => entry.tags?.name).filter(Boolean);
}

function itemImages(item) {
  return (item.item_images || []).map((entry) => entry.image_url).filter(Boolean);
}

function mainImage(item) {
  return item.main_image_url || itemImages(item)[0] || CATEGORY_FALLBACK_IMAGES[item.category] || CATEGORY_FALLBACK_IMAGES.Books;
}

function realItemImage(item) {
  return item.main_image_url || itemImages(item)[0] || '';
}

function isMeaningfulText(value) {
  const text = String(value || '').trim();
  if (!text) return false;
  const normal = text.toLowerCase().replace(/[^a-z0-9]+/g, '');
  const blocked = new Set(['test', 'placeholder', 'sdfsdf', 'dsafasdf', 'asdf', 'asdfasdf', 'n/a', 'na']);
  return !blocked.has(normal);
}

function cleanText(value) {
  return isMeaningfulText(value) ? String(value).trim() : '';
}

function catalogueDescription(item) {
  const primary = cleanText(item.catalogue_description);
  if (primary) return primary;
  return [cleanText(item.short_description), cleanText(item.full_description)].filter(Boolean).join('\n\n');
}

const BIBLIOGRAPHIC_BACKFILL_BY_REFERENCE = {
  'BM-2026-023': {
    author: 'General Sir Frank Kitson',
    edition: 'First Edition, signed limited edition of 150 copies',
    publisher: 'Privately published',
    publication_year: '2011',
  },
  'BM-2026-022': {
    author: 'Julian Amery',
    edition: 'First Edition',
    publisher: 'Macmillan & Co. Ltd.',
    publication_year: '1948',
    publication_place: 'London',
  },
  'BM-2026-021': {
    author: 'Major-General Sir W. F. P. Napier, K.C.B.',
    edition: 'Chandos Classics Edition',
    publisher: 'Frederick Warne & Co.',
    publication_year: 'Late 19th Century',
    publication_place: 'London & New York',
  },
  'BM-2026-020': {
    author: 'Sir Winston Churchill',
    edition: 'Complete Six-Volume Set',
    publisher: 'Cassell & Co.',
    publication_year: '1948-1954',
    publication_place: 'London',
  },
  'BM-2026-019': {
    edition: 'The Cities Series',
    publisher: 'T. N. Foulis',
    publication_year: 'c.1905-1910',
    publication_place: 'London & Edinburgh',
  },
  'BM-2026-018': {
    author: 'Winston S. Churchill',
    edition: 'First Edition',
    publisher: 'Cassell and Company Ltd.',
    publication_year: '1946',
    publication_place: 'London, Toronto, Melbourne and Sydney',
  },
  'BM-2026-017': {
    author: 'Field-Marshal The Viscount Montgomery of Alamein, K.G.',
    edition: 'Third Impression',
    publisher: 'Collins',
    publication_year: 'December 1958',
    publication_place: 'London',
  },
  'BM-2026-016': {
    author: 'Lieutenant-General Sir William F. Butler',
    edition: '1920 Reprint Edition',
    publisher: 'Macmillan & Co., Limited',
    publication_year: '1920',
    publication_place: 'St Martin\'s Street, London',
  },
  'BM-2026-015': {
    author: 'Major L. F. Ellis',
    edition: 'First Edition',
    publisher: 'Her Majesty\'s Stationery Office',
    publication_year: '1962',
    publication_place: 'London',
  },
  'BM-2026-014': {
    author: 'Robert Graves',
    edition: 'Early Edition',
    publisher: 'Jonathan Cape',
    publication_year: '1927',
    publication_place: 'London',
  },
  'BM-2026-013': {
    author: 'Richard Aldington',
    edition: 'First Edition',
    publisher: 'Collins',
    publication_year: '1955',
    publication_place: 'London',
  },
  'BM-2026-012': {
    author: 'Sir Winston Churchill',
    edition: 'First Editions, Volumes I-IV',
    publisher: 'Cassell & Co. Ltd.',
    publication_year: '1948-1951',
    publication_place: 'London',
  },
  'BM-2026-011': {
    author: 'Cyril Falls',
    edition: 'First Edition',
    publisher: 'M\'Caw, Stevenson & Orr Ltd.',
    publication_year: '1922',
    publication_place: 'Belfast and London',
  },
};

function firstPatternValue(source, patterns) {
  for (const pattern of patterns) {
    const match = source.match(pattern);
    if (match?.[1]) return cleanText(match[1].replace(/\.$/, ''));
  }
  return '';
}

function inferredBibliographicFields(item) {
  const source = [item.physical_details, catalogueDescription(item), item.full_description, item.short_description]
    .filter(Boolean)
    .join('\n');
  const labelled = {
    author: firstPatternValue(source, [/^\s*(?:Author|Creator|Artist)\s*:\s*(.+)$/im, /\bby\s+([^.,\n]+),\s+published by\b/i]),
    edition: firstPatternValue(source, [/^\s*(?:Edition|Edition statement)\s*:\s*(.+)$/im, /^\s*((?:First|Second|Third|Fourth|Fifth).{0,50}(?:Edition|Impression)|[0-9]{4}\s+Reprint Edition)\.?$/im]),
    publisher: firstPatternValue(source, [/^\s*(?:Publisher|Published by|Imprint)\s*:\s*(.+)$/im, /\bpublished by\s+([^.,\n]+(?:\s*&\s*Co\.?(?:,\s*Limited| Ltd\.)?)?)/i]),
    publication_year: firstPatternValue(source, [/^\s*(?:Publication Year|Publication Date|Published|Date)\s*:\s*(.+)$/im, /\b(?:published|first published|privately published)[^0-9]{0,40}((?:c\.)?\s*[12][0-9]{3}(?:\s*[–-]\s*[12][0-9]{3})?)/i]) || cleanText(item.year),
    publication_place: firstPatternValue(source, [/^\s*(?:Publication Place|Place of Publication)\s*:\s*(.+)$/im]),
  };
  return { ...labelled, ...(BIBLIOGRAPHIC_BACKFILL_BY_REFERENCE[item.reference_number] || {}) };
}

async function backfillCatalogueBibliographicFields() {
  if (!state.items.length) return 0;
  const client = requireClient();
  const updates = state.items
    .map((item) => {
      const inferred = inferredBibliographicFields(item);
      const payload = {};
      ['author', 'edition', 'publisher', 'publication_year', 'publication_place'].forEach((field) => {
        if (!cleanText(item[field]) && cleanText(inferred[field])) payload[field] = cleanText(inferred[field]);
      });
      return Object.keys(payload).length ? { id: item.id, payload } : null;
    })
    .filter(Boolean);
  if (!updates.length) return 0;
  await Promise.all(updates.map(async ({ id, payload }) => {
    const { error } = await client.from('items').update(payload).eq('id', id);
    if (error) throw error;
  }));
  return updates.length;
}

function plainTextExcerpt(value, maxLength = 160) {
  const text = String(value || '')
    .replace(/!\[[^\]]*]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/[*_`>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text;
}

function cataloguePlaceholder(className = '') {
  return `
    <div class="beaumont-image-placeholder ${className}">
      <span>IMAGE PENDING</span>
      <strong>BEAUMONT</strong>
      <small>Curators of History</small>
    </div>
  `;
}

function availabilityLabel(item) {
  if (item.archive_reference) return 'Archive Reference';
  return item.sold ? 'Sold' : 'Available';
}

function itemSearchText(item) {
  return [
    item.title,
    item.author,
    item.edition,
    item.publisher,
    item.publication_year,
    item.publication_place,
    item.reference_number,
    item.category,
    item.subcategory,
    item.year,
    item.collection_name,
    item.catalogue_description,
    item.physical_details,
    item.beaumont_notes,
    item.provenance,
    item.condition,
    item.item_references,
    ...itemTags(item),
  ].join(' ').toLowerCase();
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: SITE_NAME,
    url: SITE_URL,
    email: 'jackgault16@yahoo.co.uk',
    telephone: '07549 892003',
    description: 'Rare books, historical maps, military history, manuscripts and historical material curated for collectors, historians and institutions.',
  };
}

function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/catalogue.html?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

function initBaseSeo() {
  const path = window.location.pathname;
  if (routeSlug('catalogue') || routeSlug('articles') || routeSlug('pdf-vault')) return;
  const pages = {
    '/': {
      title: 'Beaumont Archives | Rare Books, Historical Maps & Military History',
      description: 'Beaumont Archives specialises in rare books, historical maps, manuscripts, military history and historical material for collectors, historians and institutions.',
      url: '/',
      priority: true,
    },
    '/index.html': {
      title: 'Beaumont Archives | Rare Books, Historical Maps & Military History',
      description: 'Beaumont Archives specialises in rare books, historical maps, manuscripts, military history and historical material for collectors, historians and institutions.',
      url: '/',
      priority: true,
    },
    '/catalogue.html': {
      title: 'Catalogue | Beaumont Archives',
      description: 'Browse rare books, historical maps, manuscripts, military history, documents and selected historical objects from Beaumont Archives.',
      url: '/catalogue.html',
    },
    '/journal.html': {
      title: 'Journal | Beaumont Archives',
      description: 'Collecting notes, article topics, provenance studies and research guides on rare books, maps and historical material.',
      url: '/journal.html',
    },
    '/digital-archive.html': {
      title: 'PDF Vault & Digital Archive | Beaumont Archives',
      description: 'Digitised books, documents, scans and PDF research material made available for historical study and private research.',
      url: '/digital-archive.html',
    },
    '/collection-services.html': {
      title: 'Collection Services | Beaumont Archives',
      description: 'Research-led collection reviews, consignment advice, cataloguing support and sourcing guidance for rare books, maps and archives.',
      url: '/collection-services.html',
    },
    '/material-search.html': {
      title: 'Material Search | Beaumont Archives',
      description: 'Request help sourcing rare books, historical maps, military history, manuscripts, documents and specialist collection material.',
      url: '/material-search.html',
    },
    '/about.html': {
      title: 'About | Beaumont Archives',
      description: 'About Beaumont Archives, curators of rare books, historical maps, manuscripts, military history and researched historical material.',
      url: '/about.html',
    },
  };
  const page = pages[path];
  if (!page) return;
  applySeo({
    title: page.title,
    description: page.description,
    url: page.url,
    schema: page.priority ? [organizationSchema(), websiteSchema()] : [organizationSchema()],
  });
}

function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

function itemSeoDescription(item) {
  const author = itemAuthor(item);
  const publisher = itemPublisher(item);
  const publicationDate = itemPublicationDate(item);
  const publicationPlace = itemPublicationPlace(item);
  const edition = itemEdition(item);
  const bibliographic = [
    edition ? `${edition} of ${author ? `${author}'s ` : ''}${item.title}.` : '',
    publisher ? `Published by ${publisher}${publicationPlace ? `, ${publicationPlace}` : ''}${publicationDate ? `, ${publicationDate}` : ''}.` : '',
  ].filter(Boolean).join(' ');
  const base = bibliographic || plainTextExcerpt(catalogueDescription(item), 150);
  const parts = [
    base,
    !bibliographic && publicationDate ? `Published ${publicationDate}.` : '',
    item.reference_number ? `Reference ${item.reference_number}.` : '',
    'Available from Beaumont Archives.',
  ].filter(Boolean);
  return plainTextExcerpt(parts.join(' '), 170);
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

function bibliographicFields(item) {
  return [
    { label: 'Author', value: itemAuthor(item) },
    { label: 'Edition', value: itemEdition(item) },
    { label: 'Publisher', value: itemPublisher(item) },
    { label: 'Publication Year', value: itemPublicationDate(item) },
    { label: 'Publication Place', value: itemPublicationPlace(item) },
  ].filter((field) => field.value);
}

function catalogueCardBibliographicLine(item) {
  const author = itemAuthor(item);
  const details = [itemPublisher(item), itemPublicationPlace(item), itemPublicationDate(item)].filter(Boolean).join(' • ');
  return [author, details].filter(Boolean);
}

function itemConditionSchema(item) {
  const condition = cleanText(item.condition).toLowerCase();
  if (!condition) return undefined;
  if (condition.includes('new')) return 'https://schema.org/NewCondition';
  if (condition.includes('damaged')) return 'https://schema.org/DamagedCondition';
  if (condition.includes('used') || condition.includes('good') || condition.includes('fine') || condition.includes('very')) return 'https://schema.org/UsedCondition';
  return 'https://schema.org/UsedCondition';
}

function itemSchema(item) {
  const url = absoluteUrl(catalogueItemUrl(item));
  const image = realItemImage(item) || DEFAULT_SHARE_IMAGE;
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
    url,
    image,
    description: itemSeoDescription(item),
    sku: item.reference_number || item.id,
    productID: item.reference_number || item.id,
    identifier: item.reference_number || item.id,
    category: item.category,
    datePublished: publicationDate || undefined,
    bookEdition: edition || undefined,
    author: author ? { '@type': 'Person', name: author } : undefined,
    publisher: publisher ? { '@type': 'Organization', name: publisher } : undefined,
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
      itemTags(item).length ? { '@type': 'PropertyValue', name: 'Subjects', value: itemTags(item).join(', ') } : null,
    ].filter(Boolean),
    offers: {
      '@type': 'Offer',
      price: item.price || undefined,
      priceCurrency: item.price ? 'GBP' : undefined,
      availability: item.sold ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      itemCondition: itemConditionSchema(item),
      sku: item.reference_number || item.id,
      url,
    },
  };
}

function articleSchema(article) {
  const url = absoluteUrl(articleUrl(article));
  return {
    '@context': 'https://schema.org',
    '@type': ['Article', 'BlogPosting'],
    headline: article.title,
    description: plainTextExcerpt(article.summary || article.content, 170),
    image: cleanText(article.featured_image_url) || DEFAULT_SHARE_IMAGE,
    datePublished: article.article_date || undefined,
    dateModified: article.updated_at || article.article_date || undefined,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: url,
  };
}

function archiveSchema(item) {
  const url = absoluteUrl(archiveItemUrl(item));
  return {
    '@context': 'https://schema.org',
    '@type': ['CreativeWork', 'DigitalDocument'],
    name: item.title,
    description: plainTextExcerpt(archiveDescription(item), 170),
    url,
    image: cleanText(item.thumbnail_url) || DEFAULT_SHARE_IMAGE,
    encodingFormat: archiveFileType(item),
    datePublished: item.date_year || undefined,
    author: item.author_creator ? { '@type': 'Person', name: item.author_creator } : undefined,
    publisher: item.publisher_source ? { '@type': 'Organization', name: item.publisher_source } : undefined,
    associatedMedia: archivePublicUrl(item) || undefined,
  };
}

function sameRecordId(left, right) {
  return String(left || '') === String(right || '');
}

function findItemById(id) {
  return state.items.find((entry) => sameRecordId(entry.id, id));
}

function parseJsonArray(value) {
  try {
    const parsed = JSON.parse(value || '[]');
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch (error) {
    return [];
  }
}

async function loadItems() {
  const client = getClient();
  if (!client) return [];
  const { data, error } = await client
    .from('items')
    .select('*, item_images(*), item_tags(id, tag_id, tags(*))')
    .order('created_at', { ascending: false });
  if (error) throw error;
  state.items = data || [];
  return state.items;
}

function serialValue(reference) {
  const match = String(reference || '').match(/(\d+)(?!.*\d)/);
  return match ? Number(match[1]) : 0;
}

function newestItems(items) {
  return [...items].sort((a, b) => {
    const serialDiff = serialValue(b.reference_number) - serialValue(a.reference_number);
    if (serialDiff) return serialDiff;
    return new Date(b.created_at || 0) - new Date(a.created_at || 0);
  });
}

async function loadTags() {
  const client = getClient();
  if (!client) return [];
  const { data, error } = await client.from('tags').select('*').order('name');
  if (error) throw error;
  state.tags = data || [];
  return state.tags;
}

async function loadCollections() {
  const client = getClient();
  if (!client) return [];
  const { data, error } = await client.from('collections').select('*').order('name');
  if (error) throw error;
  state.collections = data || [];
  return state.collections;
}

async function seedDefaults() {
  const client = getClient();
  if (!client) return;
  await client.from('tags').upsert(DEFAULT_TAGS.map((name) => ({ name })), { onConflict: 'name' });
  await client.from('collections').upsert(DEFAULT_COLLECTIONS.map((name) => ({ name })), { onConflict: 'name' });
}

function sampleStockTagNames() {
  return [...new Set(SAMPLE_STOCK.flatMap((item) => itemTags(item)))];
}

function sampleStockItemPayload(item) {
  return {
    title: item.title,
    reference_number: item.reference_number,
    category: item.category,
    subcategory: item.subcategory || '',
    year: item.year || '',
    price: item.price,
    catalogue_description: catalogueDescription(item),
    physical_details: item.physical_details || '',
    beaumont_notes: item.beaumont_notes || '',
    provenance: item.provenance || '',
    condition: item.condition || '',
    item_references: item.item_references || '',
    collection_name: item.collection_name || null,
    acquisition_source: item.acquisition_source || '',
    featured: Boolean(item.featured),
    sold: Boolean(item.sold),
    archive_reference: Boolean(item.archive_reference),
    main_image_url: item.main_image_url || '',
  };
}

async function seedSampleInventory() {
  const client = requireClient();
  const { error: tagSeedError } = await client.from('tags').upsert(sampleStockTagNames().map((name) => ({ name })), { onConflict: 'name' });
  if (tagSeedError) throw tagSeedError;
  const collectionRows = [...new Set(SAMPLE_STOCK.map((item) => item.collection_name).filter(Boolean))].map((name) => ({ name }));
  const { error: collectionSeedError } = await client.from('collections').upsert(collectionRows, { onConflict: 'name' });
  if (collectionSeedError) throw collectionSeedError;

  const { data: items, error: itemError } = await client
    .from('items')
    .insert(SAMPLE_STOCK.map(sampleStockItemPayload))
    .select('id, reference_number');
  if (itemError) throw itemError;

  await loadTags();
  const tagIdByName = new Map(state.tags.map((tag) => [tag.name, tag.id]));
  const itemIdByReference = new Map((items || []).map((item) => [item.reference_number, item.id]));
  const tagRows = SAMPLE_STOCK.flatMap((item) => {
    const itemId = itemIdByReference.get(item.reference_number);
    if (!itemId) return [];
    return itemTags(item)
      .map((name) => tagIdByName.get(name))
      .filter(Boolean)
      .map((tag_id) => ({ item_id: itemId, tag_id }));
  });
  if (tagRows.length) {
    const { error: tagError } = await client.from('item_tags').insert(tagRows);
    if (tagError) throw tagError;
  }
}

function optionList(values, placeholder) {
  return [`<option value="">${placeholder}</option>`]
    .concat(values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`))
    .join('');
}

function normalizeTagValues(tags) {
  if (Array.isArray(tags)) return tags.map((tag) => String(tag || '').trim()).filter(Boolean);
  return String(tags || '').split(',').map((tag) => tag.trim()).filter(Boolean);
}

function articleTagOptions(extraTags = []) {
  return [...new Set([
    ...state.tags.map((tag) => tag.name).filter(Boolean),
    ...DEFAULT_TAGS,
    ...normalizeTagValues(extraTags),
  ])].sort((a, b) => a.localeCompare(b));
}

function selectedArticleTags() {
  return [...document.querySelectorAll('input[name="article-tags"]:checked')]
    .map((input) => input.value)
    .filter(Boolean);
}

function updateArticleTagSummary() {
  const summary = document.getElementById('article-tags-summary');
  if (!summary) return;
  const selected = selectedArticleTags();
  summary.textContent = selected.length ? selected.join(', ') : 'Select tags';
}

function fillArticleTagSelect(selected = []) {
  const menu = document.getElementById('article-tags-menu');
  if (!menu) return;
  const selectedTags = normalizeTagValues(selected);
  const selectedSet = new Set(selectedTags);
  menu.innerHTML = articleTagOptions(selectedTags)
    .map((tag) => `
      <label class="article-tag-dropdown__option">
        <input type="checkbox" name="article-tags" value="${escapeHtml(tag)}"${selectedSet.has(tag) ? ' checked' : ''} />
        <span>${escapeHtml(tag)}</span>
      </label>
    `)
    .join('');
  updateArticleTagSummary();
}

function renderFeaturedCard(item) {
  const image = realItemImage(item);
  const imageStyle = image ? ` style="background-image:url('${escapeHtml(image)}')"` : '';
  const description = plainTextExcerpt(catalogueDescription(item), 130);
  return `
    <article class="catalogue-card">
      <a class="catalogue-card__image${image ? ' catalogue-card__image--photo' : ' catalogue-card__image--empty'}"${imageStyle} href="${catalogueItemUrl(item)}" aria-label="${escapeHtml(item.title)}">
        ${image ? '' : cataloguePlaceholder()}
      </a>
      <div class="catalogue-card__body">
        <div class="catalogue-card__entry">
          <p class="catalogue-card__label">${escapeHtml(item.reference_number || 'Catalogue entry')}</p>
        <p class="catalogue-card__meta">${escapeHtml(item.year || '')} · ${escapeHtml(item.category || '')}</p>
      </div>
      <h4>${escapeHtml(item.title)}</h4>
      ${description ? `<p>${escapeHtml(description)}</p>` : ''}
      <div class="catalogue-card__footer">
          <span class="catalogue-card__price">${formatPrice(item.price)}</span>
          <a class="button button--ghost" href="${enquiryUrl(item)}">Enquire</a>
        </div>
      </div>
    </article>
  `;
}

function featuredPerView() {
  if (window.matchMedia('(max-width: 680px)').matches) return 1;
  if (window.matchMedia('(max-width: 980px)').matches) return 2;
  return 3;
}

function featuredMaxIndex(perView) {
  const count = state.featuredCarousel.items.length;
  if (count <= perView) return 0;
  return count - perView;
}

function updateFeaturedCarousel() {
  const carousel = document.querySelector('[data-featured-carousel]');
  const track = document.getElementById('featured-items');
  if (!carousel || !track) return;
  const perView = featuredPerView();
  state.featuredCarousel.perView = perView;
  const maxIndex = featuredMaxIndex(perView);
  state.featuredCarousel.index = Math.min(state.featuredCarousel.index, maxIndex);
  carousel.style.setProperty('--featured-per-view', perView);
  carousel.style.setProperty('--featured-index', state.featuredCarousel.index);
  const firstCard = track.querySelector('.catalogue-card');
  const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
  const offset = firstCard ? state.featuredCarousel.index * (firstCard.getBoundingClientRect().width + gap) : 0;
  track.style.transform = `translateX(-${offset}px)`;
  const prev = carousel.querySelector('[data-featured-prev]');
  const next = carousel.querySelector('[data-featured-next]');
  if (prev) prev.disabled = state.featuredCarousel.index === 0;
  if (next) next.disabled = state.featuredCarousel.index >= maxIndex;
}

function moveFeaturedCarousel(direction) {
  const perView = state.featuredCarousel.perView || featuredPerView();
  const maxIndex = featuredMaxIndex(perView);
  state.featuredCarousel.index = Math.max(0, Math.min(maxIndex, state.featuredCarousel.index + direction));
  updateFeaturedCarousel();
}

function renderFeaturedCarousel(items) {
  const grid = document.getElementById('featured-items');
  if (!grid) return;
  const displayItems = items.slice(0, 9);
  state.featuredCarousel.items = displayItems;
  state.featuredCarousel.index = 0;
  grid.innerHTML = displayItems.length
    ? displayItems.map(renderFeaturedCard).join('')
    : '<div class="catalogue-empty"><p>Featured material will appear here.</p></div>';
  updateFeaturedCarousel();
}

function enquiryUrl(item) {
  return `/?ref=${encodeURIComponent(item.reference_number || item.title || '')}#contact`;
}

async function initHomepageInventory() {
  const grid = document.getElementById('featured-items');
  if (!grid) return;
  try {
    if (getClient()) await loadItems();
    const available = newestItems(state.items.filter((item) => !item.sold && !item.archive_reference));
    const displayItems = available.slice(0, 9);
    renderFeaturedCarousel(displayItems.length ? displayItems : SAMPLE_STOCK.slice(0, 9));
  } catch (error) {
    renderFeaturedCarousel(SAMPLE_STOCK.slice(0, 9));
  }
}

function renderCatalogueCard(item) {
  const image = realItemImage(item);
  const description = plainTextExcerpt(catalogueDescription(item), 180);
  const bibliographicLines = catalogueCardBibliographicLine(item);
  return `
    <article class="catalogue-item">
      <a class="catalogue-item__image${image ? '' : ' catalogue-item__image--empty'}" href="${catalogueItemUrl(item)}">
        ${cataloguePlaceholder()}
        ${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}" loading="lazy" onerror="this.remove();" />` : ''}
      </a>
      <div class="catalogue-item__content">
        <div class="catalogue-item__title">${escapeHtml(item.title)}</div>
        ${bibliographicLines.length ? `<div class="catalogue-item__bibliographic">${bibliographicLines.map((line) => `<span>${escapeHtml(line)}</span>`).join('')}</div>` : ''}
        <div class="catalogue-item__meta">${escapeHtml(item.reference_number)} · ${escapeHtml(item.category)}${item.year ? ` · ${escapeHtml(item.year)}` : ''}</div>
        <div class="catalogue-item__price">${formatPrice(item.price)}</div>
        ${description ? `<p class="catalogue-item__desc">${escapeHtml(description)}</p>` : ''}
        <div class="catalogue-item__details">
          ${item.collection_name ? `<p><strong>Collection:</strong> ${escapeHtml(item.collection_name)}</p>` : ''}
          <p><strong>Availability:</strong> ${escapeHtml(availabilityLabel(item))}</p>
        </div>
        <a href="${catalogueItemUrl(item)}" class="button--enquire">View Object</a>
      </div>
    </article>
  `;
}

function renderCatalogueFilters() {
  const category = document.getElementById('filter-category');
  const tag = document.getElementById('filter-tag');
  const collection = document.getElementById('filter-collection');
  const availability = document.getElementById('filter-availability');
  if (category) category.innerHTML = optionList(DEFAULT_CATEGORIES, 'All categories');
  if (tag) tag.innerHTML = optionList(state.tags.map((item) => item.name), 'All tags');
  if (collection) collection.innerHTML = optionList(state.collections.map((item) => item.name), 'All collections');
  if (availability) availability.innerHTML = optionList(['Available', 'Sold', 'Archive Reference'], 'All availability');
}

function filteredCatalogueItems() {
  const query = (document.getElementById('catalogue-search')?.value || '').toLowerCase().trim();
  const category = document.getElementById('filter-category')?.value || '';
  const tag = document.getElementById('filter-tag')?.value || '';
  const collection = document.getElementById('filter-collection')?.value || '';
  const availability = document.getElementById('filter-availability')?.value || '';
  return state.items.filter((item) => {
    const tags = itemTags(item);
    return (!query || itemSearchText(item).includes(query))
      && (!category || item.category === category)
      && (!tag || tags.includes(tag))
      && (!collection || item.collection_name === collection)
      && (!availability
        || (availability === 'Sold' ? item.sold && !item.archive_reference : availability === 'Archive Reference' ? Boolean(item.archive_reference) : !item.sold));
  });
}

function renderCatalogueItems() {
  const grid = document.getElementById('catalogue-grid');
  const count = document.getElementById('catalogue-count');
  if (!grid) return;
  const items = filteredCatalogueItems();
  if (count) count.textContent = `${items.length} object${items.length === 1 ? '' : 's'}`;
  grid.innerHTML = items.length
    ? items.map((item) => renderCatalogueCard(item)).join('')
    : '<div class="catalogue-empty" style="grid-column:1/-1;"><p>No items match these filters.</p></div>';
}

function renderItemDetail(item) {
  const detail = document.getElementById('item-detail');
  const listing = document.getElementById('catalogue-listing');
  if (!detail || !listing) return;
  document.querySelector('.catalogue-toolbar')?.classList.add('hidden');
  const primaryImage = realItemImage(item);
  const images = [primaryImage, ...itemImages(item)].filter(Boolean);
  state.detailImages = images;
  state.detailImageIndex = 0;
  const description = catalogueDescription(item);
  const physicalDetails = cleanText(item.physical_details);
  const provenance = cleanText(item.provenance);
  const condition = cleanText(item.condition);
  const beaumontNotes = cleanText(item.beaumont_notes);
  const references = cleanText(item.item_references);
  const pageUrl = catalogueItemUrl(item);
  const bibliographic = bibliographicFields(item);
  const seoTitle = [item.title, itemAuthor(item), SITE_NAME].filter(Boolean).join(' | ');
  const relatedItems = state.items
    .filter((entry) => entry.id !== item.id && !entry.archive_reference && (entry.category === item.category || itemTags(entry).some((tag) => itemTags(item).includes(tag))))
    .slice(0, 3);
  const relatedArticles = state.articles
    .filter((article) => {
      const haystack = `${article.title || ''} ${article.summary || ''} ${(article.tags || []).join(' ')}`.toLowerCase();
      return itemTags(item).some((tag) => haystack.includes(tag.toLowerCase()))
        || haystack.includes(String(item.category || '').toLowerCase());
    })
    .slice(0, 3);
  applySeo({
    title: seoTitle,
    description: itemSeoDescription(item),
    url: pageUrl,
    image: realItemImage(item) || DEFAULT_SHARE_IMAGE,
    type: 'product',
    schema: [
      itemSchema(item),
      breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Catalogue', url: '/catalogue.html' },
        { name: item.title, url: pageUrl },
      ]),
    ],
  });
  const sections = [
    description ? { title: 'Catalogue Description', body: markdownToHtml(description) } : null,
    physicalDetails ? { title: 'Physical Details', body: `<p>${escapeHtml(physicalDetails)}</p>` } : null,
    condition ? { title: 'Condition', body: `<p>${escapeHtml(condition)}</p>` } : null,
    provenance ? { title: 'Provenance', body: `<p>${escapeHtml(provenance)}</p>` } : null,
    beaumontNotes ? { title: 'Beaumont Notes', body: `<p>${escapeHtml(beaumontNotes)}</p>` } : null,
    references ? { title: 'References', body: `<p>${escapeHtml(references)}</p>` } : null,
  ].filter(Boolean);
  listing.classList.add('hidden');
  detail.classList.remove('hidden');
  detail.innerHTML = `
    <a class="catalogue-back" href="${localPath('catalogue.html')}">Back to Catalogue</a>
    <article class="item-detail">
      <div class="item-detail__media">
        <div class="item-detail__viewer">
          ${images.length > 1 ? `<button class="item-detail__image-nav item-detail__image-nav--prev" type="button" data-item-image-prev aria-label="Previous image">&lsaquo;</button>` : ''}
          ${images.length > 1 ? `<button class="item-detail__image-nav item-detail__image-nav--next" type="button" data-item-image-next aria-label="Next image">&rsaquo;</button>` : ''}
        <button class="item-detail__main" type="button" ${primaryImage ? 'data-item-image-open aria-label="Expand item image"' : 'aria-label="Image pending"'} ${primaryImage ? '' : 'disabled'}>
          ${cataloguePlaceholder('beaumont-image-placeholder--large')}
          ${primaryImage ? `<img data-item-main-image src="${escapeHtml(primaryImage)}" alt="${escapeHtml(item.title)}" onerror="this.hidden = true;" />` : ''}
        </button>
        </div>
        ${images.length > 1 ? `<div class="item-detail__gallery">${images.map((url, index) => `<button class="item-detail__thumb${index === 0 ? ' is-active' : ''}" type="button" data-item-image-select="${index}" aria-label="Show image ${index + 1}"><img src="${escapeHtml(url)}" alt="${escapeHtml(item.title)} gallery image ${index + 1}" onerror="this.closest('button').remove();" /></button>`).join('')}</div>` : ''}
        ${images.length ? `
          <div class="item-detail__lightbox hidden" data-item-lightbox aria-hidden="true">
            <button class="item-detail__lightbox-close" type="button" data-item-image-close aria-label="Close expanded image">X</button>
            ${images.length > 1 ? `<button class="item-detail__lightbox-nav item-detail__lightbox-nav--prev" type="button" data-item-image-prev aria-label="Previous image">&lsaquo;</button>` : ''}
            <div class="item-detail__lightbox-frame">
              ${cataloguePlaceholder('beaumont-image-placeholder--large')}
              <img data-item-lightbox-image src="${escapeHtml(primaryImage)}" alt="${escapeHtml(item.title)} expanded image" onerror="this.hidden = true;" />
            </div>
            ${images.length > 1 ? `<button class="item-detail__lightbox-nav item-detail__lightbox-nav--next" type="button" data-item-image-next aria-label="Next image">&rsaquo;</button>` : ''}
          </div>
        ` : ''}
      </div>
      <div class="item-detail__content">
        <p class="eyebrow">Reference ${escapeHtml(item.reference_number || 'Catalogue entry')}</p>
        <h2>${escapeHtml(item.title)}</h2>
        <div class="item-detail__summary">
          <p class="item-detail__meta">${escapeHtml(item.category || 'Catalogue')}${item.year ? ` &bull; ${escapeHtml(item.year)}` : ''}</p>
          <p class="item-detail__price">${formatPrice(item.price)}</p>
          <span class="item-detail__availability">${escapeHtml(availabilityLabel(item))}</span>
        </div>
        ${bibliographic.length ? `
          <section class="item-detail__bibliographic" aria-label="Bibliographic record">
            <h3>BIBLIOGRAPHIC RECORD</h3>
            <dl>
              ${bibliographic.map((field) => `
                <div>
                  <dt>${escapeHtml(field.label)}</dt>
                  <dd>${escapeHtml(field.value)}</dd>
                </div>
              `).join('')}
            </dl>
          </section>
        ` : ''}
        <div class="item-detail__sections">
          ${sections.map((section) => `
            <section class="item-detail__section">
              <h3>${section.title}</h3>
              ${section.body}
            </section>
          `).join('')}
        </div>
        <a class="button button--primary item-detail__enquire" href="${enquiryUrl(item)}">Enquire About This Item</a>
        ${relatedItems.length || relatedArticles.length ? `
          <section class="item-detail__section">
            <h3>Related Research</h3>
            ${relatedItems.map((entry) => `<p><a href="${catalogueItemUrl(entry)}">${escapeHtml(entry.title)}</a></p>`).join('')}
            ${relatedArticles.map((article) => `<p><a href="${articleUrl(article)}">${escapeHtml(article.title)}</a></p>`).join('')}
          </section>
        ` : ''}
      </div>
    </article>
  `;
}

function updateItemDetailImage() {
  const url = state.detailImages[state.detailImageIndex];
  if (!url) return;
  document.querySelectorAll('[data-item-main-image], [data-item-lightbox-image]').forEach((image) => {
    image.hidden = false;
    image.src = url;
  });
  document.querySelectorAll('[data-item-image-select]').forEach((button) => {
    button.classList.toggle('is-active', Number(button.dataset.itemImageSelect) === state.detailImageIndex);
  });
}

function moveItemDetailImage(delta) {
  if (state.detailImages.length < 2) return;
  state.detailImageIndex = (state.detailImageIndex + delta + state.detailImages.length) % state.detailImages.length;
  updateItemDetailImage();
}

function openItemDetailImage() {
  if (!state.detailImages.length) return;
  updateItemDetailImage();
  const lightbox = document.querySelector('[data-item-lightbox]');
  lightbox?.classList.remove('hidden');
  lightbox?.setAttribute('aria-hidden', 'false');
}

function closeItemDetailImage() {
  const lightbox = document.querySelector('[data-item-lightbox]');
  lightbox?.classList.add('hidden');
  lightbox?.setAttribute('aria-hidden', 'true');
}

async function initCataloguePage() {
  const grid = document.getElementById('catalogue-grid');
  if (!grid) return;
  if (!getClient()) {
    grid.innerHTML = '<div class="catalogue-empty"><p>Supabase is not configured.</p></div>';
    return;
  }
  try {
    await Promise.all([loadItems(), loadTags(), loadCollections(), loadArticles(false)]);
    if (!state.items.length) {
      state.items = SAMPLE_STOCK;
      if (!state.tags.length) state.tags = DEFAULT_TAGS.map((name) => ({ name }));
      if (!state.collections.length) state.collections = DEFAULT_COLLECTIONS.map((name) => ({ name }));
    }
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('item') || window.BEAUMONT_ROUTE_ID;
    const itemSlug = routeSlug('catalogue');
    if (itemId || itemSlug) {
      const item = findItemById(itemId)
        || state.items.find((entry) => slugify(entry.title || entry.reference_number || entry.id) === itemSlug)
        || SAMPLE_STOCK.find((entry) => sameRecordId(entry.id, itemId) || slugify(entry.title || entry.reference_number || entry.id) === itemSlug);
      if (item) renderItemDetail(item);
      return;
    }
    renderCatalogueFilters();
    renderCatalogueItems();
    document.querySelectorAll('[data-catalogue-filter]').forEach((field) => {
      field.addEventListener('input', renderCatalogueItems);
      field.addEventListener('change', renderCatalogueItems);
    });
    document.getElementById('clear-filters')?.addEventListener('click', () => {
      document.querySelectorAll('[data-catalogue-filter]').forEach((field) => { field.value = ''; });
      renderCatalogueItems();
    });
  } catch (error) {
    grid.innerHTML = `<div class="catalogue-empty"><p>${escapeHtml(error.message)}</p></div>`;
  }
}

function fillAdminOptions() {
  const category = document.getElementById('category');
  const collection = document.getElementById('collection-name');
  const acquisition = document.getElementById('acquisition-source');
  const archiveCategory = document.getElementById('archive-category');
  const archiveFileType = document.getElementById('archive-file-type');
  if (category) category.innerHTML = optionList(DEFAULT_CATEGORIES, 'Select category');
  if (collection) collection.innerHTML = optionList(state.collections.map((item) => item.name), 'Select collection');
  if (acquisition) acquisition.innerHTML = optionList(ACQUISITION_SOURCES, 'Select acquisition source');
  if (archiveCategory) archiveCategory.innerHTML = optionList(ARCHIVE_CATEGORIES, 'Select category');
  if (archiveFileType) archiveFileType.innerHTML = ARCHIVE_FILE_TYPES.map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`).join('');
  fillArticleTagSelect(selectedArticleTags());
  fillArchiveTagChecklist(selectedArchiveTags());
}

function fillTagChecklist() {
  const wrap = document.getElementById('tag-checklist');
  if (!wrap) return;
  wrap.innerHTML = state.tags.map((tag) => `
    <label class="check-pill">
      <input type="checkbox" name="tags" value="${tag.id}" />
      <span>${escapeHtml(tag.name)}</span>
    </label>
  `).join('');
}

function selectedTagIds() {
  return [...document.querySelectorAll('input[name="tags"]:checked')].map((input) => input.value);
}

function fillArchiveTagChecklist(selected = []) {
  const wrap = document.getElementById('archive-tag-checklist');
  if (!wrap) return;
  const selectedSet = new Set(normalizeTagValues(selected));
  const values = [...new Set([...state.tags.map((tag) => tag.name).filter(Boolean), ...DEFAULT_TAGS, ...selectedSet])].sort((a, b) => a.localeCompare(b));
  wrap.innerHTML = values.map((tag) => `
    <label class="check-pill">
      <input type="checkbox" name="archive-tags" value="${escapeHtml(tag)}"${selectedSet.has(tag) ? ' checked' : ''} />
      <span>${escapeHtml(tag)}</span>
    </label>
  `).join('');
}

function selectedArchiveTags() {
  return [...document.querySelectorAll('input[name="archive-tags"]:checked')].map((input) => input.value).filter(Boolean);
}

function createUploadId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  const randomPart = Math.random().toString(36).slice(2);
  return `${Date.now()}-${randomPart}`;
}

async function uploadFile(file, folder) {
  const client = requireClient();
  if (!CONFIG.imageBucket) throw new Error('Image upload failed. Storage bucket is not configured.');
  const { data: sessionData, error: sessionError } = await client.auth.getSession();
  if (sessionError) throw new Error(`Image upload failed: ${sessionError.message}`);
  if (!sessionData?.session && folder !== 'enquiries') throw new Error('Image upload failed: admin session not found. Please log in again.');
  const ext = file.name.split('.').pop();
  const path = `${folder}/${createUploadId()}.${ext}`;
  const { error } = await client.storage.from(CONFIG.imageBucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw new Error(`Image upload failed: ${error.message}`);
  return client.storage.from(CONFIG.imageBucket).getPublicUrl(path).data.publicUrl;
}

function archiveBucket() {
  return CONFIG.archiveBucket || 'digital-archive';
}

function archiveFileTypeFromFile(file) {
  const name = String(file?.name || '').toLowerCase();
  if (file?.type === 'application/pdf' || name.endsWith('.pdf')) return 'PDF';
  if (name.endsWith('.zip')) return 'ZIP';
  if (name.endsWith('.tif') || name.endsWith('.tiff')) return 'TIFF';
  if (name.endsWith('.webp')) return 'WEBP';
  if (name.endsWith('.png')) return 'PNG';
  if (name.endsWith('.jpg') || name.endsWith('.jpeg')) return 'JPG';
  return 'FILE';
}

function validateArchiveFile(file, thumbnail = false) {
  if (!file) return;
  if (file.size > ARCHIVE_MAX_FILE_SIZE) throw new Error('File too large. Digital Archive uploads are limited to 500 MB.');
  if (thumbnail && !String(file.type || '').startsWith('image/')) throw new Error('Unsupported thumbnail type. Please upload an image file.');
  if (!thumbnail && !ARCHIVE_ALLOWED_MIME_TYPES.has(file.type) && !/\.(pdf|jpe?g|png|webp|tiff?|zip)$/i.test(file.name)) {
    throw new Error('Unsupported file type. Use PDF, JPG, PNG, WEBP, TIFF or ZIP.');
  }
}

async function uploadArchiveStorageFile(file, folder) {
  validateArchiveFile(file, folder === 'thumbnails');
  const client = requireClient();
  const { data: sessionData, error: sessionError } = await client.auth.getSession();
  if (sessionError) throw new Error(`Upload failed: ${sessionError.message}`);
  if (!sessionData?.session) throw new Error('Upload failed: admin session not found. Please log in again.');
  const ext = file.name.split('.').pop();
  const path = `${folder}/${createUploadId()}.${ext}`;
  const { error } = await client.storage.from(archiveBucket()).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  const publicUrl = client.storage.from(archiveBucket()).getPublicUrl(path).data.publicUrl;
  return { url: publicUrl, path, name: file.name, size: file.size, type: archiveFileTypeFromFile(file) };
}

async function removeArchiveStoragePaths(paths = []) {
  const filtered = paths.filter(Boolean);
  if (!filtered.length) return;
  await requireClient().storage.from(archiveBucket()).remove(filtered);
}

async function uploadImagePayload() {
  const mainInput = document.getElementById('main-image');
  const galleryInput = document.getElementById('gallery-images');
  const currentMain = document.getElementById('current-main-image')?.value || '';
  const currentGallery = parseJsonArray(document.getElementById('current-gallery-images')?.value || '[]');
  const removeMain = document.getElementById('remove-main-image')?.checked || false;
  const replaceGallery = document.getElementById('replace-gallery-images')?.checked || false;
  const clearGallery = document.getElementById('clear-gallery-images')?.checked || false;
  let main_image_url = removeMain ? '' : currentMain;
  if (mainInput?.files?.[0]) main_image_url = await uploadFile(mainInput.files[0], 'main');
  const gallery = galleryInput?.files?.length
    ? await Promise.all([...galleryInput.files].map((file) => uploadFile(file, 'gallery')))
    : [];
  const retainedGallery = clearGallery || replaceGallery ? [] : currentGallery;
  return { main_image_url, galleryUrls: retainedGallery.concat(gallery) };
}

function itemPayload(main_image_url) {
  const payload = {
    title: document.getElementById('title').value.trim(),
    author: document.getElementById('author')?.value.trim() || '',
    edition: document.getElementById('edition')?.value.trim() || '',
    publisher: document.getElementById('publisher')?.value.trim() || '',
    publication_year: document.getElementById('publication-year')?.value.trim() || '',
    publication_place: document.getElementById('publication-place')?.value.trim() || '',
    category: document.getElementById('category').value,
    subcategory: document.getElementById('subcategory').value.trim(),
    year: document.getElementById('year').value.trim(),
    price: document.getElementById('price').value ? Number(document.getElementById('price').value) : null,
    catalogue_description: document.getElementById('catalogue-description').value.trim(),
    physical_details: document.getElementById('physical-details').value.trim(),
    beaumont_notes: document.getElementById('beaumont-notes').value.trim(),
    provenance: document.getElementById('provenance').value.trim(),
    condition: document.getElementById('condition').value.trim(),
    item_references: document.getElementById('references').value.trim(),
    collection_name: document.getElementById('collection-name').value,
    acquisition_source: document.getElementById('acquisition-source').value,
    featured: false,
    sold: document.getElementById('sold').checked,
    archive_reference: document.getElementById('archive-reference')?.checked || false,
    main_image_url,
  };
  if (state.itemBibliographicFieldsUnsupported) {
    ['author', 'edition', 'publisher', 'publication_year', 'publication_place'].forEach((field) => delete payload[field]);
  }
  return payload;
}

function isMissingBibliographicColumnError(error) {
  const message = String(error?.message || error?.details || '');
  return /author|edition|publisher|publication_year|publication_place/i.test(message)
    && /column|schema cache|could not find/i.test(message);
}

async function saveItemRow(client, itemId, main_image_url) {
  const payload = itemPayload(main_image_url);
  const request = itemId
    ? client.from('items').update(payload).eq('id', itemId).select('id').maybeSingle()
    : client.from('items').insert(payload).select('id').single();
  const { data, error } = await request;
  if (error && isMissingBibliographicColumnError(error) && !state.itemBibliographicFieldsUnsupported) {
    state.itemBibliographicFieldsUnsupported = true;
    setStatus('Bibliographic fields are waiting for the database migration. Saving existing fields only.', 'error');
    return saveItemRow(client, itemId, main_image_url);
  }
  if (error) throw error;
  return data;
}

async function saveItem(event) {
  event.preventDefault();
  const client = requireClient();
  setStatus('Saving object...');
  try {
    if (!document.getElementById('title').value.trim() || !document.getElementById('category').value || !document.getElementById('catalogue-description').value.trim()) {
      throw new Error('Missing required field. Title, category and catalogue description are required.');
    }
    const { main_image_url, galleryUrls } = await uploadImagePayload();
    let itemId = state.editingItemId;
    if (itemId) {
      const data = await saveItemRow(client, itemId, main_image_url);
      if (!data) throw new Error('Object could not be updated because it no longer exists in the database.');
      let relationError;
      ({ error: relationError } = await client.from('item_images').delete().eq('item_id', itemId));
      if (relationError) throw relationError;
      ({ error: relationError } = await client.from('item_tags').delete().eq('item_id', itemId));
      if (relationError) throw relationError;
    } else {
      const data = await saveItemRow(client, null, main_image_url);
      itemId = data.id;
    }
    if (galleryUrls.length) {
      const { error } = await client.from('item_images').insert(galleryUrls.map((image_url) => ({ item_id: itemId, image_url })));
      if (error) throw error;
    }
    const tags = selectedTagIds();
    if (tags.length) {
      const { error } = await client.from('item_tags').insert(tags.map((tag_id) => ({ item_id: itemId, tag_id })));
      if (error) throw error;
    }
    resetItemForm();
    await loadItems();
    renderInventory();
    renderSoldItems();
    renderAdminCounts();
    setStatus('Item saved successfully.', 'success');
  } catch (error) {
    setStatus(error.message, 'error');
  }
}

function resetItemForm() {
  state.editingItemId = null;
  document.getElementById('item-form')?.reset();
  document.getElementById('current-main-image').value = '';
  document.getElementById('current-gallery-images').value = '[]';
  if (document.getElementById('remove-main-image')) document.getElementById('remove-main-image').checked = false;
  if (document.getElementById('replace-gallery-images')) document.getElementById('replace-gallery-images').checked = false;
  if (document.getElementById('clear-gallery-images')) document.getElementById('clear-gallery-images').checked = false;
  if (document.getElementById('archive-reference')) document.getElementById('archive-reference').checked = false;
  document.getElementById('item-submit-label').textContent = 'Add Object';
  document.getElementById('cancel-edit')?.classList.add('hidden');
  document.querySelectorAll('input[name="tags"]').forEach((input) => { input.checked = false; });
}

function renderInventory() {
  const container = document.getElementById('items-container');
  if (!container) return;
  const query = (document.getElementById('inventory-search')?.value || '').toLowerCase().trim();
  const items = query ? state.items.filter((item) => itemSearchText(item).includes(query)) : state.items;
  container.innerHTML = items.length ? items.map((item) => `
    <article class="admin-row admin-row--inventory">
      <div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.reference_number)} · ${escapeHtml(item.category)}</span></div>
      <div>${formatPrice(item.price)}</div>
      <div><span class="status-pill">${item.archive_reference ? 'Archived' : item.sold ? 'Sold' : 'Available'}</span></div>
      <div class="admin-row__actions">
        <button type="button" class="button button--secondary" data-edit-item="${item.id}">Edit</button>
        <button type="button" class="button button--ghost" data-toggle-sold="${item.id}">${item.sold ? 'Mark Available' : 'Mark Sold'}</button>
        <button type="button" class="button button--ghost" data-toggle-archive="${item.id}">${item.archive_reference ? 'Unarchive' : 'Archive'}</button>
        <button type="button" class="button button--danger" data-delete-item="${item.id}">Delete</button>
      </div>
    </article>
  `).join('') : '<p class="admin-empty">No objects found.</p>';
}

function renderSoldItems() {
  const container = document.getElementById('sold-container');
  if (!container) return;
  const sold = state.items.filter((item) => item.sold);
  container.innerHTML = sold.length ? sold.map((item) => `
    <article class="admin-row">
      <div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.reference_number)}</span></div>
      <div>${formatPrice(item.price)}</div>
      <div><span class="status-pill">Sold</span></div>
      <div>${escapeHtml(item.collection_name || '')}</div>
      <div class="admin-row__actions">
        <button type="button" class="button button--secondary" data-edit-item="${item.id}">Edit</button>
        <button type="button" class="button button--ghost" data-toggle-sold="${item.id}">Mark Available</button>
      </div>
    </article>
  `).join('') : '<p class="admin-empty">No sold objects recorded.</p>';
}

function populateItemForm(item) {
  showAdminSection('items');
  state.editingItemId = item.id;
  document.getElementById('title').value = item.title || '';
  document.getElementById('author').value = item.author || '';
  document.getElementById('edition').value = item.edition || '';
  document.getElementById('publisher').value = item.publisher || '';
  document.getElementById('publication-year').value = item.publication_year || '';
  document.getElementById('publication-place').value = item.publication_place || '';
  document.getElementById('category').value = item.category || '';
  document.getElementById('subcategory').value = item.subcategory || '';
  document.getElementById('year').value = item.year || '';
  document.getElementById('price').value = item.price || '';
  document.getElementById('catalogue-description').value = catalogueDescription(item);
  document.getElementById('physical-details').value = item.physical_details || '';
  document.getElementById('beaumont-notes').value = item.beaumont_notes || '';
  document.getElementById('provenance').value = item.provenance || '';
  document.getElementById('condition').value = item.condition || '';
  document.getElementById('references').value = item.item_references || '';
  document.getElementById('collection-name').value = item.collection_name || '';
  document.getElementById('acquisition-source').value = item.acquisition_source || '';
  document.getElementById('sold').checked = Boolean(item.sold);
  document.getElementById('archive-reference').checked = Boolean(item.archive_reference);
  document.getElementById('current-main-image').value = item.main_image_url || '';
  document.getElementById('current-gallery-images').value = JSON.stringify(itemImages(item));
  if (document.getElementById('remove-main-image')) document.getElementById('remove-main-image').checked = false;
  if (document.getElementById('replace-gallery-images')) document.getElementById('replace-gallery-images').checked = false;
  if (document.getElementById('clear-gallery-images')) document.getElementById('clear-gallery-images').checked = false;
  const tagIds = (item.item_tags || []).map((entry) => entry.tag_id);
  document.querySelectorAll('input[name="tags"]').forEach((input) => { input.checked = tagIds.includes(input.value); });
  document.getElementById('item-submit-label').textContent = 'Update Object';
  document.getElementById('cancel-edit')?.classList.remove('hidden');
  document.getElementById('item-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function updateItem(id, payload) {
  const { data, error } = await requireClient().from('items').update(payload).eq('id', id).select('id').maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('Object could not be updated because it was not found in the database.');
  await loadItems();
  renderInventory();
  renderSoldItems();
  renderAdminCounts();
  setStatus('Item updated successfully.', 'success');
}

async function deleteItem(id) {
  if (!window.confirm('Delete this object permanently?')) return;
  const { data, error } = await requireClient().from('items').delete().eq('id', id).select('id').maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('Object could not be deleted because it was not found in the database.');
  await loadItems();
  renderInventory();
  renderSoldItems();
  renderAdminCounts();
  setStatus('Item deleted successfully.', 'success');
}

function renderTagManager() {
  const container = document.getElementById('tags-container');
  if (!container) return;
  container.innerHTML = state.tags.map((tag) => `
    <article class="tag-row">
      <span>${escapeHtml(tag.name)}</span>
      <div>
        <button type="button" class="button button--secondary" data-edit-tag="${tag.id}">Edit</button>
        <button type="button" class="button button--danger" data-delete-tag="${tag.id}">Delete</button>
      </div>
    </article>
  `).join('');
}

function renderCollectionManager() {
  const container = document.getElementById('collections-container');
  if (!container) return;
  container.innerHTML = state.collections.map((collection) => `
    <article class="tag-row">
      <span>${escapeHtml(collection.name)}</span>
      <div>
        <button type="button" class="button button--secondary" data-edit-collection="${collection.id}">Edit</button>
        <button type="button" class="button button--danger" data-delete-collection="${collection.id}">Delete</button>
      </div>
    </article>
  `).join('');
}

async function loadArticles(includeUnpublished = false) {
  const client = getClient();
  if (!client) return SAMPLE_ARTICLES;
  let query = client.from('journal_articles').select('*').order('article_date', { ascending: false });
  if (!includeUnpublished) query = query.eq('published', true);
  const { data, error } = await query;
  if (error) {
    state.articles = SAMPLE_ARTICLES;
    return state.articles;
  }
  state.articles = data && data.length ? data : SAMPLE_ARTICLES;
  return state.articles;
}

async function loadArchiveItems(includeUnpublished = false) {
  const client = getClient();
  if (!client) return [];
  let query = client
    .from('digital_archive_items')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (!includeUnpublished) query = query.eq('is_published', true);
  const { data, error } = await query;
  if (error) throw error;
  state.archiveItems = data || [];
  return state.archiveItems;
}

function archiveTags(item) {
  return Array.isArray(item.tags) ? item.tags.map((tag) => String(tag || '').trim()).filter(Boolean) : normalizeTagValues(item.tags);
}

function archiveDescription(item) {
  return cleanText(item.short_description) || plainTextExcerpt(item.description, 190);
}

function archiveFileType(item) {
  return cleanText(item.file_type).toUpperCase() || 'FILE';
}

function formatFileSize(bytes) {
  const size = Number(bytes || 0);
  if (!size) return '';
  if (size >= 1024 * 1024 * 1024) return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  if (size >= 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  if (size >= 1024) return `${Math.round(size / 1024)} KB`;
  return `${size} B`;
}

function archivePublicUrl(item) {
  return cleanText(item.file_url);
}

function archiveDownloadAttributes(item) {
  if (!item.allow_download || !archivePublicUrl(item)) return ' aria-disabled="true" tabindex="-1"';
  return ` href="${escapeHtml(archivePublicUrl(item))}" download="${escapeHtml(item.file_name || item.title || 'digital-archive-file')}"`;
}

function archiveSearchText(item) {
  return [
    item.title,
    item.description,
    item.short_description,
    item.author_creator,
    item.publisher_source,
    item.category,
    item.sub_category,
    item.date_year,
    archiveFileType(item),
    ...archiveTags(item),
  ].join(' ').toLowerCase();
}

function archiveFilterOptions() {
  const categories = [...new Set([...ARCHIVE_CATEGORIES, ...state.archiveItems.map((item) => item.category).filter(Boolean)])];
  const dates = [...new Set(state.archiveItems.map((item) => item.date_year).filter(Boolean))].sort((a, b) => String(b).localeCompare(String(a)));
  const tags = [...new Set(state.archiveItems.flatMap(archiveTags))].sort((a, b) => a.localeCompare(b));
  const fileTypes = [...new Set([...ARCHIVE_FILE_TYPES, ...state.archiveItems.map(archiveFileType).filter(Boolean)])];
  return { categories, dates, tags, fileTypes };
}

function renderArchiveFilters() {
  const category = document.getElementById('archive-filter-category');
  const date = document.getElementById('archive-filter-date');
  const tag = document.getElementById('archive-filter-tag');
  const fileType = document.getElementById('archive-filter-file-type');
  const options = archiveFilterOptions();
  if (category) category.innerHTML = optionList(options.categories, 'All categories');
  if (date) date.innerHTML = optionList(options.dates, 'All dates');
  if (tag) tag.innerHTML = optionList(options.tags, 'All tags');
  if (fileType) fileType.innerHTML = optionList(options.fileTypes, 'All file types');
}

function filteredArchiveItems() {
  const query = (document.getElementById('archive-search')?.value || '').toLowerCase().trim();
  const category = document.getElementById('archive-filter-category')?.value || '';
  const date = document.getElementById('archive-filter-date')?.value || '';
  const tag = document.getElementById('archive-filter-tag')?.value || '';
  const fileType = document.getElementById('archive-filter-file-type')?.value || '';
  const sort = document.getElementById('archive-sort')?.value || 'featured';
  const items = state.archiveItems.filter((item) => (
    (!query || archiveSearchText(item).includes(query)) &&
    (!category || item.category === category) &&
    (!date || item.date_year === date) &&
    (!tag || archiveTags(item).includes(tag)) &&
    (!fileType || archiveFileType(item) === fileType)
  ));
  return items.sort((a, b) => {
    if (sort === 'title') return String(a.title || '').localeCompare(String(b.title || ''));
    if (sort === 'date') return String(b.date_year || '').localeCompare(String(a.date_year || ''));
    if (sort === 'newest') return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    const featuredDiff = Number(Boolean(b.is_featured)) - Number(Boolean(a.is_featured));
    if (featuredDiff) return featuredDiff;
    const orderDiff = Number(a.sort_order || 0) - Number(b.sort_order || 0);
    return orderDiff || new Date(b.created_at || 0) - new Date(a.created_at || 0);
  });
}

function archivePlaceholder(className = '') {
  return `
    <div class="beaumont-image-placeholder archive-placeholder ${className}">
      <span>DIGITAL ARCHIVE</span>
      <strong>BEAUMONT</strong>
      <small>Research Library</small>
    </div>
  `;
}

function archiveCard(item) {
  const thumbnail = cleanText(item.thumbnail_url);
  const description = archiveDescription(item);
  const tags = archiveTags(item).slice(0, 4);
  const fileUrl = archivePublicUrl(item);
  return `
    <article class="archive-card catalogue-item">
      <a class="archive-card__media catalogue-item__image${thumbnail ? '' : ' catalogue-item__image--empty'}" href="${archiveItemUrl(item)}">
        ${thumbnail ? `<img src="${escapeHtml(thumbnail)}" alt="${escapeHtml(item.title)} thumbnail" loading="lazy" onerror="this.remove();" />` : archivePlaceholder()}
        <span class="archive-file-badge">${escapeHtml(archiveFileType(item))}</span>
      </a>
      <div class="archive-card__content catalogue-item__content">
        <div class="catalogue-item__title">${escapeHtml(item.title)}</div>
        <div class="catalogue-item__meta">${escapeHtml([item.category, item.sub_category, item.date_year].filter(Boolean).join(' · '))}</div>
        ${description ? `<p class="catalogue-item__desc">${escapeHtml(description)}</p>` : ''}
        ${tags.length ? `<div class="archive-tag-list">${tags.map((tagName) => `<span>${escapeHtml(tagName)}</span>`).join('')}</div>` : ''}
        <div class="archive-card__actions">
          <a class="button--enquire" href="${archiveItemUrl(item)}">View</a>
          ${fileUrl && item.allow_download ? `<a class="button--enquire button--archive-secondary" href="${escapeHtml(fileUrl)}" download="${escapeHtml(item.file_name || item.title || 'digital-archive-file')}">Download</a>` : ''}
        </div>
      </div>
    </article>
  `;
}

function renderArchiveItems(resetPage = true) {
  const grid = document.getElementById('archive-grid');
  const count = document.getElementById('archive-count');
  const loadMore = document.getElementById('archive-load-more');
  if (!grid) return;
  if (resetPage) state.archivePage = 1;
  const items = filteredArchiveItems();
  const visible = items.slice(0, state.archivePage * ARCHIVE_PAGE_SIZE);
  if (count) count.textContent = `${items.length} archive item${items.length === 1 ? '' : 's'}`;
  grid.innerHTML = visible.length
    ? visible.map(archiveCard).join('')
    : '<div class="catalogue-empty" style="grid-column:1/-1;"><p>The Digital Archive is currently being prepared. Selected digitised material will be added for research and reference.</p></div>';
  if (loadMore) {
    loadMore.classList.toggle('hidden', visible.length >= items.length);
    loadMore.textContent = `Load More (${Math.max(0, items.length - visible.length)} remaining)`;
  }
}

async function initDigitalArchivePage() {
  const grid = document.getElementById('archive-grid');
  if (!grid) return;
  try {
    if (!getClient()) throw new Error(supabaseRequiredMessage());
    await loadArchiveItems(false);
    renderArchiveFilters();
    renderArchiveItems(true);
    document.querySelectorAll('[data-archive-filter]').forEach((field) => {
      field.addEventListener('input', () => renderArchiveItems(true));
      field.addEventListener('change', () => renderArchiveItems(true));
    });
    document.getElementById('archive-clear-filters')?.addEventListener('click', () => {
      document.querySelectorAll('[data-archive-filter]').forEach((field) => {
        field.value = field.id === 'archive-sort' ? 'featured' : '';
      });
      renderArchiveItems(true);
    });
    document.getElementById('archive-load-more')?.addEventListener('click', () => {
      state.archivePage += 1;
      renderArchiveItems(false);
    });
  } catch (error) {
    state.archiveItems = [];
    renderArchiveFilters();
    grid.innerHTML = '<div class="catalogue-empty" style="grid-column:1/-1;"><p>The Digital Archive is currently being prepared. Selected digitised material will be added for research and reference.</p></div>';
    const count = document.getElementById('archive-count');
    if (count) count.textContent = '0 archive items';
  }
}

function archiveDetailRow(label, value) {
  return value ? `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>` : '';
}

function renderArchiveDetail(item) {
  const detail = document.getElementById('archive-detail');
  if (!detail) return;
  const fileUrl = archivePublicUrl(item);
  const thumbnail = cleanText(item.thumbnail_url);
  const pageUrl = archiveItemUrl(item);
  applySeo({
    title: item.title,
    description: plainTextExcerpt(archiveDescription(item), 170),
    url: pageUrl,
    image: thumbnail || DEFAULT_SHARE_IMAGE,
    type: 'article',
    schema: [
      archiveSchema(item),
      breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Digital Archive', url: '/digital-archive.html' },
        { name: item.title, url: pageUrl },
      ]),
    ],
  });
  const related = state.archiveItems
    .filter((entry) => entry.id !== item.id && (entry.category === item.category || archiveTags(entry).some((tag) => archiveTags(item).includes(tag))))
    .slice(0, 3);
  detail.innerHTML = `
    <a class="catalogue-back" href="/digital-archive.html">Back to Digital Archive</a>
    <article class="item-detail archive-detail">
      <div class="item-detail__media">
        <div class="item-detail__viewer">
          <div class="item-detail__main archive-detail__media">
            ${thumbnail ? `<img src="${escapeHtml(thumbnail)}" alt="${escapeHtml(item.title)} thumbnail" />` : archivePlaceholder('beaumont-image-placeholder--large')}
            <span class="archive-file-badge">${escapeHtml(archiveFileType(item))}</span>
          </div>
        </div>
      </div>
      <div class="item-detail__content">
        <p class="eyebrow">Digital Archive</p>
        <h2>${escapeHtml(item.title)}</h2>
        <div class="item-detail__summary">
          <p class="item-detail__meta">${escapeHtml([item.category, item.sub_category, item.date_year].filter(Boolean).join(' · '))}</p>
        </div>
        <div class="item-detail__sections">
          <section class="item-detail__section">
            <h3>Archive Description</h3>
            ${item.description ? markdownToHtml(item.description) : '<p>Description pending.</p>'}
          </section>
          <section class="item-detail__section">
            <h3>File Details</h3>
            ${archiveDetailRow('Author / Creator', item.author_creator)}
            ${archiveDetailRow('Publisher / Source', item.publisher_source)}
            ${archiveDetailRow('File Type', archiveFileType(item))}
            ${archiveDetailRow('File Name', item.file_name)}
            ${archiveDetailRow('File Size', formatFileSize(item.file_size))}
            ${archiveTags(item).length ? `<p><strong>Tags:</strong> ${archiveTags(item).map(escapeHtml).join(', ')}</p>` : ''}
          </section>
        </div>
        <div class="archive-detail__actions">
          ${fileUrl ? `<a class="button button--primary" href="${escapeHtml(fileUrl)}" target="_blank" rel="noopener">View ${escapeHtml(archiveFileType(item))}</a>` : ''}
          ${fileUrl && item.allow_download ? `<a class="button button--secondary" ${archiveDownloadAttributes(item)}>Download ${escapeHtml(archiveFileType(item))}</a>` : ''}
        </div>
      </div>
    </article>
    ${related.length ? `
      <section class="archive-related">
        <h2>Related Archive Items</h2>
        <div class="archive-grid catalogue-grid">${related.map(archiveCard).join('')}</div>
      </section>
    ` : ''}
  `;
}

async function initDigitalArchiveDetailPage() {
  const detail = document.getElementById('archive-detail');
  if (!detail) return;
  try {
    if (!getClient()) throw new Error(supabaseRequiredMessage());
    await loadArchiveItems(false);
    const id = new URLSearchParams(window.location.search).get('id') || window.BEAUMONT_ROUTE_ID;
    const itemSlug = routeSlug('pdf-vault');
    const item = state.archiveItems.find((entry) => sameRecordId(entry.id, id) || slugify(entry.title || entry.id) === itemSlug);
    if (!item) {
      detail.innerHTML = '<div class="catalogue-empty"><p>This Digital Archive item is not currently available.</p></div>';
      return;
    }
    renderArchiveDetail(item);
  } catch (error) {
    detail.innerHTML = '<div class="catalogue-empty"><p>This Digital Archive item is not currently available.</p></div>';
  }
}

async function loadEnquiries() {
  const client = getClient();
  if (!client) return [];
  const { data, error } = await client.from('enquiries').select('*').order('created_at', { ascending: false }).limit(50);
  if (error) throw error;
  state.enquiries = data || [];
  return state.enquiries;
}

function formatArticleDate(value) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ''));
}

function markdownInline(value = '') {
  let html = escapeHtml(value);
  html = html.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/g, '<img src="$2" alt="$1" loading="lazy" />');
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  html = html.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  html = html.replace(/(^|[^_])_([^_\n]+)_/g, '$1<em>$2</em>');
  return html;
}

function renderMarkdownTable(lines) {
  const rows = lines.map((line) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim()));
  const header = rows[0] || [];
  const body = rows.slice(2);
  return `
    <div class="journal-table-wrap">
      <table>
        <thead><tr>${header.map((cell) => `<th>${markdownInline(cell)}</th>`).join('')}</tr></thead>
        <tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${markdownInline(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    </div>
  `;
}

function markdownToBlocks(markdown = '') {
  const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    let line = lines[i].trim();
    if (!line) {
      i += 1;
      continue;
    }

    if (/^---+$/.test(line)) {
      blocks.push({ type: 'rule', html: '<hr />' });
      i += 1;
      continue;
    }

    if (/^#{1,3}\s+/.test(line)) {
      const level = line.match(/^#+/)[0].length;
      blocks.push({ type: 'heading', html: `<h${level}>${markdownInline(line.replace(/^#{1,3}\s+/, ''))}</h${level}>` });
      i += 1;
      continue;
    }

    if (/^!\[[^\]]*\]\([^)]+\)/.test(line)) {
      const imageHtml = markdownInline(line);
      const next = (lines[i + 1] || '').trim();
      const caption = /^\*[^*].*\*$/.test(next) ? next.replace(/^\*|\*$/g, '') : '';
      blocks.push({ type: 'figure', html: `<figure>${imageHtml}${caption ? `<figcaption>${markdownInline(caption)}</figcaption>` : ''}</figure>` });
      i += caption ? 2 : 1;
      continue;
    }

    if (line.includes('|') && (lines[i + 1] || '').trim().match(/^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/)) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().includes('|')) {
        tableLines.push(lines[i]);
        i += 1;
      }
      blocks.push({ type: 'table', html: renderMarkdownTable(tableLines) });
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines = [];
      while (i < lines.length && /^>\s?/.test(lines[i].trim())) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i += 1;
      }
      const quoteText = quoteLines.join(' ');
      const isPull = /^pull quote:/i.test(quoteText);
      blocks.push({ type: 'quote', html: `<blockquote${isPull ? ' class="journal-pull-quote"' : ''}>${markdownInline(quoteText.replace(/^pull quote:\s*/i, ''))}</blockquote>` });
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(`<li>${markdownInline(lines[i].trim().replace(/^[-*]\s+/, ''))}</li>`);
        i += 1;
      }
      blocks.push({ type: 'list', html: `<ul>${items.join('')}</ul>` });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(`<li>${markdownInline(lines[i].trim().replace(/^\d+\.\s+/, ''))}</li>`);
        i += 1;
      }
      blocks.push({ type: 'list', html: `<ol>${items.join('')}</ol>` });
      continue;
    }

    const paragraph = [];
    while (i < lines.length && lines[i].trim() && !/^#{1,3}\s+/.test(lines[i].trim()) && !/^[-*]\s+/.test(lines[i].trim()) && !/^\d+\.\s+/.test(lines[i].trim()) && !/^>\s?/.test(lines[i].trim()) && !/^---+$/.test(lines[i].trim())) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    blocks.push({ type: 'paragraph', html: `<p>${markdownInline(paragraph.join(' '))}</p>`, text: paragraph.join(' ') });
  }

  return blocks;
}

function markdownToHtml(markdown = '') {
  return markdownToBlocks(markdown).map((block) => block.html).join('');
}

function additionalArticleImageHtml(url, article, index) {
  return `
    <figure class="journal-detail__inline-image">
      <img src="${escapeHtml(url)}" alt="${escapeHtml(article.title)} additional image ${index + 1}" loading="lazy" onerror="this.closest('figure').remove();" />
    </figure>
  `;
}

function calculateArticleImageInsertionPoints(paragraphIndexes, imageCount) {
  const placements = [];
  const usableCount = Math.min(paragraphIndexes.length, imageCount);
  for (let i = 0; i < usableCount; i += 1) {
    const paragraphPosition = Math.ceil(((i + 1) * paragraphIndexes.length) / usableCount) - 1;
    const paragraphIndex = paragraphIndexes[Math.max(0, Math.min(paragraphIndexes.length - 1, paragraphPosition))];
    if (!placements.includes(paragraphIndex)) placements.push(paragraphIndex);
  }
  return placements;
}

function renderArticleContentWithImages(content = '', images = [], article = {}) {
  const blocks = markdownToBlocks(content);
  const imageUrls = normalizeArticleImages(images);
  if (!imageUrls.length) return blocks.map((block) => block.html).join('');

  const paragraphIndexes = blocks
    .map((block, index) => ({ block, index }))
    .filter(({ block }) => block.type === 'paragraph' && cleanText(block.text).replace(/\s+/g, ' ').length >= 40)
    .map(({ index }) => index);
  if (!paragraphIndexes.length) return blocks.map((block) => block.html).join('');

  const insertionPoints = calculateArticleImageInsertionPoints(paragraphIndexes, imageUrls.length);
  let imageIndex = 0;
  return blocks.map((block, index) => {
    const html = [block.html];
    if (insertionPoints.includes(index) && imageIndex < imageUrls.length) {
      html.push(additionalArticleImageHtml(imageUrls[imageIndex], article, imageIndex));
      imageIndex += 1;
    }
    return html.join('');
  }).join('');
}

function renderArticleCard(article, showImage = false) {
  const meta = [article.category || 'Journal', formatArticleDate(article.article_date)].filter(Boolean).map(escapeHtml).join(' &bull; ');
  const image = cleanText(article.featured_image_url);
  return `
    <article class="journal-entry">
      ${showImage ? `
        <a class="journal-entry__media" data-image-frame href="${articleUrl(article)}" aria-label="Read ${escapeHtml(article.title)}">
          ${cataloguePlaceholder()}
          ${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(article.title)}" onerror="this.remove();" />` : ''}
        </a>
      ` : ''}
      <p class="journal-entry__meta">${meta}</p>
      <h3><a href="${articleUrl(article)}">${escapeHtml(article.title)}</a></h3>
      <p class="journal-entry__summary">${escapeHtml(article.summary || '')}</p>
      <a class="journal-entry__link" href="${articleUrl(article)}">Read Article &rarr;</a>
    </article>
  `;
}

function renderArticleDetail(article) {
  const list = document.getElementById('journal-list');
  if (!list) return;
  document.querySelector('.journal-editorial-header')?.classList.add('hidden');
  const meta = [article.category || 'Journal', formatArticleDate(article.article_date)].filter(Boolean).map(escapeHtml).join(' &bull; ');
  const image = cleanText(article.featured_image_url);
  const pageUrl = articleUrl(article);
  applySeo({
    title: article.title,
    description: plainTextExcerpt(article.summary || article.content, 170),
    url: pageUrl,
    image: image || DEFAULT_SHARE_IMAGE,
    type: 'article',
    schema: [
      articleSchema(article),
      breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Journal', url: '/journal.html' },
        { name: article.title, url: pageUrl },
      ]),
    ],
  });
  const articleContent = renderArticleContentWithImages(article.content || '', article.additional_image_urls || [], article);
  const related = state.articles
    .filter((entry) => String(entry.id) !== String(article.id))
    .sort((a, b) => {
      const categoryA = a.category === article.category ? 0 : 1;
      const categoryB = b.category === article.category ? 0 : 1;
      if (categoryA !== categoryB) return categoryA - categoryB;
      return new Date(b.article_date || 0) - new Date(a.article_date || 0);
    })
    .slice(0, 3);
  list.innerHTML = `
    <article class="journal-detail">
      <p class="journal-detail__label">Journal</p>
      <p class="journal-detail__meta">${meta}</p>
      <h1>${escapeHtml(article.title)}</h1>
      <p class="journal-detail__byline">By Beaumont</p>
      <div class="journal-detail__media" data-image-frame>
        ${cataloguePlaceholder('beaumont-image-placeholder--large')}
        ${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(article.title)}" onerror="this.remove();" />` : ''}
      </div>
      <div class="journal-detail__rule"></div>
      <div class="journal-detail__content">${articleContent}</div>
      ${related.length ? `
        <section class="journal-related" aria-label="Related articles">
          <h2>Related Articles</h2>
          ${related.map((entry) => `
            <a class="journal-related__link" href="${articleUrl(entry)}">
              <span>${escapeHtml(entry.category || 'Journal')} &bull; ${escapeHtml(formatArticleDate(entry.article_date))}</span>
              ${escapeHtml(entry.title)}
            </a>
          `).join('')}
        </section>
      ` : ''}
      <a class="journal-entry__link journal-detail__back" href="/journal.html">&larr; Back to Journal</a>
    </article>
  `;
}

async function initJournalPage() {
  const list = document.getElementById('journal-list');
  if (!list) return;
  await loadArticles(false);
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get('article') || window.BEAUMONT_ROUTE_ID;
  const articleSlug = routeSlug('articles');
  if (articleId || articleSlug) {
    const article = state.articles.find((entry) => String(entry.id) === articleId || slugify(entry.title || entry.id) === articleSlug)
      || SAMPLE_ARTICLES.find((entry) => entry.id === articleId || slugify(entry.title || entry.id) === articleSlug);
    if (article) renderArticleDetail(article);
    return;
  }
  document.querySelector('.journal-editorial-header')?.classList.remove('hidden');
  list.innerHTML = state.articles.map((article) => renderArticleCard(article, false)).join('');
}

async function initHomepageJournal() {
  const grid = document.getElementById('homepage-journal');
  if (!grid) return;
  await loadArticles(false);
  grid.innerHTML = state.articles.slice(0, 3).map((article) => renderArticleCard(article, true)).join('');
}

function normalizeArticleImages(images) {
  return Array.isArray(images) ? images.map((url) => cleanText(url)).filter(Boolean).slice(0, 5) : [];
}

function setArticleAdditionalImages(images = []) {
  state.articleAdditionalImages = normalizeArticleImages(images).map((url) => ({ url }));
  const hidden = document.getElementById('current-article-additional-images');
  if (hidden) hidden.value = JSON.stringify(normalizeArticleImages(images));
  renderArticleAdditionalImagePreview();
}

function renderArticleAdditionalImagePreview() {
  const preview = document.getElementById('article-additional-image-preview');
  if (!preview) return;
  preview.innerHTML = state.articleAdditionalImages.length ? state.articleAdditionalImages.map((image, index) => `
    <article class="article-image-preview" draggable="true" data-article-image-index="${index}">
      <img src="${escapeHtml(image.preview || image.url)}" alt="Additional article image ${index + 1}" />
      <div class="admin-row__actions">
        <button class="button button--ghost" type="button" data-move-article-image="${index}" data-direction="-1" ${index === 0 ? 'disabled' : ''}>Up</button>
        <button class="button button--ghost" type="button" data-move-article-image="${index}" data-direction="1" ${index === state.articleAdditionalImages.length - 1 ? 'disabled' : ''}>Down</button>
        <button class="button button--danger" type="button" data-remove-article-image="${index}">Remove</button>
      </div>
    </article>
  `).join('') : '<p class="admin-empty">No additional article images selected.</p>';
}

function addArticleAdditionalFiles(files) {
  const available = Math.max(0, 5 - state.articleAdditionalImages.length);
  const selected = [...files].slice(0, available);
  selected.forEach((file) => {
    state.articleAdditionalImages.push({ file, preview: URL.createObjectURL(file) });
  });
  if (files.length > available) setStatus('Only 5 additional article images can be added.', 'error');
  renderArticleAdditionalImagePreview();
}

function removeArticleAdditionalImage(index) {
  const [removed] = state.articleAdditionalImages.splice(index, 1);
  if (removed?.preview) URL.revokeObjectURL(removed.preview);
  renderArticleAdditionalImagePreview();
}

function moveArticleAdditionalImage(fromIndex, direction) {
  const toIndex = fromIndex + direction;
  if (toIndex < 0 || toIndex >= state.articleAdditionalImages.length) return;
  const [image] = state.articleAdditionalImages.splice(fromIndex, 1);
  state.articleAdditionalImages.splice(toIndex, 0, image);
  renderArticleAdditionalImagePreview();
}

function reorderArticleAdditionalImage(fromIndex, toIndex) {
  if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= state.articleAdditionalImages.length || toIndex >= state.articleAdditionalImages.length) return;
  const [image] = state.articleAdditionalImages.splice(fromIndex, 1);
  state.articleAdditionalImages.splice(toIndex, 0, image);
  renderArticleAdditionalImagePreview();
}

async function uploadArticleAdditionalImagesPayload() {
  const urls = [];
  for (const image of state.articleAdditionalImages.slice(0, 5)) {
    if (image.file) urls.push(await uploadFile(image.file, 'journal'));
    else if (image.url) urls.push(image.url);
  }
  return urls;
}

async function uploadArticleImagePayload() {
  const input = document.getElementById('article-image');
  const current = document.getElementById('current-article-image')?.value || '';
  const remove = document.getElementById('remove-article-image')?.checked || false;
  if (remove) return '';
  if (input?.files?.[0]) return uploadFile(input.files[0], 'journal');
  return current;
}

function articlePayload(featured_image_url, additional_image_urls = []) {
  return {
    title: document.getElementById('article-title').value.trim(),
    category: document.getElementById('article-category').value.trim(),
    article_date: document.getElementById('article-date').value || new Date().toISOString().slice(0, 10),
    featured_image_url,
    additional_image_urls,
    summary: document.getElementById('article-summary').value.trim(),
    content: document.getElementById('article-content').value.trim(),
    tags: selectedArticleTags(),
    featured: document.getElementById('article-featured').checked,
    published: document.getElementById('article-published').checked,
  };
}

function resetArticleForm() {
  const form = document.getElementById('article-form');
  if (!form) return;
  form.reset();
  document.getElementById('article-id').value = '';
  if (document.getElementById('current-article-image')) document.getElementById('current-article-image').value = '';
  setArticleAdditionalImages([]);
  if (document.getElementById('remove-article-image')) document.getElementById('remove-article-image').checked = false;
  if (document.getElementById('article-additional-images')) document.getElementById('article-additional-images').value = '';
  fillArticleTagSelect([]);
  setArticleEditorContent('');
  document.getElementById('article-submit-label').textContent = 'Create Article';
}

async function loadTiptapModules() {
  const [
    core,
    starterKit,
    link,
    image,
    table,
    markdown,
  ] = await Promise.all([
    import('https://esm.sh/@tiptap/core@3.25.0'),
    import('https://esm.sh/@tiptap/starter-kit@3.25.0'),
    import('https://esm.sh/@tiptap/extension-link@3.25.0'),
    import('https://esm.sh/@tiptap/extension-image@3.25.0'),
    import('https://esm.sh/@tiptap/extension-table@3.25.0'),
    import('https://esm.sh/@tiptap/markdown@3.25.0'),
  ]);
  return {
    Editor: core.Editor,
    StarterKit: starterKit.default || starterKit.StarterKit,
    Link: link.default || link.Link,
    Image: image.default || image.Image,
    TableKit: table.TableKit || table.default,
    Markdown: markdown.Markdown,
  };
}

function syncArticleEditorToTextarea() {
  const textarea = document.getElementById('article-content');
  if (!textarea || !state.articleEditor) return;
  textarea.value = typeof state.articleEditor.getMarkdown === 'function'
    ? state.articleEditor.getMarkdown()
    : textarea.value;
}

function setArticleEditorContent(markdown) {
  const textarea = document.getElementById('article-content');
  if (textarea) textarea.value = markdown || '';
  if (!state.articleEditor) return;
  try {
    state.articleEditor.commands.setContent(markdown || '', { contentType: 'markdown' });
  } catch (error) {
    state.articleEditor.commands.setContent(markdownToHtml(markdown || ''));
  }
}

function insertArticleMarkdown(markdown) {
  if (!state.articleEditor) return;
  try {
    state.articleEditor.commands.insertContent(markdown, { contentType: 'markdown' });
  } catch (error) {
    state.articleEditor.commands.insertContent(markdownToHtml(markdown));
  }
  syncArticleEditorToTextarea();
}

function runArticleEditorAction(action) {
  const editor = state.articleEditor;
  if (!editor) return;
  if (action === 'bold') editor.chain().focus().toggleBold().run();
  if (action === 'italic') editor.chain().focus().toggleItalic().run();
  if (action === 'heading2') editor.chain().focus().toggleHeading({ level: 2 }).run();
  if (action === 'heading3') editor.chain().focus().toggleHeading({ level: 3 }).run();
  if (action === 'bulletList') editor.chain().focus().toggleBulletList().run();
  if (action === 'orderedList') editor.chain().focus().toggleOrderedList().run();
  if (action === 'blockquote') editor.chain().focus().toggleBlockquote().run();
  if (action === 'horizontalRule') editor.chain().focus().setHorizontalRule().run();
  if (action === 'link') {
    const href = window.prompt('Link URL');
    if (href) editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
  }
  if (action === 'image') {
    const src = window.prompt('Image URL');
    if (!src) return;
    const alt = window.prompt('Image description') || '';
    const caption = window.prompt('Image caption') || '';
    insertArticleMarkdown(`\n![${alt}](${src})${caption ? `\n*${caption}*` : ''}\n`);
  }
  if (action === 'table') {
    insertArticleMarkdown('\n| Heading | Heading |\n| --- | --- |\n| Cell | Cell |\n');
  }
  if (action === 'pullQuote') {
    const quote = window.prompt('Pull quote text');
    if (quote) insertArticleMarkdown(`\n> Pull quote: ${quote}\n`);
  }
  if (action === 'references') {
    insertArticleMarkdown('\n## References\n\n1. Reference note\n');
  }
  syncArticleEditorToTextarea();
}

function updateArticleToolbarState() {
  const editor = state.articleEditor;
  if (!editor) return;
  document.querySelectorAll('[data-editor-action]').forEach((button) => {
    const action = button.dataset.editorAction;
    const active = (
      (action === 'bold' && editor.isActive('bold')) ||
      (action === 'italic' && editor.isActive('italic')) ||
      (action === 'heading2' && editor.isActive('heading', { level: 2 })) ||
      (action === 'heading3' && editor.isActive('heading', { level: 3 })) ||
      (action === 'bulletList' && editor.isActive('bulletList')) ||
      (action === 'orderedList' && editor.isActive('orderedList')) ||
      (action === 'blockquote' && editor.isActive('blockquote'))
    );
    button.classList.toggle('is-active', Boolean(active));
  });
}

async function initArticleEditor() {
  const element = document.getElementById('article-rich-editor');
  const textarea = document.getElementById('article-content');
  if (!element || !textarea || state.articleEditor) return;
  state.articleEditorReady = state.articleEditorReady || loadTiptapModules().then(({ Editor, StarterKit, Link, Image, TableKit, Markdown }) => {
    state.articleEditor = new Editor({
      element,
      extensions: [
        StarterKit.configure({ heading: { levels: [1, 2, 3] }, link: false }),
        Link.configure({ openOnClick: false }),
        Image,
        TableKit.configure({ table: { resizable: true } }),
        Markdown,
      ],
      content: '',
      onUpdate: () => {
        syncArticleEditorToTextarea();
        updateArticleToolbarState();
      },
      onSelectionUpdate: updateArticleToolbarState,
    });
    document.body.classList.add('has-rich-article-editor');
    setArticleEditorContent(textarea.value || '');
    document.querySelectorAll('[data-editor-action]').forEach((button) => {
      button.addEventListener('click', () => runArticleEditorAction(button.dataset.editorAction));
    });
  }).catch((error) => {
    console.warn('Tiptap editor failed to load', error);
    setStatus('Rich text editor could not load. Markdown textarea fallback is available.', 'error');
  });
  await state.articleEditorReady;
}

async function saveArticle(event) {
  event.preventDefault();
  syncArticleEditorToTextarea();
  const client = requireClient();
  const rawId = document.getElementById('article-id').value.trim();
  const id = isUuid(rawId) ? rawId : '';
  if (rawId && !id) document.getElementById('article-id').value = '';
  setStatus('Saving article...');
  try {
    if (!document.getElementById('article-title').value.trim() || !document.getElementById('article-category').value.trim() || !document.getElementById('article-summary').value.trim() || !document.getElementById('article-content').value.trim()) {
      throw new Error('Missing required field. Article title, category, summary and content are required.');
    }
    const featuredImageUrl = await uploadArticleImagePayload();
    const additionalImageUrls = await uploadArticleAdditionalImagesPayload();
    const request = id
      ? client.from('journal_articles').update(articlePayload(featuredImageUrl, additionalImageUrls)).eq('id', id).select('id').maybeSingle()
      : client.from('journal_articles').insert(articlePayload(featuredImageUrl, additionalImageUrls)).select('id').single();
    const { data, error } = await request;
    if (error) throw error;
    if (!data) throw new Error('Article could not be saved because it was not found in the database.');
    resetArticleForm();
    await loadArticles(true);
    renderAdminArticles();
    renderAdminCounts();
    setStatus(id ? 'Article saved successfully.' : 'Article created successfully.', 'success');
  } catch (error) {
    setStatus(error.message, 'error');
  }
}

function renderAdminArticles() {
  const container = document.getElementById('articles-container');
  if (!container) return;
  container.innerHTML = state.articles.map((article) => {
    const persisted = isUuid(article.id);
    return `
      <article class="admin-row">
        <div><strong>${escapeHtml(article.title)}</strong><span>${escapeHtml(article.category)} · ${escapeHtml(article.article_date || '')}</span></div>
        <div>${article.published ? 'Published' : 'Draft'}</div>
        <div>${article.featured ? 'Featured' : 'Standard'}</div>
        <div>${(article.tags || []).map(escapeHtml).join(', ')}</div>
        <div class="admin-row__actions">
          <button class="button button--secondary" type="button" data-edit-article="${article.id}">${persisted ? 'Edit' : 'Use as Draft'}</button>
          ${persisted ? `
            <button class="button button--ghost" type="button" data-toggle-article-published="${article.id}">${article.published ? 'Unpublish' : 'Publish'}</button>
            <button class="button button--ghost" type="button" data-toggle-article-featured="${article.id}">${article.featured ? 'Unfeature' : 'Feature'}</button>
            <button class="button button--danger" type="button" data-delete-article="${article.id}">Delete</button>
          ` : '<span class="admin-row__hint">Sample article</span>'}
        </div>
      </article>
    `;
  }).join('');
}

function populateArticleForm(article) {
  const persisted = isUuid(article.id);
  document.getElementById('article-id').value = persisted ? article.id : '';
  document.getElementById('article-title').value = article.title || '';
  document.getElementById('article-category').value = article.category || '';
  document.getElementById('article-date').value = article.article_date || '';
  document.getElementById('article-summary').value = article.summary || '';
  document.getElementById('article-content').value = article.content || '';
  fillArticleTagSelect(article.tags || []);
  document.getElementById('article-published').checked = Boolean(article.published);
  document.getElementById('article-featured').checked = Boolean(article.featured);
  if (document.getElementById('current-article-image')) document.getElementById('current-article-image').value = article.featured_image_url || '';
  setArticleAdditionalImages(article.additional_image_urls || []);
  if (document.getElementById('remove-article-image')) document.getElementById('remove-article-image').checked = false;
  if (document.getElementById('article-additional-images')) document.getElementById('article-additional-images').value = '';
  document.getElementById('article-submit-label').textContent = persisted ? 'Update Article' : 'Create Article';
  showAdminSection('journal');
  setArticleEditorContent(article.content || '');
  if (!persisted) setStatus('Sample article loaded as a new draft. Saving will create a real journal article.', 'success');
}

async function updateArticle(id, payload) {
  if (!isUuid(id)) throw new Error('Sample articles cannot be updated directly. Use as Draft, then save to create a real article.');
  const { data, error } = await requireClient().from('journal_articles').update(payload).eq('id', id).select('id').maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('Article could not be updated because it was not found in the database.');
  await loadArticles(true);
  renderAdminArticles();
  renderAdminCounts();
}

async function deleteArticle(id) {
  if (!isUuid(id)) {
    setStatus('Sample articles cannot be deleted from Supabase.', 'error');
    return;
  }
  if (!window.confirm('Delete this article?')) return;
  const { data, error } = await requireClient().from('journal_articles').delete().eq('id', id).select('id').maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('Article could not be deleted because it was not found in the database.');
  await loadArticles(true);
  renderAdminArticles();
  renderAdminCounts();
  setStatus('Article deleted successfully.', 'success');
}

function archivePayload(fileData, thumbnailData) {
  return {
    title: document.getElementById('archive-title').value.trim(),
    category: document.getElementById('archive-category').value,
    sub_category: document.getElementById('archive-sub-category').value.trim(),
    author_creator: document.getElementById('archive-author').value.trim(),
    publisher_source: document.getElementById('archive-publisher').value.trim(),
    date_year: document.getElementById('archive-date-year').value.trim(),
    description: document.getElementById('archive-description').value.trim(),
    short_description: document.getElementById('archive-short-description').value.trim(),
    tags: selectedArchiveTags(),
    file_type: document.getElementById('archive-file-type').value || fileData.type || 'PDF',
    file_name: fileData.name || document.getElementById('current-archive-file-name').value || '',
    file_size: fileData.size || Number(document.getElementById('current-archive-file-size').value || 0) || null,
    file_url: fileData.url || document.getElementById('current-archive-file-url').value || '',
    storage_path: fileData.path || document.getElementById('current-archive-storage-path').value || '',
    thumbnail_url: thumbnailData.url,
    thumbnail_storage_path: thumbnailData.path,
    is_published: document.getElementById('archive-published').checked,
    is_featured: document.getElementById('archive-featured').checked,
    allow_download: document.getElementById('archive-allow-download').checked,
    sort_order: Number(document.getElementById('archive-sort-order').value || 0),
  };
}

async function archiveUploadPayload() {
  const fileInput = document.getElementById('archive-file');
  const thumbInput = document.getElementById('archive-thumbnail');
  const removeThumbnail = document.getElementById('remove-archive-thumbnail')?.checked || false;
  const currentThumbnailUrl = document.getElementById('current-archive-thumbnail-url')?.value || '';
  const currentThumbnailPath = document.getElementById('current-archive-thumbnail-path')?.value || '';
  const uploaded = [];
  let fileData = {};
  let thumbnailData = removeThumbnail ? { url: '', path: '' } : { url: currentThumbnailUrl, path: currentThumbnailPath };
  if (fileInput?.files?.[0]) {
    setStatus('Uploading archive file...');
    fileData = await uploadArchiveStorageFile(fileInput.files[0], 'files');
    uploaded.push(fileData.path);
  }
  if (thumbInput?.files?.[0]) {
    setStatus('Uploading archive thumbnail...');
    thumbnailData = await uploadArchiveStorageFile(thumbInput.files[0], 'thumbnails');
    uploaded.push(thumbnailData.path);
  }
  return { fileData, thumbnailData, uploaded };
}

async function saveArchiveItem(event) {
  event.preventDefault();
  const client = requireClient();
  const uploaded = [];
  try {
    const title = document.getElementById('archive-title').value.trim();
    const category = document.getElementById('archive-category').value;
    const published = document.getElementById('archive-published').checked;
    const hasCurrentFile = Boolean(document.getElementById('current-archive-file-url').value);
    const hasNewFile = Boolean(document.getElementById('archive-file')?.files?.[0]);
    if (!title) throw new Error('Missing title. Digital Archive items require a title.');
    if (!category) throw new Error('Missing category. Please select an archive category.');
    if (published && !hasCurrentFile && !hasNewFile) throw new Error('Missing file. Published archive items require an uploaded file.');
    setStatus('Saving Digital Archive item...');
    const uploadPayload = await archiveUploadPayload();
    uploaded.push(...uploadPayload.uploaded);
    const payload = archivePayload(uploadPayload.fileData, uploadPayload.thumbnailData);
    const id = document.getElementById('archive-id').value.trim();
    const request = id
      ? client.from('digital_archive_items').update(payload).eq('id', id).select('id').maybeSingle()
      : client.from('digital_archive_items').insert(payload).select('id').single();
    const { data, error } = await request;
    if (error) throw new Error(`Database save failed: ${error.message}`);
    if (!data) throw new Error('Database save failed: archive item was not found.');
    const oldFile = document.getElementById('current-archive-storage-path').value;
    const oldThumb = document.getElementById('current-archive-thumbnail-path').value;
    const newFile = uploadPayload.fileData.path;
    const newThumb = uploadPayload.thumbnailData.path;
    const removeThumb = document.getElementById('remove-archive-thumbnail')?.checked || false;
    await removeArchiveStoragePaths([
      newFile && oldFile !== newFile ? oldFile : '',
      (newThumb && oldThumb !== newThumb) || removeThumb ? oldThumb : '',
    ]);
    resetArchiveForm();
    await loadArchiveItems(true);
    renderAdminArchiveItems();
    renderAdminCounts();
    setStatus('Digital Archive item saved successfully.', 'success');
  } catch (error) {
    await removeArchiveStoragePaths(uploaded);
    setStatus(error.message, 'error');
  }
}

function resetArchiveForm() {
  state.editingArchiveId = null;
  document.getElementById('archive-form')?.reset();
  ['archive-id', 'current-archive-file-url', 'current-archive-storage-path', 'current-archive-file-name', 'current-archive-file-size', 'current-archive-thumbnail-url', 'current-archive-thumbnail-path'].forEach((id) => {
    const input = document.getElementById(id);
    if (input) input.value = '';
  });
  if (document.getElementById('archive-allow-download')) document.getElementById('archive-allow-download').checked = true;
  if (document.getElementById('archive-sort-order')) document.getElementById('archive-sort-order').value = '0';
  if (document.getElementById('remove-archive-thumbnail')) document.getElementById('remove-archive-thumbnail').checked = false;
  document.getElementById('archive-current-file').textContent = 'No archive file selected.';
  document.getElementById('archive-submit-label').textContent = 'Create Archive Item';
  fillArchiveTagChecklist([]);
}

function populateArchiveForm(item) {
  showAdminSection('digital-archive');
  state.editingArchiveId = item.id;
  document.getElementById('archive-id').value = item.id;
  document.getElementById('archive-title').value = item.title || '';
  document.getElementById('archive-category').value = item.category || '';
  document.getElementById('archive-sub-category').value = item.sub_category || '';
  document.getElementById('archive-author').value = item.author_creator || '';
  document.getElementById('archive-publisher').value = item.publisher_source || '';
  document.getElementById('archive-date-year').value = item.date_year || '';
  document.getElementById('archive-description').value = item.description || '';
  document.getElementById('archive-short-description').value = item.short_description || '';
  document.getElementById('archive-file-type').value = item.file_type || 'PDF';
  document.getElementById('archive-sort-order').value = item.sort_order || 0;
  document.getElementById('archive-published').checked = Boolean(item.is_published);
  document.getElementById('archive-featured').checked = Boolean(item.is_featured);
  document.getElementById('archive-allow-download').checked = item.allow_download !== false;
  document.getElementById('current-archive-file-url').value = item.file_url || '';
  document.getElementById('current-archive-storage-path').value = item.storage_path || '';
  document.getElementById('current-archive-file-name').value = item.file_name || '';
  document.getElementById('current-archive-file-size').value = item.file_size || '';
  document.getElementById('current-archive-thumbnail-url').value = item.thumbnail_url || '';
  document.getElementById('current-archive-thumbnail-path').value = item.thumbnail_storage_path || '';
  document.getElementById('archive-current-file').textContent = item.file_name ? `Current file: ${item.file_name}${item.file_size ? ` (${formatFileSize(item.file_size)})` : ''}` : 'No archive file selected.';
  document.getElementById('remove-archive-thumbnail').checked = false;
  fillArchiveTagChecklist(item.tags || []);
  document.getElementById('archive-submit-label').textContent = 'Update Archive Item';
  document.getElementById('archive-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderAdminArchiveItems() {
  const container = document.getElementById('archive-admin-container');
  if (!container) return;
  const query = (document.getElementById('archive-admin-search')?.value || '').toLowerCase().trim();
  const items = query ? state.archiveItems.filter((item) => archiveSearchText(item).includes(query)) : state.archiveItems;
  container.innerHTML = items.length ? items.map((item) => `
    <article class="admin-row admin-row--archive">
      <div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml([item.category, item.date_year].filter(Boolean).join(' · '))}</span></div>
      <div>${escapeHtml(archiveFileType(item))}</div>
      <div><span class="status-pill">${item.is_published ? 'Published' : 'Draft'}</span></div>
      <div>${item.is_featured ? 'Featured' : 'Standard'}<span>${item.allow_download ? 'Download on' : 'View only'}</span></div>
      <div class="admin-row__actions">
        <button class="button button--secondary" type="button" data-edit-archive="${item.id}">Edit</button>
        <button class="button button--ghost" type="button" data-toggle-archive-published="${item.id}">${item.is_published ? 'Unpublish' : 'Publish'}</button>
        <button class="button button--ghost" type="button" data-toggle-archive-featured="${item.id}">${item.is_featured ? 'Unfeature' : 'Feature'}</button>
        <button class="button button--danger" type="button" data-delete-archive="${item.id}">Delete</button>
      </div>
    </article>
  `).join('') : '<p class="admin-empty">No Digital Archive items found.</p>';
}

async function updateArchiveItem(id, payload) {
  const { data, error } = await requireClient().from('digital_archive_items').update(payload).eq('id', id).select('id').maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('Archive item could not be updated because it was not found.');
  await loadArchiveItems(true);
  renderAdminArchiveItems();
  renderAdminCounts();
}

async function deleteArchiveItem(id) {
  const item = state.archiveItems.find((entry) => sameRecordId(entry.id, id));
  if (!item) throw new Error('Archive item could not be found.');
  if (!window.confirm('Delete this Digital Archive item?')) return;
  const { data, error } = await requireClient().from('digital_archive_items').delete().eq('id', id).select('id').maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('Archive item could not be deleted because it was not found.');
  await removeArchiveStoragePaths([item.storage_path, item.thumbnail_storage_path]);
  await loadArchiveItems(true);
  renderAdminArchiveItems();
  renderAdminCounts();
  setStatus('Digital Archive item deleted successfully.', 'success');
}

function renderEnquiryCard(enquiry) {
    const tag = enquiryTag(enquiry);
    const status = enquiry.status || 'New';
    const date = (enquiry.created_at || '').slice(0, 10);
    const refs = mentionedReferences(enquiry);
    return `
      <details class="enquiry-card">
        <summary>
          <span><strong>${escapeHtml(enquiry.name)}</strong><small>${escapeHtml(date)}</small></span>
          <span class="enquiry-tag">${escapeHtml(tag)}</span>
          <span class="enquiry-status">${escapeHtml(status)}</span>
          <span>${escapeHtml(enquiry.email)}</span>
        </summary>
        <div class="enquiry-card__body">
          <div>
            <h3>Full Message</h3>
            ${enquiry.description ? `<p>${escapeHtml(enquiry.description)}</p>` : ''}
            <p>${escapeHtml(enquiry.message || '')}</p>
          </div>
          <dl>
            <dt>Telephone</dt><dd>${escapeHtml(enquiry.telephone || 'Not supplied')}</dd>
            <dt>Email</dt><dd><a href="mailto:${escapeHtml(enquiry.email)}">${escapeHtml(enquiry.email)}</a></dd>
            <dt>Submitted Date</dt><dd>${escapeHtml(enquiry.created_at || '')}</dd>
            <dt>Reference Numbers Mentioned</dt><dd>${refs.length ? refs.map(escapeHtml).join(', ') : 'None detected'}</dd>
            <dt>Enquiry Type</dt><dd>${escapeHtml(enquiry.enquiry_type || enquiry.subject || 'Website Contact')}</dd>
          </dl>
          ${(enquiry.image_urls || []).length ? `<div class="enquiry-images">${enquiry.image_urls.map((url, index) => `<a href="${escapeHtml(url)}" target="_blank" rel="noopener"><img src="${escapeHtml(url)}" alt="Uploaded enquiry image ${index + 1}" /></a>`).join('')}</div>` : ''}
          <form class="enquiry-notes" data-enquiry-notes="${enquiry.id}">
            <label>Status
              <select name="status">
                ${['New', 'Replied', 'Archived'].map((option) => `<option${option === status ? ' selected' : ''}>${option}</option>`).join('')}
              </select>
            </label>
            <label>Internal Notes
              <textarea name="internal_notes" rows="4" placeholder="Called client, awaiting photographs, research in progress...">${escapeHtml(enquiry.internal_notes || '')}</textarea>
            </label>
            <button class="button button--secondary" type="submit">Save Notes</button>
          </form>
        </div>
      </details>
    `;
}

function renderEnquiries() {
  const container = document.getElementById('enquiries-container');
  if (!container) return;
  const filtered = filteredEnquiries();
  container.innerHTML = filtered.length ? filtered.map(renderEnquiryCard).join('') : '<p class="admin-empty">No enquiries match these filters.</p>';
}

function renderCollectionRequests() {
  const container = document.getElementById('collection-requests-container');
  if (!container) return;
  const requests = state.enquiries.filter((enquiry) => ['Material Sourcing', 'Collection Services', 'Consignment Advice', 'Collection Sale'].includes(enquiryTag(enquiry)));
  container.innerHTML = requests.length ? requests.map(renderEnquiryCard).join('') : '<p class="admin-empty">No collection requests received yet.</p>';
}

function renderAdminCounts() {
  const container = document.getElementById('admin-counts');
  if (!container) return;
  const activeInventory = state.items.filter((item) => !item.sold).length;
  const newEnquiries = state.enquiries.filter((enquiry) => (enquiry.status || 'New') === 'New').length;
  const publishedArticles = state.articles.filter((article) => article.published).length;
  const publishedArchiveItems = state.archiveItems.filter((item) => item.is_published).length;
  container.innerHTML = `
    <article><strong>${activeInventory}</strong><span>Active Inventory</span></article>
    <article><strong>${newEnquiries}</strong><span>New Enquiries</span></article>
    <article><strong>${publishedArticles}</strong><span>Published Articles</span></article>
    <article><strong>${publishedArchiveItems}</strong><span>Digital Archive</span></article>
  `;
}

function enquiryTag(enquiry) {
  const text = [enquiry.enquiry_type, enquiry.subject, enquiry.item_of_interest, enquiry.message, enquiry.description].join(' ').toLowerCase();
  if (enquiry.enquiry_tag) return enquiry.enquiry_tag;
  if (text.includes('material_sourcing') || text.includes('material sourcing') || text.includes('sourcing')) return 'Material Sourcing';
  if (text.includes('collection_services') || text.includes('collection services')) return 'Collection Services';
  if (text.includes('consign') || text.includes('sell') || text.includes('sale')) return 'Consignment Advice';
  if (text.includes('collection')) return 'Collection Services';
  if (text.includes('map')) return 'Map Enquiry';
  if (text.includes('object') || text.includes('militaria') || text.includes('medal')) return 'Historical Object';
  if (text.includes('book')) return 'Book Enquiry';
  if (text.includes('journal')) return 'Journal';
  if (enquiry.enquiry_type === 'material_sourcing') return 'Material Sourcing';
  if (enquiry.enquiry_type === 'collection_services') return 'Collection Services';
  if (enquiry.enquiry_type === 'contact') return 'General Enquiry';
  return 'Other';
}

function mentionedReferences(enquiry) {
  const text = [enquiry.item_of_interest, enquiry.message, enquiry.description].join(' ');
  return Array.from(new Set(text.match(/\b(?:BEAUMONT|JG|BM|BMT)-\d{4}-\d{3,}\b/gi) || []));
}

function filteredEnquiries() {
  const name = (document.getElementById('enquiry-filter-name')?.value || '').toLowerCase();
  const tag = document.getElementById('enquiry-filter-tag')?.value || '';
  const status = document.getElementById('enquiry-filter-status')?.value || '';
  const date = document.getElementById('enquiry-filter-date')?.value || '';
  return state.enquiries.filter((enquiry) => {
    const enquiryStatus = enquiry.status || 'New';
    const enquiryDate = (enquiry.created_at || '').slice(0, 10);
    return (!name || String(enquiry.name || '').toLowerCase().includes(name))
      && (!tag || enquiryTag(enquiry) === tag)
      && (!status || enquiryStatus === status)
      && (!date || enquiryDate === date);
  });
}

function populateEnquiryFilters() {
  const tagFilter = document.getElementById('enquiry-filter-tag');
  if (!tagFilter) return;
  const tags = ['General Enquiry', 'Collection Services', 'Material Sourcing', 'Consignment Advice'];
  tagFilter.innerHTML = '<option value="">All tags</option>' + tags.map((tag) => `<option>${escapeHtml(tag)}</option>`).join('');
}

async function saveEnquiryNotes(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const id = form.dataset.enquiryNotes;
  const payload = {
    status: form.elements.status.value,
    internal_notes: form.elements.internal_notes.value.trim(),
  };
  const { error } = await requireClient().from('enquiries').update(payload).eq('id', id);
  if (error) {
    setStatus(`${error.message}. Add the enquiry status columns from sql/setup.sql if this is the first run.`, 'error');
    return;
  }
  await loadEnquiries();
  populateEnquiryFilters();
  renderEnquiries();
  renderCollectionRequests();
  setStatus('Enquiry notes saved.', 'success');
}

async function loadSettings() {
  const client = requireClient();
  const { data, error } = await client.from('site_settings').select('*').eq('id', 'public').maybeSingle();
  if (error) throw error;
  state.settings = data || {
    id: 'public',
    public_email: 'jackgault16@yahoo.co.uk',
    public_phone: '07549 892003',
    address: "BEAUMONT\nSt James's House\nLondon SW1",
  };
  return state.settings;
}

function renderSettingsForm() {
  const settings = state.settings;
  if (!settings) return;
  const email = document.getElementById('setting-public-email');
  const phone = document.getElementById('setting-public-phone');
  const address = document.getElementById('setting-address');
  if (email) email.value = settings.public_email || '';
  if (phone) phone.value = settings.public_phone || '';
  if (address) address.value = settings.address || '';
}

async function saveSettings(event) {
  event.preventDefault();
  const payload = {
    id: 'public',
    public_email: document.getElementById('setting-public-email').value.trim(),
    public_phone: document.getElementById('setting-public-phone').value.trim(),
    address: document.getElementById('setting-address').value.trim(),
    updated_at: new Date().toISOString(),
  };
  if (!payload.public_email || !payload.public_phone || !payload.address) {
    setStatus('Missing required field. Email, phone and address are required.', 'error');
    return;
  }
  const { error } = await requireClient().from('site_settings').upsert(payload, { onConflict: 'id' });
  if (error) {
    setStatus(`Settings save failed: ${error.message}`, 'error');
    return;
  }
  state.settings = payload;
  setStatus('Settings saved successfully.', 'success');
}

function publicEnquiryTag(payload) {
  return enquiryTag({
    enquiry_type: payload.enquiry_type,
    subject: payload.subject,
    item_of_interest: payload.item_of_interest,
    message: payload.message,
    description: payload.description,
  });
}

async function insertEnquiry(payload) {
  const client = requireClient();
  const enrichedPayload = {
    ...payload,
    enquiry_tag: publicEnquiryTag(payload),
    status: 'New',
  };
  let { error } = await client.from('enquiries').insert(enrichedPayload);
  if (!error) return;
  const fallbackPayload = { ...payload };
  delete fallbackPayload.enquiry_tag;
  delete fallbackPayload.status;
  ({ error } = await client.from('enquiries').insert(fallbackPayload));
  if (error) throw error;
}

async function saveNameRecord(event, type) {
  event.preventDefault();
  const isTag = type === 'tag';
  const idKey = isTag ? 'editingTagId' : 'editingCollectionId';
  const table = isTag ? 'tags' : 'collections';
  const input = document.getElementById(isTag ? 'tag-name' : 'collection-name-admin');
  const name = input.value.trim();
  if (!name) return;
  const client = requireClient();
  const request = state[idKey]
    ? client.from(table).update({ name }).eq('id', state[idKey])
    : client.from(table).insert({ name });
  const { error } = await request;
  if (error) {
    setStatus(error.message, 'error');
    return;
  }
  state[idKey] = null;
  input.value = '';
  await (isTag ? loadTags() : loadCollections());
  fillAdminOptions();
  fillTagChecklist();
  renderTagManager();
  renderCollectionManager();
  setStatus(`${isTag ? 'Tag' : 'Collection'} saved.`, 'success');
}

async function addArticleTagFromForm() {
  const input = document.getElementById('article-new-tag');
  const name = input?.value.trim();
  if (!name) return;
  const selected = new Set(selectedArticleTags());
  selected.add(name);
  const existing = state.tags.find((tag) => tag.name.toLowerCase() === name.toLowerCase());
  if (!existing) {
    const { error } = await requireClient().from('tags').insert({ name });
    if (error) {
      setStatus(error.message, 'error');
      return;
    }
    await loadTags();
    renderTagManager();
    fillTagChecklist();
  }
  input.value = '';
  fillAdminOptions();
  fillArticleTagSelect([...selected]);
  setStatus('Tag added to article options.', 'success');
}

async function deleteNameRecord(table, id) {
  if (!window.confirm('Delete this record?')) return;
  const { error } = await requireClient().from(table).delete().eq('id', id);
  if (error) throw error;
  await (table === 'tags' ? loadTags() : loadCollections());
  fillAdminOptions();
  fillTagChecklist();
  renderTagManager();
  renderCollectionManager();
  setStatus(`${table === 'tags' ? 'Tag' : 'Collection'} deleted successfully.`, 'success');
}

function showAdminSection(name) {
  document.querySelectorAll('[data-admin-panel]').forEach((panel) => panel.classList.toggle('hidden', panel.dataset.adminPanel !== name));
  document.querySelectorAll('[data-admin-tab]').forEach((tab) => tab.classList.toggle('active', tab.dataset.adminTab === name));
}

async function openAdminDashboard() {
  document.getElementById('login-section')?.classList.add('hidden');
  document.getElementById('admin-section')?.classList.remove('hidden');
  await seedDefaults();
  await Promise.all([loadTags(), loadCollections(), loadItems(), loadArticles(true), loadArchiveItems(true), loadEnquiries(), loadSettings()]);
  if (!state.items.length) {
    setStatus('Preparing starter inventory...');
    await seedSampleInventory();
    await Promise.all([loadTags(), loadCollections(), loadItems()]);
    setStatus('Starter inventory is ready to edit.', 'success');
  }
  try {
    const backfilledItems = await backfillCatalogueBibliographicFields();
    if (backfilledItems) {
      await loadItems();
      setStatus(`Bibliographic details autofilled for ${backfilledItems} catalogue item${backfilledItems === 1 ? '' : 's'}.`, 'success');
    }
  } catch (error) {
    setStatus(`Bibliographic autofill could not complete: ${error.message}`, 'error');
  }
  fillAdminOptions();
  fillTagChecklist();
  renderTagManager();
  renderCollectionManager();
  renderInventory();
  renderSoldItems();
  renderAdminArticles();
  renderAdminArchiveItems();
  renderEnquiries();
  renderCollectionRequests();
  populateEnquiryFilters();
  renderSettingsForm();
  renderAdminCounts();
  showAdminSection('inventory');
  initArticleEditor();
}

async function initAdminPage() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;
  if (!getClient()) {
    setStatus('Supabase is not configured.', 'error');
    return;
  }
  const client = getClient();
  const isLoginPage = window.location.pathname.toLowerCase().endsWith('admin-login.html');
  const hasDashboard = Boolean(document.getElementById('admin-section'));
  const session = await client.auth.getSession();
  if (session.data.session) {
    if (isLoginPage || !hasDashboard) {
      window.location.href = 'admin.html';
      return;
    }
    await openAdminDashboard();
  } else if (hasDashboard && !isLoginPage) {
    window.location.href = 'admin-login.html';
    return;
  }

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const email = username.includes('@') ? username : username === ADMIN_USERNAME ? 'admin@beaumont.local' : '';
    if (!email) {
      setStatus('Invalid login details.', 'error');
      return;
    }
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus('Invalid login details.', 'error');
      return;
    }
    document.getElementById('password').value = '';
    if (isLoginPage || !hasDashboard) {
      window.location.href = 'admin.html';
      return;
    }
    await openAdminDashboard();
  });

  document.getElementById('logout-btn')?.addEventListener('click', async () => {
    await client.auth.signOut();
    window.location.href = 'admin-login.html';
  });
  document.getElementById('item-form')?.addEventListener('submit', saveItem);
  document.getElementById('article-form')?.addEventListener('submit', saveArticle);
  document.getElementById('archive-form')?.addEventListener('submit', saveArchiveItem);
  document.getElementById('settings-form')?.addEventListener('submit', saveSettings);
  document.getElementById('article-reset')?.addEventListener('click', resetArticleForm);
  document.getElementById('archive-reset')?.addEventListener('click', resetArchiveForm);
  document.getElementById('article-add-tag')?.addEventListener('click', addArticleTagFromForm);
  document.getElementById('article-tags-toggle')?.addEventListener('click', () => {
    const menu = document.getElementById('article-tags-menu');
    const toggle = document.getElementById('article-tags-toggle');
    const open = menu?.classList.toggle('hidden') === false;
    toggle?.setAttribute('aria-expanded', String(open));
  });
  document.getElementById('article-additional-images')?.addEventListener('change', (event) => {
    addArticleAdditionalFiles(event.target.files || []);
    event.target.value = '';
  });
  document.getElementById('archive-file')?.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      validateArchiveFile(file);
      const type = archiveFileTypeFromFile(file);
      if (document.getElementById('archive-file-type')) document.getElementById('archive-file-type').value = ARCHIVE_FILE_TYPES.includes(type) ? type : 'PDF';
      document.getElementById('archive-current-file').textContent = `Selected file: ${file.name} (${formatFileSize(file.size)})`;
    } catch (error) {
      event.target.value = '';
      setStatus(error.message, 'error');
    }
  });
  document.getElementById('archive-thumbnail')?.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      validateArchiveFile(file, true);
    } catch (error) {
      event.target.value = '';
      setStatus(error.message, 'error');
    }
  });
  document.getElementById('tag-form')?.addEventListener('submit', (event) => saveNameRecord(event, 'tag'));
  document.getElementById('collection-form')?.addEventListener('submit', (event) => saveNameRecord(event, 'collection'));
  document.getElementById('cancel-edit')?.addEventListener('click', resetItemForm);
  document.getElementById('inventory-search')?.addEventListener('input', renderInventory);
  document.getElementById('archive-admin-search')?.addEventListener('input', renderAdminArchiveItems);
  document.getElementById('enquiry-filter-name')?.addEventListener('input', renderEnquiries);
  document.getElementById('enquiry-filter-tag')?.addEventListener('change', renderEnquiries);
  document.getElementById('enquiry-filter-status')?.addEventListener('change', renderEnquiries);
  document.getElementById('enquiry-filter-date')?.addEventListener('change', renderEnquiries);
  document.querySelectorAll('[data-admin-tab]').forEach((tab) => tab.addEventListener('click', () => showAdminSection(tab.dataset.adminTab)));

  document.addEventListener('click', async (event) => {
    try {
      const editItem = event.target.closest('[data-edit-item]');
      const deleteItemButton = event.target.closest('[data-delete-item]');
      const soldButton = event.target.closest('[data-toggle-sold]');
      const archiveButton = event.target.closest('[data-toggle-archive]');
      const editTag = event.target.closest('[data-edit-tag]');
      const deleteTag = event.target.closest('[data-delete-tag]');
      const editCollection = event.target.closest('[data-edit-collection]');
      const deleteCollection = event.target.closest('[data-delete-collection]');
      const editArticle = event.target.closest('[data-edit-article]');
      const toggleArticlePublished = event.target.closest('[data-toggle-article-published]');
      const toggleArticleFeatured = event.target.closest('[data-toggle-article-featured]');
      const deleteArticleButton = event.target.closest('[data-delete-article]');
      const editArchive = event.target.closest('[data-edit-archive]');
      const toggleArchivePublished = event.target.closest('[data-toggle-archive-published]');
      const toggleArchiveFeatured = event.target.closest('[data-toggle-archive-featured]');
      const deleteArchiveButton = event.target.closest('[data-delete-archive]');
      const removeArticleImage = event.target.closest('[data-remove-article-image]');
      const moveArticleImage = event.target.closest('[data-move-article-image]');
      if (event.target.matches('input[name="article-tags"]')) updateArticleTagSummary();
      if (!event.target.closest('#article-tags')) {
        document.getElementById('article-tags-menu')?.classList.add('hidden');
        document.getElementById('article-tags-toggle')?.setAttribute('aria-expanded', 'false');
      }
      if (editItem) {
        const item = findItemById(editItem.dataset.editItem);
        if (!item) throw new Error('Item could not be found.');
        populateItemForm(item);
      }
      if (deleteItemButton) await deleteItem(deleteItemButton.dataset.deleteItem);
      if (soldButton) {
        const item = findItemById(soldButton.dataset.toggleSold);
        if (!item) throw new Error('Item could not be found.');
        await updateItem(item.id, { sold: !item.sold });
      }
      if (archiveButton) {
        const item = findItemById(archiveButton.dataset.toggleArchive);
        if (!item) throw new Error('Item could not be found.');
        await updateItem(item.id, { archive_reference: !item.archive_reference });
      }
      if (editTag) {
        const tag = state.tags.find((entry) => entry.id === editTag.dataset.editTag);
        if (!tag) throw new Error('Tag could not be found.');
        state.editingTagId = tag.id;
        document.getElementById('tag-name').value = tag.name;
      }
      if (deleteTag) await deleteNameRecord('tags', deleteTag.dataset.deleteTag);
      if (editCollection) {
        const collection = state.collections.find((entry) => entry.id === editCollection.dataset.editCollection);
        if (!collection) throw new Error('Collection could not be found.');
        state.editingCollectionId = collection.id;
        document.getElementById('collection-name-admin').value = collection.name;
      }
      if (deleteCollection) await deleteNameRecord('collections', deleteCollection.dataset.deleteCollection);
      if (editArticle) {
        const article = state.articles.find((entry) => String(entry.id) === editArticle.dataset.editArticle);
        if (article) populateArticleForm(article);
      }
      if (toggleArticlePublished) {
        const article = state.articles.find((entry) => String(entry.id) === toggleArticlePublished.dataset.toggleArticlePublished);
        if (!article) throw new Error('Article could not be found.');
        await updateArticle(article.id, { published: !article.published });
        setStatus(article.published ? 'Article moved to draft.' : 'Article published.', 'success');
      }
      if (toggleArticleFeatured) {
        const article = state.articles.find((entry) => String(entry.id) === toggleArticleFeatured.dataset.toggleArticleFeatured);
        if (!article) throw new Error('Article could not be found.');
        await updateArticle(article.id, { featured: !article.featured });
        setStatus(article.featured ? 'Article unfeatured.' : 'Article featured.', 'success');
      }
      if (deleteArticleButton) await deleteArticle(deleteArticleButton.dataset.deleteArticle);
      if (editArchive) {
        const item = state.archiveItems.find((entry) => sameRecordId(entry.id, editArchive.dataset.editArchive));
        if (!item) throw new Error('Archive item could not be found.');
        populateArchiveForm(item);
      }
      if (toggleArchivePublished) {
        const item = state.archiveItems.find((entry) => sameRecordId(entry.id, toggleArchivePublished.dataset.toggleArchivePublished));
        if (!item) throw new Error('Archive item could not be found.');
        if (!item.is_published && !item.file_url) throw new Error('Archive items need an uploaded file before publishing.');
        await updateArchiveItem(item.id, { is_published: !item.is_published });
        setStatus(item.is_published ? 'Archive item unpublished.' : 'Archive item published.', 'success');
      }
      if (toggleArchiveFeatured) {
        const item = state.archiveItems.find((entry) => sameRecordId(entry.id, toggleArchiveFeatured.dataset.toggleArchiveFeatured));
        if (!item) throw new Error('Archive item could not be found.');
        await updateArchiveItem(item.id, { is_featured: !item.is_featured });
        setStatus(item.is_featured ? 'Archive item unfeatured.' : 'Archive item featured.', 'success');
      }
      if (deleteArchiveButton) await deleteArchiveItem(deleteArchiveButton.dataset.deleteArchive);
      if (removeArticleImage) removeArticleAdditionalImage(Number(removeArticleImage.dataset.removeArticleImage));
      if (moveArticleImage) moveArticleAdditionalImage(Number(moveArticleImage.dataset.moveArticleImage), Number(moveArticleImage.dataset.direction));
    } catch (error) {
      setStatus(error.message, 'error');
    }
  });

  document.addEventListener('dragstart', (event) => {
    const item = event.target.closest('[data-article-image-index]');
    if (!item) return;
    event.dataTransfer.setData('text/plain', item.dataset.articleImageIndex);
    event.dataTransfer.effectAllowed = 'move';
  });

  document.addEventListener('dragover', (event) => {
    if (!event.target.closest('[data-article-image-index]')) return;
    event.preventDefault();
  });

  document.addEventListener('drop', (event) => {
    const item = event.target.closest('[data-article-image-index]');
    if (!item) return;
    event.preventDefault();
    reorderArticleAdditionalImage(Number(event.dataTransfer.getData('text/plain')), Number(item.dataset.articleImageIndex));
  });

  document.addEventListener('submit', async (event) => {
    if (!event.target.matches('[data-enquiry-notes]')) return;
    try {
      await saveEnquiryNotes(event);
      renderAdminCounts();
    } catch (error) {
      setStatus(error.message, 'error');
    }
  });
}

async function saveEnquiry(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector('button[type="submit"]');
  const payload = {
    name: form.querySelector('[name="name"]').value.trim(),
    email: form.querySelector('[name="email"]').value.trim(),
    telephone: form.querySelector('[name="telephone"]').value.trim(),
    subject: form.querySelector('[name="subject"]').value.trim(),
    item_of_interest: form.querySelector('[name="interest"]').value.trim(),
    message: form.querySelector('[name="message"]').value.trim(),
    enquiry_type: form.querySelector('[name="enquiry_type"]')?.value || 'contact',
  };
  try {
    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      throw new Error('Missing required field. Name, email, subject and message are required.');
    }
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }
    await insertEnquiry(payload);
    form.reset();
    window.alert('Thank you for your enquiry. We will respond within 48 hours.');
  } catch (error) {
    window.alert(error.message);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Submit Enquiry';
    }
  }
}

async function saveMaterialRequest(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector('button[type="submit"]');
  if (!getClient()) {
    window.alert(supabaseRequiredMessage());
    return;
  }
  submitButton.disabled = true;
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  try {
    const titleSought = form.querySelector('[name="title_sought"]').value.trim();
    const author = form.querySelector('[name="author"]')?.value.trim() || '';
    const subjectArea = form.querySelector('[name="subject_area"]')?.value.trim() || '';
    const period = form.querySelector('[name="period"]')?.value.trim() || '';
    const budget = form.querySelector('[name="budget"]')?.value.trim() || '';
    const notes = form.querySelector('[name="additional_notes"]')?.value.trim() || '';
    const description = [
      titleSought ? `Title sought: ${titleSought}` : '',
      author ? `Author: ${author}` : '',
      subjectArea ? `Subject area: ${subjectArea}` : '',
      period ? `Period: ${period}` : '',
      budget ? `Budget: ${budget}` : '',
    ].filter(Boolean).join('\n');
    const payload = {
      name: form.querySelector('[name="name"]').value.trim(),
      email: form.querySelector('[name="email"]').value.trim(),
      telephone: form.querySelector('[name="telephone"]')?.value.trim() || '',
      subject: 'Material Sourcing Request',
      item_of_interest: titleSought || subjectArea,
      description,
      image_urls: [],
      message: notes || 'Material sourcing request submitted.',
      enquiry_type: 'material_sourcing',
    };
    if (!payload.name || !payload.email) throw new Error('Missing required field. Name and email are required.');
    await insertEnquiry(payload);
    form.reset();
    window.alert('Thank you. Your material sourcing request has been received.');
  } catch (error) {
    window.alert(error.message);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}

const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.getElementById('primary-navigation');
if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('active');
  });
}

function updateHeaderScrollState() {
  document.body.classList.toggle('header-is-compact', window.scrollY > 36);
}

updateHeaderScrollState();
window.addEventListener('scroll', updateHeaderScrollState, { passive: true });

function anchorScrollTarget(hash) {
  if (hash === '#contact') return document.getElementById('contact-form') || document.getElementById('contact');
  return document.querySelector(hash);
}

function scrollToContactForm(behavior = 'smooth') {
  const target = document.getElementById('contact-form') || document.getElementById('contact');
  if (!target) return false;
  const rect = target.getBoundingClientRect();
  const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height || 0;
  const visibleFormHeight = Math.min(rect.height, window.innerHeight * 0.72);
  const preferredOffset = Math.max(headerHeight + 24, (window.innerHeight - visibleFormHeight) / 2);
  const top = window.scrollY + rect.top - preferredOffset;
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}

function scrollToAnchorTarget(hash, behavior = 'smooth') {
  if (hash === '#contact') return scrollToContactForm(behavior);
  const target = anchorScrollTarget(hash);
  if (!target) return false;
  target.scrollIntoView({ behavior, block: 'start' });
  return true;
}

document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    if (!href) return;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search || !url.hash) return;
    if (!anchorScrollTarget(url.hash)) return;
    event.preventDefault();
    scrollToAnchorTarget(url.hash, 'smooth');
    window.history.pushState(null, '', url.hash);
    if (primaryNav?.classList.contains('active')) {
      primaryNav.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

document.getElementById('newsletter-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  window.alert('Thank you. Your email has been received and will be processed privately.');
});
document.getElementById('contact-form')?.addEventListener('submit', saveEnquiry);
document.getElementById('material-request-form')?.addEventListener('submit', saveMaterialRequest);
document.querySelector('[data-featured-prev]')?.addEventListener('click', () => moveFeaturedCarousel(-1));
document.querySelector('[data-featured-next]')?.addEventListener('click', () => moveFeaturedCarousel(1));
document.addEventListener('click', (event) => {
  const selectButton = event.target.closest('[data-item-image-select]');
  if (selectButton) {
    state.detailImageIndex = Number(selectButton.dataset.itemImageSelect);
    updateItemDetailImage();
    return;
  }
  if (event.target.closest('[data-item-image-prev]')) {
    moveItemDetailImage(-1);
    return;
  }
  if (event.target.closest('[data-item-image-next]')) {
    moveItemDetailImage(1);
    return;
  }
  if (event.target.closest('[data-item-image-open]')) {
    openItemDetailImage();
    return;
  }
  if (event.target.closest('[data-item-image-close]') || event.target.matches('[data-item-lightbox]')) {
    closeItemDetailImage();
  }
});
document.addEventListener('keydown', (event) => {
  const lightboxOpen = !document.querySelector('[data-item-lightbox]')?.classList.contains('hidden');
  if (!lightboxOpen) return;
  if (event.key === 'Escape') closeItemDetailImage();
  if (event.key === 'ArrowLeft') moveItemDetailImage(-1);
  if (event.key === 'ArrowRight') moveItemDetailImage(1);
});
window.addEventListener('resize', updateFeaturedCarousel);

function prefillContactReference() {
  const reference = new URLSearchParams(window.location.search).get('ref');
  const input = document.getElementById('contact-interest');
  if (reference && input && !input.value) input.value = reference;
}

function alignInitialContactHash() {
  if (window.location.hash !== '#contact') return;
  const align = () => scrollToAnchorTarget('#contact', 'auto');
  window.requestAnimationFrame(align);
  window.setTimeout(align, 120);
  window.setTimeout(align, 450);
  window.addEventListener('load', align, { once: true });
}

initHomepageInventory();
initCataloguePage();
initDigitalArchivePage();
initDigitalArchiveDetailPage();
initHomepageJournal();
initJournalPage();
initAdminPage();
initBaseSeo();
prefillContactReference();
alignInitialContactHash();


