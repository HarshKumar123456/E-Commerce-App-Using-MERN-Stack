import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from '../context/auth.jsx';
import { CartProvider } from '../context/cart.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
    <AuthProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </AuthProvider>
  </CartProvider>,
)
