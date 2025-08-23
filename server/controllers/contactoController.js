// server/controllers/contactoController.js

const nodemailer = require('nodemailer');

// Configuración del "transporter" que enviará el correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Tu correo desde .env
    pass: process.env.EMAIL_PASS, // Tu contraseña de aplicación desde .env
  },
});

const enviarConsulta = async (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;

  if (!nombre || !email || !asunto || !mensaje) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  // Opciones del correo
  const mailOptions = {
    from: `"${nombre}" <${process.env.EMAIL_USER}>`, // Muestra el nombre del remitente
    to: 'contacto@generainmobiliaria.com.pe', // El correo de tu empresa
    replyTo: email, // Para que puedas responder directamente al cliente
    subject: `Nueva Consulta: ${asunto}`,
    html: `
      <h1>Nueva consulta desde el sitio web</h1>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Correo Electrónico:</strong> ${email}</p>
      <p><strong>Asunto:</strong> ${asunto}</p>
      <hr>
      <h3>Mensaje:</h3>
      <p>${mensaje}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Mensaje enviado con éxito.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: 'Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde.' });
  }
};

module.exports = {
  enviarConsulta,
};
