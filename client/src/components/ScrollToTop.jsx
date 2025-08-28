// src/components/ScrollToTop.jsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Extrae el "pathname" (ej. "/inmobiliaria/1") del objeto de ubicación
  const { pathname } = useLocation();

  // useEffect se ejecutará cada vez que el "pathname" cambie
  useEffect(() => {
    // Le ordena al navegador que haga scroll a la posición (0, 0) - la esquina superior izquierda
    window.scrollTo(0, 0);
  }, [pathname]); // El array de dependencias asegura que esto se active solo al cambiar la URL

  // Este componente no renderiza nada en la pantalla
  return null;
};

export default ScrollToTop;