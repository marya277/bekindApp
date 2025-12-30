# 🌟 Be Kind Network Admin

Aplicación web administrativa para gestionar categorías de acciones en la plataforma Be Kind Network. Construida con React 19, TypeScript y Tailwind CSS.

## 🚀 Demo en Vivo

**[Ver Aplicación](https://bekind-app.vercel.app/login)**

### Credenciales de Prueba
- **Usuario:** `a.berrio@yopmail.com`
- **Contraseña:** `AmuFK8G4Bh64Q1uX+IxQhw==`

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Decisiones Técnicas](#-decisiones-técnicas)
- [Supuestos y Consideraciones](#-supuestos-y-consideraciones)
- [Arquitectura](#-arquitectura)

---

## ✨ Características

### 🔐 Autenticación
- Login funcional con token JWT
- Validación de formularios con React Hook Form y Zod
- Estados de carga y manejo de errores
- Protección de rutas privadas
- Persistencia de sesión con localStorage
- Logout funcional

### 📊 Dashboard
- Listado paginado de categorías de acciones
- Tabla con columnas: nombre, descripción, icono, color, estado y fecha
- Filtros por estado (Activo/Inactivo)
- Búsqueda en tiempo real
- Paginación dinámica (base 1)
- Interceptor automático de token en requests

### ➕ Crear Categoría
- Formulario completo con validación:
  - **Nombre** (texto, 3-50 caracteres)
  - **Descripción** (textarea, 10-100 caracteres)
  - **Color** (color picker con input hex)
  - **Estado** (toggle activo/inactivo)
  - **Logo** (upload de archivo: PNG, JPG, SVG)
- Preview de imagen antes de subir
- Validación de tipo y tamaño de archivo (máx. 2MB)
- Recarga automática del listado tras creación

### 🎨 UI/UX
- Diseño responsive y moderno
- Animaciones suaves
- Sistema de componentes reutilizables
- Tooltips informativos
- Drawer lateral para formularios

---

## 🛠 Stack Tecnológico

### Core
- **React 19** - Biblioteca UI con nuevas características
- **TypeScript** - Tipado estático y mejor DX
- **Vite** - Build tool moderno y rápido

### Estado y Formularios
- **Zustand** - Gestión de estado global ligero
- **React Hook Form** - Manejo de formularios performante
- **Zod** - Validación de esquemas con TypeScript

### HTTP y Routing
- **Axios** - Cliente HTTP con interceptores
- **React Router 6** - Enrutamiento declarativo

### Estilos
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Librería de iconos moderna
- **Design System personalizado** - Sistema de componentes y tokens reutilizables

---

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Configuración de HTTP client
│   ├── services/          # Servicios por dominio
│   │   ├── authService.ts
│   │   └── actionsService.ts
│   ├── client.ts          # Configuración de Axios
│   └── endpoints.ts       # URLs de endpoints
│
├── components/            # Componentes React
│   ├── actions/          # Componentes de acciones
│   │   ├── ActionsTable.tsx
│   │   └── CreateActionForm.tsx
│   ├── auth/             # Componentes de autenticación
│   │   ├── LoginForm.tsx
│   │   └── ForgotPasswordForm.tsx
│   ├── layout/           # Componentes de layout
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ui/               # Componentes reutilizables
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Drawer.tsx
│       ├── Input.tsx
│       ├── Loader.tsx
│       ├── Pagination.tsx
│       └── Table.tsx
│
├── hooks/                # Custom hooks
│   └── useClickOutside.ts
│
├── pages/                # Páginas principales
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── CreateAction.tsx
│   ├── ForgotPassword.tsx
│   └── ComingSoon.tsx
│
├── routes/               # Configuración de rutas
│   ├── AppRouter.tsx
│   ├── ProtectedRoute.tsx
│   └── PublicRoute.tsx
│
├── schemas/              # Esquemas de validación Zod
│   ├── auth.schema.ts
│   ├── action.schema.ts
│   └── index.ts
│
├── store/                # Estado global con Zustand
│   ├── authStore.ts
│   ├── actionsStore.ts
│   └── headerStore.ts
│
├── types/                # Interfaces TypeScript
│   ├── auth.types.ts
│   ├── action.types.ts
│   └── header.types.ts
│
└── utils/                # Utilidades
```

---

## 💻 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**

```bash
git clone https://github.com/marya277/bekindApp.git
cd bekind

```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env en la raíz
VITE_AUTH_API_URL=<auth_api_url>
VITE_API_URL=<main_api_url>
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:5173
```

---

## 📜 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Preview de build de producción
npm run lint     # Ejecuta linter
```

---

## 🧠 Decisiones Técnicas

### ¿Por qué Zustand?
- **Ligero**: Solo 1KB gzipped vs 3KB de Redux
- **Simple**: API minimalista sin boilerplate
- **TypeScript nativo**: Tipado de primera clase
- **Performante**: Re-renders optimizados automáticamente
- **DevTools**: Integración con Redux DevTools

### ¿Por qué Axios sobre Fetch?
- **Interceptores**: Centralización de token y manejo de errores
- **Transformación automática**: JSON parsing automático
- **Timeouts**: Configuración de timeouts por defecto
- **Mejor DX**: API más intuitiva y menos verbose
- **Cancelación**: Soporte nativo para cancelar requests

### ¿Por qué React Hook Form?
- **Performance**: Re-renders mínimos (solo campos modificados)
- **Validación integrada**: Soporte nativo con Zod
- **Bundle size**: Más pequeño que Formik
- **DX**: API declarativa y simple
- **TypeScript**: Inferencia de tipos automática

### ¿Por qué paginación base 1?
Durante las pruebas con el endpoint de listado, descubrí que:
- El primer índice válido es `pageNumber=1`
- `pageNumber=0` retorna error 400
- El API utiliza indexación basada en 1, no en 0

### Manejo de Dos Dominios
El proyecto consume APIs de dos subdominios diferentes:
- **Auth API**: Para autenticación de usuarios
- **Main API**: Para recursos y operaciones CRUD

**Solución implementada:**
- Cliente Axios separado con baseURL dinámica
- Interceptor que detecta el dominio según el endpoint
- Variables de entorno para configuración flexible (`.env`)
- URLs no hardcodeadas en el código fuente

---

## 🤔 Supuestos y Consideraciones

### Estructura del Payload de Crear Acción

El endpoint de creación no documentaba el payload exacto. Inferí la estructura explorando:

1. **Respuesta del endpoint de listado**
2. **Pruebas con el endpoint** (método ensayo-error)
3. **Análisis del diseño en Figma**

**Campos implementados:**

```typescript
interface CreateActionPayload {
  name: string;          // Nombre de la categoría (3-50 chars)
  description: string;   // Descripción (10-100 chars)
  color: string;         // Código hexadecimal (#RRGGBB)
  status: number;        // 1 = Activo, 0 = Inactivo
  icon?: File;           // Logo opcional (PNG, JPG, SVG, max 2MB)
}
```

**Validaciones aplicadas:**
- **name**: Requerido, 3-50 caracteres
- **description**: Requerido, 10-100 caracteres con contador
- **color**: Formato hex válido (#RRGGBB), picker integrado
- **status**: Toggle UI para mejor UX
- **icon**: Opcional, validación de tipo MIME y tamaño

### Upload de Archivos

El endpoint requiere `multipart/form-data`. Implementación:

```typescript
const formData = new FormData();
formData.append('name', data.name);
formData.append('description', data.description);
formData.append('color', data.color);
formData.append('status', data.status.toString());
if (data.icon) {
  formData.append('icon', data.icon);
}
```

**Features:**
- Preview de imagen antes de enviar
- Validación de tipo (PNG, JPG, SVG)
- Validación de tamaño (máx. 2MB)
- Opción de cambiar archivo seleccionado
- Fallback visual si no se sube imagen

### Campos de Fecha
Aunque el listado muestra `createdAt` y `updatedAt`, estos campos:
- No se incluyen en el formulario (generados por backend)
- Se muestran formateados en la tabla
- Se usan para ordenamiento

---

## 🏗 Arquitectura

### Separación de Responsabilidades

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
│  (Components, Pages, UI Elements)       │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│          State Management Layer         │
│     (Zustand Stores, React Hooks)       │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│           Business Logic Layer          │
│      (Services, Validators, Utils)      │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│          Data Access Layer              │
│    (Axios Client, API Endpoints)        │
└─────────────────────────────────────────┘
```

### Flujo de Datos

**Ejemplo: Crear una acción**

1. **Usuario** → Completa formulario en `CreateActionForm`
2. **Validación** → React Hook Form + Zod validan datos
3. **Submit** → Se llama a `createAction()` del store
4. **Store** → Zustand ejecuta `actionsService.create()`
5. **Service** → Construye FormData y hace POST con Axios
6. **Interceptor** → Agrega token automáticamente
7. **Response** → Store actualiza estado y notifica componente
8. **UI** → Muestra mensaje de éxito y recarga listado

### Manejo de Errores

**Centralizado en interceptor de Axios:**

```typescript
// client.ts
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido → Logout automático
      authStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

**En componentes:**
- Loading states con skeleton/spinner
- Error boundaries para errores inesperados
- Mensajes de error contextuales
- Retry automático en fallos de red

---

## 🎨 Design System

El proyecto implementa un sistema de diseño consistente para evitar repetición de clases y mantener coherencia visual.

### Tokens de Diseño (Tailwind Config)

**Colores**
```javascript
brand: {
  primary: '#00A896',      // Color principal
  'primary-dark': '#008C7A',
  'primary-light': '#02C9B5',
  navy: '#2B4C6F',         // Color secundario
  'navy-dark': '#1E3A5F',
  'navy-light': '#3A5F8F',
}

pastel: {
  pink: '#FFD6E8',
  yellow: '#FFF4CC',
  green: '#D4F4DD',
  blue: '#D6E9FF',
}

status: {
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
}
```

**Sombras**
```javascript
shadow-card: '0 2px 8px rgba(0, 0, 0, 0.08)'
shadow-card-hover: '0 4px 16px rgba(0, 0, 0, 0.12)'
shadow-drawer: '-4px 0 24px rgba(0, 0, 0, 0.15)'
```

**Border Radius**
```javascript
rounded-card: '16px'   // Para cards y contenedores
rounded-input: '8px'   // Para inputs y botones
```

### Componentes Reutilizables (CSS Custom Classes)

**Botones**
```css
.btn-primary      // Botón principal (navy)
.btn-secondary    // Botón secundario (blanco con borde)
.btn-destructive  // Botón de acción destructiva (rojo)
```

**Inputs**
```css
.input           // Input base
.input-error     // Input con error
.label           // Label de formulario
.error-text      // Texto de error
```

**Cards**
```css
.card            // Card base
.card-hover      // Card con hover effect
```

**Tabla**
```css
.table-cell      // Celda de tabla
.table-header    // Header de tabla
```

**Navegación**
```css
.nav-item        // Item de navegación
.nav-item.active // Item activo
```

### Ventajas del Sistema

1. **Consistencia**: Todos los componentes usan los mismos tokens
2. **Mantenibilidad**: Cambios centralizados en `tailwind.config.js` e `index.css`
3. **DX mejorado**: Clases semánticas fáciles de recordar
4. **Menos código**: Evita repetir utilidades de Tailwind
5. **Tipado**: Autocomplete de colores y tokens en VSCode

### Ejemplo de Uso

```tsx
// ❌ Sin Design System (repetitivo)
<button className="bg-[#2B4C6F] text-white rounded-lg px-4 py-2.5 font-semibold transition-all duration-200 hover:bg-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#2B4C6F] disabled:opacity-50">
  Enviar
</button>

// ✅ Con Design System (limpio)
<button className="btn-primary">
  Enviar
</button>
```

---

## 🔒 Seguridad

- Token JWT almacenado en localStorage
- Interceptor que agrega token en cada request
- Protección de rutas privadas
- Logout automático en token expirado
- Validación de inputs en cliente y servidor
- Sanitización de datos de usuario

---

## 📱 Responsive Design

- Mobile-first approach para forms
- Breakpoints de Tailwind
- Tablas con scroll horizontal
- Drawer adaptativo

---

## 🚦 QA Checklist

Ver archivo [QA_CHECKLIST.md](./QA_CHECKLIST.md) para lista completa de pruebas.

---


---

## 👨‍💻 Desarrollado por

**[Maria Elena Arroyo]**  
Frontend Developer  
[maryarroyo85@gmail.com] | [[LinkedIn](https://www.linkedin.com/in/mary-arroyo-herrera/)] 



---


