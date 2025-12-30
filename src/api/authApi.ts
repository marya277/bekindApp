
import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import type { LoginCredentials, LoginResponse } from '../types/auth.types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    console.log('🔐 Login request to:', ENDPOINTS.LOGIN);
    console.log('📦 Credentials:', credentials);
    
    const response = await apiClient.post<LoginResponse>(
      ENDPOINTS.LOGIN, 
      credentials
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(`${ENDPOINTS.LOGIN}/logout`);
  },

  refreshToken: async (): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      `${ENDPOINTS.LOGIN}/refresh`
    );
    return response.data;
  },
};
