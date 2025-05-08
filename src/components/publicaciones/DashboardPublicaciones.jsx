import React from 'react';
import usePublicaciones from '../../shared/hooks/usePublicaciones.jsx'; 
import '../../pages/publicaciones/DashBoardPublicaciones.jsx';

const PublicacionesList = ({ categoria = '', curso = '' }) => {
  const { publicaciones, loading, error } = usePublicaciones(categoria, curso);

  if (loading) {
    return <div className="loading">Cargando publicaciones...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!publicaciones || publicaciones.length === 0) {
    return <div className="no-results">No se encontraron publicaciones</div>;
  }

  return (
    <div className="publicaciones-container">
      {publicaciones.map((publicacion) => (
        <article key={publicacion.id} className="publicacion-card">
          <h2 className="publicacion-titulo">
            <a href={publicacion.enlace || '#'} target="_blank" rel="noopener noreferrer">
              {publicacion.titulo}
            </a>
          </h2>
          
          <p className="publicacion-descripcion">{publicacion.descripcion}</p>
          
          <div className="publicacion-meta">
            <span className="publicacion-autor">{publicacion.autor || 'Autor desconocido'}</span>
            <span className="publicacion-fecha">on {publicacion.fecha || 'Fecha no disponible'}</span>
            {publicacion.categoria && (
              <span className="publicacion-categoria">in {publicacion.categoria}</span>
            )}
          </div>
          
          {publicacion.tags && publicacion.tags.length > 0 && (
            <div className="publicacion-tags">
              {publicacion.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
          )}
          
          <div className="publicacion-share">
            <span>Share on:</span>
            {/* Aquí podrías añadir iconos de redes sociales */}
          </div>
        </article>
      ))}
    </div>
  );
};

export default PublicacionesList;