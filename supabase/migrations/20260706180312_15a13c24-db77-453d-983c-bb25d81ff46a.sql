
DROP POLICY IF EXISTS "Anyone can insert view counts" ON public.article_views;
DROP POLICY IF EXISTS "Anyone can update view counts" ON public.article_views;

CREATE POLICY "Public can insert valid view counts" ON public.article_views
  FOR INSERT TO anon, authenticated
  WITH CHECK (slug IS NOT NULL AND length(slug) BETWEEN 1 AND 200 AND views >= 0);

CREATE POLICY "Public can update valid view counts" ON public.article_views
  FOR UPDATE TO anon, authenticated
  USING (slug IS NOT NULL)
  WITH CHECK (slug IS NOT NULL AND length(slug) BETWEEN 1 AND 200 AND views >= 0);
