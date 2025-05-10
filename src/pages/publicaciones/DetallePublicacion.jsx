import React from "react";
import BuscarPublicacion from "@/components/publicaciones/BuscarPublicacion";
import "../../assets/estilonar.css";

export const BuscarPublicacionPage = () => {
    return (
      <div className="buscar-publicacion-container">
        <main className="buscar-publicacion-content">
          <BuscarPublicacion />
        </main>
      </div>
    );
}
export default BuscarPublicacionPage;