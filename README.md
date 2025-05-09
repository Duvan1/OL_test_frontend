# OL Frontend

Este proyecto es el frontend de la plataforma de gestión de comerciantes OL, desarrollado en Next.js 15+.

## Requisitos

- Node.js 18+
- npm 9+
- El backend debe estar corriendo en `http://localhost:3000` (puerto 3000)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <REPO_URL>
   cd Frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución en desarrollo

1. Asegúrate de que el backend esté corriendo en `http://localhost:3000`.
2. Inicia el frontend:
   ```bash
   npm run dev
   ```
3. Abre [http://localhost:3001](http://localhost:3001) (o el puerto que indique la consola) en tu navegador.

## Notas importantes

- El frontend consume la API del backend en `http://localhost:3000`. Si el backend no está corriendo en ese puerto, la autenticación y las funcionalidades principales no funcionarán.
- Si necesitas cambiar la URL del backend, edita la variable `NEXT_PUBLIC_API_URL` en el archivo `.env.local`.

## Scripts útiles

- `npm run dev` — Inicia el servidor de desarrollo
- `npm run build` — Compila la aplicación para producción
- `npm run start` — Inicia la app en modo producción

## Stack principal
- Next.js 15+
- Zustand (gestión de estado)
- react-hook-form + yup (formularios y validaciones)
- react-hot-toast (notificaciones)

---

Para cualquier duda, contacta al equipo de desarrollo OL.
