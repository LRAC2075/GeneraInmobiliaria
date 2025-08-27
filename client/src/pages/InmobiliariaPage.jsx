import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getPropiedades } from '/src/api/inmobiliariaAPI.js';
import SectionHeader from '/src/components/SectionHeader.jsx';
import { useModal } from '/src/context/ModalContext.jsx';
import { useTheme } from '/src/context/ThemeContext.jsx';
import { Bed, Bath, Ruler } from 'lucide-react';

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

const TestimonialCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative w-full max-w-3xl mx-auto text-center h-48 flex items-center">
      {testimonials.map((testimonial, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-xl italic text-gray-700 dark:text-gray-300">"{testimonial.quote}"</p>
          <p className="mt-4 font-bold text-gray-800 dark:text-white">{testimonial.name}</p>
          <p className="text-sm text-teal-600 dark:text-teal-400">{testimonial.location}</p>
        </div>
      ))}
    </div>
  );
};


// --- Componente Principal: InmobiliariaPage ---

export default function InmobiliariaPage() {
  const { openModal } = useModal();
  const { theme } = useTheme();

  const [allPropiedades, setAllPropiedades] = useState([]);
  const [filteredPropiedades, setFilteredPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoritos, setFavoritos] = useState([]);
  const [activeFilter, setActiveFilter] = useState('todas');

  const testimonials = [
    { quote: "El nivel de detalle y profesionalismo superó todas nuestras expectativas. Encontramos la casa de nuestros sueños.", name: "Carlos y Sofía R.", location: "Cancún" },
    { quote: "Un proceso transparente y eficiente de principio a fin. El equipo demostró un compromiso increíble con la calidad.", name: "Ana Valenzuela", location: "Ciudad de México" },
    { quote: "Transformaron una propiedad histórica en una obra de arte moderna sin perder su esencia. Estamos encantados.", name: "Javier Mendoza", location: "San Miguel de Allende" },
  ];

  useEffect(() => {
    const fetchPropiedades = async () => {
      try {
        setLoading(true);
        const data = await getPropiedades();
        setAllPropiedades(data);
        setFilteredPropiedades(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPropiedades();
  }, []);

  useEffect(() => {
    if (activeFilter === 'todas') {
      setFilteredPropiedades(allPropiedades);
    } else {
      const result = allPropiedades.filter(p => p.ubicacion.toLowerCase().includes(activeFilter.toLowerCase()));
      setFilteredPropiedades(result);
    }
  }, [activeFilter, allPropiedades]);

  const toggleFavorito = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setFavoritos(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const heroBackgroundImage = theme === 'dark' 
    ? 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop' 
    : 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1992&auto=format&fit=crop';

  const filterOptions = ['todas', 'Cancún', 'Polanco', 'Tulum', 'Valle de Bravo'];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* --- Hero Banner --- */}
      <section 
        className="relative w-full h-[70vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${heroBackgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <AnimatedSection className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">Tu Próximo Espacio Exclusivo te Espera</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">Descubre propiedades que definen el lujo y la vanguardia.</p>
        </AnimatedSection>
      </section>

      <main>
        {/* --- Sección de Nuestro Compromiso (Diseño de línea mejorado) --- */}
        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto">
            <AnimatedSection>
              <SectionHeader
                title="Nuestro Compromiso con la Excelencia"
                subtitle="Un enfoque estructurado y colaborativo para garantizar resultados excepcionales en cada propiedad."
              />
            </AnimatedSection>
            <div className="relative flex flex-col md:flex-row justify-between items-start max-w-5xl mx-auto mt-12 space-y-12 md:space-y-0">
              {/* Conectores curvos para desktop */}
              <div className="absolute top-8 left-0 w-full h-full hidden md:block">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0">
                  <path d="M 16.66% 40 C 33.33% 40, 33.33% 80, 50% 80" strokeDasharray="5, 5" className="stroke-current text-teal-300 dark:text-teal-700" strokeWidth="2" fill="none"/>
                  <path d="M 50% 80 C 66.66% 80, 66.66% 40, 83.33% 40" strokeDasharray="5, 5" className="stroke-current text-teal-300 dark:text-teal-700" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              {[
                { number: '01', title: 'Conceptualización', description: 'Analizamos tus sueños y necesidades para definir el proyecto perfecto.' },
                { number: '02', title: 'Construcción', description: 'Ejecutamos con los más altos estándares de calidad y materiales premium.' },
                { number: '03', title: 'Entrega', description: 'Te entregamos las llaves de un espacio que supera todas las expectativas.' },
              ].map((step, index) => (
                <AnimatedSection key={index} className="flex-1 z-10" style={{ transitionDelay: `${index * 200}ms` }}>
                  <div className="flex items-start md:flex-col md:items-center md:text-center">
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-teal-500 text-white font-bold text-2xl rounded-full border-4 border-gray-50 dark:border-gray-800 mb-4">
                      {step.number}
                    </div>
                    <div className="ml-6 md:ml-0">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* --- Sección de Testimonios --- */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <AnimatedSection>
              <SectionHeader 
                title="Lo que dicen nuestros clientes"
                subtitle="La confianza y satisfacción de nuestros clientes es nuestro mayor logro. Sus palabras reflejan nuestro compromiso."
              />
            </AnimatedSection>
            <AnimatedSection className="delay-[200ms]">
              <TestimonialCarousel testimonials={testimonials} />
            </AnimatedSection>
          </div>
        </section>

        {/* --- Sección de Propiedades --- */}
        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto">
            <AnimatedSection>
              <SectionHeader 
                title="Propiedades Exclusivas"
                subtitle="Utiliza nuestros filtros para encontrar el espacio que se adapte perfectamente a tu estilo de vida."
              />
            </AnimatedSection>

            {/* --- Filtros --- */}
            <AnimatedSection className="flex justify-center flex-wrap gap-3 mb-12" style={{ transitionDelay: '200ms' }}>
              {filterOptions.map(option => (
                <button
                  key={option}
                  onClick={() => setActiveFilter(option)}
                  className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                    activeFilter === option
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </AnimatedSection>

            {/* --- Grid de Propiedades --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPropiedades.length > 0 ? (
                filteredPropiedades.map((prop, index) => (
                  <AnimatedSection key={prop.id} style={{ transitionDelay: `${index * 100}ms` }}>
                    <Link to={`/inmobiliaria/${prop.id}`} className="block group h-full">
                      <div className="relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md h-full transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:dark:shadow-teal-500/20 group-hover:-translate-y-2">
                        {/* --- INICIO: EFECTO ZOOM APLICADO --- */}
                        <div className="relative overflow-hidden">
                          <img 
                            src={prop.imagenUrl} 
                            alt={prop.nombre} 
                            className="w-full h-56 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">{prop.nombre}</p>
                          <button onClick={(e) => toggleFavorito(e, prop.id)} className="absolute top-4 right-4 bg-black/40 p-2 rounded-full text-white hover:bg-red-500 transition-colors z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill={favoritos.includes(prop.id) ? 'currentColor' : 'none'}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                          </button>
                        </div>
                        {/* --- FIN: EFECTO ZOOM APLICADO --- */}
                        <div className="p-6">
                          <p className="text-teal-600 dark:text-teal-400 font-bold text-2xl mb-4">${prop.precio.toLocaleString()}</p>
                          <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span className="flex items-center"><Bed className="w-5 h-5 mr-2 text-teal-500" /> {prop.habitaciones} hab.</span>
                            <span className="flex items-center"><Bath className="w-5 h-5 mr-2 text-teal-500" /> {prop.banos} baños</span>
                            <span className="flex items-center"><Ruler className="w-5 h-5 mr-2 text-teal-500" /> {prop.metrosCuadrados} m²</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))
              ) : (
                <p className="md:col-span-3 text-center text-gray-500 dark:text-gray-400 py-16">No se encontraron propiedades con los filtros seleccionados.</p>
              )}
            </div>
          </div>
        </section>

        {/* --- Sección CTA --- */}
        <section className="py-20 px-4 bg-teal-500 dark:bg-teal-800 text-white">
          <div className="container mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">¿Interesado en una Propiedad?</h2>
              <p className="text-lg text-teal-100 dark:text-teal-200 max-w-2xl mx-auto mb-8">
                Nuestro equipo de asesores está listo para brindarte toda la información que necesites. Contáctanos para agendar una visita.
              </p>
              <button
                onClick={openModal}
                className="bg-white text-teal-600 font-bold py-3 px-8 rounded-lg text-lg transform hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Contactar a un Agente
              </button>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </div>
  );
}
