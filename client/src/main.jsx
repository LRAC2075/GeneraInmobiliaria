import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. Importa tu archivo SVG directamente
import faviconURL from '/public/GeneraInmobiliaria_original.svg';

// 2. Crea una función para establecer el favicon
const setFavicon = (url) => {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = url;
};

// 3. Llama a la función al cargar la aplicación
setFavicon(faviconURL);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);