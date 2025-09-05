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
          <p className="text-xl italic text-neutral-600 dark:text-neutral-300">"{testimonial.quote}"</p>
          <p className="mt-4 font-bold text-primary-800 dark:text-neutral-100">{testimonial.name}</p>
          <p className="text-sm text-accent-600 dark:text-accent-500">{testimonial.location}</p>
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
    <div className="bg-neutral-50 dark:bg-neutral-900">
      {/* --- Hero Banner --- */}
      <section 
        className="relative w-full h-[70vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${heroBackgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <AnimatedSection className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">Tu Próximo Espacio Exclusivo te Espera</h1>
          <p className="mt-4 text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">Descubre propiedades que definen el lujo y la vanguardia.</p>
        </AnimatedSection>
      </section>

      <main>
        {/* --- Sección de Nuestro Compromiso (Diseño de línea mejorado) --- */}
        <section className="py-20 px-4 bg-neutral-100 dark:bg-neutral-800">
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
                  <path d="M 16.66% 40 C 33.33% 40, 33.33% 80, 50% 80" strokeDasharray="5, 5" className="stroke-current text-accent-300 dark:text-accent-700" strokeWidth="2" fill="none"/>
                  <path d="M 50% 80 C 66.66% 80, 66.66% 40, 83.33% 40" strokeDasharray="5, 5" className="stroke-current text-accent-300 dark:text-accent-700" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              {[
                { number: '01', title: 'Conceptualización', description: 'Analizamos tus sueños y necesidades para definir el proyecto perfecto.' },
                { number: '02', title: 'Construcción', description: 'Ejecutamos con los más altos estándares de calidad y materiales premium.' },
                { number: '03', title: 'Entrega', description: 'Te entregamos las llaves de un espacio que supera todas las expectativas.' },
              ].map((step, index) => (
                <AnimatedSection key={index} className="flex-1 z-10" style={{ transitionDelay: `${index * 200}ms` }}>
                  <div className="flex items-start md:flex-col md:items-center md:text-center">
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-accent-600 text-primary-50 font-bold text-2xl rounded-full border-4 border-neutral-50 dark:border-neutral-800 mb-4">
                      {step.number}
                    </div>
                    <div className="ml-6 md:ml-0">
                      <h3 className="text-xl font-bold text-primary-800 dark:text-neutral-100 mb-2">{step.title}</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">{step.description}</p>
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
        <section className="py-20 px-4 bg-neutral-100 dark:bg-neutral-800">
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
                      ? 'bg-accent-600 text-primary-50 shadow-md'
                      : 'bg-neutral-50 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
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
                      <div className="relative bg-neutral-50 dark:bg-neutral-900 rounded-lg overflow-hidden shadow-md h-full transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:dark:shadow-accent-500/20 group-hover:-translate-y-2">
                        {/* --- INICIO: EFECTO ZOOM APLICADO --- */}
                        <div className="relative overflow-hidden">
                          <img 
                            src={prop.imagenUrl} 
                            alt={prop.nombre} 
                            className="w-full h-56 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">{prop.nombre}</p>
                          <button onClick={(e) => toggleFavorito(e, prop.id)} className="absolute top-4 right-4 bg-black/40 p-2 rounded-full text-white hover:bg-accent-500 transition-colors z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill={favoritos.includes(prop.id) ? 'currentColor' : 'none'}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                          </button>
                        </div>
                        {/* --- FIN: EFECTO ZOOM APLICADO --- */}
                        <div className="p-6">
                          <p className="text-accent-600 dark:text-accent-500 font-bold text-2xl mb-4">${prop.precio.toLocaleString()}</p>
                          <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                            <span className="flex items-center"><Bed className="w-5 h-5 mr-2 text-accent-600 dark:text-accent-500" /> {prop.habitaciones} hab.</span>
                            <span className="flex items-center"><Bath className="w-5 h-5 mr-2 text-accent-600 dark:text-accent-500" /> {prop.banos} baños</span>
                            <span className="flex items-center"><Ruler className="w-5 h-5 mr-2 text-accent-600 dark:text-accent-500" /> {prop.metrosCuadrados} m²</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))
              ) : (
                <p className="md:col-span-3 text-center text-neutral-500 dark:text-neutral-400 py-16">No se encontraron propiedades con los filtros seleccionados.</p>
              )}
            </div>
          </div>
        </section>

        {/* --- Sección CTA --- */}
        <section className="py-20 px-4 bg-accent-600 dark:bg-accent-700 text-primary-50">
          <div className="container mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">¿Interesado en una Propiedad?</h2>
              <p className="text-lg text-accent-100 dark:text-accent-200 max-w-2xl mx-auto mb-8">
                Nuestro equipo de asesores está listo para brindarte toda la información que necesites. Contáctanos para agendar una visita.
              </p>
              <button
                onClick={openModal}
                className="bg-neutral-50 dark:bg-neutral-800 text-accent-600 dark:text-accent-500 font-bold py-3 px-8 rounded-lg text-lg transform hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Contactar a un Agente
              </button>
            </AnimatedSection>
          </div>
        </section>

        {/* --- Sección de Otros Servicios --- */}
        <section className="py-20 px-4 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto">
            <AnimatedSection>
              <SectionHeader 
                title="Descubre Nuestros Otros Servicios"
                subtitle="Explora todas las soluciones que GENERA tiene para ofrecerte"
              />
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
              {/* Tarjeta para Catering */}
              <AnimatedSection style={{ transitionDelay: '100ms' }}>
                <Link 
                  to="/catering" 
                  className="block group h-full"
                  aria-label="Explorar servicios de Catering"
                >
                  <div className="relative bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md h-full transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-2">
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                        alt="Servicios de Catering" 
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white">Catering</h3>
                        <p className="text-accent-400 text-sm mt-1">Experiencias gastronómicas excepcionales</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-neutral-600 dark:text-neutral-300">
                        Servicios culinarios premium para eventos corporativos y celebraciones especiales, con menús personalizados y atención de primera clase.
                      </p>
                      <div className="mt-4 flex items-center text-accent-600 dark:text-accent-500 font-semibold group-hover:underline">
                        Descubrir más
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>

              {/* Tarjeta para Tecnología */}
              <AnimatedSection style={{ transitionDelay: '200ms' }}>
                <Link 
                  to="/tecnologia" 
                  className="block group h-full"
                  aria-label="Explorar servicios de Tecnología"
                >
                  <div className="relative bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md h-full transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-2">
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                        alt="Servicios de Tecnología" 
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white">Tecnología</h3>
                        <p className="text-accent-400 text-sm mt-1">Soluciones digitales innovadoras</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-neutral-600 dark:text-neutral-300">
                        Desarrollo de software a medida, aplicaciones web y móviles, y consultoría tecnológica para transformar tu negocio digitalmente.
                      </p>
                      <div className="mt-4 flex items-center text-accent-600 dark:text-accent-500 font-semibold group-hover:underline">
                        Descubrir más
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}