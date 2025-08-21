import { NavLink } from 'react-router-dom';

const Header = () => {
  const activeLinkStyle = {
    color: '#c3a478',
    textDecoration: 'underline',
  };

  return (
    <header className="bg-brand-dark border-b border-gray-700 sticky top-0 z-20">
      <nav className="container mx-auto px-4 py-5 flex justify-between items-center">
        <NavLink to="/">
          <h1 className="text-2xl font-bold text-white tracking-wider">MiProyecto</h1>
        </NavLink>
        <ul className="flex space-x-8 text-lg">
          <li><NavLink to="/inmobiliaria" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-brand-gold transition-colors">Inmobiliaria</NavLink></li>
          <li><NavLink to="/catering" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-brand-gold transition-colors">Catering</NavLink></li>
          <li><NavLink to="/tecnologia" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-brand-gold transition-colors">Tecnología</NavLink></li>
          {/* Nuevo enlace a la página de contacto */}
          <li><NavLink to="/contacto" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-brand-gold transition-colors">Contacto</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
