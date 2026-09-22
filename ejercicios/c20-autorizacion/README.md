# C20 - Autorización en el Frontend

La librería consume la API de Express en vez del mock local. El catálogo usa
`GET /api/libros`; el login guarda el JWT en `localStorage`; y el alta de un
libro usa `POST /api/libros` con el header `Authorization: Bearer <token>`.
La sesión se centraliza en `AuthContext`, se rehidrata con `GET /api/auth/yo`
y las rutas y links se muestran según el rol del usuario.

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
- Sin login, `/libros/nuevo` redirige a `/login`.
- Con CLIENTE, `/libros/nuevo` redirige a `/sin-permiso`.
- Con ADMIN, aparece el link “Nuevo libro” y la API responde `201` al crear.
- Al recargar, el Provider consulta `/api/auth/yo`; un `401` con token cierra la sesión.

Los casos de backend se encuentran también en `backend/api.http`.
