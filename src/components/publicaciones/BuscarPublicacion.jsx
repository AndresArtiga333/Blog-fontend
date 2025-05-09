import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { agregarComentario } from "../../services/api.jsx";
import usePublicacion from "../../shared/hooks/usePublicacion.jsx";
import '../../pages/publicaciones/DashBoardPublicaciones.css';
import PropTypes from 'prop-types';

export default function DetallePublicacion() {
  const { id } = useParams();
  const { publicacion, loading, error, refetch } = usePublicacion(id);
  const [autor, setAutor] = useState("");
  const [contenido, setContenido] = useState("");
  const [comentarioError, setComentarioError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setComentarioError("");
    setIsSubmitting(true);

    if (!autor.trim() || !contenido.trim()) {
      setComentarioError("Todos los campos son requeridos");
      setIsSubmitting(false);
      return;
    }

    try {
      await agregarComentario(id, { autor, contenido });
      setAutor("");
      setContenido("");
      await refetch(); 
    } catch (err) {
      setComentarioError(err.message || "Error al agregar comentario");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="loading">Cargando…</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!publicacion) return <p className="empty">No se encontró la publicación.</p>;

  return (
    <div className="detalle-publicacion">
      <h1 className="publicacion-titulo">{publicacion.titulo}</h1>
      <p className="publicacion-descripcion">{publicacion.contenido}</p>

      <div className="publicacion-meta">
        <span>Autor: {publicacion.autor}</span>
        <span>Fecha: {new Date(publicacion.fecha).toLocaleDateString()}</span>
        <span>Curso: {publicacion.curso}</span>
        <span>Categoría: {publicacion.categoria}</span>
      </div>

      <section className="comentarios-section">
        <h2>Comentarios ({publicacion.comentarios?.length || 0})</h2>
        {!publicacion.comentarios || publicacion.comentarios.length === 0 ? (
          <p className="sin-comentarios">No hay comentarios aún</p>
        ) : (
          <ul className="comentarios-list">
            {publicacion.comentarios.map((c) => (
              <li key={c._id} className="comentario">
                <div className="comentario-header">
                  <strong>{c.autor}</strong>
                  <small>{new Date(c.fecha).toLocaleDateString()}</small>
                </div>
                <p>{c.contenido}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="comentario-form">
        <h2>Agregar Comentario</h2>
        {comentarioError && <p className="error-message">{comentarioError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Tu nombre"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              required
              maxLength={30}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Escribe tu comentario aquí..."
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              required
              maxLength={500}
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={isSubmitting ? "submitting" : ""}
          >
            {isSubmitting ? "Enviando..." : "Enviar Comentario"}
          </button>
        </form>
      </section>

      <Link to="/publicaciones" className="volver-link">
        ← Volver a todas las publicaciones
      </Link>
    </div>
  );
}

DetallePublicacion.propTypes = {
    publicacion: PropTypes.shape({
      titulo: PropTypes.string.isRequired,
      contenido: PropTypes.string.isRequired,
      autor: PropTypes.string.isRequired,
      fecha: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
      ]).isRequired,
      curso: PropTypes.string.isRequired,
      categoria: PropTypes.string.isRequired,
      comentarios: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          autor: PropTypes.string.isRequired,
          contenido: PropTypes.string.isRequired,
          fecha: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Date)
          ]).isRequired
        })
      )
    }),
    loading: PropTypes.bool,
    error: PropTypes.string,
    
    autor: PropTypes.string,
    contenido: PropTypes.string,
    comentarioError: PropTypes.string,
    isSubmitting: PropTypes.bool,
    
    refetch: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    setAutor: PropTypes.func.isRequired,
    setContenido: PropTypes.func.isRequired,
    setComentarioError: PropTypes.func.isRequired,
    setIsSubmitting: PropTypes.func.isRequired
  };