// types/auth.types.ts

export interface LoginCredentials {
  username: string;
  password: string;
}

// La respuesta del login es un token en texto plano (string)
export type LoginResponse = string;

export interface User {
  id: string;
  username: string;
  email?: string;
  
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  clearError: () => void;
}