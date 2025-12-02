import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import main design system CSS (includes all component styles)
import '../index.css';
// Import showcase-specific overrides
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
