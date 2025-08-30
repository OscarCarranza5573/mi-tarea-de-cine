# 🎬 CineApp - Aplicación de Cartelera de Cines

Una aplicación web moderna desarrollada con React que consume una API pública de cartelera de cines, implementando funcionalidades de búsqueda, filtrado y gestión CRUD de películas.

## 🚀 Tecnologías Utilizadas

- **React 18** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite** - Herramienta de construcción rápida para desarrollo frontend
- **Styled Components** - Librería para estilos CSS-in-JS
- **Axios** - Cliente HTTP para realizar peticiones a la API
- **React Icons** - Iconos vectoriales para React

## ✨ Características

### 🎯 Funcionalidades Principales
- **Visualización de películas**: Grid responsivo con tarjetas atractivas
- **Búsqueda avanzada**: Filtrado por título, género, ubicación y año
- **Gestión CRUD completa**:
  - ✅ Crear nuevas películas
  - ✅ Leer/visualizar películas existentes
  - ✅ Actualizar información de películas
  - ✅ Eliminar películas
- **Interfaz responsiva**: Adaptable a dispositivos móviles y desktop
- **Estados de carga**: Indicadores visuales durante las operaciones
- **Manejo de errores**: Mensajes informativos para el usuario

### 🎨 Diseño y UX
- **Diseño moderno**: Gradientes, sombras y animaciones suaves
- **Componentes reutilizables**: Arquitectura modular y mantenible
- **Accesibilidad**: Navegación por teclado y lectores de pantalla
- **Tema consistente**: Paleta de colores y tipografía unificada

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 📡 API Endpoints

La aplicación consume la siguiente API:

**Base URL**: `https://movie.azurewebsites.net/api/cartelera`

### Endpoints disponibles:

- **GET** `/cartelera?title=&ubication=` - Obtener todas las películas
- **GET** `/cartelera?imdbID={id}` - Obtener película por ID
- **POST** `/cartelera` - Crear nueva película
- **PUT** `/cartelera?imdbID={id}` - Actualizar película
- **DELETE** `/cartelera?imdbID={id}` - Eliminar película

### Estructura de datos:
```json
{
  "imdbID": "80000",
  "Title": "Título de la película",
  "Year": "2024",
  "Type": "Género",
  "Poster": "URL del póster",
  "Estado": true,
  "description": "Descripción de la película",
  "Ubication": "Ubicación del cinema"
}
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.jsx      # Cabecera de la aplicación
│   ├── SearchBar.jsx   # Barra de búsqueda y filtros
│   ├── MovieCard.jsx   # Tarjeta de película
│   ├── MovieForm.jsx   # Formulario para crear/editar
│   └── LoadingSpinner.jsx # Indicador de carga
├── hooks/              # Hooks personalizados
│   └── useMovies.js    # Hook para gestión de películas
├── services/           # Servicios de API
│   └── movieService.js # Servicio para operaciones CRUD
├── utils/              # Utilidades
├── App.jsx             # Componente principal
├── main.jsx            # Punto de entrada
└── index.css           # Estilos globales
```

## 🎯 Funcionalidades Implementadas

### ✅ Búsqueda y Filtrado
- Búsqueda por título (texto libre)
- Filtro por género (dropdown)
- Filtro por ubicación (dropdown)
- Filtro por año (input numérico)
- Limpieza de filtros
- Contador de resultados

### ✅ Gestión de Películas
- **Crear**: Formulario completo con validaciones
- **Leer**: Visualización en grid y modal de detalles
- **Actualizar**: Edición inline con formulario pre-poblado
- **Eliminar**: Confirmación antes de eliminar

### ✅ Experiencia de Usuario
- Loading states durante operaciones
- Mensajes de error informativos
- Confirmaciones para acciones destructivas
- Navegación intuitiva
- Responsive design

## 🚀 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter de código

## 🎨 Personalización

### Variables CSS
Las variables de color y estilo están definidas en `src/index.css`:

```css
:root {
  --primary-color: #667eea;
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-color: #f8f9fa;
  --text-color: #333;
  --border-radius: 15px;
}
```

### Componentes Styled
Todos los componentes utilizan `styled-components` para un styling modular y mantenible.

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 **Móviles**: < 768px
- 📱 **Tablets**: 768px - 1024px
- 💻 **Desktop**: > 1024px

## 🔧 Optimizaciones

- **Lazy Loading**: Carga diferida de imágenes
- **Memoización**: Optimización de re-renders
- **Debouncing**: En búsquedas en tiempo real
- **Error Boundaries**: Manejo robusto de errores
- **Accesibilidad**: ARIA labels y navegación por teclado

## 🤝 Contribución

Este proyecto fue desarrollado como parte de un proyecto universitario, implementando las mejores prácticas de desarrollo frontend moderno.

## 📄 Licencia

Este proyecto es de uso académico y educativo.

---

**Desarrollado con ❤️ usando React y tecnologías modernas**

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
