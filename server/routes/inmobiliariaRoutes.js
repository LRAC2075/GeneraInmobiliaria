const express = require('express');
const router = express.Router();
const { getPropiedades } = require('../controllers/inmobiliariaController');

// Define la ruta GET para obtener todas las propiedades
// Corresponderá a la URL: /api/inmobiliaria/propiedades
router.get('/propiedades', getPropiedades);

module.exports = router;