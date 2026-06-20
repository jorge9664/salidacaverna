import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, Copy, Trash2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface MediaFile {
  name: string;
  url: string;
  created_at: string | null;
  size: number;
}

const AdminMedia = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from("media").list("", {
      limit: 200,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (error) {
      toast.error(error.message);
      setFiles([]);
    } else {
      const list = (data ?? []).filter((f) => !f.name.startsWith("."));
      const mapped: MediaFile[] = list.map((f) => {
        const { data: pub } = supabase.storage.from("media").getPublicUrl(f.name);
        return {
          name: f.name,
          url: pub.publicUrl,
          created_at: f.created_at ?? null,
          size: (f.metadata as any)?.size ?? 0,
        };
      });
      setFiles(mapped);
    }
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
    const { error } = await supabase.storage.from("media").upload(safeName, file, {
      cacheControl: "31536000",
      upsert: false,
    });
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
    if (error) return toast.error(error.message);
    toast.success("Subido");
    load();
  };

  const copy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copiada");
  };

  const remove = async (name: string) => {
    if (!confirm("¿Borrar este archivo?")) return;
    const { error } = await supabase.storage.from("media").remove([name]);
    if (error) return toast.error(error.message);
    toast.success("Eliminado");
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">Librería de medios</h1>
          <p className="text-muted-foreground mt-1">Sube imágenes para artículos y productos.</p>
        </div>
        <div>
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={onUpload} />
          <Button onClick={() => inputRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
            Subir imagen
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : files.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-2">
          <ImageIcon className="h-10 w-10 opacity-40" />
          <p>Aún no hay imágenes.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {files.map((f) => (
            <Card key={f.name} className="overflow-hidden group">
              <div className="aspect-square bg-muted/30 overflow-hidden">
                <img src={f.url} alt={f.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-2 space-y-1">
                <p className="text-xs truncate" title={f.name}>{f.name}</p>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copy(f.url)}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => remove(f.name)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMedia;