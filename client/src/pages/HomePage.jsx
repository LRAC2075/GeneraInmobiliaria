import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useModal } from '../context/ModalContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

import CountUp from 'react-countup';

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

// Componente animado reutilizable que envuelve cada sección
const AnimatedSection = ({ children, className = '' }) => {
  const [setNode, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  return (
    <section 
      ref={setNode}
      className={`${className} transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {children}
    </section>
  );
};

// Sub-componente para la lista de características de cada servicio
const ServiceFeatureList = ({ features }) => (
  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
    {features.map((feature, index) => (
      <div key={index} className="flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-light-accent dark:text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
      </div>
    ))}
  </div>
);

// Componente para las secciones de servicio
const ServiceSection = ({ imageUrl, title, description, features, linkTo, imageLeft = false }) => {
  const imageOrder = imageLeft ? 'md:order-1' : 'md:order-2';
  const textOrder = imageLeft ? 'md:order-2' : 'md:order-1';

  return (
    <AnimatedSection className="py-16 sm:py-24 bg-light-subtle dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* --- INICIO: EFECTO ZOOM APLICADO --- */}
          <div className={`${imageOrder} overflow-hidden rounded-lg shadow-2xl`}>
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-auto object-cover transition-transform duration-500 ease-in-out hover:scale-110" 
            />
          </div>
          {/* --- FIN: EFECTO ZOOM APLICADO --- */}
          <div className={textOrder}>
            <h3 className="text-4xl font-bold text-light-text dark:text-white mb-4">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">{description}</p>
            {features && <ServiceFeatureList features={features} />}
            <Link
              to={linkTo}
              className="inline-block mt-8 bg-light-accent dark:bg-brand-gold text-white dark:text-brand-dark font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Más Información
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Sub-componente para las tarjetas de proceso en el CTA final
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

// En tu archivo HomePage.jsx

// Sub-componente para contador animado (VERSIÓN CORREGIDA)
const AnimatedCounter = ({ end, suffix = '', title }) => {
  const [setNode, isVisible] = useIntersectionObserver({ threshold: 0.5 });
  // --- CAMBIO 1: Añadimos un estado para recordar si la animación ya ocurrió ---
  const [hasAnimated, setHasAnimated] = useState(false);

  // --- CAMBIO 2: Usamos useEffect para actualizar el estado solo una vez ---
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  return (
    <div ref={setNode} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-light-accent dark:text-brand-gold">
        {/* --- CAMBIO 3: La lógica ahora depende de si ya se ha animado --- */}
        {hasAnimated ? <CountUp end={end} duration={2.5} /> : '0'}
        {suffix}
      </p>
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">{title}</p>
    </div>
  );
};

const HomePage = () => {
  const { openModal } = useModal();
  
  const heroSlides = [
    { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop' },
    { img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop' },
    { img: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=2070&auto=format&fit=crop' }
  ];

  return (
    <div className="bg-light-bg dark:bg-brand-dark">
      <section className="relative h-screen w-full text-center">
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
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-4">
                    Transformando Ideas en Realidad
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                    Soluciones de vanguardia en desarrollo inmobiliario, producción de eventos y tecnología de diseño.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/inmobiliaria" className="bg-light-accent dark:bg-brand-gold text-white dark:text-brand-dark font-bold text-lg px-6 py-3 rounded-full hover:opacity-90 transition-all duration-300 w-full sm:w-auto">
                        Inmobiliaria
                    </Link>
                    <Link to="/catering" className="border-2 border-light-accent dark:border-brand-gold text-white font-bold text-lg px-6 py-3 rounded-full hover:bg-light-accent dark:hover:bg-brand-gold hover:text-light-text dark:hover:text-brand-dark transition-all duration-300 w-full sm:w-auto">
                        Catering y Eventos
                    </Link>
                    <Link to="/tecnologia" className="border-2 border-light-accent dark:border-brand-gold text-white font-bold text-lg px-6 py-3 rounded-full hover:bg-light-accent dark:hover:bg-brand-gold hover:text-light-text dark:hover:text-brand-dark transition-all duration-300 w-full sm:w-auto">
                        Tecnología
                    </Link>
                </div>
            </div>
        </div>
      </section>

      <AnimatedSection className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center flex flex-col justify-center h-full">
              <SectionHeader
                title="Nuestra Trayectoria"
                subtitle="GENERA es el resultado de la visión y pasión por la excelencia. Fundada en 2005, nuestra misión siempre ha sido la de transformar ideas en realidades tangibles, superando las expectativas en cada proyecto."
                className="max-w-3xl mx-auto mb-8" 
              />
              <p className="text-gray-600 dark:text-gray-400 mt-6 text-xl font-serif italic max-w-2xl mx-auto leading-relaxed mb-8">
                "Creemos en la fusión de la artesanía tradicional con la innovación tecnológica. Este enfoque nos permite entregar resultados que no solo son estéticamente impecables, sino también funcionales y sostenibles a largo plazo."
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 text-center">
            <AnimatedCounter end={new Date().getFullYear() - 2005} title="Años de Trayectoria" />
            <AnimatedCounter end={150} suffix="+" title="Proyectos Completados" />
            <AnimatedCounter end={100} suffix="+" title="Clientes Satisfechos" />
          </div>
        </div>
      </AnimatedSection>
      
      <ServiceSection
        imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
        title="Desarrollo Inmobiliario"
        description="Creamos espacios residenciales y comerciales que definen el lujo y la funcionalidad. Desde la concepción hasta la entrega, gestionamos cada detalle para construir propiedades de valor duradero."
        features={['Consultoría y Adquisición', 'Diseño Arquitectónico', 'Construcción de Alta Gama', 'Gestión de Proyectos']}
        linkTo="/inmobiliaria"
        imageLeft={true}
      />
      <ServiceSection
        imageUrl="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop"
        title="Eventos y Catering"
        description="Producimos eventos memorables con un servicio de catering de clase mundial. Nos especializamos en crear experiencias inmersivas, cuidando la gastronomía, el ambiente y la logística para cualquier ocasión, desde reuniones corporativas hasta celebraciones privadas."
        features={['Planificación Integral', 'Catering Gourmet', 'Diseño de Ambientes', 'Coordinación Logística']}
        linkTo="/catering"
        imageLeft={false}
      />
      <ServiceSection
        imageUrl="https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=2070&auto=format&fit=crop"
        title="Tecnología de Diseño e Iluminación"
        description="Integramos soluciones tecnológicas de vanguardia para transformar cualquier espacio. Nuestro equipo experto diseña e implementa sistemas de automatización, sonido envolvente y proyectos de iluminación artística que crean atmósferas únicas y funcionales."
        features={['Domótica y Automatización', 'Diseño de Iluminación LED', 'Sistemas de Audio y Video', 'Instalaciones Interactivas']}
        linkTo="/tecnologia"
        imageLeft={true}
      />

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
