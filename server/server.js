const express = require('express');
const cors = require('cors');
require('dotenv').config();

const inmobiliariaRoutes = require('./routes/inmobiliariaRoutes');

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

// Puerto
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
