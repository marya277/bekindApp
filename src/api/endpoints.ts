export const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || '';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const ENDPOINTS = {
  LOGIN: `${AUTH_BASE_URL}/api/Authentication/Login`,
  
  ACTIONS_LIST: `${API_BASE_URL}/api/v1/actions/admin-list`,
  ACTIONS_CREATE: `${API_BASE_URL}/api/v1/actions/admin-add`,
} as const;