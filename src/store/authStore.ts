import { create } from 'zustand';
import type { AuthState, LoginCredentials } from '../types/auth.types';
import { authService } from '../api/services/authService'; // ✅ Correcto

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('auth-token'),
  isAuthenticated: !!localStorage.getItem('auth-token'),
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const token = await authService.login(credentials);
      
      if (!token) {
        throw new Error('No se recibió token de autenticación');
      }
      
      localStorage.setItem('auth-token', token);
      
      const user = {
        id: credentials.username,
        username: credentials.username,
      };
      
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      console.log('✅ Login exitoso');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al iniciar sesión';
      
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('auth-token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  checkAuth: () => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      set({ token, isAuthenticated: true });
    } else {
      set({ token: null, user: null, isAuthenticated: false });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));