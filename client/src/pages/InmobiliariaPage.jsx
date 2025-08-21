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
    <div>
      <h2 className="text-3xl font-bold mb-6">Propiedades Disponibles</h2>
      {loading && <p>Cargando propiedades...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propiedades.map((prop) => (
            <div key={prop.id} className="border rounded-lg p-4 shadow-lg bg-white">
              <h3 className="text-xl font-semibold mb-2">{prop.titulo}</h3>
              <p className="text-gray-600">{prop.descripcion}</p>
              <p className="text-lg font-bold mt-4 text-blue-600">${prop.precio.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InmobiliariaPage;