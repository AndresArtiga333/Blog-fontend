import React from 'react';
import usePublicaciones from '../../shared/hooks/usePublicaciones.jsx';
import PropTypes from 'prop-types';
import '../../pages/publicaciones/DashBoardPublicaciones.css';

const PublicacionesList = ({ categoria = '', curso = '' }) => {
  const { publicaciones, loading, error } = usePublicaciones(categoria, curso);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Cargando publicaciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>Error al cargar las publicaciones:</p>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!publicaciones || publicaciones.length === 0) {
    return (
      <div className="empty-state">
        <p>No se encontraron publicaciones</p>
        {categoria || curso ? (
          <p>Intenta con otros criterios de búsqueda</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="publicaciones-container">
      {publicaciones.map((publicacion, index) => {
        const keyId = publicacion._id ?? index;

        if (!publicacion._id) {
          console.warn('Publicación sin PID:', publicacion);
        }

        return (
          <article key={keyId} className="publicacion-card">
            <h2 className="publicacion-titulo">
              <a
                href={publicacion.enlace || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Leer más sobre ${publicacion.titulo}`}
              >
                {publicacion.titulo || 'Título no disponible'}
              </a>
            </h2>
            <div className="publicacion-meta">
              <span className="publicacion-fecha">
                {publicacion.fecha ? `on ${publicacion.fecha}` : 'Fecha no disponible'}
              </span>
              {publicacion.categoria && (
                <span className="publicacion-categoria">
                  Categoria: {publicacion.categoria}
                </span>
              )}
            </div>

            {publicacion.tags?.length > 0 && (
              <div className="publicacion-tags">
                {publicacion.tags.map((tag, idx) => (
                  <span
                    key={`${keyId}-tag-${idx}`} 
                    className="tag"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
};

PublicacionesList.propTypes = {
  categoria: PropTypes.string,
  curso: PropTypes.string
};

export default PublicacionesList;