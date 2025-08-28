import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ModalProvider, useModal } from './context/ModalContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactoPage from './pages/ContactoPage';
import HomePage from './pages/HomePage';
import InmobiliariaPage from './pages/InmobiliariaPage';
import PropiedadPage from './pages/PropiedadPage';
import CateringPage from './pages/CateringPage';
import TecnologiaPage from './pages/TecnologiaPage';
import React, { useEffect } from 'react';
import { AudioProvider } from './context/AudioContext.jsx';

// ===============================================
// CORRECCIÓN 1: RUTA Y NOMBRE DEL ARCHIVO DE AUDIO
// ===============================================
const backgroundMusicSrc = "/Digital Zenith.mp3";

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
        </Routes>
      </main>
      <GlobalContactModal />
      {!isHomePage && <Footer />}
    </div>
  );
};

// Componente raíz de la aplicación
function App() {
  useEffect(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 500);
    }
  }, []);

  // ===============================================
  // CORRECCIÓN 2: ESTRUCTURA DE PROVIDERS ANIDADOS
  // ===============================================
  return (
    <ThemeProvider>
      <ModalProvider>
        <AudioProvider audioSrc={backgroundMusicSrc}>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AudioProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;