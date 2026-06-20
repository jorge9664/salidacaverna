import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Download, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Status = "pending" | "paid" | "shipped" | "cancelled";
const STATUS_LABEL: Record<Status, string> = {
  pending: "Pendiente",
  paid: "Pagado",
  shipped: "Enviado",
  cancelled: "Cancelado",
};
const STATUS_COLOR: Record<Status, string> = {
  pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  paid: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  shipped: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  cancelled: "bg-muted text-muted-foreground border-border",
};

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string | null;
  status: Status;
  total: number;
  currency: string;
  tracking_number: string | null;
  notes: string | null;
  created_at: string;
}

const emptyForm = {
  customer_name: "",
  customer_email: "",
  customer_phone: "",
  shipping_address: "",
  status: "pending" as Status,
  total: 0,
  currency: "EUR",
  tracking_number: "",
  notes: "",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Order | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [toDelete, setToDelete] = useState<Order | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setOrders((data ?? []) as Order[]);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };
  const openEdit = (o: Order) => {
    setEditing(o);
    setForm({
      customer_name: o.customer_name,
      customer_email: o.customer_email,
      customer_phone: o.customer_phone ?? "",
      shipping_address: o.shipping_address ?? "",
      status: o.status,
      total: Number(o.total),
      currency: o.currency,
      tracking_number: o.tracking_number ?? "",
      notes: o.notes ?? "",
    });
    setOpen(true);
  };

  const save = async () => {
    if (!form.customer_name.trim() || !form.customer_email.trim()) {
      toast.error("Nombre y email obligatorios");
      return;
    }
    setSaving(true);
    const payload = {
      customer_name: form.customer_name.trim(),
      customer_email: form.customer_email.trim(),
      customer_phone: form.customer_phone || null,
      shipping_address: form.shipping_address || null,
      status: form.status,
      total: form.total,
      currency: form.currency || "EUR",
      tracking_number: form.tracking_number || null,
      notes: form.notes || null,
      shipped_at: form.status === "shipped" ? new Date().toISOString() : null,
      paid_at: form.status === "paid" || form.status === "shipped" ? new Date().toISOString() : null,
    };
    const { error } = editing
      ? await supabase.from("orders").update(payload).eq("id", editing.id)
      : await supabase.from("orders").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(editing ? "Pedido actualizado" : "Pedido creado");
    setOpen(false);
    load();
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    const { error } = await supabase.from("orders").delete().eq("id", toDelete.id);
    if (error) return toast.error(error.message);
    toast.success("Pedido eliminado");
    setToDelete(null);
    load();
  };

  const exportCSV = () => {
    const headers = ["Fecha", "Cliente", "Email", "Estado", "Total", "Moneda", "Tracking"];
    const rows = filtered.map((o) => [
      new Date(o.created_at).toLocaleString("es-ES"),
      o.customer_name,
      o.customer_email,
      STATUS_LABEL[o.status],
      o.total,
      o.currency,
      o.tracking_number ?? "",
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pedidos-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = orders.filter((o) => filter === "all" || o.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">Pedidos</h1>
          <p className="text-muted-foreground mt-1">Registro y seguimiento de ventas.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCSV} disabled={filtered.length === 0}>
            <Download className="mr-2 h-4 w-4" /> Exportar CSV
          </Button>
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" /> Nuevo pedido
          </Button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(["all", "pending", "paid", "shipped", "cancelled"] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={filter === s ? "default" : "outline"}
            onClick={() => setFilter(s)}
          >
            {s === "all" ? "Todos" : STATUS_LABEL[s]}
          </Button>
        ))}
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No hay pedidos.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Fecha</th>
                  <th className="px-4 py-3 font-medium">Cliente</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium text-right">Total</th>
                  <th className="px-4 py-3 font-medium">Tracking</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(o.created_at).toLocaleDateString("es-ES")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{o.customer_name}</div>
                      <div className="text-xs text-muted-foreground">{o.customer_email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={STATUS_COLOR[o.status]}>{STATUS_LABEL[o.status]}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {Number(o.total).toFixed(2)} {o.currency}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {o.tracking_number ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 justify-end">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(o)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setToDelete(o)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar pedido" : "Nuevo pedido"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombre cliente *</Label>
              <Input value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input type="email" value={form.customer_email} onChange={(e) => setForm({ ...form, customer_email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Teléfono</Label>
              <Input value={form.customer_phone} onChange={(e) => setForm({ ...form, customer_phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as Status })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
                    <SelectItem key={s} value={s}>{STATUS_LABEL[s]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Total</Label>
              <Input type="number" step="0.01" value={form.total} onChange={(e) => setForm({ ...form, total: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Moneda</Label>
              <Input value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value.toUpperCase() })} maxLength={3} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Dirección de envío</Label>
              <Textarea rows={2} value={form.shipping_address} onChange={(e) => setForm({ ...form, shipping_address: e.target.value })} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Nº seguimiento</Label>
              <Input value={form.tracking_number} onChange={(e) => setForm({ ...form, tracking_number: e.target.value })} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Notas internas</Label>
              <Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={save} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Borrar pedido?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Borrar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminOrders;