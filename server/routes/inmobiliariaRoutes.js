const express = require('express');
const router = express.Router();
const { getPropiedades, getPropiedadById } = require('../controllers/inmobiliariaController');

// Ruta para obtener todas las propiedades
router.get('/propiedades', getPropiedades);

// NUEVA RUTA: Obtener una propiedad específica por su ID
router.get('/propiedades/:id', getPropiedadById);

module.exports = router;
