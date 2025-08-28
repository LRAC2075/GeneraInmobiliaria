import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ModalProvider, useModal } from './context/ModalContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactoPage from './pages/ContactoPage'; // Se importa una sola vez aquí
import HomePage from './pages/HomePage';
import InmobiliariaPage from './pages/InmobiliariaPage';
import PropiedadPage from './pages/PropiedadPage';
import CateringPage from './pages/CateringPage';
import TecnologiaPage from './pages/TecnologiaPage';
import React, { useEffect } from 'react';

// Componente para el Modal Global
const GlobalContactModal = () => {
  const { isModalOpen, closeModal } = useModal();
  if (!isModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div 
        className="bg-light-card dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-lg relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Se utiliza el componente ContactoPage importado */}
        <ContactoPage isModal={true} closeModal={closeModal} />
      </div>
    </div>
  );
};

// Componente principal del layout
const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-light-bg text-light-text dark:bg-brand-dark dark:text-gray-200">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inmobiliaria" element={<InmobiliariaPage />} />
          <Route path="/inmobiliaria/:id" element={<PropiedadPage />} />
          <Route path="/catering" element={<CateringPage />} />
          <Route path="/tecnologia" element={<TecnologiaPage />} />
          {/* La ruta a /contacto ya no es necesaria porque se maneja con el modal */}
        </Routes>
      </main>
      <GlobalContactModal />
      {!isHomePage && <Footer />}
    </div>
  );
};

// Componente raíz de la aplicación
function App() {
  
  // ===============================================
  // LÓGICA PARA OCULTAR EL LOADER - INICIO
  // ===============================================
  useEffect(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      // Espera un poco para que no sea tan brusco (opcional)
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 500); // 500ms de delay
    }
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente
  // ===============================================
  // LÓGICA PARA OCULTAR EL LOADER - FIN
  // ===============================================

  return (
    <ThemeProvider>
      <ModalProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
