<template>
  <div class="mobile-container">
    <!-- 手机状态栏 -->
    <div class="status-bar">
      <div class="time">{{ currentTime }}</div>
      <!-- 将图标移到右侧 -->
      <div class="status-icons">
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>
    <div class="app-header">
      <button class="back-btn" @click="goToPage('/MobilePage')">←</button>
      <h1 class="app-title">社区跑腿</h1>
    </div>
    <!-- 服务选择区域 -->
    <main class="mobile-main">
      <div class="service-prompt">请选择需要的服务</div>
      <div class="service-grid">
        <button 
          class="service-button" 
          v-for="service in services" 
          :key="service.type"
          @click="handleErrand(service.type)"
        >
          <span class="service-icon">{{ service.icon }}</span>
          <span class="service-name">{{ service.name }}</span>
        </button>
      </div>
    </main>
    <div class="bottom-nav">
      <div class="nav-item" @click="goToHome">
        <span class="nav-icon">🏠</span>
        <span class="nav-text">首页</span>
      </div>
      <div class="nav-item" @click="goToPage('/message-Mobile')">
        <span class="nav-icon">💬</span>
        <span class="nav-text">消息</span>
      </div>
      <div class="nav-item" @click="goToMine">
        <span class="nav-icon">👤</span>
        <span class="nav-text">我的</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goToHome = () => {
  router.push('/MobilePage');
};
const goToPage = (path) => {
  router.push(path);
};
const goToMine = () => {
  router.push('/mine-Mobile');
};

// 服务列表
const services = [
  { type: '代购', name: '代购', icon: '🛍️' },
  { type: '快递', name: '快递', icon: '📦' },
  { type: '送餐', name: '送餐', icon: '🍔' },
  { type: '其他', name: '其他', icon: '🧰' }
];

// 处理跑腿功能
const handleErrand = (type) => {
  router.push({ name: 'ErrandForm1', params: { serviceType: type } });
};
</script>

<style scoped>
/* 添加缩放变换 */
.mobile-page {
  min-height: 100vh;
  background: white;
  transform: scale(0.9); /* 可根据需要调整缩放比例，这里设置为 0.9 */
  transform-origin: top left; /* 设置缩放原点为左上角 */
}
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
/* 顶部导航栏统一风格 */
.app-header {
  padding: 12px 16px;
  background: #42b983;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.back-btn {
  position: absolute;
  left: 16px;
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
}

/* 顶部导航栏 */
.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgb(44,62,80);
  color: white;
  z-index: 1000;
}

.header-left {
  cursor: pointer;
}

.back-icon {
  font-size: 1.5rem;
}

.header-title {
  font-size: 1.2rem;
  font-weight: bold;
}

/* 服务选择区域 */
.mobile-main {
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  padding: 1rem; 
  flex-grow: 1; 
}

.service-prompt {
  text-align: center;
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.service-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: white;
  color: #2c3e50;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.service-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  background: #42b983;
  color: white;
}

.service-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.service-name {
  font-size: 1.1rem;
}
.bottom-nav {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding-top: 50px; 
  padding-bottom: 10px;
  background: rgba(255, 255, 255, 0.9);
  border-top: 1px solid #e0e0e0;
  backdrop-filter: blur(10px);
  z-index: 100;
}

/* 添加悬停浮动效果 */
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
}

.nav-icon {

  font-size: 1.5rem; 
  margin-bottom: 0.2rem;
}

.service-icon {

  font-size: 3rem; 
  margin-bottom: 0.5rem;
}
.nav-item:hover {
  transform: scale(1.05);
  color: #42b983;
}
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}

.status-icons {
  display: flex;
  gap: 8px;
}
</style>