import { NavLink } from 'react-router-dom';

const Header = () => {
  const activeLinkStyle = {
    textDecoration: 'underline',
    color: '#1D4ED8'
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">MiProyecto</h1>
        <ul className="flex space-x-6">
          <li><NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Inicio</NavLink></li>
          <li><NavLink to="/inmobiliaria" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Inmobiliaria</NavLink></li>
          <li><NavLink to="/catering" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Catering</NavLink></li>
          <li><NavLink to="/tecnologia" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Tecnología</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;