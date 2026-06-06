-- Beaumont catalogue bibliographic metadata upgrade.
-- Run this in the Supabase SQL Editor for the live project.

begin;

alter table public.items add column if not exists author text;
alter table public.items add column if not exists edition text;
alter table public.items add column if not exists publisher text;
alter table public.items add column if not exists publication_year text;
alter table public.items add column if not exists publication_place text;

drop index if exists public.idx_items_title_search;
create index if not exists idx_items_title_search
on public.items
using gin (
  to_tsvector(
    'english',
    coalesce(title, '') || ' ' ||
    coalesce(author, '') || ' ' ||
    coalesce(edition, '') || ' ' ||
    coalesce(publisher, '') || ' ' ||
    coalesce(publication_year, '') || ' ' ||
    coalesce(publication_place, '') || ' ' ||
    coalesce(catalogue_description, '') || ' ' ||
    coalesce(physical_details, '') || ' ' ||
    coalesce(beaumont_notes, '') || ' ' ||
    coalesce(item_references, '') || ' ' ||
    coalesce(reference_number, '')
  )
);

commit;
