# Coral BJJ Studio

Monorepo con arquitectura desacoplada:

- `frontend/`: aplicación web Next.js.
- `backend/`: API REST en Node.js + Express + TypeORM + PostgreSQL.

## Estructura del repositorio

```bash
CoralBjj-App/
  frontend/
  backend/
  package.json
```

## Requisitos

- Node.js 20+
- PostgreSQL local o remoto

## Variables de entorno

### Frontend

Template: `frontend/config/env.template.txt`

- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_API_BASE_URL`

### Backend

Template: `backend/config/env.template.txt`

- `BACKEND_PORT`
- `FRONTEND_URL`
- `DATABASE_URL`
- `ADMIN_API_TOKEN`
- `MERCADOPAGO_ACCESS_TOKEN`
- `MERCADOPAGO_WEBHOOK_SECRET`
- `TYPEORM_SYNC`

## Comandos (desde raíz)

```bash
npm run dev:frontend
npm run dev:backend
npm run build:frontend
npm run build:backend
npm run lint:frontend
```

## Docker Compose

Levanta todo el stack (`db`, `backend`, `frontend`):

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

Detener y borrar volumen de datos:

```bash
docker compose down -v
```

## Comandos backend útiles

```bash
npm run typeorm:sync --prefix backend
npm run seed --prefix backend
```

## Endpoints backend

- `GET /api/productos`
- `GET /api/productos/:id`
- `POST /api/checkout`
- `POST /api/webhooks/mercadopago`
- `PATCH /api/admin/productos/:id`
- `PATCH /api/admin/variantes/:id`

## Estado de la migración

- Se eliminó el backend integrado de Next.js (`frontend/app/api`).
- Se eliminó Prisma del flujo principal.
- El frontend consume API externa por `NEXT_PUBLIC_API_BASE_URL`.
