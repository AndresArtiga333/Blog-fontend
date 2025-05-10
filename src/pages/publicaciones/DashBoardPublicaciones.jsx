import React from "react";
import Navbar from "@/components/navs/Navbar";
import DashboardPublicaciones from "../../components/publicaciones/DashboardPublicaciones";
import '../../assets/estilonar.css';

export const DashboardPublicacionesPage = () => {
    return (
      <div className="dashboard-container">
        <Navbar />
        <main className="dashboard-content">
          <DashboardPublicaciones />
        </main>
      </div>
    );
};
  export default DashboardPublicacionesPage;