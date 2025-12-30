import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-drawer z-20 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <img src="/logo.svg" alt="Be Kind Network" className="h-10 w-auto" />
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'
          }
        >
          Categorías de acciones
        </NavLink>
        <NavLink
          to="/impacto-social"
          className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'
          }
        >
          Impacto Social
        </NavLink>
        <NavLink
          to="/comunidad"
          className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'
          }
        >
          Comunidad
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full btn-secondary text-left flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};