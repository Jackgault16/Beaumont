-- BEAUMONT Supabase setup
-- Run this file in the Supabase SQL Editor for the project used by supabase.js.

begin;

create extension if not exists pgcrypto;

-- Storage bucket for catalogue images.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'catalogue-images',
  'catalogue-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  category text not null check (category in ('Books', 'Maps', 'Documents', 'Historical Objects')),
  subcategory text,
  year text,
  price numeric(12, 2) check (price is null or price >= 0),
  short_description text not null,
  full_description text,
  provenance text,
  condition text,
  reference_number text unique,
  collection_name text references public.collections(name) on update cascade on delete set null,
  acquisition_source text,
  featured boolean not null default false,
  sold boolean not null default false,
  archive_reference boolean not null default false,
  main_image_url text
);

create table if not exists public.item_images (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.items(id) on delete cascade,
  image_url text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.item_tags (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.items(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  unique (item_id, tag_id)
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  telephone text,
  subject text,
  item_of_interest text,
  enquiry_type text not null default 'contact',
  enquiry_tag text,
  status text not null default 'New',
  internal_notes text,
  description text,
  image_urls text[] not null default '{}',
  message text not null
);

create table if not exists public.journal_articles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  category text not null,
  article_date date not null default current_date,
  featured_image_url text,
  summary text not null,
  content text not null,
  tags text[] not null default '{}',
  featured boolean not null default false,
  published boolean not null default false
);

create table if not exists public.site_settings (
  id text primary key default 'public',
  public_email text not null default 'jackgault16@yahoo.co.uk',
  public_phone text not null default '07549 892003',
  address text not null default 'BEAUMONT
St James''s House
London SW1',
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id)
values ('public')
on conflict (id) do nothing;

alter table public.enquiries add column if not exists enquiry_type text not null default 'contact';
alter table public.enquiries add column if not exists enquiry_tag text;
alter table public.enquiries add column if not exists status text not null default 'New';
alter table public.enquiries add column if not exists internal_notes text;
alter table public.enquiries add column if not exists description text;
alter table public.enquiries add column if not exists image_urls text[] not null default '{}';
alter table public.items add column if not exists archive_reference boolean not null default false;

-- Automatic stock numbers: BM-2026-001, BM-2026-002, etc.
create sequence if not exists public.bm_stock_number_seq start 1;

select setval(
  'public.bm_stock_number_seq',
  greatest(
    1,
    coalesce((
      select max(substring(reference_number from '^BM-\d{4}-(\d+)$')::integer)
      from public.items
      where reference_number ~ '^BM-\d{4}-\d+$'
    ), 0)
  ),
  exists (select 1 from public.items where reference_number ~ '^BM-\d{4}-\d+$')
);

create or replace function public.assign_bm_reference_number()
returns trigger
language plpgsql
as $$
begin
  if new.reference_number is null or new.reference_number = '' then
    new.reference_number := 'BM-' || extract(year from now())::text || '-' || lpad(nextval('public.bm_stock_number_seq')::text, 3, '0');
  end if;
  return new;
end;
$$;

drop trigger if exists trg_assign_jg_reference_number on public.items;
drop trigger if exists trg_assign_bm_reference_number on public.items;
create trigger trg_assign_bm_reference_number
before insert on public.items
for each row
execute function public.assign_bm_reference_number();

-- Helpful indexes for catalogue search/filtering and admin screens.
create index if not exists idx_items_created_at on public.items (created_at desc);
create index if not exists idx_items_category on public.items (category);
create index if not exists idx_items_collection_name on public.items (collection_name);
create index if not exists idx_items_featured_unsold on public.items (featured, sold, created_at desc);
create index if not exists idx_items_sold on public.items (sold);
create index if not exists idx_items_reference_number on public.items (reference_number);
create index if not exists idx_items_title_search on public.items using gin (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(short_description, '') || ' ' || coalesce(full_description, '') || ' ' || coalesce(reference_number, '')));
create index if not exists idx_item_images_item_id on public.item_images (item_id);
create index if not exists idx_item_images_order on public.item_images (item_id, display_order, created_at);
create index if not exists idx_tags_name on public.tags (name);
create index if not exists idx_item_tags_item_id on public.item_tags (item_id);
create index if not exists idx_item_tags_tag_id on public.item_tags (tag_id);
create index if not exists idx_enquiries_created_at on public.enquiries (created_at desc);
create index if not exists idx_enquiries_type_created_at on public.enquiries (enquiry_type, created_at desc);
create index if not exists idx_journal_articles_date on public.journal_articles (article_date desc);
create index if not exists idx_journal_articles_published_date on public.journal_articles (published, article_date desc);
create index if not exists idx_journal_articles_featured on public.journal_articles (featured, published, article_date desc);
create index if not exists idx_journal_articles_tags on public.journal_articles using gin (tags);

-- Seed tags.
insert into public.tags (name) values
  ('Military History'),
  ('WWI'),
  ('WWII'),
  ('Napoleonic Wars'),
  ('Victorian'),
  ('Georgian'),
  ('18th Century'),
  ('19th Century'),
  ('20th Century'),
  ('Irish History'),
  ('British History'),
  ('Exploration'),
  ('Travel'),
  ('Maps'),
  ('Trench Maps'),
  ('Regimental History'),
  ('Signed Edition'),
  ('First Edition'),
  ('Rare Book'),
  ('Historical Document'),
  ('Historical Object'),
  ('Archive Material'),
  ('Biography'),
  ('Memoir')
on conflict (name) do nothing;

-- Seed collections.
insert into public.collections (name) values
  ('Western Front Collection'),
  ('Irish History Collection'),
  ('Exploration Collection'),
  ('Estate Library Collection'),
  ('Travel Collection')
on conflict (name) do nothing;

-- Row Level Security.
alter table public.items enable row level security;
alter table public.item_images enable row level security;
alter table public.tags enable row level security;
alter table public.item_tags enable row level security;
alter table public.collections enable row level security;
alter table public.enquiries enable row level security;
alter table public.journal_articles enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Public read items" on public.items;
create policy "Public read items" on public.items
for select to anon, authenticated
using (true);

drop policy if exists "Public read item images" on public.item_images;
create policy "Public read item images" on public.item_images
for select to anon, authenticated
using (true);

drop policy if exists "Public read tags" on public.tags;
create policy "Public read tags" on public.tags
for select to anon, authenticated
using (true);

drop policy if exists "Public read item tags" on public.item_tags;
create policy "Public read item tags" on public.item_tags
for select to anon, authenticated
using (true);

drop policy if exists "Public read collections" on public.collections;
create policy "Public read collections" on public.collections
for select to anon, authenticated
using (true);

drop policy if exists "Public create enquiries" on public.enquiries;
create policy "Public create enquiries" on public.enquiries
for insert to anon, authenticated
with check (true);

drop policy if exists "Public read published journal articles" on public.journal_articles;
create policy "Public read published journal articles" on public.journal_articles
for select to anon, authenticated
using (published = true);

drop policy if exists "Admin manage items" on public.items;
create policy "Admin manage items" on public.items
for all to authenticated
using (true)
with check (true);

drop policy if exists "Admin manage item images" on public.item_images;
create policy "Admin manage item images" on public.item_images
for all to authenticated
using (true)
with check (true);

drop policy if exists "Admin manage tags" on public.tags;
create policy "Admin manage tags" on public.tags
for all to authenticated
using (true)
with check (true);

drop policy if exists "Admin manage item tags" on public.item_tags;
create policy "Admin manage item tags" on public.item_tags
for all to authenticated
using (true)
with check (true);

drop policy if exists "Admin manage collections" on public.collections;
create policy "Admin manage collections" on public.collections
for all to authenticated
using (true)
with check (true);

drop policy if exists "Admin manage journal articles" on public.journal_articles;
create policy "Admin manage journal articles" on public.journal_articles
for all to authenticated
using (true)
with check (true);

drop policy if exists "Admin read enquiries" on public.enquiries;
create policy "Admin read enquiries" on public.enquiries
for select to authenticated
using (true);

drop policy if exists "Admin update enquiries" on public.enquiries;
create policy "Admin update enquiries" on public.enquiries
for update to authenticated
using (true)
with check (true);

drop policy if exists "Public read site settings" on public.site_settings;
create policy "Public read site settings" on public.site_settings
for select to anon, authenticated
using (id = 'public');

drop policy if exists "Admin manage site settings" on public.site_settings;
create policy "Admin manage site settings" on public.site_settings
for all to authenticated
using (true)
with check (true);

drop policy if exists "Public read catalogue images" on storage.objects;
create policy "Public read catalogue images" on storage.objects
for select to anon, authenticated
using (bucket_id = 'catalogue-images');

drop policy if exists "Admin upload catalogue images" on storage.objects;
drop policy if exists "Authenticated upload catalogue images" on storage.objects;
create policy "Authenticated upload catalogue images" on storage.objects
for insert to authenticated
with check (bucket_id = 'catalogue-images');

drop policy if exists "Public upload enquiry images" on storage.objects;
create policy "Public upload enquiry images" on storage.objects
for insert to anon, authenticated
with check (bucket_id = 'catalogue-images' and name like 'enquiries/%');

drop policy if exists "Admin update catalogue images" on storage.objects;
drop policy if exists "Authenticated update catalogue images" on storage.objects;
create policy "Authenticated update catalogue images" on storage.objects
for update to authenticated
using (bucket_id = 'catalogue-images')
with check (bucket_id = 'catalogue-images');

drop policy if exists "Admin delete catalogue images" on storage.objects;
drop policy if exists "Authenticated delete catalogue images" on storage.objects;
create policy "Authenticated delete catalogue images" on storage.objects
for delete to authenticated
using (bucket_id = 'catalogue-images');

commit;
