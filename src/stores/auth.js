import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    username: '',
    points: parseInt(localStorage.getItem('points')) || 1000 // 默认1000积分
  }),
  actions: {
    login(username) {
      this.username = username;
      this.isLoggedIn = true;
      this.points = parseInt(localStorage.getItem('points')) || 0; // 读取积分
      localStorage.setItem('username', username);
      localStorage.setItem('isLoggedIn', 'true');
    },
    logout() {
      this.username = '';
      this.isLoggedIn = false;
      this.points = 0;
      localStorage.removeItem('username');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('points');
    },
    updatePoints(newPoints) {
      this.points = newPoints;
      localStorage.setItem('points', newPoints); // 持久化积分
    }
  }
})