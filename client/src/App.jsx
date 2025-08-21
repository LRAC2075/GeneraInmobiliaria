import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import InmobiliariaPage from './pages/InmobiliariaPage';
import CateringPage from './pages/CateringPage';
import TecnologiaPage from './pages/TecnologiaPage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        {/* Eliminamos las clases de container y padding de aquí */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inmobiliaria" element={<InmobiliariaPage />} />
            <Route path="/catering" element={<CateringPage />} />
            <Route path="/tecnologia" element={<TecnologiaPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
