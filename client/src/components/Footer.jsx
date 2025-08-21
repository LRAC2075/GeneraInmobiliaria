import { Link } from 'react-router-dom';

// Componente para los íconos de redes sociales
const SocialIcon = ({ href, path }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors">
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* 1. Información de Contacto y Logo */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">MiProyecto</h3>
            <p className="text-gray-400 mb-2">info@miempresa.com</p>
            <p className="text-gray-400 mb-4">(+51) 987 654 321</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <SocialIcon 
                href="#" 
                path="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 2.98,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.48 2.96,10.28 2.38,9.95C2.38,9.97 2.38,9.98 2.38,10C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16.03 6.02,17.25 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" 
              />
              <SocialIcon 
                href="#" 
                path="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.43 12.9,11.24V10.13H10.13V18.5H12.9V13.57C12.9,12.8 13.5,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,6 8,5.44 7.21,5.44C6.42,5.44 5.86,6 5.86,6.88A1.68,1.68 0 0,0 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z" 
              />
              <SocialIcon 
                href="#" 
                path="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" 
              />
            </div>
          </div>

          {/* 2. Enlaces de Navegación */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-white mb-4">Navegación</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-400 hover:text-brand-gold">Inicio</Link></li>
                  <li><Link to="/inmobiliaria" className="text-gray-400 hover:text-brand-gold">Inmobiliaria</Link></li>
                  <li><Link to="/catering" className="text-gray-400 hover:text-brand-gold">Catering</Link></li>
                  <li><Link to="/tecnologia" className="text-gray-400 hover:text-brand-gold">Tecnología</Link></li>
                </ul>
              </div>
              {/* Puedes añadir más columnas de enlaces aquí si es necesario */}
            </div>
          </div>

        </div>

        {/* 3. Copyright */}
        <div className="mt-10 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Mi Proyecto. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
