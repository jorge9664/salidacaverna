import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const urlOrEmpty = z.string().trim().max(500).url("URL inválida").or(z.literal(""));
const schema = z.object({
  banner_title: z.string().trim().max(200),
  banner_subtitle: z.string().trim().max(400),
  banner_cta_text: z.string().trim().max(80),
  maintenance_mode: z.boolean(),
  maintenance_message: z.string().trim().max(500),
  youtube_url: urlOrEmpty,
  instagram_url: urlOrEmpty,
  tiktok_url: urlOrEmpty,
  notification_email: z.string().trim().email("Email inválido").or(z.literal("")),
  og_image: urlOrEmpty,
  favicon_url: urlOrEmpty,
  seo_title: z.string().trim().max(160),
  seo_description: z.string().trim().max(320),
});

const AdminSettings = () => {
  const { settings, loading, reload } = useSiteSettings();
  const [saving, setSaving] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState("");
  const [form, setForm] = useState({
    banner_title: "",
    banner_subtitle: "",
    banner_cta_text: "",
    maintenance_mode: false,
    maintenance_message: "",
    youtube_url: "",
    instagram_url: "",
    tiktok_url: "",
    notification_email: "",
    og_image: "",
    favicon_url: "",
    seo_title: "",
    seo_description: "",
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
        notification_email: "",
        og_image: (settings as any).og_image ?? "",
        favicon_url: (settings as any).favicon_url ?? "",
        seo_title: (settings as any).seo_title ?? "",
        seo_description: (settings as any).seo_description ?? "",
      });
    }
  }, [settings]);

  useEffect(() => {
    (async () => {
      const { data } = await (supabase as any)
        .from("admin_settings")
        .select("notification_email")
        .eq("id", 1)
        .maybeSingle();
      const email = data?.notification_email ?? "";
      setNotificationEmail(email);
      setForm((f) => ({ ...f, notification_email: email }));
    })();
  }, []);

  const save = async () => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSaving(true);
    const d = parsed.data;
    const { error } = await supabase
      .from("site_settings")
      .update({
        banner_title: d.banner_title || null,
        banner_subtitle: d.banner_subtitle || null,
        banner_cta_text: d.banner_cta_text || null,
        maintenance_mode: d.maintenance_mode,
        maintenance_message: d.maintenance_message || null,
        youtube_url: d.youtube_url || null,
        instagram_url: d.instagram_url || null,
        tiktok_url: d.tiktok_url || null,
        og_image: d.og_image || null,
        favicon_url: d.favicon_url || null,
        seo_title: d.seo_title || null,
        seo_description: d.seo_description || null,
      } as any)
      .eq("id", 1);
    if (error) {
      setSaving(false);
      toast.error(error.message);
      return;
    }
    const { error: adminErr } = await (supabase as any)
      .from("admin_settings")
      .upsert({ id: 1, notification_email: d.notification_email || null });
    setSaving(false);
    if (adminErr) {
      toast.error(adminErr.message);
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
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Configuración Web</h1>
        <p className="text-muted-foreground mt-1">
          Cambia el contenido y los ajustes globales del sitio.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="social">Redes</TabsTrigger>
          <TabsTrigger value="maintenance">Mantenimiento</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
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
        </TabsContent>

        <TabsContent value="seo" className="mt-4">
          <Card className="p-6 space-y-4">
            <h2 className="font-semibold text-lg">SEO global</h2>
            <div className="space-y-2">
              <Label>Título por defecto (≤60)</Label>
              <Input value={form.seo_title} onChange={(e) => setForm({ ...form, seo_title: e.target.value })} maxLength={160} />
            </div>
            <div className="space-y-2">
              <Label>Meta descripción (≤160)</Label>
              <Textarea rows={2} value={form.seo_description} onChange={(e) => setForm({ ...form, seo_description: e.target.value })} maxLength={320} />
            </div>
            <div className="space-y-2">
              <Label>URL imagen Open Graph (1200×630)</Label>
              <Input value={form.og_image} onChange={(e) => setForm({ ...form, og_image: e.target.value })} placeholder="https://…" />
            </div>
            <div className="space-y-2">
              <Label>URL favicon</Label>
              <Input value={form.favicon_url} onChange={(e) => setForm({ ...form, favicon_url: e.target.value })} placeholder="https://…" />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="mt-4">
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
        </TabsContent>

        <TabsContent value="social" className="mt-4">
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
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card className="p-6 space-y-4">
            <h2 className="font-semibold text-lg">Notificaciones</h2>
            <div className="space-y-2">
              <Label>Email del administrador</Label>
              <Input type="email" value={form.notification_email} onChange={(e) => setForm({ ...form, notification_email: e.target.value })} placeholder="tu@correo.com" />
              <p className="text-xs text-muted-foreground">Se usará para futuras alertas de pedidos y mensajes.</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

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