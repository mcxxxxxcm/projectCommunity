<template>
  <div class="mobile-container">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="time">{{ currentTime }}</div>
      <div class="status-icons">
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>

    <!-- 顶部导航栏 -->
    <div class="app-header">
      <button class="back-btn" @click="goBack">←</button>
      <h1 class="app-title">我的</h1>
    </div>

    <!-- 页面内容 -->
    <div class="mobile-content">
      <!-- 用户信息卡片 -->
      <div class="profile-card">
        <div class="avatar">
          <img src="https://img.icons8.com/ios/100/000000/user-male-circle--v1.png" alt="头像">
        </div>
        <div class="user-info">
          <h2>{{ username }}</h2>
          <p>{{ userPoints }}积分</p>
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

    <!-- 底部导航栏 -->
    <div class="bottom-nav">
      <div class="nav-item" @click="goToHome">
        <span class="nav-icon">🏠</span>
        <span class="nav-text">首页</span>
      </div>
      <div class="nav-item active">
        <span class="nav-icon">👤</span>
        <span class="nav-text">我的</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const currentTime = ref('');
const username = ref(authStore.username || '用户名');
const userPoints = ref(authStore.points || 5000);

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
};

const goBack = () => {
  router.go(-1);
};

const goToHome = () => {
  router.push('/MobilePage');
};

const goToPage = (path) => {
  router.push(path);
};

const logout = () => {
  authStore.logout();
  router.push('/');
};

onMounted(() => {
  updateTime();
  const timer = setInterval(updateTime, 60000);
  onUnmounted(() => clearInterval(timer));
});
</script>

<style scoped>
/* 复用MobilePage的样式 */
.mobile-container {
  width: 375px;
  height: 667px;
  margin: 2rem auto;
  border: 12px solid #222;
  border-radius: 36px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  background: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  flex-direction: column;
}

/* 状态栏 */
.status-bar {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  background: #f8f8f8;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

/* 顶部导航栏 */
.app-header {
  padding: 12px 16px;
  background: #42b983;
  color: white;
  display: flex;
  align-items: center;
  position: relative;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
}

.back-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  padding: 0 10px 0 0;
  z-index: 1;
}

/* 页面内容区域 */
.mobile-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 60px;
}

/* 用户信息卡片 */
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
  font-size: 1.2rem;
}

.user-info p {
  margin: 0;
  color: #42b983;
  font-weight: 600;
}

/* 功能列表 */
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
  transition: background 0.2s ease;
}

.function-item:hover {
  background: #f9f9f9;
}

.function-item:last-child {
  border-bottom: none;
  color: #ff4d4f;
}

.function-item:last-child:hover {
  background-color: rgba(255, 77, 79, 0.1);
}

/* 底部导航栏 */
.bottom-nav {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background: rgba(255, 255, 255, 0.9);
  border-top: 1px solid #e0e0e0;
  backdrop-filter: blur(10px);
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.nav-item:hover {
  background: rgba(66, 185, 131, 0.1);
  transform: scale(1.05);
}

.nav-item.active {
  color: #42b983;
}

.nav-item.active:hover {
  background: rgba(66, 185, 131, 0.2);
}

.nav-icon {
  font-size: 1.5rem;
  margin-bottom: 2px;
}

.nav-text {
  font-size: 0.75rem;
  font-weight: 500;
}
</style>