<template>
  <div class="pc-page">
    <header class="header" :class="{ 'header-hidden': !isHeaderVisible }">
      <!-- 将 logo 部分移到前面 -->
      <div class="logo">
        <div class="house-icon">
          <div class="roof"></div>
          <div class="wall">
            <div class="door"></div>
            <div class="window"></div>
          </div>
        </div>
        <span>用电分析</span>
      </div>
      <nav class="utilities-nav">
        <button class="nav-item" @click="goToPage('/PCPage')">首页</button>
        <button class="nav-item" @click="goToPage('/Utilities-PC')">缴费主页</button>
        <button class="nav-item" @click="goToPage('/billing-history')">历史账单</button>
        <button class="nav-item" @click="goToPage('/electricity-analysis')">用电分析</button>
        <button class="nav-item" @click="goToPage('/safety-guide')">安全指南</button>
        <button class="nav-item" @click="goToPage('/water-bill-payment')">水费缴纳</button>
        <button class="nav-item" @click="goToElectricityBillPage">电费缴纳</button>
        <button class="nav-item" @click="goToGasBillPage">燃气费缴纳</button>
      </nav>
    </header>

    <div class="analysis-container">
      <!-- 用电趋势图表 -->
      <div class="chart-card">
        <h2>月度用电趋势</h2>
        <div class="chart-placeholder"></div>
      </div>

      <!-- 峰谷用电分析 -->
      <div class="peak-valley-card">
        <h2>峰谷用电分布</h2>
        <div class="data-grid">
          <div class="data-item">
            <span class="label">高峰时段用电</span>
            <span class="value">58%</span>
          </div>
          <div class="data-item">
            <span class="label">平段用电</span>
            <span class="value">30%</span>
          </div>
          <div class="data-item">
            <span class="label">低谷时段用电</span>
            <span class="value">12%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="footer">
      <p>© 2025 社区服务平台 版权所有</p>
      <div class="footer-links">
        <a href="#">关于我们</a>
        <a href="#">联系方式</a>
        <a href="#">隐私政策</a> <br><br>
        <a href="#">便民电话：176*****456</a>
      </div>
    </footer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isHeaderVisible = ref(true);
let lastScrollPosition = 0;

const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset;
  isHeaderVisible.value = currentScrollPosition < lastScrollPosition || currentScrollPosition < 10;
  lastScrollPosition = currentScrollPosition;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

const goToPage = (path) => {
  router.push(path);
};

const goToWaterBillPage = () => {
  router.push('/water-bill-payment');
};

const goToElectricityBillPage = () => {
  router.push('/electricity-bill-payment');
};

const goToGasBillPage = () => {
  router.push('/gas-bill-payment');
};


// 保持原有导入
const highUsagePeriod = ref(true); // 根据实际需求替换为动态判断逻辑
</script>

<style scoped>
.analysis-container {
  max-width: 1200px;
  margin: 80px auto;
  padding: 2rem;
}

.chart-card, .peak-valley-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 2rem;
  margin-bottom: 2rem;
}

.chart-placeholder {
  height: 400px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 1rem;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.data-item {
  text-align: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.data-item .label {
  color: #666;
  font-size: 0.9rem;
}

.data-item .value {
  font-size: 1.5rem;
  color: #2196F3;
  font-weight: bold;
  margin-top: 0.5rem;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #2c3e50;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: transform 0.3s ease; /* 新增过渡效果 */
}

.header-hidden {
  transform: translateY(-100%); /* 隐藏动画 */
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
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

.utilities-nav {
  /* 让导航项在父元素中居中 */
  margin: 0 auto; 
  display: flex;
  gap: 1.5rem;
}

.nav-item {
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
.pc-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 设置最小高度为视口高度 */
  background: linear-gradient(135deg, #f5f5f5 0%, #f5f5f5 100%);
  padding-top: 80px; 
}

.pc-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.footer {
  background: #2c3e50;
  color: white;
  padding: 2rem;
  text-align: center;
  margin-top: auto; /* 让页脚自动位于底部 */
  width: 100%; /* 确保页脚宽度铺满页面 */
}

.footer-links {
  margin-top: 1rem;
}
.footer-links a {
  color: #42b983;
  margin: 0 1rem;
  text-decoration: none;
}
</style>