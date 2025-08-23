require('dotenv').config();
const express = require('express');
const cors = require('cors');

const inmobiliariaRoutes = require('./routes/inmobiliariaRoutes');

const contactoRoutes = require('./routes/contactoRoutes'); // Importa las nuevas rutas

// Inicializar la app de Express
const app = express();

// Middlewares
// Habilitar CORS para permitir peticiones desde el cliente
app.use(cors());
// Permitir que el servidor entienda JSON en el cuerpo de las peticiones
app.use(express.json());

// Rutas de la API
app.get('/api', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});

app.use('/api/inmobiliaria', inmobiliariaRoutes);

app.use('/api', contactoRoutes); // Usa las rutas de contacto

// Puerto
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
