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
      <h1 class="app-title">积分商城</h1>
    </div>
    
    <!-- 页面内容 -->
    <div class="mobile-content">
      <!-- 搜索框 -->
      <div class="search-bar">
        <input type="text" placeholder="搜索商品...">
        <span class="search-icon">🔍</span>
      </div>
      
      <!-- 商品列表 -->
      <div class="points-mall-content">
        <div class="product-list">
          <!-- 示例商品 -->
          <div class="product-item" v-for="i in 5" :key="i">
            <div class="product-image">商品图片</div>
            <div class="product-info">
              <h3>商品名称 {{i}}</h3>
              <p>500积分</p>
              <button class="exchange-btn">兑换</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部导航栏 -->
    <div class="bottom-nav">
      <div class="nav-item active" @click="goToHome">
        <span class="nav-icon">🏠</span>
        <span class="nav-text">首页</span>
      </div>
      <div class="nav-item" @click="goToMine">
        <span class="nav-icon">👤</span>
        <span class="nav-text">我的</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('');

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

const goToMine = () => {
  router.push('/mine');
};

onMounted(() => {
  updateTime();
  const timer = setInterval(updateTime, 60000);
  onUnmounted(() => clearInterval(timer));
});
</script>

<style scoped>
/* 手机容器样式 */
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
  justify-content: center; /* 标题居中 */
  position: relative;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-align: center; /* 确保文本居中 */
}

.back-btn {
  position: absolute;
  left: 16px;
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
}

/* 页面内容区域 - 添加滚动 */
.mobile-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 60px; /* 为底部导航栏留出空间 */
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
}

.app-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
  text-align: center;
}

.back-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  padding: 0 10px 0 0;
}

/* 搜索框 */
.search-bar {
  position: relative;
  margin: 16px;
}

.search-bar input {
  width: 100%;
  padding: 12px 16px;
  padding-left: 40px;
  border: none;
  border-radius: 25px;
  background: #f5f5f5;
  font-size: 1rem;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}

/* 商品列表 */
.points-mall-content {
  padding: 0 16px;
  min-height: calc(100% - 100px); /* 确保内容足够长可以滚动 */
}

/* 底部导航栏调整 */
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
