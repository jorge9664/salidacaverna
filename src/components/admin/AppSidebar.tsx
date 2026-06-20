import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Package,
  ShoppingCart,
  Users,
  Mail,
  Image as ImageIcon,
  BarChart3,
  Settings,
  ExternalLink,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Panel", url: "/admin", icon: LayoutDashboard, end: true },
  { title: "Artículos", url: "/admin/articles", icon: FileText },
  { title: "Productos", url: "/admin/products", icon: Package },
  { title: "Pedidos", url: "/admin/orders", icon: ShoppingCart },
];

const peopleItems = [
  { title: "Usuarios", url: "/admin/users", icon: Users },
  { title: "Mensajes", url: "/admin/messages", icon: Mail },
];

const toolItems = [
  { title: "Medios", url: "/admin/media", icon: ImageIcon },
  { title: "Analíticas", url: "/admin/analytics", icon: BarChart3 },
  { title: "Configuración", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();

  const isActive = (p: string, end?: boolean) =>
    end ? pathname === p : pathname === p || pathname.startsWith(p + "/");

  const renderGroup = (
    label: string,
    items: { title: string; url: string; icon: any; end?: boolean }[],
  ) => (
    <SidebarGroup>
      {!collapsed && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={isActive(item.url, item.end)}>
                <NavLink to={item.url} end={item.end} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-4 border-b border-sidebar-border">
        {collapsed ? (
          <div className="h-8 w-8 mx-auto rounded-md bg-primary/20 text-primary flex items-center justify-center font-bold">
            C
          </div>
        ) : (
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Admin</p>
            <p className="text-sm font-bold leading-tight mt-0.5">La salida de la caverna</p>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        {renderGroup("Gestión", mainItems)}
        {renderGroup("Personas", peopleItems)}
        {renderGroup("Sistema", toolItems)}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/" target="_blank" rel="noopener" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 shrink-0" />
                {!collapsed && <span>Ver sitio público</span>}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}