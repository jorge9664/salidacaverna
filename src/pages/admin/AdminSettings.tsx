import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  banner_title: z.string().trim().max(200),
  banner_subtitle: z.string().trim().max(400),
  banner_cta_text: z.string().trim().max(80),
  maintenance_mode: z.boolean(),
  maintenance_message: z.string().trim().max(500),
  youtube_url: z.string().trim().max(500).url("URL inválida").or(z.literal("")),
  instagram_url: z.string().trim().max(500).url("URL inválida").or(z.literal("")),
  tiktok_url: z.string().trim().max(500).url("URL inválida").or(z.literal("")),
});

const AdminSettings = () => {
  const { settings, loading, reload } = useSiteSettings();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    banner_title: "",
    banner_subtitle: "",
    banner_cta_text: "",
    maintenance_mode: false,
    maintenance_message: "",
    youtube_url: "",
    instagram_url: "",
    tiktok_url: "",
  });

  useEffect(() => {
    if (settings) {
      setForm({
        banner_title: settings.banner_title ?? "",
        banner_subtitle: settings.banner_subtitle ?? "",
        banner_cta_text: settings.banner_cta_text ?? "",
        maintenance_mode: settings.maintenance_mode,
        maintenance_message: settings.maintenance_message ?? "",
        youtube_url: settings.youtube_url ?? "",
        instagram_url: settings.instagram_url ?? "",
        tiktok_url: settings.tiktok_url ?? "",
      });
    }
  }, [settings]);

  const save = async () => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .update({
        banner_title: parsed.data.banner_title || null,
        banner_subtitle: parsed.data.banner_subtitle || null,
        banner_cta_text: parsed.data.banner_cta_text || null,
        maintenance_mode: parsed.data.maintenance_mode,
        maintenance_message: parsed.data.maintenance_message || null,
        youtube_url: parsed.data.youtube_url || null,
        instagram_url: parsed.data.instagram_url || null,
        tiktok_url: parsed.data.tiktok_url || null,
      })
      .eq("id", 1);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Configuración guardada");
    reload();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Configuración Web</h1>
        <p className="text-muted-foreground mt-1">
          Cambia el contenido principal de la landing sin tocar código.
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="font-semibold text-lg">Banner principal</h2>
        <div className="space-y-2">
          <Label htmlFor="b-title">Título</Label>
          <Input
            id="b-title"
            value={form.banner_title}
            onChange={(e) => setForm((f) => ({ ...f, banner_title: e.target.value }))}
            maxLength={200}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="b-sub">Subtítulo</Label>
          <Textarea
            id="b-sub"
            value={form.banner_subtitle}
            onChange={(e) => setForm((f) => ({ ...f, banner_subtitle: e.target.value }))}
            rows={2}
            maxLength={400}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="b-cta">Texto botón principal</Label>
          <Input
            id="b-cta"
            value={form.banner_cta_text}
            onChange={(e) => setForm((f) => ({ ...f, banner_cta_text: e.target.value }))}
            maxLength={80}
          />
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">Modo mantenimiento</h2>
            <p className="text-sm text-muted-foreground">
              Si lo activas, los visitantes verán un mensaje en lugar de la web.
            </p>
          </div>
          <Switch
            checked={form.maintenance_mode}
            onCheckedChange={(v) => setForm((f) => ({ ...f, maintenance_mode: v }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="m-msg">Mensaje</Label>
          <Textarea
            id="m-msg"
            value={form.maintenance_message}
            onChange={(e) =>
              setForm((f) => ({ ...f, maintenance_message: e.target.value }))
            }
            placeholder="Volvemos pronto..."
            rows={2}
            maxLength={500}
          />
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="font-semibold text-lg">Redes sociales</h2>
        <div className="space-y-2">
          <Label htmlFor="s-yt">YouTube</Label>
          <Input
            id="s-yt"
            value={form.youtube_url}
            onChange={(e) => setForm((f) => ({ ...f, youtube_url: e.target.value }))}
            placeholder="https://youtube.com/..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="s-ig">Instagram</Label>
          <Input
            id="s-ig"
            value={form.instagram_url}
            onChange={(e) => setForm((f) => ({ ...f, instagram_url: e.target.value }))}
            placeholder="https://instagram.com/..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="s-tt">TikTok</Label>
          <Input
            id="s-tt"
            value={form.tiktok_url}
            onChange={(e) => setForm((f) => ({ ...f, tiktok_url: e.target.value }))}
            placeholder="https://tiktok.com/..."
          />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={save} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Guardar cambios
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;