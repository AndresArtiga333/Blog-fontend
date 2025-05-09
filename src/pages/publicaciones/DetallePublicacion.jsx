import React from "react";
import Navbar from "@/components/navs/Navbar";
import BuscarPublicacion from "@/components/publicaciones/BuscarPublicacion";
import "./buscarPublicacion.css";

export const BuscarPublicacionPage = () => {
    return (
      <div className="buscar-publicacion-container">
        <Navbar />
        <main className="buscar-publicacion-content">
          <BuscarPublicacion />
        </main>
      </div>
    );
}
export default BuscarPublicacionPage;