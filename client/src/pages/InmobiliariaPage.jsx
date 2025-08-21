import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPropiedades } from '../api/inmobiliariaAPI';

// Componente de Icono reutilizable para las características
const FeatureIcon = ({ path, value }) => (
  <div className="flex items-center space-x-2 text-gray-400">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
    e.preventDefault(); // Prevenir la navegación al hacer clic en el corazón
    e.stopPropagation(); // Detener la propagación del evento
    setFavoritos(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-10 text-center text-white">Propiedades Exclusivas</h2>
      {loading && <p className="text-center text-gray-400">Cargando propiedades...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propiedades.map((prop) => {
            const esFavorito = favoritos.includes(prop.id);
            return (
              // 2. Envolver la tarjeta en un componente Link
              <Link to={`/inmobiliaria/${prop.id}`} key={prop.id} className="block">
                <div className="relative bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg h-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-brand-gold/20 hover:-translate-y-2">
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
                       <FeatureIcon path="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" value={`${prop.habitaciones} hab.`} />
                       <FeatureIcon path="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" value={`${prop.banos} baños`} />
                       <FeatureIcon path="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5v4m0 0h4" value={`${prop.metrosCuadrados} m²`} />
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
