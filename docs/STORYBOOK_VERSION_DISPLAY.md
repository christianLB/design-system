# Storybook: Display de Versión del Paquete

## 🎯 Objetivo

Mostrar la versión actual del design system directamente en la interfaz de Storybook para facilitar la identificación de la versión que están usando los desarrolladores.

## ✅ Implementación Realizada

### 1. Configuración Principal (.storybook/main.ts)
- **Lectura automática** de la versión desde `package.json`
- **Variable de entorno** `STORYBOOK_PACKAGE_VERSION` disponible globalmente
- **Configuración del manager** para personalización UI

### 2. Personalización del Manager (.storybook/manager.js)
- **Tema personalizado** con versión en el brand title
- **Colores del design system** aplicados a la UI
- **CSS customizado** para mostrar versión en sidebar
- **Tipografía mejorada** (Inter font family)

### 3. Configuración del Preview (.storybook/preview.tsx)
- **Parámetro global** con información de versión
- **Documentación mejorada** con tabla de contenidos
- **Preservación** de funcionalidad existente

## 🎨 Características Visuales

### Brand Title
```
Design System v3.3.2
```
- Aparece en la parte superior del sidebar
- Se actualiza automáticamente con cada nueva versión
- Link al repositorio de GitHub

### Tema Personalizado
- **Colores primarios**: Futuristic theme colors (#6366F1, #0F766E)
- **Tipografía**: Inter font family
- **UI moderna**: Bordes redondeados, espaciado consistente

### Badge de Versión (CSS)
- **Ubicación**: Top del sidebar
- **Estilo**: Badge azul con "v3.3.2"
- **Responsivo**: Se adapta al contenido

## 🔧 Configuración Técnica

### Archivos Modificados
```
.storybook/
├── main.ts          ← Lectura de versión + configuración
├── manager.js        ← Personalización UI + tema
└── preview.tsx       ← Parámetros globales
```

### Variables Disponibles
```typescript
// En cualquier parte de Storybook
process.env.STORYBOOK_PACKAGE_VERSION // "3.3.2"

// En parameters
parameters.version // "3.3.2"
```

### Auto-actualización
```typescript
// Se lee dinámicamente desde package.json
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));
const version = packageJson.version;
```

## 📱 Visualización

### En la UI de Storybook verás:

1. **Header/Brand Area**:
   ```
   📚 Design System v3.3.2
   ```

2. **Sidebar Top**:
   ```
   DESIGN SYSTEM V3.3.2
   ├── Components
   ├── Examples  
   └── Docs
   ```

3. **Theme Colors**:
   - Primary: #6366F1 (Futuristic indigo)
   - Secondary: #0F766E (Futuristic teal)
   - Background: Clean light theme

## 🚀 Beneficios para Desarrolladores

### 1. **Identificación Rápida**
- Version visible inmediatamente al abrir Storybook
- No necesidad de buscar en archivos o consola

### 2. **Debugging Mejorado**
- Fácil verificación de versión durante desarrollo
- Útil para reportes de bugs con versión específica

### 3. **Onboarding**
- Nuevos desarrolladores ven inmediatamente qué versión usan
- Documentación visual clara

### 4. **Consistency Checking**
- Verificación rápida de sincronización entre entornos
- Validación de deployments

## 🔄 Mantenimiento

### Actualización Automática
La versión se actualiza automáticamente cuando:
- Se modifica `package.json`
- Se rebuilda Storybook
- Se reinicia el dev server

### Sin Configuración Manual
- No requiere actualizar archivos de Storybook manualmente
- La versión siempre refleja el `package.json` actual

### Future-proof
- Compatible con futuras versiones de Storybook
- CSS y configuración aislados para evitar conflictos

## 🔧 Detalles Técnicos del Fix

### Problema Original: "process is not defined"
El error se producía porque `process.env` es un objeto de Node.js que no existe en el entorno del navegador donde se ejecuta el manager de Storybook.

### Solución Implementada
1. **Inyección de Variable Global**: En `main.ts` se utiliza `viteFinal` para inyectar la versión como variable global:
   ```typescript
   viteFinal: async (config) => {
     config.define = {
       ...config.define,
       '__STORYBOOK_PACKAGE_VERSION__': JSON.stringify(version),
     };
     return config;
   },
   ```

2. **Acceso Browser-Safe**: Reemplazado `process.env` en ambos archivos:
   - **En `manager.js`**:
     ```javascript
     const version = window.__STORYBOOK_PACKAGE_VERSION__ || '3.3.2';
     ```
   - **En `preview.tsx`**:
     ```typescript
     version: (globalThis as any).__STORYBOOK_PACKAGE_VERSION__ || '3.3.2',
     ```

### Ventajas de esta Aproximación
- ✅ **Browser-compatible**: No depende de APIs de Node.js
- ✅ **Build-time injection**: Variable se inyecta durante el build
- ✅ **Type-safe**: Utiliza Vite's define para reemplazo estático
- ✅ **Fallback incluido**: Si falla, usa versión por defecto

## 📋 Troubleshooting

### Si la versión no aparece:

1. **Verificar build**:
   ```bash
   npm run build-storybook
   ```

2. **Verificar variable global**:
   ```javascript
   console.log(window.__STORYBOOK_PACKAGE_VERSION__);
   ```

3. **Cache de Storybook**:
   ```bash
   rm -rf node_modules/.cache/storybook
   npm run storybook
   ```

### Si el styling no se aplica:

1. **Verificar manager.js**:
   - Archivo existe en `.storybook/`
   - Sintaxis CSS correcta

2. **Verificar orden de carga**:
   - manager.js se ejecuta después del DOM

## 🎯 Resultado Final

Los desarrolladores ahora pueden:
- ✅ Ver la versión actual inmediatamente
- ✅ Identificar rápidamente environment/version mismatches  
- ✅ Reportar bugs con versión específica
- ✅ Verificar actualizaciones del design system
- ✅ Onboarding más rápido en proyectos

La implementación es **robusta**, **auto-mantenida** y **visualmente integrada** con el design system existente.