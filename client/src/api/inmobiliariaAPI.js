import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const inmobiliariaAPI = axios.create({
  baseURL: API_URL,
});

export const getPropiedades = async () => {
  try {
    const response = await inmobiliariaAPI.get('/inmobiliaria/propiedades');
    return response.data;
  } catch (error) {
    console.error("Error al obtener las propiedades:", error);
    throw error;
  }
};

// NUEVA FUNCIÓN: Obtener una propiedad por su ID
export const getPropiedadById = async (id) => {
  try {
    const response = await inmobiliariaAPI.get(`/inmobiliaria/propiedades/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la propiedad ${id}:`, error);
    throw error;
  }
};

