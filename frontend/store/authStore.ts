import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  userName: string | null;
  userPhone: string | null;
  setAuth: (userId: string, userName: string, userPhone: string) => void;
  clearAuth: () => void;
  loadAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userId: null,
  userName: null,
  userPhone: null,
  
  setAuth: async (userId: string, userName: string, userPhone: string) => {
    await AsyncStorage.setItem('userId', userId);
    await AsyncStorage.setItem('userName', userName);
    await AsyncStorage.setItem('userPhone', userPhone);
    set({ isAuthenticated: true, userId, userName, userPhone });
  },
  
  clearAuth: async () => {
    await AsyncStorage.multiRemove(['userId', 'userName', 'userPhone']);
    set({ isAuthenticated: false, userId: null, userName: null, userPhone: null });
  },
  
  loadAuth: async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const userName = await AsyncStorage.getItem('userName');
      const userPhone = await AsyncStorage.getItem('userPhone');
      if (userId) {
        set({ isAuthenticated: true, userId, userName, userPhone });
      }
    } catch (error) {
      console.error('Error loading auth:', error);
    }
  },
}));
