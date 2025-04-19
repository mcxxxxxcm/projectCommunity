import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: '',
    isLoggedIn: false
  }),
  actions: {
    login(username) {
      this.username = username;
      this.isLoggedIn = true;
    },
    logout() {
      this.username = '';
      this.isLoggedIn = false;
    }
  }
});