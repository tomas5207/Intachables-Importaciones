import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react'; // Importar BrowserRouter aquí
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-7sf578yb85qz36t2.us.auth0.com"
      clientId="m4LkwTQdTNeVk4ymEyV40xWK0L3vh3nD"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
    <BrowserRouter> 
      <App />
    </BrowserRouter>
    </Auth0Provider>
  </StrictMode>
);
