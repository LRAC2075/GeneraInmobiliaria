import { useState } from 'react';

// ... (Los componentes FormFieldWithIcon y ContactInfoItem no cambian)
const FormFieldWithIcon = ({ id, name, type = 'text', label, value, onChange, required, iconPath }) => {
  const isTextarea = type === 'textarea';
  const commonProps = {
    id,
    name,
    value,
    onChange,
    required,
    className: "w-full bg-light-bg dark:bg-gray-800 border border-light-subtle dark:border-gray-700 rounded-lg py-2 px-4 text-light-text dark:text-white focus:outline-none focus:border-light-accent dark:focus:border-brand-gold pr-10"
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <div className="relative mt-1">
        {isTextarea ? (
          <textarea {...commonProps} rows="4"></textarea>
        ) : (
          <input type={type} {...commonProps} />
        )}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
          </svg>
        </div>
      </div>
    </div>
  );
};

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
  const [status, setStatus] = useState({ submitted: false, message: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- ¡IMPORTANTE! Pega aquí la URL que copiaste de Formspree ---
  const FORMSPREE_URL = 'https://formspree.io/f/mldlqypg'; // <-- REEMPLAZA ESTO

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ submitted: false, message: '', isError: false });

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Formspree devuelve errores en el cuerpo de la respuesta
        const data = await response.json();
        const errorMessage = data.errors?.map(err => err.message).join(', ') || 'Algo salió mal.';
        throw new Error(errorMessage);
      }

      setStatus({ submitted: true, message: '¡Mensaje enviado con éxito!', isError: false });
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });

      setTimeout(() => {
        if (isModal) closeModal();
        setStatus({ submitted: false, message: '', isError: false });
      }, 3000);

    } catch (error) {
      setStatus({ submitted: true, message: error.message, isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormFieldWithIcon id="nombre" name="nombre" label="Nombre Completo" value={formData.nombre} onChange={handleChange} required iconPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          <FormFieldWithIcon id="email" name="email" type="email" label="Correo Electrónico" value={formData.email} onChange={handleChange} required iconPath="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          <FormFieldWithIcon id="asunto" name="asunto" label="Asunto" value={formData.asunto} onChange={handleChange} required iconPath="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          <FormFieldWithIcon id="mensaje" name="mensaje" type="textarea" label="Mensaje" value={formData.mensaje} onChange={handleChange} required iconPath="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
          
          <button type="submit" disabled={isSubmitting} className="w-full bg-light-accent dark:bg-brand-gold text-white dark:text-brand-dark font-bold py-3 rounded-lg hover:opacity-90 transition-all !mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
          
          {status.submitted && (
            <p className={`mt-4 text-center ${status.isError ? 'text-red-500' : 'text-green-500'}`}>
              {status.message}
            </p>
          )}
        </form>

        <div className="border-t border-light-subtle dark:border-gray-700"></div>

        <div className="flex flex-col space-y-6">
          <ContactInfoItem iconPath="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" title="Ventas" value="ventas1@generainmobiliaria.com.pe" href="mailto:ventas1@generainmobiliaria.com.pe" />
          <ContactInfoItem iconPath="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" title="Contacto General" value="contacto@generainmobiliaria.com.pe" href="mailto:contacto@generainmobiliaria.com.pe" />
        </div>
      </div>
    </div>
  );
};

export default ContactoPage;
