import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    username: '',
    points: parseInt(localStorage.getItem('userPoints')) || 0 // 从localStorage初始化
  }),
  actions: {
    login(username) {
      this.username = username;
      this.isLoggedIn = true;
      localStorage.setItem('username', username);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userPoints', this.points); // 登录时保存积分
    },
    logout() {
      this.username = '';
      this.isLoggedIn = false;
      this.points = 0;
      localStorage.removeItem('username');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userPoints'); // 登出时清除积分
    },
    updatePoints(newPoints) {
      this.points = newPoints;
      localStorage.setItem('userPoints', newPoints); // 更新积分时同步到localStorage
    }
  }
})