# 🛒 Tienda Online React - E-commerce App

Este proyecto es una **aplicación de e-commerce completa** desarrollada en React como proyecto final del curso de **React JS en TalentoTech**. La aplicación simula una tienda online con carrito de compras, gestión de usuarios, búsqueda avanzada, paginación y administración completa de productos.

---

## 🚀 Demo en Vivo

🔗 **[Ver aplicación desplegada](https://react25017-diegomaggio.netlify.app)**

---

## ✨ Funcionalidades Principales

- 🛒 **Carrito de compras** - Agregar, eliminar y modificar cantidades
- 👤 **Gestión de usuarios** - Registro, login y sesiones persistentes
- 🔍 **Búsqueda avanzada** - Buscar por nombre o categoría de producto
- 📄 **Paginación inteligente** - Navegación eficiente entre productos
- ⚙️ **CRUD completo de productos** - Crear, leer, actualizar y eliminar productos desde el panel de administración
- ⭐ **Productos destacados** - Sistema para marcar y mostrar productos destacados en la página principal
- 📱 **Diseño responsivo** - Optimizado para móviles, tablets y escritorio
- ♿ **Accesibilidad** - Componentes accesibles y navegación por teclado
- 🎨 **UX/UI moderna** - Interfaz limpia e intuitiva
- 🔔 **Notificaciones** - Feedback visual para acciones del usuario
- 🏷️ **SEO optimizado** - Meta tags dinámicos con React Helmet

---

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- ⚛️ **React 18** - Biblioteca principal
- 🏗️ **Vite** - Herramienta de build rápida
- 🧭 **React Router DOM** - Navegación SPA
- 🎨 **Tailwind CSS** - Framework de estilos utility-first
- 🛎️ **React Hot Toast** - Sistema de notificaciones
- 🏷️ **React Helmet Async** - Gestión de meta tags para SEO
- 🎨 **FontAwesome** - Iconografía consistente y accesible

### **Estado y Contexto**
- 🧠 **Context API** - Estado global (Carrito, Usuarios, Notificaciones)
- 💾 **localStorage** - Persistencia de sesiones de usuario

### **APIs Externas**
- 👥 **FakeStore API** - Datos de usuarios para autenticación
- 📦 **MockAPI** - Gestión completa de productos

---

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── admin/          # Panel de administración y CRUD de productos
│   ├── common/         # Componentes reutilizables
│   ├── layout/         # Componentes de layout (Header, Footer)
│   └── user/           # Componentes específicos de usuario
├── context/            # Contextos globales (Cart, User, Toast)
├── hooks/              # Custom hooks reutilizables
├── pages/              # Páginas principales de la aplicación
└── utils/              # Utilidades y helpers
```

### **Componentes Reutilizables Destacados**
- 🔍 **SearchBox** - Búsqueda con filtros avanzados
- ✅ **ConfirmationModal** - Modal de confirmación reutilizable
- 🏷️ **SEO** - Componente para meta tags dinámicos
- 🃏 **Card** - Tarjeta de producto responsive
- 🔘 **Button** - Botón con variantes y estados
- 📊 **Stepper** - Control numérico para cantidades
- 📝 **Field** - Campo de formulario con validación

---

## ⚙️ Instalación y Configuración

### **Prerrequisitos**
- Node.js (recomendado: v18 o superior)
- npm

### **1. Clonar el repositorio**
```bash
git clone git clone https://github.com/dgmaggio/ProyectoFinalReact.git
cd ProyectoFinalReact
```

### **2. Instalar dependencias**
```bash
npm install
```

### **3. Ejecutar en desarrollo**
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

### **4. Generar build de producción**
```bash
npm run build
```

---

## 🎯 Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run preview    # Vista previa del build
npm run lint       # Verificar código con ESLint
```

---

## 🌐 APIs y Fuentes de Datos

### **FakeStore API**
- **Propósito**: Gestión de usuarios y autenticación
- **Endpoint**: `https://fakestoreapi.com/users`
- **Uso**: Login, registro y datos de perfil

### **MockAPI**
- **Propósito**: Catálogo de productos y administración
- **Funcionalidad**: CRUD completo de productos (Crear, Leer, Actualizar, Eliminar)
- **Características**: Paginación, filtros, búsqueda, productos destacados

---

## 📱 Compatibilidad y Optimización

### **Dispositivos Soportados**
- 📱 **Móviles** - iOS y Android (responsive design)
- 📟 **Tablets** - iPad y tablets Android
- 💻 **Escritorio** - Todos los navegadores modernos

### **Optimizaciones Implementadas**
- ⚡ Lazy loading de componentes
- 🗜️ Optimización de imágenes
- 📦 Code splitting automático con Vite
- 🔄 Gestión eficiente de estado
- 💾 Persistencia selectiva de datos

## ♿ Accesibilidad

### **Estándares Implementados**
- 🎯 **Navegación por teclado** - Todos los elementos interactivos
- 🏷️ **ARIA labels** - Descripciones para screen readers  
- 🎨 **Contraste optimizado** - Cumple estándares WCAG
- 📝 **Roles semánticos** - HTML estructurado correctamente
- 🔍 **Focus visible** - Indicadores claros de navegación

---

## 🚀 Despliegue

La aplicación está desplegada en **Netlify** con integración continua. Cada push a la rama principal actualiza automáticamente la versión en producción.

**URL de producción**: [https://react25017-diegomaggio.netlify.app](https://react25017-diegomaggio.netlify.app)

---

## 👨‍💻 Autor

**Diego Maggio**
- 💼 [LinkedIn](https://www.linkedin.com/in/dgmaggio/)
- 🎨 [Behance](https://behance.net/dgmaggio)
- 📧 Proyecto final - Curso React JS | TalentoTech

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos como parte del curso de React JS en TalentoTech.

---

## 🤝 Contribuciones

Este es un proyecto educativo, pero si encontrás algún bug o tenés sugerencias, no dudes en crear un issue o contactarme.

---

*Desarrollado con ❤️ y ⚛️ React*