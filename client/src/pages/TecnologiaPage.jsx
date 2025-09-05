import React, { useRef, useEffect } from 'react';
import { Cpu, Lightbulb, MonitorPlay, Puzzle } from 'lucide-react';
import { useModal } from '../context/ModalContext.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

import { Link } from 'react-router-dom';

// --- Componentes y Hooks Reutilizables ---

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


// --- Componente Principal: TecnologiaPage ---

export default function TecnologiaPage() {
  const { openModal } = useModal();

  const specializations = [
    {
      icon: <Cpu className="w-10 h-10 text-accent-600 dark:text-accent-500" />,
      title: 'Domótica y Automatización',
      description: 'Integramos sistemas inteligentes para un control total de tu espacio, optimizando confort, seguridad y eficiencia energética.',
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-accent-600 dark:text-accent-500" />,
      title: 'Diseño de Iluminación',
      description: 'Creamos ambientes únicos a través de la luz, combinando estética y funcionalidad para resaltar cada detalle arquitectónico.',
    },
    {
      icon: <MonitorPlay className="w-10 h-10 text-accent-600 dark:text-accent-500" />,
      title: 'Sistemas de Audio y Video',
      description: 'Soluciones audiovisuales inmersivas y de alta fidelidad para residencias, oficinas y espacios comerciales.',
    },
    {
      icon: <Puzzle className="w-10 h-10 text-accent-600 dark:text-accent-500" />,
      title: 'Instalaciones Interactivas',
      description: 'Transformamos espacios con tecnología interactiva, creando experiencias memorables para clientes y visitantes.',
    },
  ];

  const processSteps = [
    { number: '01', title: 'Asesoría y Diseño Conceptual', description: 'Entendemos tus necesidades para crear un plan tecnológico a medida que se alinee con tu visión y objetivos.' },
    { number: '02', title: 'Ingeniería e Integración', description: 'Diseñamos la infraestructura técnica, seleccionamos los equipos y aseguramos una integración perfecta entre sistemas.' },
    { number: '03', title: 'Instalación y Soporte', description: 'Nuestro equipo de expertos ejecuta la instalación con precisión y ofrece soporte continuo para garantizar un rendimiento óptimo.' },
  ];
  
  const projects = [
    {
      title: 'Residencia Inteligente en San Isidro',
      description: 'El desafío fue unificar el control de iluminación, climatización, seguridad y entretenimiento en una sola interfaz intuitiva. La solución fue un sistema centralizado que permite la creación de "escenas" personalizadas para cada momento del día.',
      technologies: ['Control4', 'Lutron', 'Sonos', 'Vigilancia IP'],
      imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Oficinas Corporativas con Iluminación Dinámica',
      description: 'Se buscaba crear un ambiente de trabajo que fomentara la productividad y el bienestar. Implementamos un sistema de iluminación circadiana que ajusta la temperatura y la intensidad de la luz a lo largo del día, simulando la luz natural.',
      technologies: ['DALI', 'Philips Hue', 'Sensores de Ocupación'],
      imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=884&q=80',
    },
  ];

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900">
      {/* --- Hero Banner --- */}
      <section 
        className="relative h-[60vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center text-white" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <AnimatedSection className="relative z-10 text-center p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Diseñando el Futuro, Iluminando el Presente</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-neutral-200">Soluciones tecnológicas que transforman la manera en que vives, trabajas e interactúas con tu entorno.</p>
        </AnimatedSection>
      </section>

      <main>
        {/* --- Sección de Especialización --- */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <AnimatedSection>
              <SectionHeader
                title="Áreas de Especialización"
                subtitle="Desde la automatización del hogar hasta complejas instalaciones comerciales, nuestra experiencia abarca todo el espectro tecnológico."
              />
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {specializations.map((spec, index) => (
                <AnimatedSection key={index} className="delay-[200ms]">
                  <div className="bg-neutral-100 dark:bg-neutral-800 p-8 rounded-lg flex items-start space-x-6 h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="flex-shrink-0 p-3 bg-accent-100 dark:bg-accent-900/50 rounded-full">
                      {spec.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary-800 dark:text-neutral-100 mb-2">{spec.title}</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">{spec.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* --- Sección de Proceso --- */}
        <section className="py-20 px-4 bg-neutral-100 dark:bg-neutral-800">
          <div className="container mx-auto">
            <AnimatedSection>
              <SectionHeader
                title="Nuestro Proceso"
                subtitle="Un enfoque estructurado y colaborativo para garantizar resultados excepcionales en cada proyecto."
              />
            </AnimatedSection>
            <div className="relative flex flex-col md:flex-row justify-between max-w-5xl mx-auto mt-12 space-y-8 md:space-y-0">
              {processSteps.map((step, index) => (
                <AnimatedSection key={index} className="flex-1 z-10 delay-[200ms]">
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

        {/* --- Galería de Proyectos --- */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <AnimatedSection>
              <SectionHeader
                title="Proyectos Destacados"
                subtitle="Casos de éxito que demuestran cómo la tecnología y el diseño pueden converger para crear soluciones innovadoras."
              />
            </AnimatedSection>
            <div className="space-y-16">
              {projects.map((project, index) => (
                <AnimatedSection key={index} className="delay-[200ms]">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12 group`}>
                    <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-xl">
                      {/* --- INICIO: EFECTO ZOOM APLICADO --- */}
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                      />
                      {/* --- FIN: EFECTO ZOOM APLICADO --- */}
                    </div>
                    <div className="w-full md:w-1/2">
                      <h3 className="text-2xl font-bold text-primary-800 dark:text-neutral-100 mb-3">{project.title}</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4">{project.description}</p>
                      <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Tecnologías Utilizadas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="bg-accent-100 text-accent-800 dark:bg-accent-900/50 dark:text-accent-300 text-xs font-medium px-3 py-1 rounded-full">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* --- Llamada a la Acción (CTA) --- */}
        <section className="py-20 px-4 bg-accent-600 dark:bg-accent-700 text-primary-50">
          <div className="container mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">¿Tienes una idea o un desafío tecnológico?</h2>
              <p className="text-lg text-accent-100 dark:text-accent-200 max-w-2xl mx-auto mb-8">
                Nuestro equipo está listo para convertir tu visión en realidad. Hablemos sobre tu proyecto.
              </p>
              <button
                onClick={openModal}
                className="bg-neutral-50 dark:bg-neutral-800 text-accent-600 dark:text-accent-500 font-bold py-3 px-8 rounded-lg text-lg transform hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Solicitar Asesoría
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
              {/* Tarjeta para Inmobiliaria */}
              <AnimatedSection style={{ transitionDelay: '100ms' }}>
                <Link 
                  to="/inmobiliaria" 
                  className="block group h-full"
                  aria-label="Explorar servicios de Inmobiliaria"
                >
                  <div className="relative bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md h-full transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-2">
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop" 
                        alt="Servicios de Inmobiliaria" 
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white">Inmobiliaria</h3>
                        <p className="text-accent-400 text-sm mt-1">Propiedades exclusivas y de lujo</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-neutral-600 dark:text-neutral-300">
                        Descubre propiedades premium en las ubicaciones más exclusivas, con diseños vanguardistas y acabados de máxima calidad.
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

              {/* Tarjeta para Catering */}
              <AnimatedSection style={{ transitionDelay: '200ms' }}>
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}