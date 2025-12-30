
export interface Action {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  status: number;
  createdAt: string;
}

export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
  search?: string;
  status?: number;
}

export interface PaginatedData<T> {
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
  data: T[];
}

export interface ActionsResponse {
  data: PaginatedData<Action>;
}

export interface CreateActionPayload {
  name: string;
  description: string;
  color: string;
  status: number;
  icon: File; 
}

export interface CreateActionResponse {
  message: string;
  data?: {
    id: string;
  };
}

export interface ActionsState {
  // Datos
  actions: Action[];
  totalPages: number;
  totalElements: number;
  currentPage: number; 
  pageSize: number;
  
  // UI
  isLoading: boolean;
  error: string | null;
  

  fetchActions: (params: PaginationParams) => Promise<void>;
  createAction: (payload: CreateActionPayload) => Promise<void>;
  setPage: (page: number) => Promise<void>;
  clearError: () => void;
}