import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useModal } from '../context/ModalContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

import CountUp from 'react-countup';

// Hook genérico para observar la intersección (sin cambios)
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

// Componente animado reutilizable (sin cambios)
const AnimatedSection = ({ children, className = '', id = '' }) => {
  const [setNode, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  return (
    <section 
      ref={setNode}
      id={id}
      className={`${className} transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {children}
    </section>
  );
};

// Nuevo componente: Tarjeta de Servicio
const ServiceCard = ({ icon, title, description, features, linkTo }) => (
  <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-2">
    <div className="flex items-center justify-center h-16 w-16 mx-auto mb-6 bg-accent-600 dark:bg-accent-500 rounded-full">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-primary-900 dark:text-neutral-100 mb-4 text-center">{title}</h3>
    <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-center">{description}</p>
    
    <div className="mb-6">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center space-x-3 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-accent-600 dark:text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-neutral-600 dark:text-neutral-400 text-sm">{feature}</span>
        </div>
      ))}
    </div>
    
    <Link
      to={linkTo}
      className="block w-full bg-accent-600 dark:bg-accent-500 text-primary-50 dark:text-primary-900 font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-center"
    >
      Descubrir más
    </Link>
  </div>
);

// Componente contador animado (sin cambios)
const AnimatedCounter = ({ end, suffix = '', title }) => {
  const [setNode, isVisible] = useIntersectionObserver({ threshold: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  return (
    <div ref={setNode} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-accent-600 dark:text-accent-500">
        {hasAnimated ? <CountUp end={end} duration={2.5} /> : '0'}
        {suffix}
      </p>
      <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mt-2">{title}</p>
    </div>
  );
};

// Sub-componente para las tarjetas de proceso (sin cambios)
const ProcessHighlightCard = ({ iconPath, title, description }) => (
  <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg shadow-md text-center">
    <div className="flex items-center justify-center h-12 w-12 mx-auto mb-4 bg-neutral-100 dark:bg-neutral-900 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-600 dark:text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
      </svg>
    </div>
    <h4 className="font-bold text-lg text-primary-900 dark:text-neutral-100 mb-2">{title}</h4>
    <p className="text-neutral-600 dark:text-neutral-400 text-sm">{description}</p>
  </div>
);

const HomePage = () => {
  const { openModal } = useModal();
  
  // Efecto para manejar hash al cargar la página (sin cambios)
  useEffect(() => {
    const handleHashOnLoad = () => {
      if (window.location.hash) {
        setTimeout(() => {
          const element = document.querySelector(window.location.hash);
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };

    handleHashOnLoad();
    window.addEventListener('hashchange', handleHashOnLoad);
    return () => window.removeEventListener('hashchange', handleHashOnLoad);
  }, []);

  const heroSlides = [
    { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop' },
    { img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop' },
    { img: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=2070&auto=format&fit=crop' }
  ];

  // Datos para las tarjetas de servicios
  const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: "Desarrollo Inmobiliario",
      description: "Espacios residenciales y comerciales que definen el lujo y la funcionalidad.",
      features: ['Consultoría y Adquisición', 'Diseño Arquitectónico', 'Construcción de Alta Gama', 'Gestión de Proyectos'],
      linkTo: "/inmobiliaria"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Eventos y Catering",
      description: "Experiencias memorables con servicio de catering de clase mundial.",
      features: ['Planificación Integral', 'Catering Gourmet', 'Diseño de Ambientes', 'Coordinación Logística'],
      linkTo: "/catering"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: "Tecnología e Iluminación",
      description: "Soluciones tecnológicas de vanguardia para transformar espacios.",
      features: ['Domótica y Automatización', 'Diseño de Iluminación LED', 'Sistemas de Audio/Video', 'Instalaciones Interactivas'],
      linkTo: "/tecnologia"
    }
  ];

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900">
      {/* ================= SECCIÓN INICIO ================= */}
      <section id="inicio" className="relative h-screen w-full text-center">
        <Swiper
          modules={[Autoplay, EffectFade]} 
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          className="h-full w-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index} className="relative h-full w-full">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.img})` }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-60" />
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative px-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-neutral-50 tracking-tight leading-tight mb-4">
              Transformando Ideas en Realidad
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
              Soluciones de vanguardia en desarrollo inmobiliario, producción de eventos y tecnología de diseño.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN QUIÉNES SOMOS ================= */}
      <AnimatedSection id="quienes-somos" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <SectionHeader
                title="Quiénes Somos"
                subtitle="GENERA es el resultado de la visión y pasión por la excelencia. Fundada en 2005, nuestra misión siempre ha sido transformar ideas en realidades tangibles, superando expectativas en cada proyecto."
                className="max-w-3xl mx-auto md:mx-0 mb-8" 
              />
              <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-8">
                Creemos en la fusión de la artesanía tradicional con la innovación tecnológica. Este enfoque nos permite entregar resultados que no solo son estéticamente impecables, sino también funcionales y sostenibles a largo plazo.
              </p>
            </div>
            <div className="h-80 md:h-full">
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop" 
                alt="Equipo de GENERA trabajando" 
                className="rounded-lg shadow-2xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= SECCIÓN NUESTROS SERVICIOS ================= */}
      <AnimatedSection className="py-16 sm:py-24 bg-neutral-100 dark:bg-neutral-950">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Nuestros Servicios"
            subtitle="Ofrecemos soluciones integrales en tres áreas especializadas, siempre con el mismo compromiso: excelencia, innovación y satisfacción del cliente."
            className="text-center mb-16"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                linkTo={service.linkTo}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= SECCIÓN EXPERIENCIA ================= */}
      <AnimatedSection id="experiencia" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Nuestra Experiencia"
            subtitle="A lo largo de los años, hemos acumulado logros y experiencias que nos respaldan"
            className="text-center mb-16"
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Columna de Logros Destacados */}
            <div>
              <h3 className="text-3xl font-bold text-primary-900 dark:text-neutral-100 mb-6">Logros Destacados</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="h-2 w-2 bg-accent-600 dark:bg-accent-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-neutral-600 dark:text-neutral-400">Más de 50 proyectos inmobiliarios entregados</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="h-2 w-2 bg-accent-600 dark:bg-accent-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-neutral-600 dark:text-neutral-400">Eventos corporativos para empresas Fortune 500</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="h-2 w-2 bg-accent-600 dark:bg-accent-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-neutral-600 dark:text-neutral-400">Tecnología implementada en espacios premium</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="h-2 w-2 bg-accent-600 dark:bg-accent-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-neutral-600 dark:text-neutral-400">Reconocimientos por innovación y diseño</span>
                </li>
              </ul>
            </div>

            {/* Columna de la Imagen */}
            <div className="h-80">
              <img 
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop" 
                alt="Logros y reconocimientos de GENERA"
                className="rounded-lg shadow-2xl w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Contadores Animados con espaciado superior */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <AnimatedCounter end={new Date().getFullYear() - 2005} title="Años de Trayectoria" />
            <AnimatedCounter end={150} suffix="+" title="Proyectos Completados" />
            <AnimatedCounter end={100} suffix="+" title="Clientes Satisfechos" />
          </div>

        </div>
      </AnimatedSection>

      {/* ================= SECCIÓN CALL TO ACTION ================= */}
      <AnimatedSection className="py-16 sm:py-24 text-center bg-primary-50 dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary-900 dark:text-neutral-100 mb-4">¿Tienes un proyecto en mente?</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-12">
            Permítenos ayudarte a hacerlo realidad. Nuestro proceso está diseñado para ser transparente, colaborativo y centrado en la excelencia.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <ProcessHighlightCard 
              iconPath="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"
              title="Consulta y Diseño"
              description="Iniciamos con una consulta profunda para entender tus necesidades y traducirlas en un concepto innovador."
            />
            <ProcessHighlightCard 
              iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              title="Ejecución Precisa"
              description="Gestionamos cada detalle, asegurando los más altos estándares de calidad y cumplimiento de plazos."
            />
            <ProcessHighlightCard 
              iconPath="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              title="Entrega y Soporte"
              description="Entregamos un resultado final que supera las expectativas y ofrecemos soporte continuo para tu satisfacción."
            />
          </div>

          <button
            onClick={openModal}
            className="inline-block bg-accent-600 dark:bg-accent-500 text-primary-50 dark:text-primary-900 font-bold text-lg px-10 py-4 rounded-lg hover:opacity-90 transition-colors"
          >
            Inicia tu Proyecto
          </button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default HomePage;