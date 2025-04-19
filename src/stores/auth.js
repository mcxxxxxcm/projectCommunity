import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: localStorage.getItem('username') || '',
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false
  }),
  actions: {
    login(username) {
      this.username = username;
      this.isLoggedIn = true;
      localStorage.setItem('username', username);
      localStorage.setItem('isLoggedIn', 'true');
    },
    logout() {
      this.username = '';
      this.isLoggedIn = false;
      localStorage.removeItem('username');
      localStorage.removeItem('isLoggedIn');
    }
  }
});