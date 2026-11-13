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

## Deploy: Render + Neon

La aplicación se publica con tres piezas: Neon aloja PostgreSQL; Render corre
el backend como Web Service Docker; y Render publica el frontend como Static
Site. Los secretos y las URLs de producción se cargan en los paneles de las
plataformas, nunca en archivos `.env` versionados.

### 1. Base de datos (Neon)

1. Creá un proyecto de PostgreSQL en Neon y copiá la cadena de conexión
   **directa** con `sslmode=require`.
2. Conservála sólo para configurar `DATABASE_URL` en Render y para ejecutar el
   seed; no la subas al repositorio.

### 2. Backend (Render Web Service)

Creá un Web Service desde este repositorio, con estas opciones:

| Campo | Valor |
| --- | --- |
| Root directory | `ejercicios/c20-autorizacion/backend` |
| Runtime | Docker |
| Dockerfile path | `./Dockerfile.prod` |
| Branch | `main` |

Definí las variables de entorno:

| Variable | Valor |
| --- | --- |
| `DATABASE_URL` | La URL directa de Neon |
| `JWT_SECRET` | Un secreto largo generado por Render |
| `FRONTEND_URL` | `http://localhost:5173` de forma provisoria |

Render asigna `PORT` automáticamente. Al terminar el deploy, copiá la URL
pública del backend, que se usará en el frontend con el sufijo `/api`.

### 3. Frontend (Render Static Site)

Creá un Static Site desde el mismo repositorio:

| Campo | Valor |
| --- | --- |
| Root directory | `ejercicios/c20-autorizacion` |
| Build command | `npm ci && npm run build` |
| Publish directory | `dist` |
| Branch | `main` |

Antes de crear el sitio, definí `VITE_API_URL` como
`https://<tu-backend>.onrender.com/api`. Configurá además una regla de
**Rewrite** desde `/*` hacia `/index.html` para que React Router funcione al
recargar rutas internas.

### 4. Conectar, cargar datos y comprobar

1. Reemplazá `FRONTEND_URL` en el Web Service por la URL pública exacta del
   Static Site (sin barra final) y redeployá el backend.
2. Desde la raíz de este proyecto, cargá los datos de demo sin exponer la URL
   de Neon en Git:

```sh
docker compose run --rm -e DATABASE_URL="<url-directa-de-neon>" api npx prisma db seed
```

3. En la URL pública comprobá login, creación de libro como ADMIN y recarga de
`/catalogo`.
