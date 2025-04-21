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
    
    <!-- 手机内容区域 -->
    <div class="mobile-content">
      <h1 class="title">社区服务平台</h1>
      
      <!-- 服务导航 -->
      <div class="service-grid">
        <div 
          v-for="service in services" 
          :key="service.name" 
          class="service-item"
          @click="goToPage(service.path)"
        >
          <span class="service-icon">{{ service.icon }}</span>
          <span class="service-name">{{ service.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';

const router = useRouter();
const currentTime = ref('');

// 服务列表数据
const services = ref([
  { name: '积分商城', icon: '🛒', path: '/PointsMall-PC' },
  { name: '儿童托管', icon: '👶', path: '/ChildCare-PC' },
  { name: '水电缴费', icon: '💧', path: '/Utilities-PC' },
  { name: '社区跑腿', icon: '🏃', path: '/CommunityErrands-PC' },
  { name: '隐私管理', icon: '🔒', path: '/Privacy-PC' },
  { name: '投诉建议', icon: '📢', path: '/Complaint-PC' },
  { name: '寻物启事', icon: '🔍', path: '/LostAndFound-PC' },
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

/* 手机内容区域 */
.mobile-content {
  height: calc(100% - 40px);
  overflow-y: auto;
  padding: 1rem;
  background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
}

.title {
  color: #2c3e50;
  margin: 1rem 0;
  font-size: 1.8rem;
  text-align: center;
}

/* 服务网格布局 */
.service-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
}

.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.service-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.service-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.service-name {
  font-size: 0.9rem;
  color: #333;
}

.switch-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 80%;
  margin: 1rem auto;
  padding: 1rem;
  background: white;
  color: #2c3e50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.switch-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  background: #42b983;
  color: white;
}

.icon {
  font-size: 1.5rem;
}
</style>