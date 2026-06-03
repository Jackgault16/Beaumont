# BEAUMONT Website

Premium catalogue website for BEAUMONT, Curators of History.

## Core Files

- `index.html` - Homepage, recent acquisitions carousel, services, journal extracts and enquiry form.
- `catalogue.html` - Searchable catalogue with category, tag, collection and availability filters.
- `about.html` - Brand, expertise and advisory information.
- `collection-services.html` - Collection services and material sourcing request page.
- `journal.html` - Editorial journal and article reading view.
- `admin-login.html` - Discreet admin login page.
- `admin.html` - Supabase-backed collection, journal, tag, collection and enquiry management.
- `script.js` - Frontend data, Supabase and admin logic.
- `styles.css` - BEAUMONT visual system and responsive layout.
- `supabase.js` - Supabase project configuration.
- `sql/setup.sql` - Database schema, policies, storage bucket, sample tags and collections.

## Supabase

Run `sql/setup.sql` in the Supabase SQL Editor after changes to database structure.

Admin login supports the BEAUMONT admin identity. Public-facing branding uses BEAUMONT throughout.

For development, set the Supabase Auth admin user's temporary password to `Somme1916-`. Do not display this password in the public website UI.
