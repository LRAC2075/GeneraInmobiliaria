import { useState } from 'react';

// Componente reutilizable para la información de contacto con ícono
const ContactInfoItem = ({ iconPath, title, value, href }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 bg-gray-800 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
        </svg>
      </div>
    </div>
    <div>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <a href={href} className="text-gray-400 hover:text-brand-gold transition-colors">{value}</a>
    </div>
  </div>
);

const ContactoPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario a un backend
    console.log('Formulario enviado:', formData);
    setSubmitted(true);
    // Limpiar el formulario después de un tiempo
    setTimeout(() => {
        setSubmitted(false);
        setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    }, 5000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Contáctanos</h1>
        <p className="text-lg text-gray-400 mt-2">¿Listo para empezar tu próximo proyecto? Déjanos un mensaje.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Columna del Formulario */}
        <div className="bg-gray-900 p-8 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="nombre" className="block text-gray-300 mb-2">Nombre Completo</label>
                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-brand-gold" />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">Correo Electrónico</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-brand-gold" />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="asunto" className="block text-gray-300 mb-2">Asunto</label>
              <input type="text" id="asunto" name="asunto" value={formData.asunto} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-brand-gold" />
            </div>
            <div className="mb-6">
              <label htmlFor="mensaje" className="block text-gray-300 mb-2">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows="5" value={formData.mensaje} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-brand-gold"></textarea>
            </div>
            <button type="submit" className="w-full bg-brand-gold text-brand-dark font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors">
              Enviar Mensaje
            </button>
            {submitted && (
              <p className="text-green-500 mt-4 text-center">¡Formulario enviado con éxito! Gracias por contactarnos.</p>
            )}
          </form>
        </div>

        {/* Columna de Información de Contacto */}
        <div className="space-y-8">
          <ContactInfoItem 
            iconPath="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            title="Ventas"
            value="ventas1@generainmobiliaria.com.pe"
            href="mailto:ventas1@generainmobiliaria.com.pe"
          />
          <ContactInfoItem 
            iconPath="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            title="Contacto General"
            value="contacto@generainmobiliaria.com.pe"
            href="mailto:contacto@generainmobiliaria.com.pe"
          />
          <ContactInfoItem 
            iconPath="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            title="Contacto Personal"
            value="evy.marin@generainmobiliaria.com.pe"
            href="mailto:evy.marin@generainmobiliaria.com.pe"
          />
          <ContactInfoItem 
            iconPath="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            title="Sitio Web"
            value="www.generainmobiliaria.com.pe"
            href="http://www.generainmobiliaria.com.pe"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactoPage;
