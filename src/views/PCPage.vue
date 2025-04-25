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
        <!-- 修改banner高度 -->
        <el-carousel :interval="3000" height="300px">
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
      <!-- AI管家区域 -->
      <div class="ai-assistant-container" :class="{ 'ai-assistant-visible': isAIAssistantVisible }">
        <div class="ai-assistant-header" @click="toggleAIAssistant">
          <span>AI管家</span>
          <span class="ai-assistant-icon">🤖</span>
        </div>
        <div class="ai-assistant-content">
          <div class="ai-messages">
            <div v-for="(msg, index) in aiMessages" :key="index" 
                 :class="['ai-message', msg.type]">
              {{ msg.content }}
            </div>
          </div>
          <div class="ai-input">
            <input v-model="aiInput" placeholder="输入您的问题..." 
                   @keyup.enter="sendAiMessage">
            <button @click="sendAiMessage">发送</button>
          </div>
        </div>
      </div>
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
        <a href="#">隐私政策</a> <br><br>
        <a href="#">便民电话：176*****456</a>
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
  { name: '停车管理', desc: '便捷的停车场使用', icon: '🚗', path: '/Parking-PC' },
  { name: '积分商城', desc: '用积分兑换精美礼品', icon: '🛒', path: '/PointsMall-PC' },
  { name: '儿童托管', desc: '专业的儿童照看服务', icon: '👶', path: '/ChildCare-PC' },
  { name: '水电缴费', desc: '便捷的公共事业缴费', icon: '💧', path: '/Utilities-PC' },
  { name: '社区跑腿', desc: '邻里互助跑腿服务', icon: '🏃', path: '/CommunityErrands-PC' },
  { name: '隐私管理', desc: '管理您的隐私设置', icon: '🔒', path: '/Privacy-PC' },
  { name: '投诉建议', desc: '提交您的投诉和建议', icon: '📢', path: '/Complaint-PC' },
  { name: '寻物启事', desc: '发布和查看失物招领', icon: '🔍', path: '/LostAndFound-PC' },
  { name: '社区公告', desc: '查看最新社区通知', icon: '📢', path: '/CommunityNotice-PC' },
  { name: '活动报名', desc: '参与社区活动', icon: '🎯', path: '/Activity-PC' },
  { name: '物业报修', desc: '在线提交维修申请', icon: '🔧', path: '/Repair-PC' },
  { name: '问卷调查', desc: '参与社区调查', icon: '📝', path: '/Survey-PC' }
]);

// 添加轮播图数据（合并到主script中）
const bannerImages = ref([
  {
    url: '/images/banner4.jpg', // 存储在public/images下的高清图
    alt: '社区服务'
  },
  {
    url: '/images/banner2.jpg', // 便民活动场景
    alt: '便民服务'
  },
  {
    url: '/images/banner3.jpg', // 社区活动场景
    alt: '社区活动'
  }
]);

const isAIAssistantVisible = ref(false);
const aiMessages = ref([
  { type: 'ai', content: '您好，我是社区AI管家，有什么可以帮您？' }
]);
const aiInput = ref('');

const toggleAIAssistant = () => {
  isAIAssistantVisible.value = !isAIAssistantVisible.value;
};

const sendAiMessage = async () => {
  if (!aiInput.value.trim()) return;
  
  // 添加用户消息
  aiMessages.value.push({
    type: 'user',
    content: aiInput.value
  });
  
  const userMessage = aiInput.value;
  aiInput.value = '';
  
  try {
    // 调用火山引擎方舟大模型API
    const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer cdd6dd0b-d9cc-40fa-88ad-01494f2255c3' // 使用方舟API密钥
      },
      body: JSON.stringify({
        model: "ep-20250420200120-qk98h", // 方舟大模型ID
        messages: [
          {
            role: "system",
            content: "你是社区服务AI助手，请用简洁友好的方式回答用户问题"
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });
    
    const data = await response.json();
    
    // 添加AI回复
    aiMessages.value.push({
      type: 'ai',
      content: data.choices[0].message.content
    });
  } catch (error) {
    aiMessages.value.push({
      type: 'ai',
      content: '抱歉，AI服务暂时不可用'
    });
  }
};
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
  background: #42b983; /* 改为更显眼的绿色背景 */
  border: none;
  border-radius: 20px; /* 增加圆角 */
  color: white;
  cursor: pointer;
  font-weight: bold; /* 加粗文字 */
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 添加阴影 */
}

.mobile-switch:hover {
  background: #3aa876; /* 悬停时颜色变深 */
  transform: translateY(-2px); /* 悬停时轻微上浮 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 悬停时阴影加深 */
}

.mobile-switch .icon {
  font-size: 1.2rem; /* 增大图标 */
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
  width: 90%;
  height: auto; /* 改为自适应高度 */
  border-radius: 10px;
  margin: 0 auto;
}


/* AI管家样式 */
.ai-assistant-container {
  position: fixed;
  bottom: 60px; /* 调整距离底部的位置 */
  left: 20px; /* 从right改为left */
  width: 300px;
  max-height: 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 1001; /* 提高z-index值 */
}

.ai-assistant-visible {
  max-height: 400px; /* 调整最大高度 */
}

.ai-assistant-header {
  padding: 10px;
  background: #42b983;
  color: white;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.ai-assistant-visible .ai-assistant-header::after {
  transform: rotate(180deg);
}

.ai-assistant-header:hover {
  background: #3aa876;
}

.ai-assistant-icon {
  font-size: 1.5rem;
}

.ai-assistant-content {
  padding: 10px;
}

.ai-messages {
  height: 290px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.ai-message {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
}

.ai-message.user {
  background: #e3f2fd;
  margin-left: 20%;
}

.ai-message.ai {
  background: #f5f5f5;
  margin-right: 20%;
}

.ai-input {
  display: flex;
  gap: 10px;
}

.ai-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.ai-input button {
  padding: 8px 15px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
  background: #42b983; /* 改为更显眼的绿色背景 */
  border: none;
  border-radius: 20px; /* 增加圆角 */
  color: white;
  cursor: pointer;
  font-weight: bold; /* 加粗文字 */
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 添加阴影 */
}

.mobile-switch:hover {
  background: #3aa876; /* 悬停时颜色变深 */
  transform: translateY(-2px); /* 悬停时轻微上浮 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 悬停时阴影加深 */
}

.mobile-switch .icon {
  font-size: 1.2rem; /* 增大图标 */
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
  width: 90%;
  height: auto; /* 改为自适应高度 */
  border-radius: 10px;
  margin: 0 auto;
}

</style>