// server/controllers/inmobiliariaController.js

const propiedadesSimuladas = [
  // --- Propiedades Existentes ---
  {
    id: 'prop1',
    nombre: 'Villa de Lujo con Vista al Mar',
    ubicacion: 'Costa Esmeralda, Cancún',
    lat: 21.1619,
    lon: -86.8515,
    precio: 1250000,
    imagenUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop',
    tag: 'Exclusivo',
    habitaciones: 4,
    banos: 5,
    metrosCuadrados: 450,
    descripcion: 'Una impresionante villa de lujo con acabados de primera calidad, piscina infinita y acceso directo a una playa privada. Disfrute de atardeceres inolvidables desde su amplia terraza. Ideal para quienes buscan privacidad y exclusividad en el paraíso.',
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
    lat: 19.4326,
    lon: -99.1332,
    precio: 850000,
    imagenUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    tag: 'Nuevo',
    habitaciones: 3,
    banos: 3,
    metrosCuadrados: 280,
    descripcion: 'Elegante penthouse en el corazón de la ciudad, con un diseño minimalista y vistas panorámicas de 360 grados. Cuenta con tecnología de hogar inteligente, acabados de lujo y acceso a amenidades exclusivas como gimnasio y rooftop bar.',
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
    lat: 20.9143,
    lon: -100.7439,
    precio: 980000,
    imagenUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
    tag: null,
    habitaciones: 6,
    banos: 7,
    metrosCuadrados: 600,
    descripcion: 'Una joya arquitectónica que combina el encanto histórico con el confort moderno. Esta hacienda cuenta con amplios jardines, un patio central con fuente y múltiples habitaciones, perfecta como residencia familiar o para un hotel boutique.',
    galeria: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop'
    ]
  },
  // --- Nuevas Propiedades ---
  {
    id: 'prop4',
    nombre: 'Villa Minimalista en el Bosque',
    ubicacion: 'Valle de Bravo, Estado de México',
    lat: 19.1925,
    lon: -100.1319,
    precio: 1100000,
    imagenUrl: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?q=80&w=1952&auto=format&fit=crop',
    tag: 'Nuevo',
    habitaciones: 5,
    banos: 5,
    metrosCuadrados: 520,
    descripcion: 'Refugio de diseño contemporáneo rodeado de naturaleza. Esta propiedad ofrece una conexión única con el exterior a través de sus grandes ventanales y espacios abiertos, ideal para escapar del bullicio de la ciudad.',
    galeria: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0e278e090?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'prop5',
    nombre: 'Penthouse con Rooftop Privado',
    ubicacion: 'Polanco, Ciudad de México',
    lat: 19.435,
    lon: -99.18,
    precio: 1850000,
    imagenUrl: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1974&auto=format&fit=crop',
    tag: 'Exclusivo',
    habitaciones: 4,
    banos: 4,
    metrosCuadrados: 350,
    descripcion: 'Viva en la cima de la ciudad. Este espectacular penthouse de dos niveles cuenta con una terraza y piscina privada, ofreciendo un oasis de lujo y entretenimiento con vistas inigualables.',
    galeria: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      // URL de la imagen corregida
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1628592102751-ba834f691680?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'prop6',
    nombre: 'Villa frente a la Playa',
    ubicacion: 'Tulum, Quintana Roo',
    lat: 20.2114,
    lon: -87.4654,
    precio: 2200000,
    imagenUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
    tag: null,
    habitaciones: 6,
    banos: 6,
    metrosCuadrados: 700,
    descripcion: 'La máxima expresión del lujo caribeño. Esta villa se encuentra directamente sobre la arena blanca de Tulum, con un diseño que fusiona lo orgánico y lo moderno, creando un santuario de paz y sofisticación.',
    galeria: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop'
    ]
  }
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
