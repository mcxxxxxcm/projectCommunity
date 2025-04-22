<template>
  <div class="points-mall">
    <!-- 顶部导航 -->
    <header class="mall-header" :class="{ 'header-hidden': !headerVisible }">
      <div class="logo" @click="goToPage('/PCPage')">
        <div class="house-icon">
          <div class="roof"></div>
          <div class="wall">
            <div class="door"></div>
            <div class="window"></div>
          </div>
        </div>
        <span>积分商城</span>
      </div>
      <nav class="main-nav">
        <button class="nav-item" @click="goToPage('/PCPage')">
          <span>首页</span>
        </button>
        <button class="nav-item" @click="showUsageGuide">
          <span>使用指南</span>
        </button>
        <!-- 添加我的按钮 -->
        <button class="nav-item" @click="goToPage('/mine')">
          <span>我的</span>
        </button>
      </nav>
      <div class="user-points">
        <span class="points-icon">🪙</span>
        <span>我的积分: {{ points }}</span>
      </div>
    </header>

    <!-- 商品展示区 -->
    <main class="mall-main">
      <div class="product-categories">
        <button 
          v-for="category in categories" 
          :key="category" 
          :class="{ active: activeCategory === category }"
          @click="activeCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <div class="product-grid">
        <div class="product-card" v-for="product in filteredProducts" :key="product.id">
          <div class="product-image">
            <img :src="product.image" :alt="product.name">
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="product-desc">{{ product.description }}</p>
            <div class="product-footer">
              <span class="product-price">{{ product.points }} 积分</span>
              <button class="exchange-btn" @click="exchangeProduct(product)">
                立即兑换
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 返回按钮 -->
    <!-- <button class="back-button" @click="goToPage('/PCPage')">
      <span class="icon">⬅️</span>
      <span>返回首页</span>
    </button> -->
    <!-- 返回顶部按钮 -->
    <!-- 返回顶部按钮 -->
    <transition name="fade">
      <button 
        v-show="!headerVisible" 
        class="back-to-top" 
        @click="scrollToTop"
      >
        ↑
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

// 状态管理
const points = ref(authStore.points !== undefined ? authStore.points : 5000);
const activeCategory = ref('全部');
const headerVisible = ref(true);
const showBackToTop = ref(false);
let lastScrollPosition = 0;

// 商品分类
const categories = ['全部', '家居用品', '数码电子', '食品饮料', '美妆个护'];

// 商品数据
const products = ref([
  {
    id: 1,
    name: '智能音箱',
    description: '支持语音控制，高品质音效',
    points: 2000,
    category: '数码电子',
    image: 'https://img.alicdn.com/i4/2022915709/O1CN01EwoshF1s2lyolC8gV_!!2022915709.jpg_400x400.jpg'
  },
  {
    id: 2,
    name: '扫地机器人',
    description: '智能清洁，高效工作',
    points: 4000,
    category: '家居用品',
    image: 'https://img0.baidu.com/it/u=1895892400,957462569&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400'
  },
  {
    id: 3,
    name: '吹风机',
    description: '高效吹风，舒适使用',
    points: 1000,
    category: '家居用品',
    image: 'https://img2.baidu.com/it/u=1148279795,3272164897&fm=253&fmt=auto&app=120&f=JPEG?w=380&h=380'
  },
  {
    id: 4,
    name: '大米5kg',
    description: '美味大米，营养丰富',
    points: 2000,
    category: '食品饮料',
    image: 'https://img1.baidu.com/it/u=642835663,1856589659&fm=253&fmt=auto&app=120&f=JPEG?w=380&h=380'
  },
  {
    id: 5,
    name: '恒温热水壶',
    description: '高效保温，口感美味',
    points: 1000,
    category: '家居用品',
    image: 'https://img1.baidu.com/it/u=2511096713,367825848&fm=253&fmt=auto&app=138&f=JPEG?w=380&h=380'
  },
  {
    id: 6,
    name: '洗发水',
    description: '温和洗发水，适合各种肤质',
    points: 1000,
    category: '美妆个护',
    image: 'https://img2.baidu.com/it/u=2174352556,412092349&fm=253&fmt=auto&app=138&f=JPEG?w=380&h=380'
  },
  {
    id: 7,
    name: '进口猕猴桃',
    description: '新鲜猕猴桃，口感香甜',
    points: 500,
    category: '食品饮料',
    image: 'https://img1.baidu.com/it/u=3505855416,4025288674&fm=253&fmt=auto&app=138&f=JPEG?w=380&h=380'
  },{
    id: 8,
    name: '后续商品等待更新',
    description: '后续商品等待更新',
    points: 0,
    category: '后续商品等待更新',
    image: 'https://img2.baidu.com/it/u=1354102007,2279597334&fm=253&fmt=auto&app=120&f=JPEG?w=380&h=380'
  },
  // 添加更多商品...
]);

// 计算属性
const filteredProducts = computed(() => {
  return activeCategory.value === '全部' 
    ? products.value 
    : products.value.filter(p => p.category === activeCategory.value);
});

// 方法
const goToPage = (path) => {
  router.push(path);
};

const exchangeProduct = (product) => {
  if (points.value >= product.points) {
    points.value -= product.points;
    authStore.updatePoints(points.value);
    ElMessage.success(`成功兑换 ${product.name}!`);
  } else {
    ElMessage.error('积分不足，无法兑换');
  }
};

const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  headerVisible.value = currentScrollPosition < lastScrollPosition || currentScrollPosition < 10;
  showBackToTop.value = currentScrollPosition > 300;
  lastScrollPosition = currentScrollPosition;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const showUsageGuide = () => {
  ElMessage({
    message: '获取积分的途径：每日签到、参与活动 (详情见：我的)',
    type: 'info',
    duration: 5000,
    showClose: true
  });
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// 监听积分变化
watch(() => authStore.points, (newPoints) => {
  points.value = newPoints;
  localStorage.setItem('userPoints', newPoints);
});
</script>

<style scoped>
.points-mall {
  min-height: 100vh;
  background: #f5f5f5;
}

.mall-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #2c3e50;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.house-icon {
  position: relative;
  width: 40px;
  height: 40px;
}

.roof {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 15px solid #ff6b6b;
}

.wall {
  position: absolute;
  bottom: 0;
  left: 5px;
  width: 30px;
  height: 25px;
  background: #f8a5c2;
  border-radius: 0 0 5px 5px;
}

.door {
  position: absolute;
  bottom: 0;
  left: 10px;
  width: 8px;
  height: 12px;
  background: #786fa6;
  border-radius: 3px 3px 0 0;
}

.window {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  background: #f7f1e3;
  border-radius: 2px;
}

.main-nav {
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.nav-item:hover {
  color: #42b983;
}

.user-points {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
}

.points-icon {
  font-size: 1.3rem;
}

.mall-main {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.product-categories {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.product-categories button {
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-categories button.active {
  background: #42b983;
  color: white;
  border-color: #42b983;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-image {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 10px;
}

.product-image img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
}.product-info {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-desc {
  color: #666;
  margin: 0.5rem 0;
  font-size: 0.9rem;
  flex: 1;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.product-price {
  color: #e67e22;
  font-weight: bold;
}

.exchange-btn {
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.exchange-btn:hover {
  background: #3aa876;
}

.back-button {
  position: fixed;
  bottom: 30px;
  left: 30px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: white;
  color: #2c3e50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.back-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  background: #42b983;
  color: white;
}

.icon {
  font-size: 1.5rem;
}

/* 导航栏隐藏动画 */
.mall-header {
  transition: transform 0.3s ease;
}

.mall-header.header-hidden {
  transform: translateY(-100%);
}

/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 返回顶部按钮样式 */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(66, 185, 131, 0.8);
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.back-to-top:hover {
  background: rgba(58, 168, 118, 0.9);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
</style>