import React from 'react';
import ReactDOM from 'react-dom/client';
// to use react router add library here and wrap whole App with <BrowserRouter>
import { BrowserRouter } from "react-router-dom"

import App from './App';
import { UserProvider } from './contexts/user.context';
import { CategoriesProvider } from './contexts/categories.context';
import { CartProvider } from './contexts/cart.context';

import './index.scss';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
  <React.StrictMode>

    <BrowserRouter>

    
      {/* any component inside UserProvider can access the context value inside the Provider itself */}
      <UserProvider>
        {/* order of Provider matters: In our case we want Products be able to reach up to User Provider, but User Provider can't fetch data from Products, reason e.g. when you fetching products, if you have international application you probably filter down what products user can access by geo location.*/}
        <CategoriesProvider>
          {/* for cartContext user data is needed, e.g. in order to query a db for a users cart if user has not finished card session from previous visit; need access to products details
          */}
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>

    </BrowserRouter>
    
  </React.StrictMode>
);
