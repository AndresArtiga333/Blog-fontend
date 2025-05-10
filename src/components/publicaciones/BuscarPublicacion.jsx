import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import usePublicacion from "../../shared/hooks/usePublicacion.jsx";
import "../../assets/style.css";
import PropTypes from "prop-types";
 
export default function DetallePublicacion() {
  const { id } = useParams();
  const {
    publicacion,
    loading,
    error,
    agregarComentario,
    isSubmitting,
  } = usePublicacion(id);
 
  const [autor, setAutor] = useState("");
  const [contenido, setContenido] = useState("");
  const [comentarioError, setComentarioError] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setComentarioError("");
 
    if (!autor.trim() || !contenido.trim()) {
      setComentarioError("Todos los campos son requeridos");
      return;
    }
 
    const success = await agregarComentario({ autor, contenido });
    if (success) {
      setAutor("");
      setContenido("");
    } else {
      setComentarioError("Error al agregar comentario");
    }
  };
 
  if (loading) return <p>Cargando publicación…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!publicacion) return <p>No se encontró la publicación.</p>;
 
  return (
    <div className="detalle-publicacion">
      <h1 className="publicacion-titulo">{publicacion.titulo}</h1>
      <p className="publicacion-descripcion">{publicacion.contenido}</p>
 
      <div className="publicacion-meta">
        <span>Fecha: {new Date(publicacion.fecha).toLocaleDateString()}</span>
        <span>Curso: {publicacion.curso}</span>
        <span>Categoría: {publicacion.categoria}</span>
      </div>
      <section className="comentarios-section">
        <h2>Comentarios ({publicacion.comentarios.length})</h2>
        {publicacion.comentarios.length === 0 ? (
          <p>No hay comentarios aún</p>
        ) : (
          <ul className="comentarios-list">
            {publicacion.comentarios.map((c) => (
              <li key={c._id} className="comentario">
                <strong>{c.autor}</strong>
                <p>{c.contenido}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
 
      <section className="comentario-form">
        <h2 className="form-title">💬 Agregar un Comentario</h2>
 
        {comentarioError && <p className="error-message">{comentarioError}</p>}
 
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Tu nombre de usuario"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              required
              maxLength={30}
              className="form-input"
            />
          </div>
 
          <div className="form-group">
            <label htmlFor="comentario" className="form-label">
              Comentario
            </label>
            <textarea
              id="comentario"
              placeholder="Escribe tu comentario aquí..."
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              required
              maxLength={500}
              className="form-textarea"
            />
          </div>
 
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? "Enviando…" : "Enviar Comentario"}
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
    fecha: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
      .isRequired,
    curso: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    comentarios: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        autor: PropTypes.string.isRequired,
        contenido: PropTypes.string.isRequired,
        fecha: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
          .isRequired,
      })
    ),
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
  refetch: PropTypes.func.isRequired,
  agregarComentario: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};