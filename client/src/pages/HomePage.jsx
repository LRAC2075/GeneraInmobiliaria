import { Link } from 'react-router-dom';

const HomePage = () => {
  // Nueva URL de imagen de fondo, verificada y funcional.
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop';

  return (
    // Contenedor principal. Usamos 'h-screen' para que ocupe exactamente la altura de la ventana.
    // Eliminamos los márgenes negativos para un comportamiento predecible.
    <div
      className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      {/* Capa de superposición oscura para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Contenedor para el contenido. 'z-10' lo pone por encima de la capa de superposición. */}
      {/* 'h-full' asegura que el centrado vertical funcione dentro del contenedor 'h-screen'. */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        
        {/* Título principal */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-4">
          Transformando Ideas en Realidad
        </h1>
        
        {/* Subtítulo descriptivo */}
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-8">
          Soluciones de vanguardia en desarrollo inmobiliario, producción de eventos y tecnología de diseño e iluminación.
        </p>
        
        {/* Botón de Llamada a la Acción (CTA) */}
        <Link
          to="/inmobiliaria"
          className="bg-brand-gold text-brand-dark font-bold text-lg px-8 py-3 rounded-full hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
        >
          Explora Nuestros Proyectos
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
