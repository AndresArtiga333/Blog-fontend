import { Navigate } from 'react-router-dom';
import DashboardPublicaciones from './pages/publicaciones/DashBoardPublicaciones.jsx';
import DetallePublicacion   from './pages/publicaciones/DetallePublicacion.jsx';

export const routes = [
  {
    path: '/publicaciones/:id',
    element: <DetallePublicacion />
  },
  {
    path: '/publicaciones',
    element: <DashboardPublicaciones />
  },
  {
    path: '*',
    element: <Navigate to="/publicaciones" replace />
  }
];
