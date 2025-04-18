<template>
  <div class="pc-layout">
    <!-- 修改header部分 -->
    <header class="header" :class="{ 'header-hidden': !isHeaderVisible }">
      <div class="logo">
        <div class="house-icon">
          <div class="roof"></div>
          <div class="wall">
            <div class="door"></div>
            <div class="window"></div>
          </div>
        </div>
        <span>社区服务平台</span>
      </div>
      <nav class="main-nav">
        <button class="nav-item" @click="goToPage('/PCPage')">首页</button>
        <button class="nav-item" @click="goToPage('/PointsMall-PC')">积分商城</button>
        <button class="nav-item" @click="goToPage('/ChildCare-PC')">儿童托管</button>
        <button class="nav-item" @click="goToPage('/Utilities-PC')">水电缴费</button>
        <button class="nav-item" @click="goToPage('/CommunityErrands-PC')">社区跑腿</button>
        <button class="nav-item" @click="goToPage('/Privacy-PC')">隐私管理</button>
        <button class="nav-item" @click="goToPage('/Complaint-PC')">投诉建议</button>
        <button class="nav-item" @click="goToPage('/LostAndFound-PC')">寻物启事</button>
        <!-- 添加我的按钮 -->
        <button class="nav-item" @click="goToPage('/mine')">我的</button>
      </nav>
      <button class="mobile-switch" @click="goToMobile">
        <span class="icon">📱</span>
        <span>手机版</span>
      </button>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- Banner区域 -->
      <section class="banner">
        <!-- 修改后的Banner区域 -->
        <el-carousel :interval="3000" height="400px">
          <el-carousel-item v-for="(image, index) in bannerImages" :key="index">
            <img :src="image.url" :alt="image.alt" class="banner-image">
            <div class="banner-text">
              <h1>{{ image.title }}</h1>
              <p>{{ image.desc }}</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </section>

      <!-- 内容区域 -->
      <section class="content-section">
        <div class="service-card" v-for="service in services" :key="service.name" @click="goToPage(service.path)">
          <span class="service-icon">{{ service.icon }}</span>
          <h3>{{ service.name }}</h3>
          <p>{{ service.desc }}</p>
        </div>
      </section>
    </main>

    <!-- 添加返回顶部按钮 -->
    <button class="back-to-top" :class="{ 'show': !isHeaderVisible }" @click="scrollToTop">
      <span class="icon">↑</span>
    </button>

    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2025 社区服务平台 版权所有</p>
      <div class="footer-links">
        <a href="#">关于我们</a>
        <a href="#">联系方式</a>
        <a href="#">隐私政策</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { ref, onMounted, onUnmounted } from 'vue';
import { ElCarousel, ElCarouselItem } from 'element-plus';

const router = useRouter();
const authStore = useAuthStore();
const isHeaderVisible = ref(true); // 添加缺失的响应式变量
const lastScrollPosition = ref(0); // 添加缺失的响应式变量

const goToPage = (path) => {
  const protectedRoutes = ['/mine', '/PointsMall-PC'];
  if (protectedRoutes.includes(path) && !authStore.isLoggedIn) {
    router.push('/');
    return;
  }
  router.push(path);
};

const goToMobile = () => {
  router.push('/MobilePage');
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  isHeaderVisible.value = currentScrollPosition < lastScrollPosition.value || currentScrollPosition < 10;
  lastScrollPosition.value = currentScrollPosition;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// 添加服务列表数据
const services = ref([
  { name: '积分商城', desc: '用积分兑换精美礼品', icon: '🛒', path: '/PointsMall-PC' },
  { name: '儿童托管', desc: '专业的儿童照看服务', icon: '👶', path: '/ChildCare-PC' },
  { name: '水电缴费', desc: '便捷的公共事业缴费', icon: '💧', path: '/Utilities-PC' },
  { name: '社区跑腿', desc: '邻里互助跑腿服务', icon: '🏃', path: '/CommunityErrands-PC' },
  { name: '隐私管理', desc: '管理您的隐私设置', icon: '🔒', path: '/Privacy-PC' },
  { name: '投诉建议', desc: '提交您的投诉和建议', icon: '📢', path: '/Complaint-PC' },
  { name: '寻物启事', desc: '发布和查看失物招领', icon: '🔍', path: '/LostAndFound-PC' },
  { name: '社区公告', desc: '查看最新社区通知', icon: '📢', path: '/Notice-PC' },
  { name: '便民电话', desc: '常用服务联系电话', icon: '📞', path: '/Contact-PC' },
  { name: '活动报名', desc: '参与社区活动', icon: '🎯', path: '/Activity-PC' },
  { name: '物业报修', desc: '在线提交维修申请', icon: '🔧', path: '/Repair-PC' },
  { name: '问卷调查', desc: '参与社区调查', icon: '📝', path: '/Survey-PC' }
]);

// 添加轮播图数据（合并到主script中）
const bannerImages = ref([
  {
    url: '../images/4969e1e07de6867e793ed56ce591c693.jpeg', // 社区服务场景
    alt: '社区服务',
    title: '温馨社区 服务到家',
    desc: '全方位社区生活服务'
  },
  {
    url: 'https://img95.699pic.com/photo/50136/1348.jpg_wh860.jpg', // 便民活动场景
    alt: '便民服务', 
    title: '便民服务一站式',
    desc: '让生活更便捷'
  },
  {
    url: 'https://img95.699pic.com/photo/50136/1349.jpg_wh860.jpg', // 社区活动场景
    alt: '社区活动',
    title: '丰富社区活动',
    desc: '共建和谐邻里关系'
  }
]);

</script>

<!-- 删除重复的<style>标签，保留一个 -->
<style scoped>
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

.main-nav {
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

.mobile-switch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.banner {
  background: linear-gradient(135deg, #42b983 0%, #2c3e50 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.banner h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.content-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.service-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.service-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 1rem;
}

.footer {
  background: #2c3e50;
  color: white;
  padding: 2rem;
  text-align: center;
  margin-top: auto;
}

.footer-links {
  margin-top: 1rem;
}

.footer-links a {
  color: #42b983;
  margin: 0 1rem;
  text-decoration: none;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: transform 0.3s ease;
  z-index: 1000;
}

.header-hidden {
  transform: translateY(-100%);
}

.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
}

.back-to-top.show {
  opacity: 1;
  visibility: visible;
}

.back-to-top .icon {
  font-size: 1.5rem;
}

/* 调整main-content的margin-top */
.main-content {
  margin-top: 80px;
}
/* 修改banner样式 */
.banner {
  margin-top: 0;
  padding: 0 !important;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  width: 80%;
  z-index: 1;
}

.el-carousel {
  width: 100%;
}
</style>