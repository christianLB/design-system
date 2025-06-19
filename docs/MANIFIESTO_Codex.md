# Manifiesto Codex

## 1. Propósito del documento
Este documento define el contrato operativo entre Codex (IA desarrolladora) y el repositorio del Design System. Todo trabajo debe seguir estas reglas, sin excepciones.

## 2. Estructura esperada del repo
- `/src/components/`
- `/src/theme/`
- `/src/hooks/`
- `/src/utils/`
- `/src/stories/`
- `/index.ts`

## 3. Reglas de entrega para cada PR
- Debe venir desde una rama por épica o componente
- Debe contener:
  - Componente (`.tsx`)
  - Test (`.test.tsx`) con RTL y jest-axe
  - Documentación (`.stories.tsx` y/o `.stories.mdx`)
  - Uso de `forwardRef` si aplica
  - Estilos tomados desde `theme.ts` / `tokens.json`
  - Accesibilidad básica validada
  - Animaciones sutiles si se especifica
- Debe incluir el checklist completo en el cuerpo del PR
- Debe pasar: `pnpm build`, `pnpm lint`, `pnpm test`, `pnpm storybook`

## 4. Storybook
- Cada componente debe tener:
  - Controles configurados (`argTypes`)
  - Al menos 2 variantes documentadas
  - Props tipadas con JSDoc si aplica

## 5. Tests
- Todos los tests deben usar:
  - React Testing Library
  - jest-axe para accesibilidad
  - Idealmente testear interacciones y estados visuales

## 6. Tokens
- No se permiten valores "mágicos" (hardcode)
- Usar `theme.ts` para todo: color, espaciado, tipografía, motion

## 7. Plantilla de PR
- Usar `.github/PULL_REQUEST_TEMPLATE.md`
- Incluir resumen, checklist, preview de Storybook

## 8. Responsabilidad
- Codex es responsable de validar completamente sus entregas antes de solicitar revisión.
- Si el humano detecta una falla estructural, Codex debe rehacer el trabajo para cumplir con este manifiesto.
