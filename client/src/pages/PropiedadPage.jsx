import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPropiedadById } from '../api/inmobiliariaAPI';
import ImageWithFallback from '../components/ImageWithFallback';

const FeatureIcon = ({ path, value, label }) => (
  <div className="flex items-center space-x-3">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-light-accent dark:text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
    <div>
      <p className="font-semibold text-light-text dark:text-gray-300">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  </div>
);

const PropiedadPage = () => {
  const [propiedad, setPropiedad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPropiedad = async () => {
      try {
        setLoading(true);
        const data = await getPropiedadById(id);
        setPropiedad(data);
      } catch (err) {
        setError('No se pudo encontrar la propiedad.');
      } finally {
        setLoading(false);
      }
    };
    fetchPropiedad();
  }, [id]);

  if (loading) return <p className="text-center py-20">Cargando propiedad...</p>;
  if (error) return <p className="text-center text-red-500 py-20">{error}</p>;
  if (!propiedad) return null;

  // URL del mapa corregida para ser compatible con todos los navegadores
  const mapSrc = `https://maps.google.com/maps?q=${propiedad.lat},${propiedad.lon}&z=15&output=embed`;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/inmobiliaria" className="text-light-accent dark:text-brand-gold hover:underline mb-8 inline-block">&larr; Volver al listado</Link>

      <h1 className="text-4xl md:text-5xl font-bold text-light-text dark:text-white">{propiedad.nombre}</h1>
      <p className="text-xl text-gray-500 dark:text-gray-400 mt-2 mb-8">{propiedad.ubicacion}</p>

      <div className="mb-12">
        <div className="mb-4">
          <ImageWithFallback src={propiedad.imagenUrl} alt={propiedad.nombre} className="w-full h-auto max-h-[600px] object-cover rounded-lg shadow-lg" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {propiedad.galeria.map((img, index) => (
            <div key={index}>
              <ImageWithFallback src={img} alt={`Vista ${index + 1}`} className="w-full h-64 object-cover rounded-lg shadow-lg" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-light-text dark:text-white border-b border-light-subtle dark:border-gray-700 pb-4 mb-6">Descripción</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-12">{propiedad.descripcion}</p>

          <h2 className="text-3xl font-bold text-light-text dark:text-white border-b border-light-subtle dark:border-gray-700 pb-4 mb-6">Ubicación</h2>
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div>
          <div className="bg-light-subtle dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 sticky top-28">
            <h3 className="text-2xl font-bold text-light-text dark:text-white mb-6">Detalles Clave</h3>
            <div className="space-y-6">
              <p className="text-4xl font-bold text-light-accent dark:text-brand-gold">${propiedad.precio.toLocaleString()}</p>
              <FeatureIcon path="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" value={propiedad.habitaciones} label="Habitaciones" />
              <FeatureIcon path="M3 10.5a2.5 2.5 0 015 0V12h11v-1.5a2.5 2.5 0 015 0V12h-2v9.5a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 015.5 21.5V12H3v-1.5zM10 6.5a2 2 0 100-4 2 2 0 000 4z" value={propiedad.banos} label="Baños" />
              <FeatureIcon path="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9M20.25 20.25h-4.5m4.5 0v-4.5m0 4.5L15 15" value={`${propiedad.metrosCuadrados} m²`} label="Superficie" />
            </div>
            <button className="w-full mt-8 bg-light-accent dark:bg-brand-gold text-white dark:text-brand-dark font-bold py-3 rounded-lg hover:opacity-90 transition-colors">
              Contactar Agente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropiedadPage;
