# Épica 10: Purga de CSS y unificación visual con tokens + Tailwind

Esta épica tiene como objetivo eliminar el uso de archivos `.css` o estilos en línea que no provengan del sistema de tokens. Se migrarán todos los estilos a clases utilitarias de Tailwind con soporte de theming.

## Objetivo

Eliminar dependencias de estilos sueltos y concentrar la personalización visual en los tokens y Tailwind. Esto permitirá habilitar dark mode y temas personalizados de forma sencilla.

## Tareas

1. **Detectar uso de `*.css` o estilos en línea**
   - Buscar componentes que importen `.css` directamente.
   - Auditar propiedades `style={{}}` con valores fijos.
2. **Migrar a Tailwind + tokens**
   - Reemplazar las clases de CSS por utilidades Tailwind (`@apply` cuando sea necesario).
   - Sustituir valores fijos por tokens o `var(--token)`.
3. **Refactorizar componentes afectados**
   - Adaptar `Navbar`, `Sidebar`, `Breadcrumb`, `Menu`, `Drawer` y cualquier otro que use CSS suelto.
   - Mantener la responsividad y animaciones existentes.
4. **Reglas para uso de `.css`**
   - Solo se permiten estilos externos cuando se utilice `@apply` o se definan `@keyframes` reutilizables.
   - Dichos estilos deben estar en `src/theme/animations.css` o equivalente.
5. **Verificar soporte de theming**
   - Aplicar clases como `bg-background`, `text-primary`, `border-muted` y similares.
   - Usar variantes `dark:` cuando aplique.
6. **Eliminar archivos `.css` innecesarios**
   - Borrar los archivos que ya no se utilicen y comprobar que la aplicación compila sin warnings.

## Validación

- Ningún componente debe importar `.css` salvo en los casos justificados.
- Todos los estilos visuales deben derivarse de Tailwind o de los tokens definidos.
- Storybook debe mostrar los mismos componentes sin diferencias visuales importantes.
- El sistema de theming debe funcionar sin fricciones.

## Resultado esperado

El design system quedará gobernado únicamente por tokens y Tailwind, habilitando dark mode y personalización de temas con mayor facilidad.
