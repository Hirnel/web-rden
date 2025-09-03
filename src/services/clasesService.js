import axios from 'axios';

// URL base de la API
const API_BASE_URL = 'http://localhost:3000/api/clases';

// Obtener todas las clases
export const getAllClases = async ({ signal } = {}) => {
  const response = await axios.get(`${API_BASE_URL}/basicas`, { signal });
  return response.data;
};

// Obtener una clase por su nombre
export const getClaseByName = async (nombre) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${nombre}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo la clase ${nombre}:`, error);
    throw error;
  }
};

// Obtener una subclase específica
export const getSubclase = async (clase, subclase) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${clase}/subclases/${subclase}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo la subclase ${subclase} de ${clase}:`, error);
    throw error;
  }
};
