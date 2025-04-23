<template>
  <div class="mobile-container">
    <!-- 手机状态栏 -->
    <div class="status-bar">
      <div class="time">{{ currentTime }}</div>
      <div class="status-icons">
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>
    
    <!-- 顶部导航栏 -->
    <div class="app-header">
      <h1 class="app-title">社区服务</h1>
    </div>
    
          
      <!-- 搜索框 -->
      <div class="search-bar">
        <input type="text" placeholder="搜索社区服务...">
        <span class="search-icon">🔍</span>
      </div>

    <!-- 手机内容区域 -->
    <div class="mobile-content">
      <!-- 单张banner图 -->
      <div class="banner-container">
        <img src="/images/banner5.jpg" alt="banner">
      </div>
      
      <!-- 服务导航 -->
      <div class="service-grid">
        <div 
          v-for="service in services" 
          :key="service.name" 
          class="service-item"
          @click="goToPage(service.path)"
        >
          <div class="service-icon-container">
            <span class="service-icon">{{ service.icon }}</span>
          </div>
          <span class="service-name">{{ service.name }}</span>
        </div>
      </div>
      
      <!-- 底部导航栏 -->
      <div class="bottom-nav">
        <div class="nav-item" :class="{active: $route.path === '/MobilePage'}" @click="goToPage('/MobilePage')">
          <span class="nav-icon">🏠</span>
          <span class="nav-text">首页</span>
        </div>
        <div class="nav-item" @click="goToPage('/message-Mobile')">
          <span class="nav-icon">💬</span>
          <span class="nav-text">消息</span>
        </div>
        <div class="nav-item" @click="goToPage('/mine-Mobile')">
          <span class="nav-icon">👤</span>
          <span class="nav-text">我的</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';
import Swiper from 'swiper';
import 'swiper/css';

const router = useRouter();
const currentTime = ref('');

// 服务列表数据
const services = ref([
  { name: '积分商城', icon: '🛒', path: '/PointsMall-Mobile' },
  { name: '儿童托管', icon: '👶', path: '/ChildCare-Mobile' },
  { name: '水电缴费', icon: '💧', path: '/Utilities-Mobile' },
  { name: '社区跑腿', icon: '🏃', path: '/CommunityErrands-Mobile' },
  { name: '隐私管理', icon: '🔒', path: '/Privacy-Mobile' },
  { name: '投诉建议', icon: '📢', path: '/Complaint-Mobile' },
  { name: '寻物启事', icon: '🔍', path: '/LostAndFound-Mobile' },
  { name: '切换pc端', icon: '💻', path: '/PCPage'}
]);

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
};

const goToPC = () => {
  router.push('/PCPage');
};

const goToPage = (path) => {
  router.push(path);
};

onMounted(() => {
  updateTime();
  const timer = setInterval(updateTime, 60000);
  
  // 初始化Swiper
  new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
  
  onUnmounted(() => {
    clearInterval(timer);
  });
});

const addPoints = () => {
  const newPoints = points.value + 1000;
  points.value = newPoints;
  authStore.points = newPoints; // 更新store中的积分
  localStorage.setItem('userPoints', newPoints); // 更新localStorage
  ElMessageBox.alert('成功获取1000积分', '提示', {
    confirmButtonText: '确定',
    type: 'success'
  });
};
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
}

/* 手机状态栏 */
.status-bar {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  background: #f8f8f8;
  border-bottom: 1px solid #eee;
  font-size: 14px;
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
  max-height: 20px;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-align: center; /* 确保文本居中 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
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

/* 服务网格布局 */
.service-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 16px;
}

.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.service-icon-container {
  width: 60px;
  height: 60px;
  background: #42b983;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.service-icon {
  font-size: 1.8rem;
  color: white;
}

.service-name {
  font-size: 0.85rem;
  color: #333;
  text-align: center;
}

/* 底部导航栏 */
.bottom-nav {
  position: absolute;
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
  background: rgba(66, 185, 131, 0.1);
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

/* 单张banner样式 */
.banner-container {
  width: 100%;
  height: 150px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
}

.banner-container img {
  width: 90%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px; /* 可选：添加圆角效果 */
}

/* 删除原有的.swiper-container相关样式 */
</style>