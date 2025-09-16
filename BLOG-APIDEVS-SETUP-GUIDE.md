image.png# 📝 APIDevs Trading Blog - Guía Completa de Setup y Configuración

## 🎯 Descripción del Proyecto

**APIDevs Trading Blog** es un blog moderno construido con Next.js 15 y Sanity CMS, diseñado específicamente para contenido de trading, análisis técnico e indicadores para TradingView. Este blog es parte del ecosistema APIDevs Trading Platform.

### 🏗️ Stack Tecnológico
- **Framework**: Next.js 15.5.3
- **CMS**: Sanity Studio v4
- **Estilos**: Tailwind CSS 4.0
- **Lenguaje**: TypeScript
- **Temas**: next-themes (Dark/Light mode)
- **Iconos**: lucide-react
- **Deployment**: Optimizado para Vercel

---

## 🚀 Instalación y Setup

### 1️⃣ **Prerrequisitos**
- Node.js 20 o superior
- npm o yarn
- Cuenta en Sanity.io
- Git

### 2️⃣ **Clonar/Descargar el Proyecto**
```bash
# Si está en un repositorio
git clone [url-del-repo]
cd apidevs-blog

# O si tienes los archivos localmente
cd C:\Users\[tu-usuario]\Documents\proyectos\apidevs-blog
```

### 3️⃣ **Instalar Dependencias**
```bash
npm install
```

### 4️⃣ **Configurar Variables de Entorno**

Crear archivo `.env.local` en la raíz del proyecto:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=txlvgvel
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Optional: For draft mode (si tienes un token)
SANITY_API_READ_TOKEN=
```

**IMPORTANTE**: Reemplazar `txlvgvel` con tu propio Project ID de Sanity si estás creando un proyecto nuevo.

### 5️⃣ **Configuración de Sanity**

#### Opción A: Usar el proyecto existente
Si tienes acceso al proyecto Sanity existente (ID: txlvgvel), no necesitas hacer nada más.

#### Opción B: Crear tu propio proyecto Sanity
```bash
# Instalar Sanity CLI globalmente
npm install -g @sanity/cli

# Iniciar sesión en Sanity
npx sanity login

# El proyecto ya está configurado, pero si necesitas reconfigurarlo:
npx sanity init --reconfigure
```

### 6️⃣ **Iniciar el Servidor de Desarrollo**
```bash
npm run dev
```

El blog estará disponible en:
- **Blog**: http://localhost:3001
- **Sanity Studio**: http://localhost:3001/studio

---

## 📁 Estructura del Proyecto

```
apidevs-blog/
├── app/                    # App Router de Next.js 15
│   ├── page.tsx           # Página principal del blog
│   ├── layout.tsx         # Layout principal con ThemeProvider
│   ├── globals.css        # Estilos globales y Tailwind
│   └── studio/            # Sanity Studio embebido
│       └── [[...tool]]/
├── components/            # Componentes React
│   ├── BlogHeader.tsx     # Header con dark/light toggle
│   ├── PostGrid.tsx       # Grid de posts del blog
│   ├── CategoryFilter.tsx # Filtros por categoría
│   └── ThemeProvider.tsx  # Provider para temas
├── sanity/               # Configuración de Sanity
│   ├── env.ts           # Variables de entorno de Sanity
│   ├── lib/             
│   │   ├── client.ts    # Cliente de Sanity
│   │   ├── image.ts     # Helper para imágenes
│   │   └── live.ts      # Live preview config
│   └── schemaTypes/     # Schemas personalizados
│       ├── postType.ts  # Schema de posts con campos de trading
│       ├── categoryType.ts # Categorías con colores/iconos
│       ├── authorType.ts   # Autores
│       └── blockContentType.ts # Contenido rich text
├── public/              # Archivos estáticos
├── .env.local          # Variables de entorno (crear manualmente)
├── next.config.ts      # Configuración de Next.js
├── tailwind.config.js  # Configuración de Tailwind
├── postcss.config.mjs  # Configuración de PostCSS
└── package.json        # Dependencias y scripts
```

---

## 🎨 Características Implementadas

### ✅ **Frontend Features**
- **Dark/Light Mode Toggle**: Sistema de temas con persistencia
- **Diseño Responsive**: Optimizado para móvil, tablet y desktop
- **Grid de Posts**: Cards modernos con hover effects
- **Filtros por Categoría**: Sistema interactivo de filtrado
- **SEO Optimizado**: Metadata completa, Open Graph, Twitter Cards
- **Navegación**: Header sticky con menú responsive
- **Colores APIDevs**: Verde neón (#10b981) como color principal

### ✅ **Sanity CMS Features**
- **Schemas Personalizados para Trading**:
  - Indicadores relacionados
  - Pares de trading (BTC/USD, EUR/USD, etc.)
  - Timeframes (1m, 5m, 1h, 1D, etc.)
  - Nivel de dificultad (Principiante/Intermedio/Avanzado)
  - Tipo de estrategia (Trend, Reversal, Scalping, etc.)
- **Categorías con Colores**: Cada categoría tiene color e icono único
- **SEO Fields**: Meta title, description, keywords
- **Featured Posts**: Sistema de posts destacados
- **Read Time**: Tiempo estimado de lectura

---

## 🔧 Scripts Disponibles

```json
{
  "dev": "next dev -p 3001",        // Desarrollo en puerto 3001
  "build": "next build",            // Build de producción
  "start": "next start -p 3001",    // Servidor de producción
  "lint": "eslint"                  // Linting
}
```

---

## ⚠️ Problemas Comunes y Soluciones

### 1. **Error: "Missing environment variable"**
**Solución**: Asegúrate de crear el archivo `.env.local` con las variables correctas y reinicia el servidor.

### 2. **Error: "hostname 'cdn.sanity.io' is not configured"**
**Solución**: Ya está configurado en `next.config.ts`. Si persiste, reinicia el servidor.

### 3. **Error con Turbopack**
**Solución**: El proyecto está configurado para NO usar Turbopack. Si ves `--turbopack` en package.json, quítalo.

### 4. **Estilos no se cargan (Tailwind)**
**Solución**: 
- Verifica que `tailwind.config.js` existe
- Verifica que `postcss.config.mjs` está configurado correctamente
- Reinicia el servidor

### 5. **No se ven los posts**
**Solución**:
- Verifica que hayas creado posts en Sanity Studio (/studio)
- Asegúrate de que los posts estén publicados (no en borrador)
- Verifica que tengan categoría y autor asignados

---

## 🚀 Deployment en Vercel

### 1. **Preparar el Proyecto**
```bash
# Asegurarse de que todo funciona localmente
npm run build
```

### 2. **Subir a GitHub**
```bash
git init
git add .
git commit -m "Initial commit - APIDevs Blog"
git remote add origin [tu-repo-url]
git push -u origin main
```

### 3. **Deploy en Vercel**
1. Ir a [vercel.com](https://vercel.com)
2. Importar proyecto desde GitHub
3. Configurar variables de entorno:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
4. Deploy!

### 4. **Configurar Dominio Personalizado** (Opcional)
En Vercel Settings > Domains, agregar: `blog.apidevs.io`

---

## 📝 Crear Contenido en Sanity Studio

### 1. **Acceder al Studio**
- Local: http://localhost:3001/studio
- Producción: https://tu-dominio.com/studio

### 2. **Orden de Creación**
1. **Categorías** (primero):
   - Technical Analysis 📊
   - Estrategias 📈
   - IA & Technology 🤖
   - Indicadores 🎯
   - Product Updates 📰

2. **Autor** (segundo):
   - Crear perfil con nombre y bio
   - Subir avatar

3. **Posts** (tercero):
   - Título atractivo
   - Slug único
   - Asignar categoría y autor
   - Llenar metadata de trading
   - Escribir contenido
   - Marcar como "featured" si es destacado

---

## 🔗 Integración con Proyecto Principal

Este blog está diseñado para funcionar junto con el proyecto principal **apidevs-react**:

- **Proyecto Principal**: Puerto 3000
- **Blog**: Puerto 3001
- **Enlace desde principal**: "Blog" en navbar apunta a blog.apidevs.io
- **Enlace desde blog**: "Ver Indicadores" apunta a apidevs.io/pricing

---

## 🛠️ Tecnologías y Dependencias Principales

```json
{
  "dependencies": {
    "next": "15.5.3",
    "react": "19.1.0",
    "sanity": "^4.9.0",
    "next-sanity": "^11.1.1",
    "@sanity/image-url": "^1.2.0",
    "@sanity/vision": "^4.9.0",
    "next-themes": "^0.4.4",
    "lucide-react": "^0.468.0",
    "tailwindcss": "^4.0.0"
  }
}
```

---

## 👨‍💻 Comandos Útiles para Desarrollo

```bash
# Ver logs de Sanity
npx sanity debug

# Actualizar Sanity
npm update sanity @sanity/vision

# Limpiar cache de Next.js
rm -rf .next

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Soporte y Recursos

- **Documentación Next.js**: https://nextjs.org/docs
- **Documentación Sanity**: https://www.sanity.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Proyecto Principal**: Ver `PROYECTO-APIDEVS-TRADING-RESUMEN-COMPLETO.md` en apidevs-react

---

## 🎉 Estado Actual

- ✅ **Blog 100% Funcional**
- ✅ **Sanity CMS Integrado**
- ✅ **Dark/Light Mode**
- ✅ **Diseño Responsive**
- ✅ **SEO Optimizado**
- ✅ **Schemas Personalizados para Trading**
- ✅ **Listo para Producción**

---

*Última actualización: 17 de Diciembre de 2024*
*Creado por: APIDevs Team*
*Proyecto: APIDevs Trading Blog*
