import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SiteSettings {
  id: number;
  banner_title: string | null;
  banner_subtitle: string | null;
  banner_cta_text: string | null;
  maintenance_mode: boolean;
  maintenance_message: string | null;
  youtube_url: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  spotify_url: string | null;
  ivoox_url: string | null;
  apple_podcasts_url: string | null;
  amazon_music_url: string | null;
}

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (!error) setSettings(data as SiteSettings | null);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return { settings, loading, reload: load };
};