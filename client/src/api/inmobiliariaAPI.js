import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const inmobiliariaAPI = axios.create({
  baseURL: API_URL,
});

export const getPropiedades = async () => {
  try {
    // Se corrige la URL para apuntar al endpoint correcto: /inmobiliaria/propiedades
    const response = await inmobiliariaAPI.get('/inmobiliaria/propiedades');
    return response.data;
  } catch (error) {
    console.error("Error al obtener las propiedades:", error);
    throw error;
  }
};