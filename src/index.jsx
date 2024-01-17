import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Fallback from './Fallback';
import CycleContextProvider from './contexts/CycleContextProvider';
import ToastContextProvider from './contexts/ToastContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ErrorBoundary FallbackComponent={Fallback}>
      <AuthProvider
        authType="cookie"
        authName="_auth"
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <ToastContextProvider>
          <CycleContextProvider>
            <App />
          </CycleContextProvider>
        </ToastContextProvider>
      </AuthProvider>
    </ErrorBoundary>
  </BrowserRouter>,
);

reportWebVitals(console.log());
