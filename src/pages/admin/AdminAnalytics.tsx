import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Loader2, Eye, FileText, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface View {
  slug: string;
  views: number;
  last_viewed_at: string;
}
interface ArticleMeta {
  slug: string;
  title: string;
}

const AdminAnalytics = () => {
  const [views, setViews] = useState<View[]>([]);
  const [titles, setTitles] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: v }, { data: a }] = await Promise.all([
        supabase.from("article_views").select("*").order("views", { ascending: false }).limit(20),
        supabase.from("articles").select("slug, title"),
      ]);
      setViews((v ?? []) as View[]);
      const m = new Map<string, string>();
      (a ?? []).forEach((x: ArticleMeta) => m.set(x.slug, x.title));
      setTitles(m);
      setLoading(false);
    })();
  }, []);

  const totalViews = views.reduce((s, v) => s + Number(v.views), 0);
  const tracked = views.length;
  const top = views[0];

  const chartData = views.slice(0, 10).map((v) => ({
    name: (titles.get(v.slug) ?? v.slug).slice(0, 28),
    visitas: Number(v.views),
  }));

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analíticas</h1>
        <p className="text-muted-foreground mt-1">Visitas a los artículos.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Visitas totales</p>
              <p className="text-3xl font-bold mt-2">{totalViews.toLocaleString("es-ES")}</p>
            </div>
            <Eye className="h-5 w-5 text-primary" />
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Artículos con visitas</p>
              <p className="text-3xl font-bold mt-2">{tracked}</p>
            </div>
            <FileText className="h-5 w-5 text-primary" />
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start justify-between min-w-0">
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Más visto</p>
              <p className="text-base font-semibold mt-2 truncate" title={top ? titles.get(top.slug) : ""}>
                {top ? titles.get(top.slug) ?? top.slug : "—"}
              </p>
              {top && <p className="text-xs text-muted-foreground">{Number(top.views)} visitas</p>}
            </div>
            <TrendingUp className="h-5 w-5 text-primary shrink-0" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="font-semibold mb-4">Top 10 artículos</h2>
        {chartData.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aún no hay datos.</p>
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis dataKey="name" type="category" width={180} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="visitas" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminAnalytics;