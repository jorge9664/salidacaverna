ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS spotify_url text,
  ADD COLUMN IF NOT EXISTS ivoox_url text,
  ADD COLUMN IF NOT EXISTS apple_podcasts_url text,
  ADD COLUMN IF NOT EXISTS amazon_music_url text;