import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './presentation/shared/components/ErrorBoundary';
import { ThemeProvider } from './application/context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
