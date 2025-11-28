/**
 * Handler Registry
 *
 * Exports all category handlers and provides handler lookup
 */

import type { CategoryHandler, ComponentCategory } from '../core/types';
import { actionHandler } from './action-handler';
import { inputHandler } from './input-handler';
import { surfaceHandler } from './surface-handler';

/**
 * Registry of category handlers
 */
export const HANDLERS: Record<ComponentCategory, CategoryHandler> = {
  action: actionHandler,
  input: inputHandler,
  surface: surfaceHandler,
  // Stub handlers for categories not yet implemented
  display: actionHandler, // Fallback to action
  feedback: surfaceHandler, // Fallback to surface
  layout: surfaceHandler, // Fallback to surface
  navigation: actionHandler, // Fallback to action
};

/**
 * Get handler for a category
 */
export function getHandler(category: ComponentCategory): CategoryHandler {
  return HANDLERS[category] || actionHandler;
}

export { actionHandler } from './action-handler';
export { inputHandler } from './input-handler';
export { surfaceHandler } from './surface-handler';
