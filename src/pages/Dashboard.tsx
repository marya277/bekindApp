
import { useEffect, useState } from 'react';
import { useActionsStore } from '../store/actionsStore';
import { ActionsTable } from '../components/actions/ActionsTable';
import { Pagination } from '../components/ui/Pagination';
import { Drawer } from '../components/ui/Drawer';
import { CreateActionForm } from '../components/actions/CreateActionForm';

const Dashboard = () => {
  const {
    actions,
    totalPages,
    totalElements,
    currentPage,
    isLoading,
    error,
    fetchActions,
    setPage,
  } = useActionsStore();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    fetchActions({ pageNumber: 1, pageSize: 10 });
  }, []); 

 const handlePageChange = (page: number) => {
    console.log('🔍 Dashboard - handlePageChange:', page);
    setPage(page);
  };

  const handleCreateSuccess = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Categorías</h1>
            <p className="text-sm text-gray-500 mt-1">
              {totalElements} categorías en total
            </p>
          </div>
          <button 
            className="btn-primary"
            onClick={() => setIsDrawerOpen(true)}
          >
            Crear tipo de categoría
          </button>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar"
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
            <button className="btn-secondary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
                />
              </svg>
              Filtros
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-status-error/10 border border-status-error rounded-card p-4">
            <p className="text-status-error">{error}</p>
          </div>
        )}

        <div className="card overflow-visible">
          <ActionsTable actions={actions} isLoading={isLoading} />
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