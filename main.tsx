import React from 'react';
import ReactDOM from 'react-dom/client';
import ComponentTests from './src/components/ComponentTests';
import { ThemeProvider } from './src/context/ThemeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ComponentTests />
    </ThemeProvider>
  </React.StrictMode>
);
