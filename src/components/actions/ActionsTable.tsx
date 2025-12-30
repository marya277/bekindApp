import type { Action } from '../../types/action.types';
import { StatusBadge } from '../ui/Badge';
import { Tooltip } from '../ui/Tooltip';

interface ActionsTableProps {
  actions: Action[];
  isLoading: boolean;
}

export const ActionsTable = ({ actions, isLoading }: ActionsTableProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-3 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (actions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No hay acciones para mostrar</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
              Nombre de la categoría
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
              Icono
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
              Estado
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Descripción
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
              Fecha de creación
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {actions.map((action) => (
            <tr key={action.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: action.color }}
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {action.name}
                  </span>
                </div>
              </td>

              <td className="px-4 py-4 text-center">
                <div className="flex justify-center">
                  <img
                    src={action.icon}
                    alt={action.name}
                    className="w-10 h-10 rounded object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-icon.png';
                    }}
                  />
                </div>
              </td>

              <td className="px-4 py-4 text-center">
                <div className="flex justify-center">
                  <StatusBadge active={action.status === 1} />
                </div>
              </td>

              <td className="px-4 py-4">
                <span className="text-sm text-gray-700 line-clamp-2">
                  {action.description}
                </span>
              </td>

              <td className="px-4 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-700">
                  {new Date(action.createdAt).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </td>

              <td className="px-4 py-4">
                <div className="flex items-center justify-center gap-3">
                  <Tooltip content="Editar">
                    <button className="text-gray-600 hover:text-brand-primary hover:bg-brand-primary/10 p-1.5 rounded transition-all">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </Tooltip>
                  
                  <Tooltip content="Ver detalles">
                    <button className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-1.5 rounded transition-all">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </Tooltip>
                  
                  <Tooltip content="Eliminar">
                    <button className="text-gray-600 hover:text-status-error hover:bg-red-50 p-1.5 rounded transition-all">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
