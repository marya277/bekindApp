import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateAction from '../pages/CreateAction';
import ComingSoon from '../pages/ComingSoon';
import { Layout } from '../components/layout/Layout';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categorias" element={<Dashboard />} />
            <Route path="/actions/create" element={<CreateAction />} />
            
            {/* Rutas próximamente */}
            <Route path="/impacto-social" element={<ComingSoon />} />
            <Route path="/comunidad" element={<ComingSoon />} />
            <Route path="/sponsors" element={<ComingSoon />} />
            <Route path="/marketplace" element={<ComingSoon />} />
            <Route path="/bakanes" element={<ComingSoon />} />
            <Route path="/convenios" element={<ComingSoon />} />
            
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
