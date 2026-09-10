# C19 - Integración Frontend y Backend

La librería consume la API de Express en vez del mock local. El catálogo usa
`GET /api/libros`; el login guarda el JWT en `localStorage`; y el alta de un
libro usa `POST /api/libros` con el header `Authorization: Bearer <token>`.

## Configuración

Copiá los archivos de ejemplo sin versionar los valores reales:

```sh
copy .env.example .env
copy backend/.env.example backend/.env
```

El frontend necesita `VITE_API_URL=http://localhost:3000/api`. El backend
necesita `FRONTEND_URL=http://localhost:5173`, un `JWT_SECRET` propio y las
credenciales de PostgreSQL.

## Ejecutar

```sh
docker compose up --build
cd backend && npx prisma migrate deploy && npx prisma db seed
cd .. && npm install && npm run dev
```

El Dockerfile genera el cliente Prisma al iniciar. El directorio generado se
ignora en Git.

## Pruebas de integración

- Catálogo: `http://localhost:5173/catalogo`.
- Login ADMIN: `admin@libreria.test` / `Admin1234`.
- Login CLIENTE: `cliente@libreria.test` / `Cliente1234`.
- Alta sin token: la UI muestra el `401` de la API.
- Alta con CLIENTE: la UI muestra el `403` de la API.
- Alta con ADMIN: la API responde `201` y vuelve al catálogo.

Los casos de backend se encuentran también en `backend/api.http`.
