import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Package, ShoppingBag, Wrench } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const AdminDashboard = () => {
  const [total, setTotal] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const { settings } = useSiteSettings();

  useEffect(() => {
    (async () => {
      const { count: totalCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });
      const { count: activeCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);
      setTotal(totalCount ?? 0);
      setActive(activeCount ?? 0);
    })();
  }, []);

  const stats = [
    { label: "Productos totales", value: total ?? "—", icon: Package },
    { label: "Productos activos", value: active ?? "—", icon: ShoppingBag },
    {
      label: "Modo mantenimiento",
      value: settings?.maintenance_mode ? "Activado" : "Desactivado",
      icon: Wrench,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Panel</h1>
        <p className="text-muted-foreground mt-1">Resumen general de la web.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-3xl font-bold mt-2">{s.value}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                <s.icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;