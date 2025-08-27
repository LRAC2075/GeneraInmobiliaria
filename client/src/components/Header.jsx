import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useModal } from '../context/ModalContext';
import logoClaro from '../assets/GeneraInmobiliaria_claro.svg';
import logoOscuro from '../assets/GeneraInmobiliaria_oscuro.svg';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { openModal } = useModal();

  const foundingYear = 2005;
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - foundingYear;

  const activeLinkStyle = {
    color: theme === 'dark' ? '#c3a478' : '#b59469',
    textDecoration: 'underline',
  };

  return (
    <header className="bg-light-card dark:bg-brand-dark border-b border-light-subtle dark:border-gray-700 sticky top-0 z-20">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 sm:gap-4">
            <img 
              src={logoClaro} 
              alt="Logo de GENERA" 
              className="h-12 w-auto dark:hidden"
            />
            <img 
              src={logoOscuro} 
              alt="Logo de GENERA" 
              className="h-12 w-auto hidden dark:block"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-2xl font-bold text-gray-800 dark:text-white tracking-wider leading-tight">
                GENERA
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 tracking-wide">
                Constructora e Inmobiliaria
              </span>
            </div>
          </Link>

          {/* --- CAMBIO 1: BREAKPOINT AJUSTADO DE 'md' A 'lg' PARA EVITAR SUPERPOSICIÓN --- */}
          <div className="hidden lg:flex items-center ml-4 pl-4 border-l border-gray-300 dark:border-gray-600">
            <div className="flex flex-col text-left">
                {/* --- CAMBIO 2: APLICADOS COLORES DE ACENTO PARA MAYOR DINAMISMO --- */}
                <span className="text-2xl font-bold text-light-accent dark:text-brand-gold leading-tight transition-colors duration-300">
                    {experienceYears}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 tracking-wide">
                    Años de Experiencia
                </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-6">
          <ul className="hidden md:flex items-center space-x-8 text-lg">
            <li><NavLink to="/inmobiliaria" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-light-accent dark:hover:text-brand-gold transition-colors">Inmobiliaria</NavLink></li>
            <li><NavLink to="/catering" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-light-accent dark:hover:text-brand-gold transition-colors">Catering</NavLink></li>
            <li><NavLink to="/tecnologia" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-light-accent dark:hover:text-brand-gold transition-colors">Tecnología</NavLink></li>
          </ul>
          
          <button 
            onClick={openModal} 
            className="bg-light-accent dark:bg-brand-gold text-white dark:text-brand-dark font-semibold px-3 sm:px-5 py-2 rounded-lg text-sm sm:text-md hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Contáctanos
          </button>
          
          <button onClick={toggleTheme} className="p-2 rounded-full bg-light-subtle dark:bg-gray-800">
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light-text" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;