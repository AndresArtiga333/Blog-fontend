import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePublicaciones from './../../shared/hooks/usePublicaciones'; // Asegúrate de importar tu CSS

export const Navbar = () => {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState("");
  const [curso, setCurso] = useState("");

  const { publicaciones, loading, error } = usePublicaciones(categoria, curso);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <nav className="navbar">
          <div className="navbar-nav">
            {/* Botón para listar todas las publicaciones */}
            <button
              onClick={() => { setCategoria(""); setCurso(""); }}
              className="nav-button list-all"
            >
              Listar todas las publicaciones
            </button>

            {/* Dropdown para Filtrar por Categoría */}
            <div className="nav-button dropdown">
              <span>Filtrar por categoría</span>
              <div className="dropdown-content">
                <ul>
                  <li onClick={() => setCategoria('CODIGO')}>Código</li>
                  <li onClick={() => setCategoria('INVESTIGACION')}>Investigación</li>
                  <li onClick={() => setCategoria('INFOGRAFIA')}>Infografía</li>
                  <li onClick={() => setCategoria('MAPA CONCEPTUAL')}>Mapa Conceptual</li>
                  <li onClick={() => setCategoria('MAPA MENTAL')}>Mapa Mental</li>
                </ul>
              </div>
            </div>

            {/* Dropdown para Filtrar por Curso */}
            <div className="nav-button dropdown">
              <span>Filtrar por curso</span>
              <div className="dropdown-content">
                <ul>
                  <li onClick={() => setCurso('TALLER')}>Taller</li>
                  <li onClick={() => setCurso('TECNOLOGIA')}>Tecnología</li>
                  <li onClick={() => setCurso('PRACTICA SUPERVISADA')}>Práctica Supervisada</li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
