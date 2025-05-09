import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import usePublicacion from "../../shared/hooks/usePublicacion.jsx";
import "../../pages/publicaciones/DashBoardPublicaciones.css";

const DetallePublicacion = () => {
  const { id } = useParams();
  const {
    publicacion,
    loading,
    error,
    refetch,
    agregarComentario,
    isSubmitting
  } = usePublicacion(id);

  const [autor, setAutor] = useState("");
  const [comentario, setComentario] = useState("");
  const [comentarioError, setComentarioError] = useState("");

  useEffect(() => {
  }, [publicacion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setComentarioError("");

    if (!autor.trim() || !comentario.trim()) {
      setComentarioError("Todos los campos son requeridos");
      return;
    }

    const success = await agregarComentario({ autor, contenido: comentario });
    if (success) {
      setAutor("");
      setComentario("");
      refetch();  
    }
  };

  if (loading) return <p>Cargando publicación…</p>;
  if (error)   return <p>Error: {error}</p>;
  if (!publicacion) return <p>No se encontró la publicación.</p>;

  return (
    <div className="detalle-publicacion">
      <h1 className="publicacion-titulo">
        {publicacion.titulo}
      </h1>
      <p className="publicacion-descripcion">
        {publicacion.contenido}
      </p>
      <div className="publicacion-meta">
        <span>Autor: {publicacion.autor}</span>
        <span>Fecha: {publicacion.fecha}</span>
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
        <h2>Agregar Comentario</h2>
        {comentarioError && (
          <p className="error-message">{comentarioError}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              required
              maxLength={30}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Tu comentario…"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              required
              maxLength={500}
              disabled={isSubmitting}
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando…" : "Enviar Comentario"}
          </button>
        </form>
      </section>

      <Link to="/publicaciones" className="volver-link">
        ← Volver a todas las publicaciones
      </Link>
    </div>
  );
};

export default DetallePublicacion;