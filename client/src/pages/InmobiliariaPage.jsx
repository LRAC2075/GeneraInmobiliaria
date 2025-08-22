import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getPropiedades } from '../api/inmobiliariaAPI';
import SectionHeader from '../components/SectionHeader';
import { useModal } from '../context/ModalContext';
import { useTheme } from '../context/ThemeContext';

// --- Sub-componentes y Hooks ---

const InmobiliariaHero = () => {
  const { theme } = useTheme();
  const darkThemeImage = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop';
  const lightThemeImage = 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1992&auto=format&fit=crop';
  const heroBackgroundImage = theme === 'dark' ? darkThemeImage : lightThemeImage;

  return (
    <section 
      className="relative w-full h-96 bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden flex items-center justify-center text-center mb-12"
      style={{ backgroundImage: `url(${heroBackgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Tu Próximo Espacio Exclusivo te Espera</h1>
        <p className="text-lg md:text-xl text-gray-300 mt-2">Descubre propiedades que definen el lujo y la vanguardia.</p>
      </div>
    </section>
  );
};

const useIntersectionObserver = (options) => {
  const [entry, setEntry] = useState(null);
  const [node, setNode] = useState(null);
  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver(([entry]) => setEntry(entry), options);
    const { current: currentObserver } = observer;
    if (node) currentObserver.observe(node);
    return () => currentObserver.disconnect();
  }, [node, options]);

  return [setNode, entry?.isIntersecting];
};

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulario de contacto enviado (simulación).');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-light-card dark:bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-light-text dark:hover:text-white text-3xl">&times;</button>
        <h3 className="text-2xl font-bold text-light-text dark:text-white mb-6">Contactar Agente</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="modal-nombre" className="block text-gray-600 dark:text-gray-300 mb-2">Nombre</label>
            <input type="text" id="modal-nombre" required className="w-full bg-light-bg dark:bg-gray-800 border border-light-subtle dark:border-gray-700 rounded-lg py-2 px-4 text-light-text dark:text-white focus:outline-none focus:border-light-accent dark:focus:border-brand-gold" />
          </div>
          <div className="mb-4">
            <label htmlFor="modal-email" className="block text-gray-600 dark:text-gray-300 mb-2">Email</label>
            <input type="email" id="modal-email" required className="w-full bg-light-bg dark:bg-gray-800 border border-light-subtle dark:border-gray-700 rounded-lg py-2 px-4 text-light-text dark:text-white focus:outline-none focus:border-light-accent dark:focus:border-brand-gold" />
          </div>
          <div className="mb-4">
            <label htmlFor="modal-mensaje" className="block text-gray-600 dark:text-gray-300 mb-2">Mensaje</label>
            <textarea id="modal-mensaje" rows="4" required className="w-full bg-light-bg dark:bg-gray-800 border border-light-subtle dark:border-gray-700 rounded-lg py-2 px-4 text-light-text dark:text-white focus:outline-none focus:border-light-accent dark:focus:border-brand-gold"></textarea>
          </div>
          <button type="submit" className="w-full bg-light-accent dark:bg-brand-gold text-white dark:text-brand-dark font-bold py-3 rounded-lg hover:opacity-90 transition-colors">
            Enviar Consulta
          </button>
        </form>
      </div>
    </div>
  );
};

const ProcesoStep = ({ iconPath, title, description, delay }) => {
  const [setNode, isVisible] = useIntersectionObserver({ threshold: 0.5, triggerOnce: true });
  return (
    <div
      ref={setNode}
      className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-light-bg dark:bg-gray-800 rounded-full transition-transform duration-300 hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-light-accent dark:text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
        </svg>
      </div>
      <h4 className="text-xl font-bold text-light-text dark:text-white mb-2">{title}</h4>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

// Componente de Filtro Rediseñado con la paleta de colores correcta
const FilterDropdown = ({ name, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(options[0].label);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (value, label) => {
        setSelectedLabel(label);
        onChange({ target: { name, value } });
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="w-full sm:w-auto text-left flex items-center justify-between bg-light-accent dark:bg-brand-gold text-white dark:text-brand-dark font-semibold rounded-lg p-3 transition-opacity hover:opacity-90">
                <span>{selectedLabel}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute top-full mt-2 w-full sm:w-64 bg-light-card dark:bg-gray-800 border border-light-subtle dark:border-gray-700 rounded-lg shadow-lg z-20">
                    {options.map(option => (
                        <a href="#" key={option.value} onClick={(e) => { e.preventDefault(); handleSelect(option.value, option.label); }} className="block px-4 py-2 text-light-text dark:text-gray-300 hover:bg-light-subtle dark:hover:bg-gray-700">
                            {option.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

const FeatureIcon = ({ path, value }) => (
    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
      </svg>
      <span>{value}</span>
    </div>
);

const AnimatedPropertyCard = ({ prop, esFavorito, onToggleFavorito, delay }) => {
    const [setNode, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
    return (
        <div 
            ref={setNode} 
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <Link to={`/inmobiliaria/${prop.id}`} className="block group">
                <div className="relative bg-light-card dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:dark:shadow-brand-gold/20 group-hover:-translate-y-1">
                    <div className="relative">
                        <img src={prop.imagenUrl} alt={prop.nombre} className="w-full h-56 object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {prop.tag && (
                            <div className="absolute top-0 left-0 bg-light-accent dark:bg-brand-gold text-white dark:text-brand-dark text-sm font-bold px-3 py-1 rounded-br-lg z-10">
                              {prop.tag}
                            </div>
                        )}
                        <button onClick={(e) => onToggleFavorito(e, prop.id)} className="absolute top-4 right-4 bg-gray-900/50 p-2 rounded-full text-white hover:bg-red-500/80 transition-colors z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill={esFavorito ? 'currentColor' : 'none'} strokeWidth={esFavorito ? 0 : 2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-6 flex flex-col">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{prop.ubicacion}</p>
                        <h3 className="text-xl font-semibold mb-2 mt-1 text-light-text dark:text-white flex-grow">{prop.nombre}</h3>
                        <p className="text-2xl font-bold my-4 text-light-accent dark:text-brand-gold">${prop.precio.toLocaleString()}</p>
                        <div className="flex items-center justify-between border-t border-light-subtle dark:border-gray-700 pt-4 mt-auto">
                            <FeatureIcon path="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" value={`${prop.habitaciones} hab.`} />
                            <FeatureIcon path="M3 10.5a2.5 2.5 0 015 0V12h11v-1.5a2.5 2.5 0 015 0V12h-2v9.5a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 015.5 21.5V12H3v-1.5zM10 6.5a2 2 0 100-4 2 2 0 000 4z" value={`${prop.banos} baños`} />
                            <FeatureIcon path="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9M20.25 20.25h-4.5m4.5 0v-4.5m0 4.5L15 15" value={`${prop.metrosCuadrados} m²`} />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

// Componente de Carrusel de Testimonios Corregido
const TestimonialCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative w-full max-w-3xl mx-auto text-center h-40">
      {testimonials.map((testimonial, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-xl italic text-gray-700 dark:text-gray-300">"{testimonial.quote}"</p>
          <p className="mt-4 font-bold text-light-text dark:text-white">{testimonial.name}</p>
          <p className="text-sm text-light-accent dark:text-brand-gold">{testimonial.location}</p>
        </div>
      ))}
    </div>
  );
};

// --- Componente Principal ---

const InmobiliariaPage = () => {
  const [allPropiedades, setAllPropiedades] = useState([]);
  const [filteredPropiedades, setFilteredPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const [filters, setFilters] = useState({ ubicacion: 'todas', precio: 'todos', tipo: 'todos' });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
        const dataWithType = data.map(p => ({ ...p, tipo: p.nombre.split(' ')[0].toLowerCase() }));
        setAllPropiedades(dataWithType);
        setFilteredPropiedades(dataWithType);
      } catch (err) {
        setError('No se pudo cargar la información.');
      } finally {
        setLoading(false);
      }
    };
    fetchPropiedades();
  }, []);

  useEffect(() => {
    let result = allPropiedades;
    if (filters.ubicacion !== 'todas') result = result.filter(p => p.ubicacion.includes(filters.ubicacion));
    if (filters.precio !== 'todos') {
      const [min, max] = filters.precio.split('-').map(Number);
      result = result.filter(p => p.precio >= min && (max ? p.precio < max : true));
    }
    if (filters.tipo !== 'todos') result = result.filter(p => p.tipo.includes(filters.tipo));
    setFilteredPropiedades(result);
  }, [filters, allPropiedades]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const toggleFavorito = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setFavoritos(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="container mx-auto px-4 py-12">
        <InmobiliariaHero />

        <section className="bg-light-card dark:bg-gray-900 rounded-lg p-8 md:p-12 mb-12">
            <SectionHeader 
              title="Nuestro Compromiso con la Excelencia"
              subtitle="Cada proyecto es un testimonio de nuestra dedicación. Seguimos un proceso meticuloso para garantizar resultados que no solo cumplen, sino que superan las expectativas."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <ProcesoStep iconPath="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" title="1. Conceptualización" delay={0} />
              <ProcesoStep iconPath="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 11.25h6M9 15.75h6" title="2. Construcción" delay={200} />
              <ProcesoStep iconPath="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" title="3. Entrega" delay={400} />
            </div>
        </section>

        <section className="py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="md:pr-8">
                <SectionHeader 
                    title="Lo que dicen nuestros clientes"
                    subtitle="La confianza y satisfacción de nuestros clientes es nuestro mayor logro. Sus palabras reflejan nuestro compromiso con la excelencia en cada proyecto que emprendemos."
                />
            </div>
            <TestimonialCarousel testimonials={testimonials} />
        </section>
        
        <SectionHeader 
          title="Propiedades Exclusivas"
          subtitle="Utiliza nuestros filtros para encontrar el espacio que se adapte perfectamente a tu estilo de vida."
        />

        <section className="bg-light-card dark:bg-gray-900 rounded-lg p-6 mb-12">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <FilterDropdown name="ubicacion" onChange={handleFilterChange} options={[
                  { value: 'todas', label: 'Todas las Ubicaciones' },
                  { value: 'Cancún', label: 'Cancún' },
                  { value: 'Polanco', label: 'Polanco' },
                  { value: 'San Miguel de Allende', label: 'San Miguel de Allende' },
                  { value: 'Valle de Bravo', label: 'Valle de Bravo' },
                  { value: 'Tulum', label: 'Tulum' },
              ]} />
              <FilterDropdown name="precio" onChange={handleFilterChange} options={[
                  { value: 'todos', label: 'Cualquier Precio' },
                  { value: '0-900000', label: 'Menos de $900K' },
                  { value: '900000-1500000', label: '$900K - $1.5M' },
                  { value: '1500000-9999999', label: 'Más de $1.5M' },
              ]} />
              <FilterDropdown name="tipo" onChange={handleFilterChange} options={[
                  { value: 'todos', label: 'Todos los Tipos' },
                  { value: 'villa', label: 'Villa' },
                  { value: 'penthouse', label: 'Penthouse' },
                  { value: 'hacienda', label: 'Hacienda' },
              ]} />
            </div>
        </section>

        {loading && <p className="text-center">Cargando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPropiedades.length > 0 ? (
              filteredPropiedades.map((prop, index) => (
                <AnimatedPropertyCard
                  key={prop.id}
                  prop={prop}
                  esFavorito={favoritos.includes(prop.id)}
                  onToggleFavorito={toggleFavorito}
                  delay={index * 100}
                />
              ))
            ) : (
              <p className="md:col-span-3 text-center text-gray-500 dark:text-gray-400 py-16">No se encontraron propiedades con los filtros seleccionados.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default InmobiliariaPage;
