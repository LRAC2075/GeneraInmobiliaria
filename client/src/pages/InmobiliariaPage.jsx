import { useState, useEffect } from 'react';
import { getPropiedades } from '../api/inmobiliariaAPI';

const InmobiliariaPage = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-10 text-center text-white">Propiedades Exclusivas</h2>
      {loading && <p className="text-center text-gray-400">Cargando propiedades...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && !error && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propiedades.map((prop) => (
            // Tarjeta de propiedad rediseñada para mostrar la nueva data
            <div key={prop.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:border-brand-gold transition-all duration-300 transform hover:-translate-y-1">
              <img src={prop.imagenUrl} alt={prop.nombre} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-white">{prop.nombre}</h3>
                <p className="text-gray-400 mb-4">{prop.ubicacion}</p>
                <p className="text-2xl font-bold mt-4 text-brand-gold">${prop.precio.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InmobiliariaPage;