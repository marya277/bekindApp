import { create } from 'zustand';
import  type { HeaderState } from '../types/header.types';

export const useHeaderStore = create<HeaderState>((set) => ({
  title: 'Dashboard',
  breadcrumbs: [],
  setHeader: (title, breadcrumbs = []) => 
    set({ title, breadcrumbs }),
  resetHeader: () => 
    set({ title: 'Dashboard', breadcrumbs: [] }),
}));
