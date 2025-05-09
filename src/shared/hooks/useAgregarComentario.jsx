import { useState, useEffect } from 'react';
import { buscarPublicacionPorId, agregarComentario } from './../../services/api.jsx';

const usePublicacion = (id = '') => {
  const [publicacion, setPublicacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await buscarPublicacionPorId(id);
      if (response?.error) throw new Error(response.message);
      setPublicacion(response.publicacion || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAgregarComentario = async (nuevoComentario) => {
    try {
      setIsSubmitting(true);
      const response = await agregarComentario(id, nuevoComentario);
      if (response.error) throw new Error(response.message);
      
      // Actualización optimista
      setPublicacion(prev => ({
        ...prev,
        comentarios: [...prev.comentarios, response.comentario]
      }));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  return { 
    publicacion, 
    loading, 
    error,
    agregarComentario: handleAgregarComentario,
    isSubmitting,
    refetch: fetchData
  };
};

export default usePublicacion;