// src/api/inmobiliariaAPI.js

// --- BASE DE DATOS SIMULADA ---
const propiedades = [
  { 
    id: 'villa-cancun', 
    nombre: 'Villa de Lujo Frente al Mar', 
    ubicacion: 'Cancún', 
    precio: 1800000, 
    habitaciones: 5, 
    banos: 6, 
    metrosCuadrados: 750, 
    imagenUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop',
    descripcion: 'Una espectacular villa con acceso directo a una playa privada. Disfruta de atardeceres inolvidables desde su piscina infinita. Interiores de diseño con acabados de lujo y tecnología de punta.',
    galeria: [
      'https://images.unsplash.com/photo-1613553425998-f117503b4b57?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop'
    ],
    lat: 21.1619,
    lon: -86.8515,
  },
  { 
    id: 'penthouse-polanco', 
    nombre: 'Penthouse Moderno con Vistas', 
    ubicacion: 'Polanco', 
    precio: 1200000, 
    habitaciones: 3, 
    banos: 4, 
    metrosCuadrados: 400, 
    imagenUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    descripcion: 'Ubicado en el corazón de Polanco, este penthouse ofrece vistas panorámicas de la ciudad. Con un diseño minimalista y espacios abiertos, es el epítome del lujo urbano.',
    galeria: [
        'https://images.unsplash.com/photo-1600585152225-358EA60c7ae8?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1605276374104-5de67d42b205?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
    ],
    lat: 19.4326,
    lon: -99.1332,
  },
  { 
    id: 'residencia-tulum', 
    nombre: 'Residencia Ecológica en la Selva', 
    ubicacion: 'Tulum', 
    precio: 950000, 
    habitaciones: 4, 
    banos: 4, 
    metrosCuadrados: 600, 
    imagenUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
    descripcion: 'Vive en armonía con la naturaleza en esta residencia de diseño sostenible. Amplios ventanales y materiales locales crean un oasis de paz y tranquilidad.',
    galeria: [
        'https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=2065&auto=format&fit=crop'
    ],
    lat: 20.2114,
    lon: -87.4654,
  },
  { 
    id: 'casa-lago-valle', 
    nombre: 'Casa del Lago con Muelle Privado', 
    ubicacion: 'Valle de Bravo', 
    precio: 1500000, 
    habitaciones: 6, 
    banos: 7, 
    metrosCuadrados: 850, 
    imagenUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop', // IMAGEN CORREGIDA
    descripcion: 'Una propiedad excepcional con vistas impresionantes al lago y muelle privado. Perfecta para los amantes de los deportes acuáticos y la vida al aire libre.',
    galeria: [
        'https://images.unsplash.com/photo-1597016687314-a7a9b2a5b682?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1604709177595-ee9c2580e9a2?q=80&w=1974&auto=format&fit=crop'
    ],
    lat: 19.1910,
    lon: -100.1317,
  },
  { 
    id: 'depa-playa-cancun', 
    nombre: 'Departamento con Acceso a Playa', 
    ubicacion: 'Cancún', 
    precio: 850000, 
    habitaciones: 2, 
    banos: 2, 
    metrosCuadrados: 250, 
    imagenUrl: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2070&auto=format&fit=crop',
    descripcion: 'Moderno departamento en un complejo exclusivo con todas las amenidades. Disfruta de la brisa del mar desde tu balcón privado.',
    galeria: [
        'https://images.unsplash.com/photo-1560185893-a55de8537e49?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1780&auto=format&fit=crop'
    ],
    lat: 21.1214,
    lon: -86.7722,
  },
  { 
    id: 'loft-urbano-polanco', 
    nombre: 'Loft de Diseño Urbano', 
    ubicacion: 'Polanco', 
    precio: 750000, 
    habitaciones: 1, 
    banos: 2, 
    metrosCuadrados: 200, 
    imagenUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop', // IMAGEN CORREGIDA
    descripcion: 'Un loft de estilo industrial con acabados de lujo y una ubicación inmejorable. Ideal para un estilo de vida moderno y dinámico.',
    galeria: [
        'https://images.unsplash.com/photo-1613553425998-f117503b4b57?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1617104665047-60f35354b8a4?q=80&w=1964&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1887&auto=format&fit=crop'
    ],
    lat: 19.4350,
    lon: -99.1750,
  },
];

// Función para obtener todas las propiedades
export const getPropiedades = async () => {
  // Simula una llamada a la API
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(propiedades);
    }, 500);
  });
};

// Función para obtener una propiedad por su ID
export const getPropiedadById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const propiedad = propiedades.find(p => p.id === id);
      if (propiedad) {
        resolve(propiedad);
      } else {
        reject(new Error('Propiedad no encontrada'));
      }
    }, 500);
  });
};
