import axios from 'axios';
import { ENDPOINTS } from '../endpoints';
import type { LoginCredentials, LoginResponse } from '../../types/auth.types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axios.post(ENDPOINTS.LOGIN, credentials);
    return response.data;
  },
};

