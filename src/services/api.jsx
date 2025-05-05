import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/blog/v1",
  timeout: 30000,
  httpAgent: false
});

export const getPublicaciones = async () => {
    try {
      const response = await apiClient.get("/publicaciones/");
      return response.data.publicaciones
    } catch (error) {
      return {
        error: true,
        message: error.message
      };
    }
  };