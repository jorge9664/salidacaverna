
-- 1) admin_settings table (admin-only)
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  notification_email text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_settings TO authenticated;
GRANT ALL ON public.admin_settings TO service_role;

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read admin settings" ON public.admin_settings
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert admin settings" ON public.admin_settings
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update admin settings" ON public.admin_settings
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_admin_settings_updated_at
  BEFORE UPDATE ON public.admin_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed row + migrate existing value
INSERT INTO public.admin_settings (id, notification_email)
SELECT 1, notification_email FROM public.site_settings WHERE id = 1
ON CONFLICT (id) DO UPDATE SET notification_email = EXCLUDED.notification_email;

-- 2) Drop public column
ALTER TABLE public.site_settings DROP COLUMN IF EXISTS notification_email;

-- 3) Convert increment_article_view to SECURITY INVOKER + add RLS for anon inserts/updates
CREATE OR REPLACE FUNCTION public.increment_article_view(_slug text)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.article_views(slug, views, last_viewed_at)
  VALUES (_slug, 1, now())
  ON CONFLICT (slug) DO UPDATE SET views = public.article_views.views + 1, last_viewed_at = now();
END;
$$;

CREATE POLICY "Anyone can insert view counts" ON public.article_views
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update view counts" ON public.article_views
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
