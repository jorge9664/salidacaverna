import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, Trash2, Check, Reply } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setMessages((data ?? []) as Message[]);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const markRead = async (m: Message) => {
    if (m.read) return;
    await supabase.from("contact_messages").update({ read: true }).eq("id", m.id);
    setMessages((all) => all.map((x) => (x.id === m.id ? { ...x, read: true } : x)));
  };

  const remove = async (m: Message) => {
    if (!confirm("¿Borrar mensaje?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", m.id);
    if (error) return toast.error(error.message);
    toast.success("Eliminado");
    if (selected?.id === m.id) setSelected(null);
    load();
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          Mensajes
          {unread > 0 && (
            <Badge className="bg-primary text-primary-foreground">{unread} nuevos</Badge>
          )}
        </h1>
        <p className="text-muted-foreground mt-1">Bandeja del formulario de contacto.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-4">
        <Card className="overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : messages.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">Sin mensajes.</p>
          ) : (
            <div className="divide-y divide-border max-h-[70vh] overflow-y-auto">
              {messages.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelected(m);
                    markRead(m);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-muted/30 transition-colors ${
                    selected?.id === m.id ? "bg-muted/40" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className={`truncate ${!m.read ? "font-semibold" : ""}`}>{m.name}</p>
                    {!m.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{m.subject ?? m.email}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {new Date(m.created_at).toLocaleString("es-ES")}
                  </p>
                </button>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6 min-h-[400px]">
          {!selected ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
              <Mail className="h-10 w-10 opacity-40" />
              <p>Selecciona un mensaje</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{selected.subject ?? "(Sin asunto)"}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  De <span className="text-foreground">{selected.name}</span> &lt;{selected.email}&gt; · {new Date(selected.created_at).toLocaleString("es-ES")}
                </p>
              </div>
              <p className="whitespace-pre-wrap leading-relaxed">{selected.message}</p>
              <div className="flex gap-2 pt-4 border-t border-border">
                <Button asChild>
                  <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject ?? "")}`}>
                    <Reply className="mr-2 h-4 w-4" /> Responder
                  </a>
                </Button>
                {!selected.read && (
                  <Button variant="outline" onClick={() => markRead(selected)}>
                    <Check className="mr-2 h-4 w-4" /> Marcar leído
                  </Button>
                )}
                <Button variant="outline" onClick={() => remove(selected)} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Borrar
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminMessages;