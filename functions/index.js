// functions/index.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});

admin.initializeApp();

// Las credenciales ahora se leen automáticamente del archivo .env.generasac-9b439
// gracias al sistema integrado de Firebase Functions.

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

exports.enviarConsulta = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const {nombre, email, asunto, mensaje} = req.body;

    if (!nombre || !email || !asunto || !mensaje) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios.",
      });
    }

    try {
      await admin.firestore().collection("consultas").add({
        nombre,
        email,
        asunto,
        mensaje,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);
      return res.status(500).json({
        message: "Error al guardar la consulta.",
      });
    }

    const mailOptions = {
      from: `"${nombre}" <${process.env.GMAIL_EMAIL}>`,
      to: "contacto@generainmobiliaria.com.pe",
      replyTo: email,
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
      return res.status(200).json({
        message: "¡Mensaje enviado con éxito! Gracias por contactarnos.",
      });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      return res.status(500).json({
        message: "Hubo un error al enviar el mensaje.",
      });
    }
  });
});
