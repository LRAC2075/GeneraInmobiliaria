// server/routes/contactoRoutes.js

const express = require('express');
const router = express.Router();
const { enviarConsulta } = require('../controllers/contactoController');

// Definimos la ruta POST para /api/contacto
router.post('/contacto', enviarConsulta);

module.exports = router;
