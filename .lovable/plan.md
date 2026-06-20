## Ampliación del panel /admin

Voy a transformar el panel de administración en un centro de control completo, manteniendo el estilo cinemático oscuro con acentos naranjas del proyecto.

### Nuevas secciones (sidebar reorganizada)

```text
ADMIN
├── 📊 Dashboard         (mejorado: KPIs + gráficos)
├── 📝 Artículos         (ya existe, mejoras menores)
├── 🛍️  Productos         (ya existe, mejoras menores)
├── 🧾 Pedidos           (NUEVO)
├── 👥 Usuarios          (NUEVO)
├── 📨 Mensajes          (NUEVO – bandeja de contacto)
├── 🖼️  Medios            (NUEVO – librería de imágenes)
├── 📈 Analíticas        (NUEVO – visitas, top contenido)
└── ⚙️  Configuración    (ampliada)
```

### 1. Dashboard mejorado
- Tarjetas KPI: nº artículos publicados, productos activos, pedidos pendientes, usuarios registrados, mensajes sin leer.
- Gráfico de barras (Recharts) con publicaciones/ventas por mes.
- Lista de actividad reciente (últimos artículos, últimos pedidos).
- Accesos rápidos a "crear artículo / producto".

### 2. Gestión de Usuarios (`/admin/users`)
- Tabla con todos los `profiles` (email, nombre, avatar, rol, fecha de alta).
- Asignar/quitar rol `admin` o `user` (escribe en `user_roles`).
- Buscar por email.
- Borrar usuario (vía RPC con `service_role` desde edge function segura).

### 3. Gestión de Pedidos (`/admin/orders`)
- Nueva tabla `orders` para registrar manualmente o vía Stripe.
- Listado con estado: pendiente, pagado, enviado, cancelado.
- Detalle del pedido (cliente, productos, total, dirección, notas).
- Cambiar estado, marcar como enviado, añadir tracking.
- Filtros por estado y rango de fechas.
- Exportar a CSV.

### 4. Bandeja de Mensajes (`/admin/messages`)
- Nueva tabla `contact_messages` (nombre, email, asunto, mensaje, leído).
- Conectar el formulario de contacto público para que guarde mensajes aquí.
- Marcar como leído / responder por email (mailto:) / borrar.

### 5. Librería de Medios (`/admin/media`)
- Storage bucket `media` con subida desde el panel.
- Galería con previsualización, copiar URL, borrar.
- Útil para portadas de artículos e imágenes de productos.

### 6. Analíticas (`/admin/analytics`)
- Lectura de Lovable Analytics + estadísticas propias (artículos más vistos).
- Tabla `article_views` ligera (contador por slug).
- Gráficos: visitas diarias, top 10 artículos, distribución por idioma.

### 7. Configuración ampliada (`/admin/settings`)
- Pestañas: General, Identidad (logo, favicon, colores principales), Redes sociales, SEO (meta global, OG image), Mantenimiento, Email del admin para notificaciones.
- Botón "Vaciar caché" / "Regenerar sitemap".

### 8. Mejoras de UX globales del admin
- Sidebar `shadcn/ui` colapsable (con `SidebarProvider`) e iconos siempre visibles.
- Topbar con: buscador global, selector de tema (claro/oscuro), avatar y menú de usuario (perfil, cerrar sesión).
- Breadcrumbs en cada página.
- Toasts confirmando acciones.
- Skeletons al cargar.

### Cambios técnicos (resumen)

```text
Migraciones SQL (1 sola):
  - tabla orders + order_items + RLS solo admin
  - tabla contact_messages + RLS (insert público, lectura admin)
  - tabla article_views + RPC para incrementar
  - bucket storage 'media' + políticas (admin escribe, público lee)
  - columnas extra en site_settings (email_notificaciones, og_image, favicon)

Edge function:
  - admin-delete-user (usa service_role para borrar de auth.users)

Frontend:
  - reescribir AdminLayout con Sidebar shadcn
  - nuevas páginas: AdminUsers, AdminOrders, AdminMessages,
    AdminMedia, AdminAnalytics
  - AdminDashboard rehecho con KPIs + Recharts
  - AdminSettings con Tabs
  - hook useAdminStats() para KPIs
```

### Lo que NO incluye este plan (avisar si lo quieres)
- Integración real con Stripe Checkout para crear pedidos automáticamente (los Payment Links actuales no envían webhook al proyecto). Si lo quieres, lo añadimos en un segundo paso con `enable_stripe_payments`.
- Editor visual WYSIWYG para artículos (ahora es Markdown/plano).
- Multi-idioma en el admin (queda en español).

¿Apruebas el plan y empiezo a construir todo esto?