// Force the stories to display properly
import { addons } from '@storybook/manager-api';

addons.setConfig({
  // Show story in full screen by default
  isFullscreen: false,
  // Always show the toolbar
  showToolbar: true,
  // Force sidebar to be open by default
  initialActive: 'sidebar',
  // Don't collapse sidebar panels by default
  collapsedRoots: [],
  // Disable shortcuts that might interfere with story display
  enableShortcuts: false,
});
