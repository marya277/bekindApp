
import apiClient from '../client';
import { ENDPOINTS } from '../endpoints';
import type {
  ActionsResponse,
  PaginationParams,
  CreateActionPayload,
  CreateActionResponse,
} from '../../types/action.types';

export const actionsService = {
 
  getActions: async (params: PaginationParams): Promise<ActionsResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append('pageNumber', params.pageNumber.toString());
    queryParams.append('pageSize', params.pageSize.toString());
    
    if (params.search) {
      queryParams.append('search', params.search);
    }
    
    if (params.status !== undefined) {
      queryParams.append('status', params.status.toString());
    }
    
    const url = `${ENDPOINTS.ACTIONS_LIST}?${queryParams.toString()}`;
    
    console.log('🔍 URL completa generada:', url);
    
    const response = await apiClient.get<ActionsResponse>(url);
    
    return response.data;
  },

 
  createAction: async (payload: CreateActionPayload): Promise<CreateActionResponse> => {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('description', payload.description);
    formData.append('color', payload.color);
    formData.append('status', payload.status.toString());
    formData.append('icon', payload.icon); 

    const response = await apiClient.post<CreateActionResponse>(
      ENDPOINTS.ACTIONS_CREATE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
};