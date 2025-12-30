import { useState } from 'react';
import { useHeaderStore } from '../../store/headerStore';

export const Header = () => {
  const { title, breadcrumbs } = useHeaderStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-brand-navy border-b border-brand-navy-dark sticky top-0 z-40 shadow-md">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Title */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <img 
              src="/logo.svg" 
              alt="Bekind Logo" 
              className="h-8 w-auto"
            />
            
            {/* Title */}
            <div className="flex flex-col gap-1">
              {breadcrumbs.length > 0 && (
                <nav className="flex items-center gap-2 text-sm">
                  {breadcrumbs.map((crumb, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {crumb.href ? (
                        <a
                          href={crumb.href}
                          className="text-gray-300 hover:text-brand-primary-light transition-colors"
                        >
                          {crumb.label}
                        </a>
                      ) : (
                        <span className="text-white font-medium">
                          {crumb.label}
                        </span>
                      )}
                      {index < breadcrumbs.length - 1 && (
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </nav>
              )}
              <h1 className="text-2xl font-bold text-white">{title}</h1>
            </div>
          </div>

          {/* Right: Notifications & User Profile */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-white hover:text-pastel-yellow hover:bg-brand-navy-dark rounded-lg transition-all">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pastel-yellow rounded-full"></span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-2 hover:bg-brand-navy-dark rounded-lg transition-all"
              >
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">
                    Juliana Rodríguez
                  </p>
                  <p className="text-xs text-gray-300">Administrador</p>
                </div>
                <div className="relative">
                  <img
                    src="/profileIcon.svg"
                    alt="User avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-brand-primary"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-pastel-yellow rounded-full border-2 border-brand-navy"></span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-300 transition-transform ${
                    isProfileOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Mi perfil
                  </a>
                  <a
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Configuración
                  </a>
                  <hr className="my-2 border-gray-200" />
                  <button className="w-full text-left px-4 py-2 text-sm text-status-error hover:bg-red-50 transition-colors">
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
