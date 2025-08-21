import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { useModal } from '../context/ModalContext';

// Componente reutilizable para las secciones de servicio
const ServiceSection = ({ imageUrl, title, description, linkTo, imageLeft = false }) => {
  const imageOrder = imageLeft ? 'md:order-1' : 'md:order-2';
  const textOrder = imageLeft ? 'md:order-2' : 'md:order-1';

  return (
    <section className="py-16 sm:py-24 bg-light-subtle dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={imageOrder}>
            <img src={imageUrl} alt={title} className="rounded-lg shadow-2xl w-full h-auto object-cover" />
          </div>
          <div className={textOrder}>
            <h3 className="text-4xl font-bold text-light-text dark:text-white mb-4">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">{description}</p>
            <Link
              to={linkTo}
              className="inline-block bg-light-accent dark:bg-brand-gold text-white dark:text-brand-dark font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Más Información
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};


const HomePage = () => {
  const { openModal } = useModal();
  const heroBackgroundImage = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop';

  return (
    <div className="bg-light-bg dark:bg-brand-dark">
      {/* 1. Hero Section */}
      <section
        className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${heroBackgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 px-4">
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
      </section>

      {/* 2. Sección "Acerca de Nosotros" */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
           <SectionHeader 
            title="Nuestras Capacidades"
            subtitle="Con más de una década de experiencia, fusionamos creatividad, precisión y tecnología para entregar resultados excepcionales. Nuestra filosofía se centra en la excelencia y la innovación, garantizando que cada proyecto no solo cumpla, sino que supere las expectativas."
          />
        </div>
      </section>

      {/* 3. Secciones de Servicios */}
      <ServiceSection
        imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
        title="Desarrollo Inmobiliario"
        description="Creamos espacios residenciales y comerciales que definen el lujo y la funcionalidad. Desde la concepción hasta la entrega, gestionamos cada detalle para construir propiedades de valor duradero."
        linkTo="/inmobiliaria"
        imageLeft={true}
      />
      <ServiceSection
        imageUrl="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop"
        title="Eventos y Catering"
        description="Producimos eventos memorables con un servicio de catering de clase mundial. Nos especializamos en crear experiencias inmersivas, cuidando la gastronomía, el ambiente y la logística para cualquier ocasión."
        linkTo="/catering"
        imageLeft={false}
      />
      <ServiceSection
        imageUrl="https://images.unsplash.com/photo-1614289371518-722f2615943d?q=80&w=1974&auto=format&fit=crop"
        title="Tecnología de Diseño e Iluminación"
        description="Integramos soluciones tecnológicas de vanguardia en diseño e iluminación para transformar cualquier espacio. Desde sistemas de automatización hasta instalaciones de luz artística, la innovación es nuestra herramienta."
        linkTo="/tecnologia"
        imageLeft={true}
      />

      {/* 4. Call to Action Final */}
      <section className="py-16 sm:py-24 text-center bg-light-subtle dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-light-text dark:text-white mb-4">¿Tienes un proyecto en mente?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Permítenos ayudarte a hacerlo realidad. Contáctanos para una consulta sin compromiso.
          </p>
          <button
            onClick={openModal}
            className="inline-block bg-light-accent dark:bg-brand-gold text-white dark:text-brand-dark font-bold text-lg px-10 py-4 rounded-lg hover:opacity-90 transition-colors"
          >
            Contáctanos
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
