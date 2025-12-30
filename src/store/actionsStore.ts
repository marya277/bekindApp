
import { create } from 'zustand';
import type { ActionsState, PaginationParams, CreateActionPayload } from '../types/action.types';
import { actionsService } from '../api/services/actionsService';

export const useActionsStore = create<ActionsState>((set, get) => ({
  actions: [],
  totalPages: 0,
  totalElements: 0,
  currentPage: 1, 
  pageSize: 10,
  isLoading: false,
  error: null,

  fetchActions: async (params: PaginationParams) => {
    if (params.pageNumber < 1) {
      console.error('❌ pageNumber < 1 detectado:', params);
      params = { ...params, pageNumber: 1 };
    }
    
    console.log('🔍 fetchActions - params enviados a API:', params);
    
    set({ isLoading: true, error: null });
    try {
      const response = await actionsService.getActions(params);
      
      console.log('🔍 fetchActions - respuesta completa:', response);
      
      const paginatedData = response.data;
      
      console.log('📊 Acciones cargadas:', {
        pageNumberAPI: paginatedData.pageNumber,
        totalPages: paginatedData.totalPages,
        items: paginatedData.data.length,
        totalElements: paginatedData.totalElements,
      });
      
      set({
        actions: paginatedData.data,
        totalPages: paginatedData.totalPages,
        totalElements: paginatedData.totalElements,
        currentPage: params.pageNumber,
        pageSize: paginatedData.pageSize,
        isLoading: false,
      });
    } catch (error: any) {
      console.error('❌ Error al cargar acciones:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message ||
                          'Error al cargar las acciones';
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  createAction: async (payload: CreateActionPayload) => {
    set({ isLoading: true, error: null });
    try {
      await actionsService.createAction(payload);
      set({ isLoading: false });
      
      console.log('✅ Acción creada, recargando página 1...');
      await get().fetchActions({ pageNumber: 1, pageSize: get().pageSize });
    } catch (error: any) {
      console.error('❌ Error al crear acción:', error);
      set({
        error: error.response?.data?.message || 'Error al crear la acción',
        isLoading: false,
      });
      throw error;
    }
  },

  setPage: async (page: number) => {
    console.log('🔍 setPage - página solicitada:', page);
    
    if (page < 1) {
      console.error('❌ Página inválida (< 1):', page);
      return;
    }
    
    const { pageSize, totalPages } = get();
    
    if (page > totalPages) {
      console.warn('⚠️  Página solicitada excede totalPages:', { page, totalPages });
      return;
    }
    
    console.log('🔍 setPage - enviando a API:', { page, pageSize });
    
    await get().fetchActions({ pageNumber: page, pageSize });
  },

  clearError: () => {
    set({ error: null });
  },
}));