import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Search, Shield, ShieldOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface Profile {
  id: string;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

const AdminUsers = () => {
  const { user: me } = useAuth();
  const [users, setUsers] = useState<Profile[]>([]);
  const [adminIds, setAdminIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    const [{ data: profiles }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role").eq("role", "admin"),
    ]);
    setUsers((profiles ?? []) as Profile[]);
    setAdminIds(new Set((roles ?? []).map((r: any) => r.user_id)));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleAdmin = async (uid: string, currentlyAdmin: boolean) => {
    if (uid === me?.id && currentlyAdmin) {
      toast.error("No puedes quitarte el rol admin a ti mismo");
      return;
    }
    if (currentlyAdmin) {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", uid)
        .eq("role", "admin");
      if (error) return toast.error(error.message);
    } else {
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: uid, role: "admin" });
      if (error) return toast.error(error.message);
    }
    toast.success("Rol actualizado");
    load();
  };

  const filtered = users.filter((u) =>
    [u.email, u.display_name].some((v) => v?.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <p className="text-muted-foreground mt-1">Gestiona quién tiene acceso al panel.</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre o email…"
          className="pl-9"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">Sin usuarios</p>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((u) => {
              const isAdmin = adminIds.has(u.id);
              return (
                <div key={u.id} className="flex items-center gap-4 px-5 py-4">
                  <Avatar className="h-10 w-10">
                    {u.avatar_url && <AvatarImage src={u.avatar_url} alt="" />}
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {(u.email ?? "?").slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{u.display_name ?? u.email}</p>
                    <p className="text-sm text-muted-foreground truncate">{u.email}</p>
                  </div>
                  {isAdmin && <Badge className="bg-primary/20 text-primary border-primary/30">Admin</Badge>}
                  <Button
                    size="sm"
                    variant={isAdmin ? "outline" : "default"}
                    onClick={() => toggleAdmin(u.id, isAdmin)}
                  >
                    {isAdmin ? (
                      <>
                        <ShieldOff className="mr-2 h-4 w-4" /> Quitar admin
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" /> Hacer admin
                      </>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminUsers;