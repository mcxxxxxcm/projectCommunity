<template>
  <div class="pc-page">
    <header class="header" :class="{ 'header-hidden': !isHeaderVisible }">
      <div class="logo">
        <div class="house-icon">
          <div class="roof"></div>
          <div class="wall">
            <div class="door"></div>
            <div class="window"></div>
          </div>
        </div>
        <span>燃气安全指南</span>
      </div>
      <nav class="utilities-nav">
        <button class="nav-item" @click="goToPage('/PCPage')">首页</button>
        <button class="nav-item" @click="goToPage('/Utilities-PC')">缴费主页</button>
        <button class="nav-item" @click="goToPage('/billing-history')">历史账单</button>
        <button class="nav-item" @click="goToPage('/electricity-analysis')">用电分析</button>
        <button class="nav-item" @click="goToPage('/safety-guide')">安全指南</button>
        <button class="nav-item" @click="goToPage('/water-bill-payment')">水费缴纳</button>
        <button class="nav-item" @click="goToPage('/electricity-bill-payment')">电费缴纳</button>
        <button class="nav-item" @click="goToPage('/gas-bill-payment')">燃气费缴纳</button>
      </nav>
    </header>

    <div class="safety-container">
      <!-- 安全要点 -->
      <div class="safety-card">
        <h2>用气安全须知</h2>
        <ul class="safety-list">
          <li>使用后务必关闭燃气阀门</li>
          <li>定期检查燃气管道连接处</li>
          <li>发现异味立即开窗通风</li>
          <li>禁止私自改装燃气设施</li>
        </ul>
      </div>

      <!-- 紧急处理 -->
      <div class="emergency-card">
        <h2>紧急情况处理</h2>
        <div class="steps">
          <div class="step">
            <span class="number">1</span>
            <p>立即关闭总阀门</p>
          </div>
          <div class="step">
            <span class="number">2</span>
            <p>打开门窗通风</p>
          </div>
          <div class="step">
            <span class="number">3</span>
            <p>到安全区域拨打紧急电话</p>
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
</script>

<style scoped>
.safety-container {
  max-width: 1200px;
  margin: 80px auto;
  padding: 2rem;
}

.safety-card, .emergency-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 2rem;
  margin-bottom: 2rem;
}

.safety-list {
  padding-left: 1.5rem;
  line-height: 2;
  color: #2c3e50;
}

.safety-list li {
  margin: 1rem 0;
}

.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.step {
  text-align: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.number {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: #2196F3;
  color: white;
  border-radius: 50%;
  line-height: 40px;
  margin-bottom: 1rem;
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

.utility-buttons-container {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.utility-button {
  padding: 3rem 5rem; 
  border-radius: 2.5rem; 
  font-size: 2rem; 
  background: rgb(255, 255, 255);
  color: #2c3e50;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  flex: 1; 
  min-width: 150px; 
}

.utility-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  background: #42b983;
  color: white;
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