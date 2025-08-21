import axios from 'axios';

// La URL base de la API apuntará al servidor backend.
// En desarrollo, podría ser 'http://localhost:5001'.
// En producción, será la URL de tu Cloud Function o Cloud Run.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const inmobiliariaAPI = axios.create({
  baseURL: API_URL,
});

export const getPropiedades = async () => {
  try {
    const response = await inmobiliariaAPI.get('/inmobiliaria');
    return response.data;
  } catch (error) {
    console.error("Error al obtener las propiedades:", error);
    throw error;
  }
};