import React, { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import usePublicaciones from "../../shared/hooks/usePublicaciones"; 
import PropTypes from 'prop-types';
import "../../assets/estilonar.css";

export const PublicacionesPage = () => {
  const location = useLocation();
  const [categoria, setCategoria] = useState("");
  const [curso, setCurso] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setCategoria(queryParams.get("categoria") || "");
    setCurso(queryParams.get("curso") || "");
  }, [location]);

  const { publicaciones, loading, error } = usePublicaciones(categoria, curso);

  const navigate = useNavigate();

  if (loading) return <p>Cargando publicaciones...</p>;
  if (error) return <p>Error al cargar publicaciones: {error}</p>;
  if (!publicaciones.length) return <p>No hay publicaciones.</p>;

  return (
    <div className="publicaciones-container">
      {publicaciones.map((pub) => (
        <article key={pub._id} className="publicacion-card">
        <h2
            className="publicacion-titulo"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/publicaciones/${pub._id}`)}
          >
            {pub.titulo}
          </h2>
          <p className="publicacion-descripcion">{pub.contenido}</p>
          <div className="publicacion-meta">
            <span className="publicacion-autor">{pub.curso}</span>
            <span className="publicacion-fecha">{pub.fecha}</span>
            <span className="publicacion-categoria">{pub.categoria}</span>
          </div>
        </article>
      ))}
    </div>
  );
};

PublicacionesPage.propTypes = {
    categoria: PropTypes.string,
    curso: PropTypes.string
  };

export default PublicacionesPage;