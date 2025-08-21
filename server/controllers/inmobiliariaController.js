// Esta función simula la obtención de datos desde una base de datos (ej. Firestore)
const getPropiedades = (req, res) => {
  // Datos de ejemplo que simulan una respuesta de la base de datos
  const propiedadesSimuladas = [
    {
      id: 'prop1',
      nombre: 'Villa de Lujo con Vista al Mar',
      ubicacion: 'Costa Esmeralda, Cancún',
      precio: 1250000,
      imagenUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop'
    },
    {
      id: 'prop2',
      nombre: 'Penthouse Moderno en el Centro',
      ubicacion: 'Polanco, Ciudad de México',
      precio: 850000,
      imagenUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'prop3',
      nombre: 'Hacienda Colonial Restaurada',
      ubicacion: 'San Miguel de Allende, Guanajuato',
      precio: 980000,
      imagenUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop'
    },
  ];

  // Enviar la respuesta en formato JSON
  res.status(200).json(propiedadesSimuladas);
};

module.exports = {
  getPropiedades,
};

