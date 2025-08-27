import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Sub-componente para una columna colapsable (SIN CAMBIOS)
const CollapsibleColumn = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleOpen = () => {
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
        {/* --- SECCIÓN DE COLUMNAS (SIN CAMBIOS) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-light-text dark:text-white mb-4">GENERA</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Constructora e Inmobiliaria SAC</p>
            <a href="http://www.generainmobiliaria.com.pe" target="_blank" rel="noopener noreferrer" className="text-light-accent dark:text-brand-gold font-semibold hover:underline">
              www.generainmobiliaria.com.pe
            </a>
          </div>
          <CollapsibleColumn title="Secciones">
            <ul className="space-y-3">
              <li><Link to="/inmobiliaria" className="text-gray-600 dark:text-gray-400 hover:text-light-accent dark:hover:text-brand-gold">Inmobiliaria</Link></li>
              <li><Link to="/catering" className="text-gray-600 dark:text-gray-400 hover:text-light-accent dark:hover:text-brand-gold">Catering</Link></li>
              <li><Link to="/tecnologia" className="text-gray-600 dark:text-gray-400 hover:text-light-accent dark:hover:text-brand-gold">Tecnología</Link></li>
            </ul>
          </CollapsibleColumn>
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

        {/* --- INICIO: NUEVA SECCIÓN DE MAPA INTERACTIVO --- */}
        <div className="mt-10">
            <h4 className="font-semibold text-light-text dark:text-white text-lg mb-4">Nuestra Ubicación</h4>
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249759.1288739943!2d-77.17047231454926!3d-12.02660342026117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c5f619ee3ec7%3A0x14206cb9cc452e4a!2sLima!5e0!3m2!1ses-419!2spe!4v1662580121545!5m2!1ses-419!2spe"
                    className="w-full h-64 grayscale hover:grayscale-0 transition-all duration-300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de GENERA en Lima, Perú"
                ></iframe>
            </div>
        </div>
        {/* --- FIN: NUEVA SECCIÓN DE MAPA INTERACTIVO --- */}

        {/* Línea divisoria y Copyright */}
        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-500">
          <p>&copy; {new Date().getFullYear()} GENERA Constructora e Inmobiliaria SAC. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;  