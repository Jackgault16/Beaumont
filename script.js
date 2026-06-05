const CONFIG = window.BEAUMONT_SUPABASE_CONFIG || {};
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
const DEFAULT_SEEKING_ITEMS = [
  {
    id: 'default-seeking-trench-maps',
    title: 'First World War Trench Maps',
    description: 'Especially annotated examples, officer-used maps and material connected to the Somme, Ypres, Arras and Messines.',
    image_url: '',
    active: true,
    sort_order: 1,
  },
  {
    id: 'default-seeking-military-manuscripts',
    title: 'Military Manuscripts',
    description: 'Diaries, letters, notebooks, orders, operational papers and personal archives connected to military service.',
    image_url: '',
    active: true,
    sort_order: 2,
  },
  {
    id: 'default-seeking-estate-libraries',
    title: 'Estate Libraries',
    description: 'Inherited collections, private libraries and groups of books requiring cataloguing, valuation or historical assessment.',
    image_url: '',
    active: true,
    sort_order: 3,
  },
  {
    id: 'default-seeking-maps-atlases',
    title: 'Historical Maps & Atlases',
    description: 'Cartographic material with strong decorative, military, political or geographical importance.',
    image_url: '',
    active: true,
    sort_order: 4,
  },
  {
    id: 'default-seeking-provenance-books',
    title: 'Rare Books with Provenance',
    description: 'Books bearing ownership inscriptions, bookplates, armorial bindings, marginalia or documented collection history.',
    image_url: '',
    active: true,
    sort_order: 5,
  },
];
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
  enquiries: [],
  seekingItems: [],
  seekingHasAdminData: false,
  settings: null,
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
  editingSeekingId: null,
  articleEditor: null,
  articleEditorReady: null,
  articleAdditionalImages: [],
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
    item.reference_number,
    item.category,
    item.subcategory,
    item.year,
    item.collection_name,
    item.short_description,
    item.full_description,
    item.provenance,
    item.condition,
    ...itemTags(item),
  ].join(' ').toLowerCase();
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

function sortedSeekingItems(items) {
  return [...items].sort((a, b) => {
    const orderDiff = Number(a.sort_order || 0) - Number(b.sort_order || 0);
    if (orderDiff) return orderDiff;
    return String(a.title || '').localeCompare(String(b.title || ''));
  });
}

async function loadSeekingItems(includeInactive = false) {
  const client = getClient();
  if (!client) {
    state.seekingHasAdminData = false;
    state.seekingItems = DEFAULT_SEEKING_ITEMS;
    return state.seekingItems;
  }
  const query = client.from('currently_seeking').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: true });
  const { data, error } = await query;
  if (error) {
    state.seekingHasAdminData = false;
    state.seekingItems = DEFAULT_SEEKING_ITEMS;
    return state.seekingItems;
  }
  const records = data || [];
  state.seekingHasAdminData = records.length > 0;
  state.seekingItems = records.length ? (includeInactive ? records : records.filter((item) => item.active)) : DEFAULT_SEEKING_ITEMS;
  return state.seekingItems;
}

async function seedDefaults() {
  const client = getClient();
  if (!client) return;
  await client.from('tags').upsert(DEFAULT_TAGS.map((name) => ({ name })), { onConflict: 'name' });
  await client.from('collections').upsert(DEFAULT_COLLECTIONS.map((name) => ({ name })), { onConflict: 'name' });
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
  return `
    <article class="catalogue-card">
      <a class="catalogue-card__image${image ? ' catalogue-card__image--photo' : ' catalogue-card__image--empty'}"${imageStyle} href="catalogue.html?item=${item.id}" aria-label="${escapeHtml(item.title)}">
        ${image ? '' : cataloguePlaceholder()}
      </a>
      <div class="catalogue-card__body">
        <div class="catalogue-card__entry">
          <p class="catalogue-card__label">${escapeHtml(item.reference_number || 'Catalogue entry')}</p>
          <p class="catalogue-card__meta">${escapeHtml(item.year || '')} · ${escapeHtml(item.category || '')}</p>
        </div>
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.short_description)}</p>
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
  return perView === 3 ? Math.floor((count - 1) / 3) * 3 : count - perView;
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
  const step = perView === 3 ? 3 : 1;
  state.featuredCarousel.index = Math.max(0, Math.min(maxIndex, state.featuredCarousel.index + direction * step));
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
  return `index.html?ref=${encodeURIComponent(item.reference_number || item.title || '')}#contact`;
}

async function initHomepageInventory() {
  const grid = document.getElementById('featured-items');
  if (!grid) return;
  try {
    if (getClient()) await loadItems();
    const featured = newestItems(state.items.filter((item) => item.featured && !item.sold)).slice(0, 9);
    renderFeaturedCarousel(featured.length ? featured : SAMPLE_STOCK.slice(0, 9));
  } catch (error) {
    renderFeaturedCarousel(SAMPLE_STOCK.slice(0, 9));
  }
}

function renderCatalogueCard(item, index = 0) {
  const image = realItemImage(item);
  const tags = itemTags(item);
  const description = cleanText(item.short_description);
  const featured = index === 0;
  return `
    <article class="catalogue-item${featured ? ' catalogue-item--featured' : ''}">
      <a class="catalogue-item__image${image ? '' : ' catalogue-item__image--empty'}" href="catalogue.html?item=${item.id}">
        ${cataloguePlaceholder()}
        ${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}" loading="lazy" onerror="this.remove();" />` : ''}
      </a>
      <div class="catalogue-item__content">
        ${featured ? '<p class="catalogue-item__feature-label">Featured Object</p>' : ''}
        <div class="catalogue-item__title">${escapeHtml(item.title)}</div>
        <div class="catalogue-item__meta">${escapeHtml(item.reference_number)} · ${escapeHtml(item.category)}${item.year ? ` · ${escapeHtml(item.year)}` : ''}</div>
        <div class="catalogue-item__price">${formatPrice(item.price)}</div>
        ${description ? `<p class="catalogue-item__desc">${escapeHtml(description)}</p>` : ''}
        <div class="catalogue-item__details">
          ${item.collection_name ? `<p><strong>Collection:</strong> ${escapeHtml(item.collection_name)}</p>` : ''}
          <p><strong>Availability:</strong> ${escapeHtml(availabilityLabel(item))}</p>
          ${featured && tags.length ? `<p><strong>Tags:</strong> ${tags.map(escapeHtml).join(', ')}</p>` : ''}
        </div>
        <a href="catalogue.html?item=${item.id}" class="button--enquire">View Object</a>
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
    ? items.map((item, index) => renderCatalogueCard(item, index)).join('')
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
  const tags = itemTags(item);
  const descriptionParts = [cleanText(item.short_description), cleanText(item.full_description)].filter(Boolean);
  const provenance = cleanText(item.provenance);
  const condition = cleanText(item.condition);
  const sections = [
    descriptionParts.length ? { title: 'Description', body: descriptionParts.map((part) => `<p>${escapeHtml(part)}</p>`).join('') } : null,
    provenance ? { title: 'Provenance', body: `<p>${escapeHtml(provenance)}</p>` } : null,
    condition ? { title: 'Condition', body: `<p>${escapeHtml(condition)}</p>` } : null,
    item.collection_name ? { title: 'Collection', body: `<p><span class="item-detail__collection-badge">${escapeHtml(item.collection_name)}</span></p>` } : null,
    tags.length ? { title: 'Tags', body: `<div class="item-detail__tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>` } : null,
  ].filter(Boolean);
  listing.classList.add('hidden');
  detail.classList.remove('hidden');
  detail.innerHTML = `
    <a class="catalogue-back" href="catalogue.html">Back to Catalogue</a>
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
        <div class="item-detail__sections">
          ${sections.map((section) => `
            <section class="item-detail__section">
              <h3>${section.title}</h3>
              ${section.body}
            </section>
          `).join('')}
        </div>
        <a class="button button--primary item-detail__enquire" href="${enquiryUrl(item)}">Enquire</a>
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
    await Promise.all([loadItems(), loadTags(), loadCollections()]);
    if (!state.items.length) {
      state.items = SAMPLE_STOCK;
      if (!state.tags.length) state.tags = DEFAULT_TAGS.map((name) => ({ name }));
      if (!state.collections.length) state.collections = DEFAULT_COLLECTIONS.map((name) => ({ name }));
    }
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('item');
    if (itemId) {
      const item = state.items.find((entry) => entry.id === itemId) || SAMPLE_STOCK.find((entry) => entry.id === itemId);
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
  if (category) category.innerHTML = optionList(DEFAULT_CATEGORIES, 'Select category');
  if (collection) collection.innerHTML = optionList(state.collections.map((item) => item.name), 'Select collection');
  if (acquisition) acquisition.innerHTML = optionList(ACQUISITION_SOURCES, 'Select acquisition source');
  fillArticleTagSelect(selectedArticleTags());
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

async function uploadImagePayload() {
  const mainInput = document.getElementById('main-image');
  const galleryInput = document.getElementById('gallery-images');
  const currentMain = document.getElementById('current-main-image')?.value || '';
  const currentGallery = JSON.parse(document.getElementById('current-gallery-images')?.value || '[]');
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
  return {
    title: document.getElementById('title').value.trim(),
    category: document.getElementById('category').value,
    subcategory: document.getElementById('subcategory').value.trim(),
    year: document.getElementById('year').value.trim(),
    price: document.getElementById('price').value ? Number(document.getElementById('price').value) : null,
    short_description: document.getElementById('short-description').value.trim(),
    full_description: document.getElementById('full-description').value.trim(),
    provenance: document.getElementById('provenance').value.trim(),
    condition: document.getElementById('condition').value.trim(),
    collection_name: document.getElementById('collection-name').value,
    acquisition_source: document.getElementById('acquisition-source').value,
    featured: document.getElementById('featured').checked,
    sold: document.getElementById('sold').checked,
    archive_reference: document.getElementById('archive-reference')?.checked || false,
    main_image_url,
  };
}

async function saveItem(event) {
  event.preventDefault();
  const client = requireClient();
  setStatus('Saving object...');
  try {
    if (!document.getElementById('title').value.trim() || !document.getElementById('category').value || !document.getElementById('short-description').value.trim()) {
      throw new Error('Missing required field. Title, category and short description are required.');
    }
    const { main_image_url, galleryUrls } = await uploadImagePayload();
    let itemId = state.editingItemId;
    if (itemId) {
      const { error } = await client.from('items').update(itemPayload(main_image_url)).eq('id', itemId);
      if (error) throw error;
      await client.from('item_images').delete().eq('item_id', itemId);
      await client.from('item_tags').delete().eq('item_id', itemId);
    } else {
      const { data, error } = await client.from('items').insert(itemPayload(main_image_url)).select('id').single();
      if (error) throw error;
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
    <article class="admin-row">
      <div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.reference_number)} · ${escapeHtml(item.category)}</span></div>
      <div>${formatPrice(item.price)}</div>
      <div><span class="status-pill">${item.archive_reference ? 'Archived' : item.sold ? 'Sold' : 'Available'}</span></div>
      <div>${item.featured ? 'Featured' : 'Standard'}</div>
      <div class="admin-row__actions">
        <button type="button" class="button button--secondary" data-edit-item="${item.id}">Edit</button>
        <button type="button" class="button button--ghost" data-toggle-sold="${item.id}">${item.sold ? 'Mark Available' : 'Mark Sold'}</button>
        <button type="button" class="button button--ghost" data-toggle-archive="${item.id}">${item.archive_reference ? 'Unarchive' : 'Archive'}</button>
        <button type="button" class="button button--ghost" data-toggle-featured="${item.id}">${item.featured ? 'Unfeature' : 'Feature'}</button>
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
  document.getElementById('category').value = item.category || '';
  document.getElementById('subcategory').value = item.subcategory || '';
  document.getElementById('year').value = item.year || '';
  document.getElementById('price').value = item.price || '';
  document.getElementById('short-description').value = item.short_description || '';
  document.getElementById('full-description').value = item.full_description || '';
  document.getElementById('provenance').value = item.provenance || '';
  document.getElementById('condition').value = item.condition || '';
  document.getElementById('collection-name').value = item.collection_name || '';
  document.getElementById('acquisition-source').value = item.acquisition_source || '';
  document.getElementById('featured').checked = Boolean(item.featured);
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
  const { error } = await requireClient().from('items').update(payload).eq('id', id);
  if (error) throw error;
  await loadItems();
  renderInventory();
  renderSoldItems();
  renderAdminCounts();
  setStatus('Item updated successfully.', 'success');
}

async function deleteItem(id) {
  if (!window.confirm('Delete this object permanently?')) return;
  const { error } = await requireClient().from('items').delete().eq('id', id);
  if (error) throw error;
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

async function uploadSeekingImagePayload() {
  const input = document.getElementById('seeking-image');
  const current = document.getElementById('current-seeking-image')?.value || '';
  const remove = document.getElementById('remove-seeking-image')?.checked || false;
  if (remove) return '';
  if (input?.files?.[0]) return uploadFile(input.files[0], 'currently-seeking');
  return current;
}

function seekingPayload(image_url) {
  return {
    title: document.getElementById('seeking-title').value.trim(),
    description: document.getElementById('seeking-description').value.trim(),
    image_url,
    active: document.getElementById('seeking-active').checked,
    sort_order: Number(document.getElementById('seeking-sort-order').value || 0),
  };
}

function resetSeekingForm() {
  state.editingSeekingId = null;
  document.getElementById('seeking-form')?.reset();
  document.getElementById('seeking-id').value = '';
  document.getElementById('current-seeking-image').value = '';
  if (document.getElementById('remove-seeking-image')) document.getElementById('remove-seeking-image').checked = false;
  if (document.getElementById('seeking-active')) document.getElementById('seeking-active').checked = true;
  if (document.getElementById('seeking-sort-order')) document.getElementById('seeking-sort-order').value = String((state.seekingItems.length || 0) + 1);
  document.getElementById('seeking-submit-label').textContent = 'Add Seeking Item';
}

function renderSeekingManager() {
  const container = document.getElementById('seeking-container');
  if (!container) return;
  container.innerHTML = sortedSeekingItems(state.seekingItems).map((item, index, items) => {
    const persisted = isUuid(item.id);
    return `
      <article class="admin-row">
        <div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.description || '')}</span></div>
        <div>${item.active ? 'Active' : 'Inactive'}</div>
        <div>Order ${escapeHtml(item.sort_order || index + 1)}</div>
        <div class="admin-row__actions">
          ${persisted ? `
            <button class="button button--ghost" type="button" data-move-seeking="${item.id}" data-direction="-1" ${index === 0 ? 'disabled' : ''}>Up</button>
            <button class="button button--ghost" type="button" data-move-seeking="${item.id}" data-direction="1" ${index === items.length - 1 ? 'disabled' : ''}>Down</button>
            <button class="button button--secondary" type="button" data-edit-seeking="${item.id}">Edit</button>
            <button class="button button--ghost" type="button" data-toggle-seeking="${item.id}">${item.active ? 'Deactivate' : 'Activate'}</button>
            <button class="button button--danger" type="button" data-delete-seeking="${item.id}">Delete</button>
          ` : '<span class="admin-row__hint">Default homepage item</span>'}
        </div>
      </article>
    `;
  }).join('');
}

function populateSeekingForm(item) {
  if (!isUuid(item.id)) {
    setStatus('Default seeking items can be used as a reference, but cannot be edited until saved as admin data.', 'error');
    return;
  }
  state.editingSeekingId = item.id;
  document.getElementById('seeking-id').value = item.id;
  document.getElementById('seeking-title').value = item.title || '';
  document.getElementById('seeking-description').value = item.description || '';
  document.getElementById('current-seeking-image').value = item.image_url || '';
  document.getElementById('seeking-sort-order').value = item.sort_order || 0;
  document.getElementById('seeking-active').checked = item.active !== false;
  if (document.getElementById('remove-seeking-image')) document.getElementById('remove-seeking-image').checked = false;
  document.getElementById('seeking-submit-label').textContent = 'Update Seeking Item';
}

async function saveSeekingItem(event) {
  event.preventDefault();
  const client = requireClient();
  try {
    if (!document.getElementById('seeking-title').value.trim() || !document.getElementById('seeking-description').value.trim()) {
      throw new Error('Missing required field. Title and description are required.');
    }
    const imageUrl = await uploadSeekingImagePayload();
    const id = state.editingSeekingId;
    const request = id
      ? client.from('currently_seeking').update(seekingPayload(imageUrl)).eq('id', id)
      : client.from('currently_seeking').insert(seekingPayload(imageUrl));
    const { error } = await request;
    if (error) throw error;
    resetSeekingForm();
    await loadSeekingItems(true);
    renderSeekingManager();
    setStatus('Currently Seeking item saved.', 'success');
  } catch (error) {
    setStatus(error.message, 'error');
  }
}

async function updateSeekingItem(id, payload) {
  const { error } = await requireClient().from('currently_seeking').update(payload).eq('id', id);
  if (error) throw error;
  await loadSeekingItems(true);
  renderSeekingManager();
}

async function deleteSeekingItem(id) {
  if (!window.confirm('Delete this seeking item?')) return;
  const { error } = await requireClient().from('currently_seeking').delete().eq('id', id);
  if (error) throw error;
  await loadSeekingItems(true);
  renderSeekingManager();
  setStatus('Currently Seeking item deleted.', 'success');
}

async function moveSeekingItem(id, direction) {
  const items = sortedSeekingItems(state.seekingItems).filter((item) => isUuid(item.id));
  const index = items.findIndex((item) => item.id === id);
  const targetIndex = index + direction;
  if (index < 0 || targetIndex < 0 || targetIndex >= items.length) return;
  const current = items[index];
  const target = items[targetIndex];
  const client = requireClient();
  const [currentResult, targetResult] = await Promise.all([
    client.from('currently_seeking').update({ sort_order: target.sort_order }).eq('id', current.id),
    client.from('currently_seeking').update({ sort_order: current.sort_order }).eq('id', target.id),
  ]);
  if (currentResult.error) throw currentResult.error;
  if (targetResult.error) throw targetResult.error;
  await loadSeekingItems(true);
  renderSeekingManager();
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
        <a class="journal-entry__media" data-image-frame href="journal.html?article=${article.id}" aria-label="Read ${escapeHtml(article.title)}">
          ${cataloguePlaceholder()}
          ${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(article.title)}" onerror="this.remove();" />` : ''}
        </a>
      ` : ''}
      <p class="journal-entry__meta">${meta}</p>
      <h3><a href="journal.html?article=${article.id}">${escapeHtml(article.title)}</a></h3>
      <p class="journal-entry__summary">${escapeHtml(article.summary || '')}</p>
      <a class="journal-entry__link" href="journal.html?article=${article.id}">Read Article &rarr;</a>
    </article>
  `;
}

function renderArticleDetail(article) {
  const list = document.getElementById('journal-list');
  if (!list) return;
  document.querySelector('.journal-editorial-header')?.classList.add('hidden');
  const meta = [article.category || 'Journal', formatArticleDate(article.article_date)].filter(Boolean).map(escapeHtml).join(' &bull; ');
  const image = cleanText(article.featured_image_url);
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
            <a class="journal-related__link" href="journal.html?article=${entry.id}">
              <span>${escapeHtml(entry.category || 'Journal')} &bull; ${escapeHtml(formatArticleDate(entry.article_date))}</span>
              ${escapeHtml(entry.title)}
            </a>
          `).join('')}
        </section>
      ` : ''}
      <a class="journal-entry__link journal-detail__back" href="journal.html">&larr; Back to Journal</a>
    </article>
  `;
}

async function initJournalPage() {
  const list = document.getElementById('journal-list');
  if (!list) return;
  await loadArticles(false);
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get('article');
  if (articleId) {
    const article = state.articles.find((entry) => String(entry.id) === articleId) || SAMPLE_ARTICLES.find((entry) => entry.id === articleId);
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

function renderSeekingCard(item) {
  const image = cleanText(item.image_url);
  return `
    <article class="currently-seeking-card${image ? ' currently-seeking-card--image' : ''}">
      ${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}" loading="lazy" onerror="this.remove();" />` : ''}
      <div>
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.description)}</p>
      </div>
    </article>
  `;
}

async function initHomepageSeeking() {
  const container = document.getElementById('currently-seeking-list');
  if (!container) return;
  await loadSeekingItems(false);
  const active = sortedSeekingItems(state.seekingItems.filter((item) => item.active !== false));
  container.innerHTML = active.length
    ? active.map(renderSeekingCard).join('')
    : state.seekingHasAdminData ? '<p class="admin-empty">No seeking items are currently active.</p>' : sortedSeekingItems(DEFAULT_SEEKING_ITEMS).map(renderSeekingCard).join('');
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
      ? client.from('journal_articles').update(articlePayload(featuredImageUrl, additionalImageUrls)).eq('id', id)
      : client.from('journal_articles').insert(articlePayload(featuredImageUrl, additionalImageUrls));
    const { error } = await request;
    if (error) throw error;
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
  const { error } = await requireClient().from('journal_articles').update(payload).eq('id', id);
  if (error) throw error;
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
  const { error } = await requireClient().from('journal_articles').delete().eq('id', id);
  if (error) throw error;
  await loadArticles(true);
  renderAdminArticles();
  renderAdminCounts();
  setStatus('Article deleted successfully.', 'success');
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
  const featuredItems = state.items.filter((item) => item.featured && !item.sold).length;
  const newEnquiries = state.enquiries.filter((enquiry) => (enquiry.status || 'New') === 'New').length;
  const publishedArticles = state.articles.filter((article) => article.published).length;
  container.innerHTML = `
    <article><strong>${activeInventory}</strong><span>Active Inventory</span></article>
    <article><strong>${featuredItems}</strong><span>Featured Objects</span></article>
    <article><strong>${newEnquiries}</strong><span>New Enquiries</span></article>
    <article><strong>${publishedArticles}</strong><span>Published Articles</span></article>
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
  await Promise.all([loadTags(), loadCollections(), loadItems(), loadArticles(true), loadEnquiries(), loadSettings()]);
  fillAdminOptions();
  fillTagChecklist();
  renderTagManager();
  renderCollectionManager();
  renderInventory();
  renderSoldItems();
  renderAdminArticles();
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
  document.getElementById('settings-form')?.addEventListener('submit', saveSettings);
  document.getElementById('article-reset')?.addEventListener('click', resetArticleForm);
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
  document.getElementById('tag-form')?.addEventListener('submit', (event) => saveNameRecord(event, 'tag'));
  document.getElementById('collection-form')?.addEventListener('submit', (event) => saveNameRecord(event, 'collection'));
  document.getElementById('cancel-edit')?.addEventListener('click', resetItemForm);
  document.getElementById('inventory-search')?.addEventListener('input', renderInventory);
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
      const featuredButton = event.target.closest('[data-toggle-featured]');
      const editTag = event.target.closest('[data-edit-tag]');
      const deleteTag = event.target.closest('[data-delete-tag]');
      const editCollection = event.target.closest('[data-edit-collection]');
      const deleteCollection = event.target.closest('[data-delete-collection]');
      const editArticle = event.target.closest('[data-edit-article]');
      const toggleArticlePublished = event.target.closest('[data-toggle-article-published]');
      const toggleArticleFeatured = event.target.closest('[data-toggle-article-featured]');
      const deleteArticleButton = event.target.closest('[data-delete-article]');
      const removeArticleImage = event.target.closest('[data-remove-article-image]');
      const moveArticleImage = event.target.closest('[data-move-article-image]');
      if (event.target.matches('input[name="article-tags"]')) updateArticleTagSummary();
      if (!event.target.closest('#article-tags')) {
        document.getElementById('article-tags-menu')?.classList.add('hidden');
        document.getElementById('article-tags-toggle')?.setAttribute('aria-expanded', 'false');
      }
      if (editItem) {
        const item = state.items.find((entry) => entry.id === editItem.dataset.editItem);
        if (!item) throw new Error('Item could not be found.');
        populateItemForm(item);
      }
      if (deleteItemButton) await deleteItem(deleteItemButton.dataset.deleteItem);
      if (soldButton) {
        const item = state.items.find((entry) => entry.id === soldButton.dataset.toggleSold);
        if (!item) throw new Error('Item could not be found.');
        await updateItem(item.id, { sold: !item.sold });
      }
      if (archiveButton) {
        const item = state.items.find((entry) => entry.id === archiveButton.dataset.toggleArchive);
        if (!item) throw new Error('Item could not be found.');
        await updateItem(item.id, { archive_reference: !item.archive_reference });
      }
      if (featuredButton) {
        const item = state.items.find((entry) => entry.id === featuredButton.dataset.toggleFeatured);
        if (!item) throw new Error('Item could not be found.');
        await updateItem(item.id, { featured: !item.featured });
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

document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    if (!href) return;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search || !url.hash) return;
    const target = document.querySelector(url.hash);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

initHomepageInventory();
initCataloguePage();
initHomepageJournal();
initHomepageSeeking();
initJournalPage();
initAdminPage();
prefillContactReference();


