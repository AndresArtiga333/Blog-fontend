import { useEffect, useState } from 'react';
import { getPublicaciones } from '../services/publicacion.service';

const usePublicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const traerPublicaciones = async () => {
      const response = await getPublicaciones();
      if (response.error) {
        setError(response.message);
      } else {
        setPublicaciones(response.publicaciones);
      }
      setLoading(false);
    };

    traerPublicaciones();
  }, []);

  return { publicaciones, loading, error };
};

export default usePublicaciones;