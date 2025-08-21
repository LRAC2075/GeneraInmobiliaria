const express = require('express');
const router = express.Router();
const { getPropiedades } = require('../controllers/inmobiliariaController');

// Definir la ruta GET para obtener todas las propiedades
router.get('/', getPropiedades);

module.exports = router;