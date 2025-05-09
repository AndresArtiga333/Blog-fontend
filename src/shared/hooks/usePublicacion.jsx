import { useEffect, useState } from 'react';
import { buscarPublicacionPorId } from './../../services/api.jsx';

const usePublicacion = (id = '') => {
    const [publicacion, setPublicacion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await buscarPublicacionPorId(id);
        
        if (response?.error) {
          setError(response.message);
        } else {
          setPublicacion(response.publicacion || null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (id) fetchData();
    }, [id]);
  
    return { 
      publicacion, 
      loading, 
      error, 
      refetch: fetchData  // Añade esta función
    };
  };

  export default usePublicacion;