<template>
  <div class="mine-container">
    <!-- 顶部导航 -->
    <header class="mine-header">
      <div class="back-btn" @click="goBack">
        <span>←</span>
        <span>返回</span>
      </div>
    </header>

    <!-- 个人信息卡片 -->
    <div class="profile-card">
      <div class="avatar">
        <img src="https://img.icons8.com/ios/100/000000/user-male-circle--v1.png" alt="头像">
      </div>
      <div class="user-info">
        <h2>{{ authStore.username }}</h2>
        <p>积分: {{ points }} 分</p>
      </div>
    </div>

    <!-- 功能列表 -->
    <div class="function-list">
      <div class="function-item" @click="goToPage('/points')">
        <span>我的积分</span>
        <span>→</span>
      </div>
      <div class="function-item" @click="goToPage('/settings')">
        <span>设置</span>
        <span>→</span>
      </div>
      <div class="function-item" @click="goToPage('/orders')">
        <span>兑换记录</span>
        <span>→</span>
      </div>
      <div class="function-item" @click="logout">
        <span>退出登录</span>
        <span>→</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth'; // 引入Pinia store

const router = useRouter();
const authStore = useAuthStore();
const points = ref(5000); // 从全局状态获取

const goBack = () => {
  router.go(-1);
};

const goToPage = (path) => {
  router.push(path);
};

const logout = () => {
  // 登出逻辑
  alert('已退出登录');
  router.push('/');
};
</script>

<style scoped>
.mine-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.mine-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #2c3e50;
  color: white;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.profile-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: white;
  margin: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 1.5rem;
}

.user-info h2 {
  margin: 0 0 0.5rem 0;
}

.function-list {
  margin: 1rem;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.function-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.function-item:last-child {
  border-bottom: none;
}

.function-item:hover {
  background: #f9f9f9;
}
</style>