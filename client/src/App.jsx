import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import InmobiliariaPage from './pages/InmobiliariaPage';
import CateringPage from './pages/CateringPage';
import TecnologiaPage from './pages/TecnologiaPage';
import PropiedadPage from './pages/PropiedadPage';

// Componente interno para manejar la lógica de la ruta
const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    // Contenedor principal que ocupa toda la pantalla
    <div className="flex flex-col h-screen">
      <Header />
      {/* El 'main' ahora es flexible y crecerá para ocupar el espacio disponible */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inmobiliaria" element={<InmobiliariaPage />} />
          <Route path="/inmobiliaria/:id" element={<PropiedadPage />} />
          <Route path="/catering" element={<CateringPage />} />
          <Route path="/tecnologia" element={<TecnologiaPage />} />
        </Routes>
      </main>
      {/* El footer solo se muestra si NO estamos en la HomePage */}
      {!isHomePage && <Footer />}
    </div>
  );
};


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;