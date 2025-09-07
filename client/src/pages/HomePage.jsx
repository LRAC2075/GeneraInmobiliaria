import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useModal } from '../context/ModalContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

import CountUp from 'react-countup';

// Componente de imagen con respaldo para manejar errores
const ImageWithFallback = ({ src, fallbackSrc, alt, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    if (fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg">
          <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 0v24h-24v-24h24zm-4.684 16.922l-1.658-3.5-1.658 3.5h3.316zm-2.658-5.922h-2.316l-1.658 3.5-1.658-3.5h-2.316l3.5-7.422 3.5 7.422zm-9.342-1.422h2v1h-2v-1zm0-2h2v1h-2v-1zm1.5 10h-3.5v-7h2v5h1.5v2zm-2.5-9h-2v1h2v-1zm0 2h-2v1h2v-1zm0 2h-2v1h2v-1zm-3-4h-2v1h2v-1zm0 2h-2v1h2v-1zm0 2h-2v1h2v-1zm20-11h-20v20h20v-20zm-1 19h-18v-18h18v18z"/>
          </svg>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'} ${className}`}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
};

const CustomCarousel = ({ slides, className, interval = 4000 }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, interval);
    return () => clearInterval(slideInterval);
  }, [slides, interval]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ImageWithFallback 
            src={slide.img} 
            fallbackSrc={slide.fallback}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

// Hook genérico para observar la intersección
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

// Componente animado reutilizable
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

// Componente: Tarjeta de Servicio
const ServiceCard = ({ icon, title, description, features, linkTo }) => (
  <div className="bg-light-card dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-2">
    <div className="flex items-center justify-center h-16 w-16 mx-auto mb-6 bg-light-accent dark:bg-brand-gold rounded-full">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-light-text dark:text-white mb-4 text-center">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">{description}</p>
    
    <div className="mb-6">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center space-x-3 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-light-accent dark:text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-gray-600 dark:text-gray-400 text-sm">{feature}</span>
        </div>
      ))}
    </div>
    
    <Link
      to={linkTo}
      className="block w-full bg-light-accent dark:bg-brand-gold text-white dark:text-brand-dark font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-center"
    >
      Descubrir más
    </Link>
  </div>
);

// Implementación de contador animado
const AnimatedCounter = ({ end, suffix = '', title }) => {
  const [count, setCount] = useState(0);
  const [setNode, isVisible] = useIntersectionObserver({ threshold: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      let startTimestamp = null;
      const duration = 2500;

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = timestamp - startTimestamp;
        const newCount = Math.min(Math.floor((progress / duration) * end), end);
        setCount(newCount);

        if (progress < duration) {
          animationRef.current = requestAnimationFrame(step);
        } else {
          setHasAnimated(true);
        }
      };

      animationRef.current = requestAnimationFrame(step);

      return () => cancelAnimationFrame(animationRef.current);
    }
  }, [isVisible, end, hasAnimated]);

  return (
    <div ref={setNode} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-accent-600 dark:text-accent-500">
        {count}
        {suffix}
      </p>
      <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mt-2">{title}</p>
    </div>
  );
};

// Sub-componente para las tarjetas de proceso
const ProcessHighlightCard = ({ iconPath, title, description }) => (
  <div className="bg-light-card dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
    <div className="flex items-center justify-center h-12 w-12 mx-auto mb-4 bg-light-subtle dark:bg-gray-800 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light-accent dark:text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
      </svg>
    </div>
    <h4 className="font-bold text-lg text-light-text dark:text-white mb-2">{title}</h4>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
  </div>
);

const HomePage = () => {
  const { openModal } = useModal();
  
  // Efecto para manejar hash al cargar la página
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

  // Reemplaza estas URLs con las de tus imágenes subidas a un servicio externo
  const heroSlides = [
    { 
      img: 'https://res.cloudinary.com/dfwmro2x2/image/upload/v1757265923/representacion-3d-del-modelo-de-casa_qy9qrs.jpg', 
      fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      img: 'https://res.cloudinary.com/dfwmro2x2/image/upload/v1757265929/surtido-plano-con-deliciosa-comida-brasilena_qfvbs2.jpg', 
      fallback: 'https://images.unsplash.com/photo-1600566753052-dc65a83d5bc4?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      img: 'https://res.cloudinary.com/dfwmro2x2/image/upload/v1757265924/rebanadas-de-filete-de-pollo-con-pan-zanahorias-coliflor-nabos-y-maiz-en-un-plato-negro_zlxjce.jpg', 
      fallback: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      img: 'https://res.cloudinary.com/dfwmro2x2/image/upload/v1757265923/pantalla-de-tableta-digital-con-controlador-de-casa-inteligente-en-una-mesa-de-madera_nitbt4.jpg', 
      fallback: 'https://images.unsplash.com/photo-1600573472550-8090be0cac5f?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      img: 'https://res.cloudinary.com/dfwmro2x2/image/upload/v1757265921/mujer-joven-con-tecnologia-casera_mvo8k1.jpg', 
      fallback: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      img: 'https://res.cloudinary.com/dfwmro2x2/image/upload/v1757265923/villa-de-lujo-moderna-con-piscina_cqkqpf.jpghttps://images.unsplash.com/photo-1600585154084-4e5fe7c39198', 
      fallback: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  const experienceSlides = [
    { 
      img: 'https://res.cloudinary.com/dfwmro2x2/image/upload/v1757265934/grupo-de-personas-trabajando-en-un-plan-de-negocios-en-una-oficina_tkfchu.jpg', 
      fallback: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop'
    },
    { 
      img: 'https://res.cloudinary.com/dfwmro2x2/image/upload/v1757265934/socios-comerciales-estrechando-la-mano-con-el-ingeniero-por-modelo-arquitectonico-en-la-reunion_yssy37.jpg', 
      fallback: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      img: 'https://res.cloudinary.com/dfwmro2x2/image/upload/v1757265935/escena-de-teamwork_cgbt5i.jpg', 
      fallback: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=1932&auto=format&fit=crop'
    },
    { 
      img: 'https://res.cloudinary.com/dfwmro2x2/image/upload/v1757265937/guy-muestra-documento-una-nina-grupo-de-jovenes-autonomos-en-la-oficina-conversando-y-trabajando_yrytdv.jpg', 
      fallback: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      img: 'https://res.cloudinary.com/dfwmro2x2/image/upload/v1757265934/grupo-de-personas-trabajando-en-un-plan-de-negocios-en-una-oficina_tkfchu.jpg', 
      fallback: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop'
    }
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
    <div className="bg-light-bg dark:bg-brand-dark">
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
              <ImageWithFallback
                src={slide.img}
                fallbackSrc={slide.fallback}
                alt={`Slide ${index + 1}`}
                className="h-full w-full bg-cover bg-center"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60" />
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative px-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-4">
              Transformando Ideas en Realidad
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
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
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                Creemos en la fusión de la artesanía tradicional con la innovación tecnológica. Este enfoque nos permite entregar resultados que no solo son estéticamente impecables, sino también funcionales y sostenibles a largo plazo.
              </p>
            </div>
            <div className="h-80 md:h-full">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
                fallbackSrc="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop"
                alt="Equipo de GENERA trabajando"
                className="rounded-lg shadow-2xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= SECCIÓN NUESTROS SERVICIOS ================= */}
      <AnimatedSection className="py-16 sm:py-24 bg-light-subtle dark:bg-gray-900">
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

          <div className="mt-16 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Columna de Logros Destacados - Centrada y con mejor alineación */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-light-text dark:text-white mb-6">Logros Destacados</h3>
              <ul className="space-y-3 md:space-y-4 mx-auto lg:mx-0 max-w-md">
                <li className="flex items-start space-x-3">
                  <span className="h-2 w-2 bg-light-accent dark:bg-brand-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-600 dark:text-gray-400">Más de 50 proyectos inmobiliarios entregados</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="h-2 w-2 bg-light-accent dark:bg-brand-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-600 dark:text-gray-400">Eventos corporativos para empresas Fortune 500</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="h-2 w-2 bg-light-accent dark:bg-brand-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-600 dark:text-gray-400">Tecnología implementada en espacios premium</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="h-2 w-2 bg-light-accent dark:bg-brand-gold rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-600 dark:text-gray-400">Reconocimientos por innovación y diseño</span>
                </li>
              </ul>
            </div>

            {/* Columna del Carrusel - Mejorada la alineación y responsividad */}
            <div className="w-full lg:w-1/2 h-72 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-2xl">
              <CustomCarousel 
                slides={experienceSlides} 
                className="h-full"
                interval={3500}
              />
            </div>
          </div>

          {/* Contadores Animados con espaciado superior */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
            <AnimatedCounter end={new Date().getFullYear() - 2005} title="Años de Trayectoria" />
            <AnimatedCounter end={150} suffix="+" title="Proyectos Completados" />
            <AnimatedCounter end={100} suffix="+" title="Clientes Satisfechos" />
          </div>

        </div>
      </AnimatedSection>

      {/* ================= SECCIÓN CALL TO ACTION ================= */}
      <AnimatedSection className="py-16 sm:py-24 text-center bg-light-subtle dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-light-text dark:text-white mb-4">¿Tienes un proyecto en mente?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
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
            className="inline-block bg-light-accent dark:bg-brand-gold text-white dark:text-brand-dark font-bold text-lg px-10 py-4 rounded-lg hover:opacity-90 transition-colors"
          >
            Inicia tu Proyecto
          </button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default HomePage;