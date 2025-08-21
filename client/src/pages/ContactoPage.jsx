import { useState } from 'react';

// Componente reutilizable para la información de contacto con ícono
const ContactInfoItem = ({ iconPath, title, value, href }) => (
    <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light-accent dark:text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
            </svg>
        </div>
        <div>
            <h4 className="text-md font-semibold text-light-text dark:text-white">{title}</h4>
            <a href={href} className="text-gray-600 dark:text-gray-400 hover:text-light-accent dark:hover:text-brand-gold transition-colors text-sm break-all">{value}</a>
        </div>
    </div>
);

const ContactoPage = ({ isModal = false, closeModal }) => {
  const [formData, setFormData] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    setSubmitted(true);
    setTimeout(() => {
        setSubmitted(false);
        setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
        if(isModal) closeModal();
    }, 3000);
  };

  // Clases para ocultar la barra de scroll
  const scrollbarHideClasses = "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

  return (
    <div className={`w-full ${isModal ? `p-8 overflow-y-auto max-h-[90vh] ${scrollbarHideClasses}` : 'container mx-auto py-12 px-4'}`}>
      {isModal && (
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-light-text dark:hover:text-white text-3xl z-10">&times;</button>
      )}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-light-text dark:text-white">Contáctanos</h1>
        <p className="text-md text-gray-600 dark:text-gray-400 mt-2">¿Listo para empezar tu próximo proyecto?</p>
      </div>

      <div className="flex flex-col gap-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="nombre" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Nombre Completo</label>
              <input type="text" id="nombre" name="nombre" required className="w-full bg-light-bg dark:bg-gray-800 border border-light-subtle dark:border-gray-700 rounded-lg py-2 px-3 text-light-text dark:text-white focus:outline-none focus:border-light-accent dark:focus:border-brand-gold" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Correo Electrónico</label>
              <input type="email" id="email" name="email" required className="w-full bg-light-bg dark:bg-gray-800 border border-light-subtle dark:border-gray-700 rounded-lg py-2 px-3 text-light-text dark:text-white focus:outline-none focus:border-light-accent dark:focus:border-brand-gold" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="asunto" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Asunto</label>
            <input type="text" id="asunto" name="asunto" required className="w-full bg-light-bg dark:bg-gray-800 border border-light-subtle dark:border-gray-700 rounded-lg py-2 px-3 text-light-text dark:text-white focus:outline-none focus:border-light-accent dark:focus:border-brand-gold" />
          </div>
          <div className="mb-6">
            <label htmlFor="mensaje" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Mensaje</label>
            <textarea id="mensaje" name="mensaje" rows="4" required className="w-full bg-light-bg dark:bg-gray-800 border border-light-subtle dark:border-gray-700 rounded-lg py-2 px-3 text-light-text dark:text-white focus:outline-none focus:border-light-accent dark:focus:border-brand-gold"></textarea>
          </div>
          <button type="submit" className="w-full bg-light-accent dark:bg-brand-gold text-white dark:text-brand-dark font-bold py-3 rounded-lg hover:opacity-90 transition-colors">
            Enviar Mensaje
          </button>
          {submitted && (
            <p className="text-green-500 mt-4 text-center">¡Formulario enviado con éxito!</p>
          )}
        </form>

        <div className="border-t border-light-subtle dark:border-gray-700"></div>

        {/* Layout corregido para la información de contacto */}
        <div className="flex flex-col space-y-6">
          <ContactInfoItem iconPath="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" title="Ventas" value="ventas1@generainmobiliaria.com.pe" href="mailto:ventas1@generainmobiliaria.com.pe" />
          <ContactInfoItem iconPath="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" title="Contacto General" value="contacto@generainmobiliaria.com.pe" href="mailto:contacto@generainmobiliaria.com.pe" />
        </div>
      </div>
    </div>
  );
};

export default ContactoPage;
