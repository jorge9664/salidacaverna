# Despliegue en cPanel (vía Git)

## 1. Variables de entorno

El archivo `.env` ya contiene las claves públicas necesarias (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`). Estas son claves "anon" pensadas para el cliente, no son secretas. Asegúrate de que existan en el servidor antes del build.

## 2. Compilar

```bash
npm install
npm run build
```

Genera la carpeta `dist/` con todos los archivos estáticos listos para producción.

## 3. Subir a cPanel

Sube **todo el contenido de `dist/`** (no la carpeta, sino su interior) a `public_html/` (o al subdominio que uses).

Importante: el archivo `public/.htaccess` se copia automáticamente a `dist/.htaccess` durante el build. Asegúrate de que también se sube — habilita "mostrar archivos ocultos" en el File Manager de cPanel si no lo ves.

Ese `.htaccess` se encarga de:
- Redirigir todas las rutas (`/articulos`, `/admin`, …) a `index.html` para que React Router funcione al recargar.
- Cachear los assets con hash de Vite durante un año.
- Activar compresión gzip.

## 4. Flujo con Git en cPanel

Opción A — Build en local, push del `dist/`:
1. `npm run build`
2. Push del contenido de `dist/` a la rama de despliegue del repo de cPanel.

Opción B — Build en el servidor (requiere Node en cPanel):
1. Push del código fuente.
2. En cPanel > Git Version Control > Pull or Deploy, configura el `.cpanel.yml`:

```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/USUARIO/public_html/
    - /bin/cp -R dist/* $DEPLOYPATH
    - /bin/cp dist/.htaccess $DEPLOYPATH
```

(ejecuta `npm install && npm run build` previamente vía Terminal o webhook).

## 5. Backend

La base de datos (Supabase / Lovable Cloud) sigue funcionando igual desde cualquier dominio: las claves del `.env` apuntan al mismo proyecto. No necesitas migrar nada al hosting de cPanel.