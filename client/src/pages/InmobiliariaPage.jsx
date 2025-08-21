import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPropiedades } from '../api/inmobiliariaAPI';

// Componente para un paso del proceso
const ProcesoStep = ({ iconPath, title, description }) => (
  <div className="text-center">
    <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-gray-800 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
      </svg>
    </div>
    <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
    <p className="text-gray-400">{description}</p>
  </div>
);

// Componente para el icono de la tarjeta de propiedad
const FeatureIcon = ({ path, value }) => (
  <div className="flex items-center space-x-2 text-gray-400">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
    <span>{value}</span>
  </div>
);

const InmobiliariaPage = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchPropiedades = async () => {
      try {
        setLoading(true);
        const data = await getPropiedades();
        setPropiedades(data);
        setError(null);
      } catch (err) {
        setError('No se pudo cargar la información. Intenta de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPropiedades();
  }, []);

  const toggleFavorito = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setFavoritos(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-10 text-center text-white">Propiedades Exclusivas</h2>

      {/* 1. Sección "Nuestro Proceso" con ÍCONOS CORREGIDOS */}
      <section className="bg-gray-900 rounded-lg p-8 md:p-12 mb-12">
        <h3 className="text-3xl font-bold text-center text-white mb-8">Nuestro Proceso de Creación</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <ProcesoStep
            iconPath="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"
            title="1. Conceptualización y Diseño"
            description="Colaboramos estrechamente contigo para transformar tu visión en un diseño arquitectónico innovador y funcional."
          />
          <ProcesoStep
            iconPath="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 11.25h6M9 15.75h6"
            title="2. Construcción y Gestión"
            description="Ejecutamos el proyecto con los más altos estándares de calidad, utilizando materiales de primera y gestionando cada fase con precisión."
          />
          <ProcesoStep
            iconPath="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
            title="3. Entrega y Post-Venta"
            description="Entregamos espacios listos para ser vividos, ofreciendo un servicio post-venta que garantiza tu total satisfacción y tranquilidad."
          />
        </div>
        <p className="text-center text-gray-400">
          Para más información sobre nuestros proyectos y cómo podemos ayudarte a crear tu espacio, <Link to="/contacto" className="text-brand-gold hover:underline">contáctanos hoy mismo</Link>.
        </p>
      </section>

      {/* Galería de Propiedades */}
      {loading && <p className="text-center text-gray-400">Cargando propiedades...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propiedades.map((prop) => {
            const esFavorito = favoritos.includes(prop.id);
            return (
              <Link to={`/inmobiliaria/${prop.id}`} key={prop.id} className="block">
                <div 
                  className="relative bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg h-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-brand-gold/20 hover:-translate-y-2"
                >
                  {prop.tag && (
                    <div className="absolute top-0 left-0 bg-brand-gold text-brand-dark text-sm font-bold px-3 py-1 rounded-br-lg z-10">
                      {prop.tag}
                    </div>
                  )}
                  <button 
                    onClick={(e) => toggleFavorito(e, prop.id)}
                    className="absolute top-4 right-4 bg-gray-900/50 p-2 rounded-full text-white hover:bg-gray-900/75 transition-colors z-10"
                    aria-label="Añadir a favoritos"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill={esFavorito ? 'currentColor' : 'none'} strokeWidth={esFavorito ? 0 : 2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <img src={prop.imagenUrl} alt={prop.nombre} className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2 text-white">{prop.nombre}</h3>
                    <p className="text-gray-400 mb-4">{prop.ubicacion}</p>
                    <p className="text-3xl font-bold my-4 text-brand-gold">${prop.precio.toLocaleString()}</p>
                    <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                      <FeatureIcon path="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" value={`${prop.habitaciones} hab.`} />
                      <FeatureIcon path="M3 10.5a2.5 2.5 0 015 0V12h11v-1.5a2.5 2.5 0 015 0V12h-2v9.5a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 015.5 21.5V12H3v-1.5zM10 6.5a2 2 0 100-4 2 2 0 000 4z" value={`${prop.banos} baños`} />
                      <FeatureIcon path="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9M20.25 20.25h-4.5m4.5 0v-4.5m0 4.5L15 15" value={`${prop.metrosCuadrados} m²`} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InmobiliariaPage;
