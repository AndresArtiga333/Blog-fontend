import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/blog/v1", timeout: 30000, httpAgent: false});

export const listarPublicaciones = async (data = {}) => {
    try {
      const response = await apiClient.post('/publicaciones/listar', data); 
      return response.data;
    } catch (error) {
      return { 
        error: true, 
        message: error.response?.data?.message || error.message 
      };
    }
  };


  export const buscarPublicacionPorId = async (id) => {
    try {
      const response = await apiClient.get(`/publicaciones/buscarPublicacionPorId/${id}`);
      return response.data;
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || error.message,
      };
    }
  };
  
  export const agregarComentario = async (pid, { autor, contenido }) => {
    try {
      const response = await apiClient.post(
        `/comentarios/agregarComentarios/${pid}`,
        { autor, contenido }
      );
      return response.data;
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || error.message,
      };
    }
  };