-- Beaumont catalogue bibliographic metadata backfill.
-- Run this once in the Supabase SQL Editor after the bibliographic fields migration.
-- It only fills blank fields; manually entered values are preserved.

begin;

alter table public.items add column if not exists author text;
alter table public.items add column if not exists edition text;
alter table public.items add column if not exists publisher text;
alter table public.items add column if not exists publication_year text;
alter table public.items add column if not exists publication_place text;

with labelled as (
  select
    id,
    concat_ws(E'\n', physical_details, catalogue_description, full_description, short_description) as source
  from public.items
)
update public.items as item
set
  author = coalesce(
    nullif(item.author, ''),
    nullif(trim((regexp_match(labelled.source, '(?im)^[[:space:]]*(?:Author|Creator|Artist)[[:space:]]*:[[:space:]]*(.+?)[[:space:]]*$'))[1]), '')
  ),
  publisher = coalesce(
    nullif(item.publisher, ''),
    nullif(trim((regexp_match(labelled.source, '(?im)^[[:space:]]*(?:Publisher|Published by|Imprint)[[:space:]]*:[[:space:]]*(.+?)[[:space:]]*$'))[1]), '')
  ),
  edition = coalesce(
    nullif(item.edition, ''),
    nullif(trim((regexp_match(labelled.source, '(?im)^[[:space:]]*(?:Edition|Edition statement)[[:space:]]*:[[:space:]]*(.+?)[[:space:]]*$'))[1]), '')
  ),
  publication_year = coalesce(
    nullif(item.publication_year, ''),
    nullif(trim((regexp_match(labelled.source, '(?im)^[[:space:]]*(?:Publication Year|Publication Date|Published|Date)[[:space:]]*:[[:space:]]*(.+?)[[:space:]]*$'))[1]), ''),
    nullif(item.year, '')
  ),
  publication_place = coalesce(
    nullif(item.publication_place, ''),
    nullif(trim((regexp_match(labelled.source, '(?im)^[[:space:]]*(?:Publication Place|Place of Publication)[[:space:]]*:[[:space:]]*(.+?)[[:space:]]*$'))[1]), '')
  )
from labelled
where labelled.id = item.id;

update public.items
set
  author = coalesce(nullif(author, ''), backfill.author),
  edition = coalesce(nullif(edition, ''), backfill.edition),
  publisher = coalesce(nullif(publisher, ''), backfill.publisher),
  publication_year = coalesce(nullif(publication_year, ''), backfill.publication_year),
  publication_place = coalesce(nullif(publication_place, ''), backfill.publication_place)
from (
  values
    ('BM-2026-023', 'General Sir Frank Kitson', 'First Edition, signed limited edition of 150 copies', 'Privately published', '2011', null),
    ('BM-2026-022', 'Julian Amery', 'First Edition', 'Macmillan & Co. Ltd.', '1948', 'London'),
    ('BM-2026-021', 'Major-General Sir W. F. P. Napier, K.C.B.', 'Chandos Classics Edition', 'Frederick Warne & Co.', 'Late 19th Century', 'London & New York'),
    ('BM-2026-020', 'Sir Winston Churchill', 'Complete Six-Volume Set', 'Cassell & Co.', '1948-1954', 'London'),
    ('BM-2026-019', null, 'The Cities Series', 'T. N. Foulis', 'c.1905-1910', 'London & Edinburgh'),
    ('BM-2026-018', 'Winston S. Churchill', 'First Edition', 'Cassell and Company Ltd.', '1946', 'London, Toronto, Melbourne and Sydney'),
    ('BM-2026-017', 'Field-Marshal The Viscount Montgomery of Alamein, K.G.', 'Third Impression', 'Collins', 'December 1958', 'London'),
    ('BM-2026-016', 'Lieutenant-General Sir William F. Butler', '1920 Reprint Edition', 'Macmillan & Co., Limited', '1920', 'St Martin''s Street, London'),
    ('BM-2026-015', 'Major L. F. Ellis', 'First Edition', 'Her Majesty''s Stationery Office', '1962', 'London'),
    ('BM-2026-014', 'Robert Graves', 'Early Edition', 'Jonathan Cape', '1927', 'London'),
    ('BM-2026-013', 'Richard Aldington', 'First Edition', 'Collins', '1955', 'London'),
    ('BM-2026-012', 'Sir Winston Churchill', 'First Editions, Volumes I-IV', 'Cassell & Co. Ltd.', '1948-1951', 'London'),
    ('BM-2026-011', 'Cyril Falls', 'First Edition', 'M''Caw, Stevenson & Orr Ltd.', '1922', 'Belfast and London')
) as backfill(reference_number, author, edition, publisher, publication_year, publication_place)
where public.items.reference_number = backfill.reference_number;

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
