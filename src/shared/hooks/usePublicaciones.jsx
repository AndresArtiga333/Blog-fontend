import { useState, useEffect } from 'react';
import { listarPublicaciones } from './../../services/api.jsx';

const usePublicaciones = (categoria = '', curso = '') => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const traerPublicaciones = async () => {
      try {
        setLoading(true);
        setError(null);
        const filtros = {};
        if (categoria) filtros.categoria = categoria.toUpperCase();
        if (curso) filtros.curso = curso.toUpperCase();

        const response = await listarPublicaciones(filtros);
        
        if (response?.error) {
          setError(response.message || "Error al obtener publicaciones");
        } else {
          setPublicaciones(response?.publicaciones || []);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Error de conexión");
      } finally {
        setLoading(false);
      }
    };

    traerPublicaciones();
  }, [categoria, curso]);

  return { publicaciones, loading, error };
};

export default usePublicaciones;