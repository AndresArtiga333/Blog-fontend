import React from 'react';
import { useNavigate } from 'react-router-dom';
import usePublicaciones from '../../shared/hooks/usePublicaciones.jsx';
import PropTypes from 'prop-types';

const PublicacionesList = ({ categoria = '', curso = '' }) => {
  const { publicaciones, loading, error } = usePublicaciones(categoria, curso);
  const navigate = useNavigate();

  if (loading) return <p>Cargando publicaciones…</p>;
  if (error)   return <p>Error: {error}</p>;
  if (!publicaciones.length) return <p>No hay publicaciones.</p>;

  return (
    <div className="publicaciones-container">
      {publicaciones.map(pub => (
        <article key={pub._id} className="publicacion-card">
          <h2
            className="publicacion-titulo"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/publicaciones/${pub._id}`)}
          >
            {pub.titulo}
          </h2>
          <p className="publicacion-descripcion">
            {pub.contenido}
          </p>

          <div className="publicacion-meta">
            <span className="publicacion-autor">{pub.autor}</span>
            <span className="publicacion-fecha">on {pub.fecha}</span>
            {pub.categoria && (
              <span className="publicacion-categoria">in {pub.categoria}</span>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};

PublicacionesList.propTypes = {
  categoria: PropTypes.string,
  curso:     PropTypes.string
};

export default PublicacionesList;