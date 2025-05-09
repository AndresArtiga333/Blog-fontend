import { useState, useEffect, useCallback } from 'react';
import {
  buscarPublicacionPorId,
  agregarComentario as apiAgregarComentario
} from '../../services/api.jsx';

export default function usePublicacion(id = '') {
  const [publicacion, setPublicacion] = useState(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const resp = await buscarPublicacionPorId(id);
      if (resp.error) throw new Error(resp.message);
      setPublicacion(resp.publicacion);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAgregarComentario = useCallback(
    async ({ autor, contenido }) => {
      if (!id) return false;
      setIsSubmitting(true);
      try {
        const resp = await apiAgregarComentario(id, { autor, contenido });
        if (resp.error) throw new Error(resp.message);
        setPublicacion(prev => ({
          ...prev,
          comentarios: [...(prev?.comentarios || []), resp.comentario]
        }));
        return true;
      } catch (err) {
        setError(err.message);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [id]
  );

  return {
    publicacion,
    loading,
    error,
    refetch: fetchData,
    agregarComentario: handleAgregarComentario,
    isSubmitting
  };
}