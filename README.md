# Spotify Clone

Un clon básico de Spotify construido con Next.js (Pages Router) y Tailwind CSS.

## Descripción

Este proyecto es un clon de la interfaz de Spotify que permite:

* Autenticarse con la API de Spotify (OAuth2).
* Obtener y mostrar las playlists del usuario.
* Navegar entre páginas de Inicio, Buscar y Tu Biblioteca.
* Reproducir controles simulados (Play, Pause, Next, Previous) y barra de progreso.
* Diseño responsive con Tailwind CSS.

## Estructura del proyecto

```
src/
├── pages/
│   ├── _app.tsx           # Layout global (Sidebar, Navbar, Player)
│   ├── index.tsx          # Página Home (fetch playlists, login)
│   ├── search.tsx         # Página de búsqueda (pendiente)
│   ├── library.tsx        # Página de biblioteca (pendiente)
│   └── api/spotify/
│       ├── auth.ts        # API route: OAuth con Spotify
│       └── playlists.ts   # API route: obtener playlists del usuario
├── components/
│   ├── Sidebar.tsx        # Barra lateral de navegación
│   ├── Navbar.tsx         # Encabezado con logo, buscador y avatar
│   ├── Player.tsx         # Controles de reproducción y barra de progreso
│   └── TrackList.tsx      # Componente para listar pistas en tabla
└── styles/
    └── globals.css        # Reset y estilos base Tailwind
```

## Tecnologías

* **Next.js** (App construido con Pages Router)
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Spotify Web API** (OAuth2, playlists)

## Funcionalidades implementadas

1. **Autenticación**: flujo OAuth con Spotify guardando tokens en cookies HTTP-only.
2. **API Routes**:

   * `/api/spotify/auth`: redirige a Spotify y maneja callback.
   * `/api/spotify/playlists`: obtiene playlists del usuario.
3. **UI**:

   * Sidebar con enlaces a Inicio, Buscar y Tu Biblioteca.
   * Navbar con logo, buscador y avatar.
   * Home: muestra playlists en cards. Botón de login si no autenticado.
   * Player: controles de música simulados y barra de progreso.
   * TrackList: tabla para mostrar pistas de una playlist seleccionada.

## Configuración

1. Renombra `.env.local.example` a `.env.local` y define las variables:

   ```bash
   SPOTIFY_CLIENT_ID=tu_spotify_client_id
   SPOTIFY_CLIENT_SECRET=tu_spotify_client_secret
   SPOTIFY_REDIRECT_URI=http://localhost:3000/api/spotify/auth
   ```
2. Instala dependencias:

   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo:

   ```bash
   npm run dev
   ```

## Uso

* Abre `http://localhost:3000`.
* Haz clic en "Conéctate con Spotify" para autenticarte.
* Una vez autenticado, verás tus playlists.
* Haz clic en una playlist para ver sus pistas (pendiente implementación fetch tracks).

## Próximos pasos

* Implementar la obtención de pistas por playlist y pasar datos a `TrackList`.
* Desarrollar las páginas `search.tsx` y `library.tsx`.
* Manejar refresco de token cuando expire.
* Añadir reproductor real con `preview_url`.

## Contribuciones

¡Contribuciones bienvenidas! Abre issues o PRs para sugerir mejoras.

## Licencia

Este proyecto está bajo la licencia MIT.
