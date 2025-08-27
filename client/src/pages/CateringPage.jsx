import React, { useState, useRef, useEffect } from 'react';
import { Heart, Briefcase, GlassWater, UtensilsCrossed, Leaf, Star } from 'lucide-react';
import { useModal } from '/src/context/ModalContext.jsx';
import SectionHeader from '/src/components/SectionHeader.jsx';
import FlippableImage from '/src/components/FlippableImage.jsx';

// El hook de animación y el componente AnimatedSection no necesitan cambios.
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

const AnimatedSection = ({ children, className = '' }) => {
  const ref = useAnimateOnScroll();
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out opacity-0 translate-y-10 ${className}`}>
      {children}
    </div>
  );
};


export default function CateringPage() {
  const { openModal } = useModal();
  const [activeTab, setActiveTab] = useState('gala');

  const services = [
    {
      icon: <Heart className="w-10 h-10 text-orange-500" />,
      title: 'Bodas de Lujo',
      description: 'Diseñamos experiencias culinarias que celebran el amor, con atención a cada detalle para tu día especial.',
    },
    {
      icon: <Briefcase className="w-10 h-10 text-orange-500" />,
      title: 'Eventos Corporativos',
      description: 'Impresiona a tus clientes y colegas con un servicio profesional, menús sofisticados y una ejecución impecable.',
    },
    {
      icon: <GlassWater className="w-10 h-10 text-orange-500" />,
      title: 'Celebraciones Privadas',
      description: 'Desde aniversarios hasta reuniones íntimas, creamos el ambiente y el menú perfecto para cualquier ocasión.',
    },
  ];

  const galleryItems = [
    { 
      src: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1364&auto=format&fit=crop',
      title: 'Coctelería Creativa',
      description: 'Bebidas refrescantes y de autor para maridar perfectamente con nuestros platillos.',
      points: ['Mixología de autor', 'Ingredientes premium', 'Presentación innovadora']
    },
    { 
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1381&auto=format&fit=crop',
      title: 'Platos Frescos',
      description: 'Ingredientes de estación que no solo deleitan el paladar, sino también la vista.',
      points: ['De la huerta a la mesa', 'Sabor auténtico', 'Visualmente impactante']
    },
    { 
      src: 'https://images.unsplash.com/photo-1615937691194-97dbd3f3dc29?q=80&w=1287&auto=format&fit=crop',
      title: 'Tablas de Autor',
      description: 'Una selección de quesos y embutidos de primera calidad para una experiencia completa.',
      points: ['Productos importados', 'Maridaje perfecto', 'Ideal para compartir']
    },
    { 
      src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1380&auto=format&fit=crop',
      title: 'Postres Clásicos',
      description: 'Creaciones que combinan texturas y sabores para un final dulce e inolvidable.',
      points: ['Recetas tradicionales', 'Toque moderno', 'Ingredientes de calidad']
    },
    { 
      src: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1378&auto=format&fit=crop',
      title: 'Pastelería Fina',
      description: 'Donde cada pieza es una pequeña obra de arte comestible, elaborada con maestría.',
      points: ['Diseño artesanal', 'Detalles minuciosos', 'Sabor excepcional']
    },
    { 
      src: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1470&auto=format&fit=crop',
      title: 'Bocaditos Gourmet',
      description: 'Una elegante presentación de bocaditos, perfectos para iniciar cualquier celebración.',
      points: ['Ingredientes frescos', 'Presentación impecable', 'Variedad de sabores']
    },
  ];

  const menus = {
    gala: {
      title: 'Menú de Gala',
      icon: <Star />,
      items: [
        'Vieiras selladas con puré de coliflor y trufa negra.',
        'Solomillo de res en costra de hierbas con gratén de patatas.',
        'Mousse de chocolate belga con corazón de frambuesa.',
      ],
    },
    cocktail: {
      title: 'Menú de Cóctel',
      icon: <GlassWater />,
      items: [
        'Mini brochetas caprese con pesto artesanal.',
        'Cucharitas de ceviche de corvina y mango.',
        'Tarteletas de champiñones silvestres y queso de cabra.',
      ],
    },
    veggie: {
      title: 'Opciones Vegetarianas',
      icon: <Leaf />,
      items: [
        'Risotto de espárragos trigueros y limón.',
        'Lasaña de berenjenas ahumadas con ricotta y espinacas.',
        'Curry de garbanzos y vegetales de temporada con arroz basmati.',
      ],
    },
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Banner */}
      <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502301103665-0b95cc738daf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <AnimatedSection className="relative z-10 text-center p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Creamos Experiencias Inolvidables</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">Descubre cómo nuestra pasión por la gastronomía puede transformar tu evento.</p>
        </AnimatedSection>
      </section>

      <main>
        {/* Sección de Servicios */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <AnimatedSection>
              <SectionHeader
                title="Servicios de Catering para Cada Ocasión"
                subtitle="Nos especializamos en crear eventos a medida, combinando sabor, elegancia y un servicio excepcional."
              />
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {services.map((service, index) => (
                <AnimatedSection key={index} className="delay-[200ms]">
                  <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl">
                    <div className="inline-block p-4 bg-orange-100 dark:bg-orange-900/50 rounded-full mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de Galería */}
        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto">
            <AnimatedSection>
              <SectionHeader
                title="Nuestra Galería"
                subtitle="Momentos capturados que reflejan la magia y el detalle de nuestros eventos. Haz clic en una imagen para saber más."
              />
            </AnimatedSection>
            <AnimatedSection className="delay-[200ms]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {galleryItems.map((item, index) => (
                  // --- INICIO: EFECTO HOVER APLICADO AL CONTENEDOR ---
                  <div key={index} className="aspect-[3/4] transition-transform duration-300 ease-in-out hover:-translate-y-2">
                    <FlippableImage
                      src={item.src}
                      title={item.title}
                      description={item.description}
                      points={item.points}
                      accentColor="orange"
                    />
                  </div>
                  // --- FIN: EFECTO HOVER APLICADO ---
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Sección de Menús */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <AnimatedSection>
              <SectionHeader
                title="Un Vistazo a Nuestros Menús"
                subtitle="Ingredientes frescos y creatividad culinaria son la base de nuestras propuestas gastronómicas."
              />
            </AnimatedSection>
            <AnimatedSection className="delay-[200ms] max-w-3xl mx-auto">
              <div className="flex justify-center border-b border-gray-200 dark:border-gray-700 mb-8">
                {Object.keys(menus).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-4 py-3 text-sm md:text-base font-medium transition-colors duration-300 ${
                      activeTab === key
                        ? 'border-b-2 border-orange-500 text-orange-600 dark:text-orange-400'
                        : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'
                    }`}
                  >
                    {menus[key].title}
                  </button>
                ))}
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-inner">
                <h4 className="flex items-center gap-3 text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  <span className="text-orange-500">{menus[activeTab].icon}</span>
                  {menus[activeTab].title}
                </h4>
                <ul className="space-y-4">
                  {menus[activeTab].items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <UtensilsCrossed className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Sección CTA */}
        <section className="py-20 px-4 bg-orange-500 dark:bg-orange-800 text-white">
          <div className="container mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">¿Listo para planificar tu próximo evento?</h2>
              <p className="text-lg text-orange-100 dark:text-orange-200 max-w-2xl mx-auto mb-8">
                Contáctanos hoy mismo. Nuestro equipo de expertos está listo para ayudarte a diseñar una experiencia inolvidable.
              </p>
              <button
                onClick={openModal}
                className="bg-white text-orange-600 font-bold py-3 px-8 rounded-lg text-lg transform hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Cotiza tu Evento
              </button>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </div>
  );
}
