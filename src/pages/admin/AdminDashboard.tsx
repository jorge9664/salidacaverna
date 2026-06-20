import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import {
  Package,
  ShoppingBag,
  FileText,
  ShoppingCart,
  Users,
  Mail,
  Wrench,
  Plus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface RecentArticle {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
}
interface RecentOrder {
  id: string;
  customer_name: string;
  total: number;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { settings } = useSiteSettings();
  const [kpis, setKpis] = useState({
    articlesPublished: 0,
    productsActive: 0,
    ordersPending: 0,
    users: 0,
    messagesUnread: 0,
  });
  const [recentArticles, setRecentArticles] = useState<RecentArticle[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [monthly, setMonthly] = useState<{ mes: string; articulos: number; pedidos: number }[]>([]);

  useEffect(() => {
    (async () => {
      const [a, p, o, u, m, recA, recO, allA, allO] = await Promise.all([
        supabase.from("articles").select("*", { count: "exact", head: true }).eq("published", true),
        supabase.from("products").select("*", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("read", false),
        supabase.from("articles").select("id, title, slug, published, created_at").order("created_at", { ascending: false }).limit(5),
        supabase.from("orders").select("id, customer_name, total, status, created_at").order("created_at", { ascending: false }).limit(5),
        supabase.from("articles").select("created_at"),
        supabase.from("orders").select("created_at"),
      ]);

      setKpis({
        articlesPublished: a.count ?? 0,
        productsActive: p.count ?? 0,
        ordersPending: o.count ?? 0,
        users: u.count ?? 0,
        messagesUnread: m.count ?? 0,
      });
      setRecentArticles((recA.data ?? []) as RecentArticle[]);
      setRecentOrders((recO.data ?? []) as RecentOrder[]);

      const buckets = new Map<string, { articulos: number; pedidos: number }>();
      const now = new Date();
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const k = d.toLocaleDateString("es-ES", { month: "short" });
        buckets.set(k, { articulos: 0, pedidos: 0 });
      }
      const inWindow = (iso: string) => {
        const d = new Date(iso);
        const diff = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
        return diff >= 0 && diff <= 5
          ? d.toLocaleDateString("es-ES", { month: "short" })
          : null;
      };
      (allA.data ?? []).forEach((r: any) => {
        const k = inWindow(r.created_at);
        if (k && buckets.has(k)) buckets.get(k)!.articulos++;
      });
      (allO.data ?? []).forEach((r: any) => {
        const k = inWindow(r.created_at);
        if (k && buckets.has(k)) buckets.get(k)!.pedidos++;
      });
      setMonthly(Array.from(buckets, ([mes, v]) => ({ mes, ...v })));
    })();
  }, []);

  const kpiCards = [
    { label: "Artículos publicados", value: kpis.articlesPublished, icon: FileText, to: "/admin/articles" },
    { label: "Productos activos", value: kpis.productsActive, icon: ShoppingBag, to: "/admin/products" },
    { label: "Pedidos pendientes", value: kpis.ordersPending, icon: ShoppingCart, to: "/admin/orders" },
    { label: "Usuarios", value: kpis.users, icon: Users, to: "/admin/users" },
    { label: "Mensajes sin leer", value: kpis.messagesUnread, icon: Mail, to: "/admin/messages" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">Panel</h1>
          <p className="text-muted-foreground mt-1">Resumen general de la web.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/admin/articles"><Plus className="mr-1 h-4 w-4" />Nuevo artículo</Link>
          </Button>
          <Button asChild>
            <Link to="/admin/products"><Plus className="mr-1 h-4 w-4" />Nuevo producto</Link>
          </Button>
        </div>
      </div>

      {settings?.maintenance_mode && (
        <Card className="p-4 border-amber-500/40 bg-amber-500/5 flex items-center gap-3">
          <Wrench className="h-5 w-5 text-amber-400" />
          <p className="text-sm">
            <span className="font-medium">Modo mantenimiento activo.</span>{" "}
            Los visitantes no ven la web.
          </p>
        </Card>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpiCards.map((s) => (
          <Link key={s.label} to={s.to}>
            <Card className="p-4 hover:border-primary/40 transition-colors h-full">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold mt-1.5">{s.value}</p>
                </div>
                <div className="h-8 w-8 rounded-md bg-primary/15 text-primary flex items-center justify-center">
                  <s.icon className="h-4 w-4" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="font-semibold mb-4">Actividad últimos 6 meses</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="articulos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pedidos" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" /> Últimos artículos
          </h3>
          {recentArticles.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aún no hay artículos.</p>
          ) : (
            <ul className="divide-y divide-border">
              {recentArticles.map((a) => (
                <li key={a.id} className="py-2 flex items-center justify-between gap-2">
                  <span className="truncate text-sm">{a.title}</span>
                  <Badge variant={a.published ? "default" : "outline"} className="shrink-0">
                    {a.published ? "Publicado" : "Borrador"}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-primary" /> Últimos pedidos
          </h3>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aún no hay pedidos.</p>
          ) : (
            <ul className="divide-y divide-border">
              {recentOrders.map((o) => (
                <li key={o.id} className="py-2 flex items-center justify-between gap-2 text-sm">
                  <span className="truncate">{o.customer_name}</span>
                  <span className="font-mono text-muted-foreground">{Number(o.total).toFixed(2)} €</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;