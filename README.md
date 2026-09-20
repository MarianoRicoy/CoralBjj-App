# Coral BJJ Studio

Monorepo del proyecto Coral BJJ Studio con arquitectura desacoplada:

- `frontend/`: aplicación web construida con Next.js (App Router, Tailwind CSS, TypeScript).
- `backend/`: API REST independiente construida con Node.js, Express, TypeORM y PostgreSQL.

## Estructura del repositorio

```bash
CoralBjj-App/
├── frontend/             # Aplicación Next.js (landing, catálogo, UI)
│   ├── app/              # App Router (páginas, layouts, rutas especiales)
│   ├── components/       # Componentes de UI y features
│   ├── config/           # Plantillas de configuración de entorno
│   ├── lib/              # Utilidades, site-config, catálogo local
│   └── public/           # Assets estáticos (imágenes, fuentes, iconos)
├── backend/              # API REST Express + TypeORM
│   ├── src/
│   │   ├── entities/     # Entidades TypeORM (Producto, Variante, Orden)
│   │   ├── routes/       # Rutas de la API (productos, checkout, webhooks)
│   │   └── services/     # Lógica de negocio e integración Mercado Pago
│   └── config/           # Plantillas de variables de entorno backend
├── package.json          # Scripts raíz para orquestación del monorepo
└── docker-compose.yml    # Orquestación de base de datos, backend y frontend
```

## Requisitos

- Node.js 20+
- npm 10+
- PostgreSQL (local, contenedor Docker o remoto)

## Estado Actual del Catálogo y API

- **Catálogo Frontend Actual**: La tienda visible en la interfaz de usuario utiliza actualmente el catálogo estático local definido en `frontend/lib/tienda-catalogo.ts`.
- **API de Productos Backend**: La API REST del backend cuenta con los endpoints de consulta de productos (`GET /api/productos`, `GET /api/productos/:id`) y gestión administrativa (`PATCH /api/admin/productos/:id`, `PATCH /api/admin/variantes/:id`). Sin embargo, la migración para que la tienda del frontend consuma esta API como única fuente de verdad está pendiente y se implementará en una fase posterior sin alterar la estabilidad actual.
- **Checkout y Pagos**: El backend gestiona las órdenes y la integración con Mercado Pago a través de sus endpoints dedicados.

## Variables de entorno

### Frontend
Plantilla de referencia: `frontend/config/env.template.txt`

- `NEXT_PUBLIC_BASE_URL`: URL base pública del frontend (ej. `http://localhost:3000` en desarrollo).
- `NEXT_PUBLIC_API_BASE_URL`: URL base de la API backend (ej. `http://localhost:4000`).

### Backend
Plantilla de referencia: `backend/config/env.template.txt`

- `BACKEND_PORT`: Puerto del servidor backend (por defecto `4000`).
- `FRONTEND_URL`: URL permitida para CORS desde el frontend (ej. `http://localhost:3000`).
- `DATABASE_URL`: Cadena de conexión PostgreSQL (`postgresql://usuario:password@localhost:5432/coral_bjj_studio`).
- `ADMIN_API_TOKEN`: Token de autenticación para endpoints administrativos.
- `MERCADOPAGO_ACCESS_TOKEN`: Credencial de acceso de Mercado Pago.
- `MERCADOPAGO_WEBHOOK_SECRET`: Secreto para verificación de firmas de webhooks de Mercado Pago.
- `TYPEORM_SYNC`: Sincronización automática de esquema TypeORM (`true` para desarrollo, `false` para producción).

## Comandos de desarrollo y build (desde la raíz)

```bash
# Iniciar frontend en modo desarrollo
npm run dev:frontend

# Iniciar backend en modo desarrollo
npm run dev:backend

# Compilar frontend para producción
npm run build:frontend

# Compilar backend (TypeScript)
npm run build:backend

# Ejecutar linter en frontend
npm run lint:frontend
```

## Comandos útiles del backend

Ejecutar dentro del directorio `backend` o utilizando el prefijo:

```bash
# Sincronizar esquema de base de datos con TypeORM
npm run typeorm:sync --prefix backend

# Poblar la base de datos con datos iniciales (seed)
npm run seed --prefix backend
```

## Docker Compose

Levanta todo el stack local (`db`, `backend`, `frontend`):

```bash
docker compose up --build -d
```

Ver logs:

```bash
docker compose logs -f
```

Detener servicios:

```bash
docker compose down
```

Detener servicios y eliminar volumen de base de datos:

```bash
docker compose down -v
```

## Endpoints del Backend

- `GET /api/productos`: Lista de productos disponibles.
- `GET /api/productos/:id`: Detalle de producto por ID.
- `POST /api/checkout`: Creación de orden e inicialización de preferencia de Mercado Pago.
- `POST /api/webhooks/mercadopago`: Recepción y procesamiento de notificaciones de pago.
- `PATCH /api/admin/productos/:id`: Actualización de datos de producto (requiere `ADMIN_API_TOKEN`).
- `PATCH /api/admin/variantes/:id`: Actualización de stock o precio de variante (requiere `ADMIN_API_TOKEN`).
