import { useEffect, useState, useMemo } from 'react';
import { useActionsStore } from '../store/actionsStore';
import { useHeaderStore } from '../store/headerStore';
import { ActionsTable } from '../components/actions/ActionsTable';
import { Pagination } from '../components/ui/Pagination';
import { Drawer } from '../components/ui/Drawer';
import { CreateActionForm } from '../components/actions/CreateActionForm';
import { FilterMenu } from '../components/ui/FilterMenu';

const Dashboard = () => {
  const setHeader = useHeaderStore((state) => state.setHeader);
  
  const {
    actions,
    totalPages,
    currentPage,
    isLoading,
    error,
    fetchActions,
    setPage,
  } = useActionsStore();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'categorias' | 'tipos' | 'evidencias'>('categorias');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    setHeader('Categorías');
    fetchActions({ pageNumber: 1, pageSize: 10 });
  }, [setHeader]);

  const handlePageChange = (page: number) => {
    console.log('🔍 Dashboard - handlePageChange:', page);
    setPage(page);
  };

  const handleCreateSuccess = () => {
    setIsDrawerOpen(false);
  };

  const filteredActions = useMemo(() => {
    return actions.filter((action) => {
      const matchesSearch = searchTerm === '' || 
        action.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        action.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por estado
      const matchesStatus = statusFilter === '' || 
        (statusFilter === 'active' && action.status === 1) ||
        (statusFilter === 'inactive' && action.status === 0);

      return matchesSearch && matchesStatus;
    });
  }, [actions, searchTerm, statusFilter]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
  };

  const hasActiveFilters = searchTerm !== '' || statusFilter !== '';

  return (
    <>
      <div className="space-y-6">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('categorias')}
              className={`pb-3 px-1 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === 'categorias'
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Categorías
            </button>
            <button
              onClick={() => setActiveTab('tipos')}
              className={`pb-3 px-1 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === 'tipos'
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tipos
            </button>
            <button
              onClick={() => setActiveTab('evidencias')}
              className={`pb-3 px-1 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === 'evidencias'
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Evidencias
            </button>
          </nav>
        </div>

        {activeTab === 'categorias' && (
          <>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input pl-10"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </div>
              </div>
              
              <FilterMenu
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                onClearFilters={handleClearFilters}
                hasActiveFilters={hasActiveFilters}
              />
              
              <button 
                className="btn-primary"
                onClick={() => setIsDrawerOpen(true)}
              >
                Crear tipo de categoría
              </button>
            </div>

            {error && (
              <div className="bg-status-error/10 border border-status-error rounded-card p-4">
                <p className="text-status-error">{error}</p>
              </div>
            )}

            {hasActiveFilters && (
              <div className="text-sm text-gray-600">
                Mostrando {filteredActions.length} de {actions.length} categorías
              </div>
            )}

            <div className="card overflow-visible">
              <ActionsTable actions={filteredActions} isLoading={isLoading} />
            </div>

            {!isLoading && totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}

        {activeTab === 'tipos' && (
          <div className="text-center py-12">
            <p className="text-gray-500">Contenido de Tipos próximamente</p>
          </div>
        )}

        {activeTab === 'evidencias' && (
          <div className="text-center py-12">
            <p className="text-gray-500">Contenido de Evidencias próximamente</p>
          </div>
        )}
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Crear nueva categoría"
      >
        <CreateActionForm
          onSuccess={handleCreateSuccess}
          onCancel={() => setIsDrawerOpen(false)}
        />
      </Drawer>
    </>
  );
};

export default Dashboard;
