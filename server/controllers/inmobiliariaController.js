const propiedadesSimuladas = [
  {
    id: 'prop1',
    nombre: 'Villa de Lujo con Vista al Mar',
    ubicacion: 'Costa Esmeralda, Cancún',
    precio: 1250000,
    imagenUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop',
    tag: 'Exclusivo',
    habitaciones: 4,
    banos: 5,
    metrosCuadrados: 450,
    descripcion: 'Una impresionante villa de lujo con acabados de primera calidad, piscina infinita y acceso directo a una playa privada. Disfrute de atardeceres inolvidables desde su amplia terraza. Ideal para quienes buscan privacidad y exclusividad en el paraíso.',
    // URLs de la galería verificadas y funcionales
    galeria: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'prop2',
    nombre: 'Penthouse Moderno en el Centro',
    ubicacion: 'Polanco, Ciudad de México',
    precio: 850000,
    imagenUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    tag: 'Nuevo',
    habitaciones: 3,
    banos: 3,
    metrosCuadrados: 280,
    descripcion: 'Elegante penthouse en el corazón de la ciudad, con un diseño minimalista y vistas panorámicas de 360 grados. Cuenta con tecnología de hogar inteligente, acabados de lujo y acceso a amenidades exclusivas como gimnasio y rooftop bar.',
    // URLs de la galería verificadas y funcionales
    galeria: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'prop3',
    nombre: 'Hacienda Colonial Restaurada',
    ubicacion: 'San Miguel de Allende, Guanajuato',
    precio: 980000,
    imagenUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
    tag: null,
    habitaciones: 6,
    banos: 7,
    metrosCuadrados: 600,
    descripcion: 'Una joya arquitectónica que combina el encanto histórico con el confort moderno. Esta hacienda cuenta con amplios jardines, un patio central con fuente y múltiples habitaciones, perfecta como residencia familiar o para un hotel boutique.',
    // URLs de la galería NUEVAS y verificadas
    galeria: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop',
      // URL CORREGIDA
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop'
    ]
  },
];

const getPropiedades = (req, res) => {
  res.status(200).json(propiedadesSimuladas);
};

const getPropiedadById = (req, res) => {
  const { id } = req.params;
  const propiedad = propiedadesSimuladas.find(p => p.id === id);
  if (propiedad) {
    res.status(200).json(propiedad);
  } else {
    res.status(404).json({ message: 'Propiedad no encontrada' });
  }
};

module.exports = {
  getPropiedades,
  getPropiedadById,
};
