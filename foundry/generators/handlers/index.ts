/**
 * Handler Registry
 *
 * Exports all category handlers and provides handler lookup
 */

import type { CategoryHandler, ComponentCategory } from '../core/types';
import { actionHandler } from './action-handler';
import { inputHandler } from './input-handler';
import { surfaceHandler } from './surface-handler';
import { feedbackHandler } from './feedback-handler';
import { displayHandler } from './display-handler';
import { navigationHandler } from './navigation-handler';
import { layoutHandler } from './layout-handler';
import { overlayHandler } from './overlay-handler';

/**
 * Registry of category handlers
 */
export const HANDLERS: Record<ComponentCategory, CategoryHandler> = {
  action: actionHandler,
  input: inputHandler,
  surface: surfaceHandler,
  feedback: feedbackHandler,
  display: displayHandler,
  navigation: navigationHandler,
  layout: layoutHandler,
  overlay: overlayHandler,
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
export { feedbackHandler } from './feedback-handler';
export { displayHandler } from './display-handler';
export { navigationHandler } from './navigation-handler';
export { layoutHandler } from './layout-handler';
export { overlayHandler } from './overlay-handler';
