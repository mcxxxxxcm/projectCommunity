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
      <div class="user-points">
        <span class="points-icon">🪙</span>
        <span>{{ userPoints }}积分</span>
      </div>
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
          <div class="product-item" v-for="product in products" :key="product.id">
            <div class="product-image">
              <img :src="product.image" :alt="product.name">
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p>{{ product.points }}积分</p>
              <button class="exchange-btn" @click="exchangeProduct(product)">兑换</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部导航栏 -->
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
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { ElMessage } from 'element-plus'

const router = useRouter();
const authStore = useAuthStore();
const currentTime = ref('');
const userPoints = ref(parseInt(localStorage.getItem('userPoints')) || 5000); // 从localStorage初始化

// 时间更新函数
const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
};

// 导航函数
const goBack = () => {
  router.go(-1);
};

const goToHome = () => {
  router.push('/MobilePage');
};

const goToPage = (path) => {
  router.push(path);
};

const goToMine = () => {
  router.push('/mine-Mobile');
};

// 获取用户积分
const fetchUserPoints = async () => {
  try {
    await authStore.fetchUserPoints(); // 确保从后端获取最新积分
    userPoints.value = authStore.points;
    localStorage.setItem('userPoints', authStore.points);
  } catch (error) {
    console.error('获取积分失败:', error);
    // 使用本地缓存作为后备
    const cachedPoints = localStorage.getItem('userPoints');
    userPoints.value = cachedPoints !== null ? parseInt(cachedPoints) : 5000;
  }
};
// 监听用户积分变化
watch(() => authStore.points, (newPoints) => {
  userPoints.value = newPoints;
  localStorage.setItem('userPoints', newPoints); // 积分变化时更新localStorage
});

// 商品数据
const products = ref([
  {
    id: 1,
    name: '智能音箱',
    points: 2000,
    image: 'https://img.alicdn.com/i4/2022915709/O1CN01EwoshF1s2lyolC8gV_!!2022915709.jpg_100x100.jpg'
  },
  {
    id: 2,
    name: '扫地机器人',
    points: 4000,
    image: 'https://img0.baidu.com/it/u=1895892400,957462569&fm=253&fmt=auto&app=138&f=JPEG?w=100&h=100'
  },
  {
    id: 3,
    name: '洗发水',
    points: 1000,
    image: 'https://img2.baidu.com/it/u=2174352556,412092349&fm=253&fmt=auto&app=138&f=JPEG?w=380&h=380'
  },
  {
    id: 4,
    name: '进口猕猴桃',
    points: 500,
    image: 'https://img1.baidu.com/it/u=3505855416,4025288674&fm=253&fmt=auto&app=138&f=JPEG?w=380&h=380'
  },
  {
    id: 5,
    name: '恒温热水壶',
    points: 1000,
    image: 'https://img1.baidu.com/it/u=2511096713,367825848&fm=253&fmt=auto&app=138&f=JPEG?w=380&h=380'
  }
]);

// 生命周期钩子
onMounted(() => {
  updateTime();
  fetchUserPoints();
  const timer = setInterval(updateTime, 60000);
  onUnmounted(() => clearInterval(timer));
});

// 在script setup部分添加exchangeProduct函数
const exchangeProduct = (product) => {
  if (userPoints.value >= product.points) {
    const newPoints = userPoints.value - product.points;
    authStore.updatePoints(newPoints);
    ElMessage.success({
      message: `成功兑换 ${product.name}，消耗 ${product.points}积分`,
      duration: 3000,
      showClose: true
    });
  } else {
    ElMessage.error({
      message: `积分不足，无法兑换${product.name}。查看我的来获取更多积分。`,
      duration: 3000,
      showClose: true
    });
  }
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
  /* 标题居中 */
  position: relative;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
  /* 确保文本居中 */
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
  overflow-x: hidden;
  /* 禁止水平滚动 */
  padding-bottom: 60px;
  scrollbar-width: thin;
  /* 细滚动条 */
  scrollbar-color: #cce0d7 #f5f5f5;
  /* 滚动条颜色 */
  ;
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

/* 顶部导航栏样式调整 */
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

.user-points {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;
  z-index: 1;
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
  padding: 16px;
  min-height: calc(100% - 100px);
}

.product-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.product-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.product-image {
  height: 120px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 0.9rem;
}

.product-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
  /* 水平居中 */
  text-align: center;
  /* 文本居中 */
  height: calc(100% - 140px);
  /* 减去图片高度 */
}

.product-info h3 {
  margin: 0 0 8px;
  font-size: 1rem;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  /* 确保宽度100% */
}

.product-info p {
  margin: 0 0 12px;
  font-size: 0.9rem;
  color: #42b983;
  font-weight: 600;
  width: 100%;
  /* 确保宽度100% */
}

.exchange-btn {
  width: 80%;
  /* 调整按钮宽度 */
  margin: 0 auto;
  /* 按钮居中 */
  padding: 5px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.exchange-btn:hover {
  background: #3aa876;
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

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-width: 100px;
  max-height: 100px;
}
</style>