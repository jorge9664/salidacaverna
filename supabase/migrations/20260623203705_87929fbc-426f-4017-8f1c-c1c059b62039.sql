
-- 1) Split public SELECT policies so anon path does not call has_role()
DROP POLICY IF EXISTS "Anyone can view published articles" ON public.articles;
CREATE POLICY "Anon can view published articles"
  ON public.articles FOR SELECT TO anon
  USING (published = true);
CREATE POLICY "Authenticated can view articles"
  ON public.articles FOR SELECT TO authenticated
  USING (published = true OR public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
CREATE POLICY "Anon can view active products"
  ON public.products FOR SELECT TO anon
  USING (is_active = true);
CREATE POLICY "Authenticated can view products"
  ON public.products FOR SELECT TO authenticated
  USING (is_active = true OR public.has_role(auth.uid(), 'admin'::app_role));

-- 2) Lock down EXECUTE on the SECURITY DEFINER function
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;

-- 3) Replace permissive WITH CHECK (true) on contact_messages with real validation
DROP POLICY IF EXISTS "Anyone can submit a message" ON public.contact_messages;
CREATE POLICY "Anyone can submit a valid message"
  ON public.contact_messages FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(btrim(name)) BETWEEN 1 AND 120
    AND char_length(btrim(message)) BETWEEN 3 AND 5000
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND char_length(email) <= 254
    AND (subject IS NULL OR char_length(subject) <= 200)
  );
