import { useState, useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';

interface FilterMenuProps {
  statusFilter: string;
  onStatusChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const FilterMenu = ({
  statusFilter,
  onStatusChange,
  onClearFilters,
  hasActiveFilters,
}: FilterMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={menuRef}>
      <button 
        className="btn-secondary flex items-center gap-2 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
          />
        </svg>
        Filtros
        {hasActiveFilters && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-primary text-white text-xs rounded-full flex items-center justify-center">
            1
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-3 z-50">
          <div className="px-4 pb-2 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Filtros</h3>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    onClearFilters();
                    setIsOpen(false);
                  }}
                  className="text-xs text-status-error hover:underline"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>

          <div className="px-4 py-3">
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Estado
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value=""
                  checked={statusFilter === ''}
                  onChange={(e) => onStatusChange(e.target.value)}
                  className="text-brand-primary focus:ring-brand-primary"
                />
                <span className="text-sm text-gray-700">Todos</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={statusFilter === 'active'}
                  onChange={(e) => onStatusChange(e.target.value)}
                  className="text-brand-primary focus:ring-brand-primary"
                />
                <span className="text-sm text-gray-700 flex items-center gap-2">
                  Activo
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={statusFilter === 'inactive'}
                  onChange={(e) => onStatusChange(e.target.value)}
                  className="text-brand-primary focus:ring-brand-primary"
                />
                <span className="text-sm text-gray-700 flex items-center gap-2">
                  Inactivo
                </span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
