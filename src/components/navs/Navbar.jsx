import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/estilonar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleCategoriaChange = (categoria) => {
    navigate(`/publicaciones?categoria=${categoria}`);
  };

  const handleCursoChange = (curso) => {
    navigate(`/publicaciones?curso=${curso}`);
  };

  const handleGeneralChange = () =>{
    navigate(`/publicaciones`);
  }

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <nav className="navbar">
          <div className="navbar-nav">
            <span className="nav-button" onClick={handleGeneralChange}>Inicio</span>
            <div className="nav-button dropdown">
              <span>Filtrar por categoría</span>
              <div className="dropdown-content">
                <ul>
                  <li onClick={() => handleCategoriaChange('CODIGO')}>Código</li>
                  <li onClick={() => handleCategoriaChange('INVESTIGACION')}>Investigación</li>
                  <li onClick={() => handleCategoriaChange('INFOGRAFIA')}>Infografía</li>
                  <li onClick={() => handleCategoriaChange('MAPA CONCEPTUAL')}>Mapa Conceptual</li>
                  <li onClick={() => handleCategoriaChange('MAPA MENTAL')}>Mapa Mental</li>
                </ul>
              </div>
            </div>

            {/* Filtro por curso */}
            <div className="nav-button dropdown">
              <span>Filtrar por curso</span>
              <div className="dropdown-content">
                <ul>
                  <li onClick={() => handleCursoChange('TALLER')}>Taller</li>
                  <li onClick={() => handleCursoChange('TECNOLOGIA')}>Tecnología</li>
                  <li onClick={() => handleCursoChange('PRACTICA SUPERVISADA')}>Práctica Supervisada</li>
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