import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPropiedadById } from '../api/inmobiliariaAPI.js';
import ImageWithFallback from '../components/ImageWithFallback.jsx';
import { useModal } from '../context/ModalContext.jsx';
import { Bed, Bath, Ruler, ArrowLeft } from 'lucide-react';

// --- Hooks y Componentes Reutilizables ---

const useAnimateOnScroll = () => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  return ref;
};

const AnimatedSection = ({ children, className = '', style = {} }) => {
  const ref = useAnimateOnScroll();
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out opacity-0 translate-y-10 ${className}`} style={style}>
      {children}
    </div>
  );
};

const FeatureIcon = ({ icon, value, label }) => (
  <div className="flex items-center space-x-3">
    <div className="flex-shrink-0 text-teal-500 dark:text-teal-400">
      {icon}
    </div>
    <div>
      <p className="font-semibold text-gray-800 dark:text-gray-200">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  </div>
);

// --- Componente Principal: PropiedadPage ---

export default function PropiedadPage() {
  const [propiedad, setPropiedad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { openModal } = useModal();

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

  if (loading) return <p className="text-center py-20 dark:text-white">Cargando propiedad...</p>;
  if (error) return <p className="text-center text-red-500 py-20">{error}</p>;
  if (!propiedad) return null;

  const mapSrc = `https://maps.google.com/maps?q=${propiedad.lat},${propiedad.lon}&z=15&output=embed`;

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <AnimatedSection>
          <Link to="/inmobiliaria" className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:underline mb-8 font-semibold">
            <ArrowLeft size={20} />
            Volver al listado
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">{propiedad.nombre}</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 mt-2 mb-8">{propiedad.ubicacion}</p>
        </AnimatedSection>

        <AnimatedSection style={{ transitionDelay: '200ms' }}>
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
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <AnimatedSection style={{ transitionDelay: '400ms' }}>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">Descripción</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-12">{propiedad.descripcion}</p>
            </AnimatedSection>
            
            <AnimatedSection style={{ transitionDelay: '600ms' }}>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">Ubicación</h2>
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
            </AnimatedSection>
          </div>
          <div>
            <AnimatedSection className="sticky top-28" style={{ transitionDelay: '500ms' }}>
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Detalles Clave</h3>
                <div className="space-y-6">
                  <p className="text-4xl font-bold text-teal-600 dark:text-teal-400">${propiedad.precio.toLocaleString()}</p>
                  <FeatureIcon icon={<Bed size={28} />} value={propiedad.habitaciones} label="Habitaciones" />
                  <FeatureIcon icon={<Bath size={28} />} value={propiedad.banos} label="Baños" />
                  <FeatureIcon icon={<Ruler size={28} />} value={`${propiedad.metrosCuadrados} m²`} label="Superficie" />
                </div>
                <button 
                  onClick={openModal}
                  className="w-full mt-8 bg-teal-500 text-white font-bold py-3 rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Contactar Agente
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};
