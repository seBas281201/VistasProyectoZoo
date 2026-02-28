# 🦁 Zoo Manager — Frontend Angular 17

Frontend Angular 17+ para el Sistema de Gestión Zoológico.
Se conecta al backend Spring Boot en `http://localhost:8001`.

---

## ▶️ Inicio rápido

### 1. Prerequisitos

```bash
node --version   # >= 18.x
npm --version    # >= 9.x
```

### 2. Crear el proyecto desde cero (alternativa recomendada)

```bash
# Instalar Angular CLI globalmente
npm install -g @angular/cli@17

# Crear el proyecto
ng new zoologico-frontend \
  --style=scss \
  --routing=true \
  --standalone=true \
  --skip-tests=true

cd zoologico-frontend

# Instalar Angular Material
ng add @angular/material
# → Seleccionar tema: Custom
# → Set up global typography: Yes
# → Set up browser animations: Yes
```

### 3. Copiar los archivos del proyecto

Reemplaza el contenido generado con los archivos de este proyecto (mantén la estructura de carpetas).

### 4. Instalar dependencias

```bash
npm install
```

### 5. Ejecutar el frontend

```bash
ng serve
# → Abre http://localhost:4200
```

---

## 🔧 Configuración de entorno

El archivo de entorno es `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8001/api'
};
```

Cambia `apiUrl` si el backend corre en otro host o puerto.

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── core/
│   │   └── interceptors/
│   │       └── http.interceptors.ts        # Base URL + manejo global de errores
│   ├── shared/
│   │   ├── components/
│   │   │   ├── confirm-dialog.component.ts # Diálogo de confirmación de borrado
│   │   │   └── loading.component.ts        # Spinner de carga
│   │   └── models/
│   │       └── models.ts                   # Interfaces y enums del backend
│   ├── features/
│   │   ├── animales/
│   │   │   ├── animal.service.ts
│   │   │   ├── animales-list.component.ts
│   │   │   └── animal-form.component.ts
│   │   ├── alimentacion/
│   │   │   ├── alimentacion.service.ts
│   │   │   ├── alimentacion-list.component.ts
│   │   │   └── alimentacion-form.component.ts
│   │   ├── citas/
│   │   │   ├── cita-medica.service.ts
│   │   │   ├── citas-list.component.ts
│   │   │   └── cita-form.component.ts
│   │   └── usuarios/
│   │       ├── usuario.service.ts
│   │       ├── usuarios-list.component.ts
│   │       └── usuario-form.component.ts
│   ├── app.component.ts                    # Layout con sidenav
│   ├── app.config.ts                       # Providers (HttpClient, Router, Material)
│   └── app.routes.ts                       # Rutas lazy-loaded
├── environments/
│   └── environment.ts
├── index.html
├── main.ts
└── styles.scss                             # Angular Material theme + globales
```

---

## 🌐 Endpoints consumidos

| Entidad | Operaciones |
|---|---|
| **Animales** | GET /api/animales, POST, PUT /{id}, DELETE /{id} |
| **Alimentación** | GET /api/alimentaciones, POST, PUT /{id}, DELETE /{id} |
| **Citas Médicas** | GET /api/citas, POST, PUT /{id}, DELETE /{id} |
| **Usuarios** | GET /api/usuarios, POST, PUT /{id}, DELETE /{id} |

---

## ✅ Funcionalidades implementadas

- Listado en tabla (mat-table) con estados visuales diferenciados por color
- Formulario de creación y edición por entidad
- Confirmación antes de eliminar (MatDialog)
- Validaciones de formulario alineadas 1:1 con el backend
- Manejo global de errores HTTP (400, 404, 409) vía interceptor
- Notificaciones de éxito/error con MatSnackBar
- Loading spinner durante peticiones
- Lazy loading de módulos por feature
- Signals de Angular para estado reactivo
- Sidebar de navegación con indicador de ruta activa
- Selector de fecha con MatDatepicker para CitaMedica
- Selector de animales y usuarios en formularios relacionados

---

## 🔒 Notas sobre CORS

El backend debe permitir peticiones desde `http://localhost:4200`.
Si no lo hace, añade en Spring Boot:

```java
@CrossOrigin(origins = "http://localhost:4200")
```

O configura un `WebMvcConfigurer` global con CORS permitido.
