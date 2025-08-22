import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Sub-componente para una columna colapsable
const CollapsibleColumn = ({ title, children }) => {
  // En pantallas grandes, siempre está abierto. En móviles, empieza cerrado.
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    // Llama al handler una vez al inicio por si acaso
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleOpen = () => {
    // Solo permite cerrar/abrir en pantallas pequeñas
    if (window.innerWidth < 768) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <button 
        onClick={toggleOpen} 
        className="w-full flex justify-between items-center text-left md:pointer-events-none"
      >
        <h4 className="font-semibold text-light-text dark:text-white text-lg">{title}</h4>
        {/* Flecha solo visible en móvil */}
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-500 md:hidden transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        {children}
      </div>
    </div>
  );
};

const FooterContactItem = ({ title, email }) => (
  <div>
    <h5 className="font-semibold text-light-text dark:text-white mb-1 text-base">{title}</h5>
    <a href={`mailto:${email}`} className="text-gray-600 dark:text-gray-400 hover:text-light-accent dark:hover:text-brand-gold transition-colors break-all text-sm">
      {email}
    </a>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-light-subtle dark:bg-gray-900 text-base">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Columna 1: GENERA (siempre visible) */}
          <div>
            <h3 className="text-2xl font-bold text-light-text dark:text-white mb-4">GENERA</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Constructora e Inmobiliaria SAC</p>
            <a href="http://www.generainmobiliaria.com.pe" target="_blank" rel="noopener noreferrer" className="text-light-accent dark:text-brand-gold font-semibold hover:underline">
              www.generainmobiliaria.com.pe
            </a>
          </div>

          {/* Columna 2: Navegación (Colapsable) */}
          <CollapsibleColumn title="Secciones">
            <ul className="space-y-3">
              <li><Link to="/inmobiliaria" className="text-gray-600 dark:text-gray-400 hover:text-light-accent dark:hover:text-brand-gold">Inmobiliaria</Link></li>
              <li><Link to="/catering" className="text-gray-600 dark:text-gray-400 hover:text-light-accent dark:hover:text-brand-gold">Catering</Link></li>
              <li><Link to="/tecnologia" className="text-gray-600 dark:text-gray-400 hover:text-light-accent dark:hover:text-brand-gold">Tecnología</Link></li>
            </ul>
          </CollapsibleColumn>

          {/* Columna 3: Contacto (Colapsable) */}
          <CollapsibleColumn title="Información de Contacto">
            <div className="space-y-4">
              <FooterContactItem 
                title="Ventas"
                email="ventas1@generainmobiliaria.com.pe"
              />
              <FooterContactItem 
                title="Contacto General"
                email="contacto@generainmobiliaria.com.pe"
              />
              <FooterContactItem 
                title="Evy Marin"
                email="evy.marin@generainmobiliaria.com.pe"
              />
            </div>
          </CollapsibleColumn>

        </div>

        {/* Línea divisoria y Copyright */}
        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-500">
          <p>&copy; {new Date().getFullYear()} GENERA Constructora e Inmobiliaria SAC. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
