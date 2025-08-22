import React, { useRef, useEffect } from 'react';
import { Cpu, Lightbulb, MonitorPlay, Puzzle } from 'lucide-react';
import { useModal } from '/src/context/ModalContext.jsx'; // CORRECCIÓN: Usando una ruta absoluta desde la raíz del proyecto

// --- Componentes y Hooks Reutilizables (Asumimos que existen en tu proyecto) ---

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{subtitle}</p>
  </div>
);

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
      icon: <Cpu className="w-10 h-10 text-sky-500" />,
      title: 'Domótica y Automatización',
      description: 'Integramos sistemas inteligentes para un control total de tu espacio, optimizando confort, seguridad y eficiencia energética.',
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-sky-500" />,
      title: 'Diseño de Iluminación',
      description: 'Creamos ambientes únicos a través de la luz, combinando estética y funcionalidad para resaltar cada detalle arquitectónico.',
    },
    {
      icon: <MonitorPlay className="w-10 h-10 text-sky-500" />,
      title: 'Sistemas de Audio y Video',
      description: 'Soluciones audiovisuales inmersivas y de alta fidelidad para residencias, oficinas y espacios comerciales.',
    },
    {
      icon: <Puzzle className="w-10 h-10 text-sky-500" />,
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
    <div className="bg-white dark:bg-gray-900">
      {/* --- Hero Banner --- */}
      <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <AnimatedSection className="relative z-10 text-center p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Diseñando el Futuro, Iluminando el Presente</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">Soluciones tecnológicas que transforman la manera en que vives, trabajas e interactúas con tu entorno.</p>
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
                  <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg flex items-start space-x-6 h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="flex-shrink-0 p-3 bg-sky-100 dark:bg-sky-900/50 rounded-full">
                      {spec.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{spec.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{spec.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* --- Sección de Proceso --- */}
        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto">
            <AnimatedSection>
              <SectionHeader
                title="Nuestro Proceso"
                subtitle="Un enfoque estructurado y colaborativo para garantizar resultados excepcionales en cada proyecto."
              />
            </AnimatedSection>
            <div className="relative flex flex-col md:flex-row justify-between max-w-5xl mx-auto mt-12 space-y-8 md:space-y-0">
               <div className="absolute top-8 left-8 h-full md:h-auto md:w-full md:top-1/2 border-l-2 md:border-l-0 md:border-t-2 border-dashed border-sky-300 dark:border-sky-700 -z-0"></div>
              {processSteps.map((step, index) => (
                <AnimatedSection key={index} className="flex-1 z-10 delay-[200ms]">
                  <div className="flex items-start md:flex-col md:items-center md:text-center">
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-sky-500 text-white font-bold text-2xl rounded-full border-4 border-gray-50 dark:border-gray-800 mb-4">
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
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}>
                    <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-xl">
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full md:w-1/2">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Tecnologías Utilizadas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300 text-xs font-medium px-3 py-1 rounded-full">{tech}</span>
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
        <section className="py-20 px-4 bg-sky-500 dark:bg-sky-800 text-white">
          <div className="container mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">¿Tienes una idea o un desafío tecnológico?</h2>
              <p className="text-lg text-sky-100 dark:text-sky-200 max-w-2xl mx-auto mb-8">
                Nuestro equipo está listo para convertir tu visión en realidad. Hablemos sobre tu proyecto.
              </p>
              <button
                onClick={openModal}
                className="bg-white text-sky-600 font-bold py-3 px-8 rounded-lg text-lg transform hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Solicitar Asesoría
              </button>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </div>
  );
}
