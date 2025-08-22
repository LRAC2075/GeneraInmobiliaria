import React, { useState, useRef, useEffect } from 'react';
import { Heart, Briefcase, GlassWater, UtensilsCrossed, Leaf, Star } from 'lucide-react';
import { useModal } from '../context/ModalContext.jsx'; // CORRECCIÓN: Añadiendo la extensión .jsx al import

// --- Componentes Reutilizables (Asumimos que existen en tu proyecto) ---

// Asumimos que tienes un componente SectionHeader en tu carpeta de componentes
const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

// Hook para animaciones de scroll (Asumimos que tienes uno similar)
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

// Componente wrapper para aplicar la animación
const AnimatedSection = ({ children, className = '' }) => {
  const ref = useAnimateOnScroll();
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out opacity-0 translate-y-10 ${className}`}>
      {children}
    </div>
  );
};


// --- Componente Principal: CateringPage ---

export default function CateringPage() {
  // 1. Obtén la función openModal dentro de tu componente
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

  const galleryImages = [
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80',
    'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
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
      {/* --- Hero Banner --- */}
      <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502301103665-0b95cc738daf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <AnimatedSection className="relative z-10 text-center p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">Creamos Experiencias Inolvidables</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">Descubre cómo nuestra pasión por la gastronomía puede transformar tu evento.</p>
        </AnimatedSection>
      </section>

      <main>
        {/* --- Sección de Servicios --- */}
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

        {/* --- Galería de Eventos --- */}
        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto">
            <AnimatedSection>
              <SectionHeader
                title="Nuestra Galería"
                subtitle="Momentos capturados que reflejan la magia y el detalle de nuestros eventos."
              />
            </AnimatedSection>
            <AnimatedSection className="delay-[200ms]">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((src, index) => (
                  <div key={index} className={`rounded-lg overflow-hidden shadow-lg ${index === 0 || index === 5 ? 'md:col-span-1' : ''}`}>
                    <img src={src} alt={`Evento de catering ${index + 1}`} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* --- Menús de Ejemplo --- */}
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

        {/* --- Llamada a la Acción (CTA) --- */}
        <section className="py-20 px-4 bg-orange-500 dark:bg-orange-800 text-white">
          <div className="container mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">¿Listo para planificar tu próximo evento?</h2>
              <p className="text-lg text-orange-100 dark:text-orange-200 max-w-2xl mx-auto mb-8">
                Contáctanos hoy mismo. Nuestro equipo de expertos está listo para ayudarte a diseñar una experiencia inolvidable.
              </p>
              {/* 2. Asigna la función a un evento onClick */}
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
