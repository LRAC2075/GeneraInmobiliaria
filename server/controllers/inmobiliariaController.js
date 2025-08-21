// Esta función simula la obtención de datos desde una base de datos (ej. Firestore)
const getPropiedades = (req, res) => {
  // Datos de ejemplo que simulan una respuesta de la base de datos
  const propiedadesSimuladas = [
    {
      id: 'prop1',
      titulo: 'Apartamento Moderno en el Centro',
      descripcion: 'Un hermoso apartamento con 2 habitaciones y vistas a la ciudad.',
      precio: 250000,
    },
    {
      id: 'prop2',
      titulo: 'Casa Familiar con Jardín',
      descripcion: 'Espaciosa casa con 4 habitaciones, ideal para una familia.',
      precio: 450000,
    },
    {
      id: 'prop3',
      titulo: 'Loft Industrial con Terraza',
      descripcion: 'Loft de diseño único con una gran terraza privada.',
      precio: 320000,
    },
  ];

  // Enviar la respuesta en formato JSON
  res.status(200).json(propiedadesSimuladas);
};

module.exports = {
  getPropiedades,
};
