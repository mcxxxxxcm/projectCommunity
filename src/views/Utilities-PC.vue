<template>
  <div class="pc-page">
    <!-- 新增导航栏 -->
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
        <span>水电气缴费</span>
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
    <!-- 移除包裹按钮的容器 -->
    <!-- 新增三个大盒子 -->
    <div class="chat-container" :class="{ 'collapsed': isChatCollapsed }">
      <div class="toggle-button" @click="toggleChat">
        {{ isChatCollapsed ? '▶' : '◀' }}
      </div>
      <div class="chat-box" v-if="!isChatCollapsed">
        <div class="chat-box">
          <div class="chat-messages">
            <div v-for="(msg, index) in messages" :key="index" class="message">
              <div class="message-header">
                <span class="username">{{ msg.user }}</span>
                <span class="timestamp">{{ msg.time }}</span>
              </div>
              <div class="message-content">{{ msg.content }}</div>
            </div>
          </div>
          <div class="chat-input">
            <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息...">
            <button @click="sendMessage">发送</button>
          </div>
        </div>
      </div>
    </div> 
    <div class="boxes-container">
      <div class="left-box">
        <div class="water-payment">
          <!-- 图标区 -->
          <div class="icon-container">
            <div class="water-drop"></div>
          </div>
          
          <!-- 标题 -->
          <h2 class="payment-title">水费缴纳</h2>
          
          <!-- 核心信息 -->
          <div class="core-info">
            <div class="current-fee">
              <span class="label">当前月份水费：</span>
              <span class="value">¥ 85.50</span>
            </div>
            <div class="account-balance">
              <span class="label">账户余额：</span>
              <span class="value">剩余 ¥ 200.00</span>
            </div>
          </div>
          
          <!-- 交互按钮 -->
          <div class="actions">
            <button class="pay-button" @click="goToWaterBillPage">立即缴费</button>
            <button class="history-link" @click="goToPage('/billing-history')">历史账单 ></button>
            
          </div>
          
          <!-- 附加信息 -->
          <div class="footer-note">
            最后缴费日期：2025-03-25
          </div>
        </div>
      </div>
      <div class="middle-box">
        <div class="electric-payment">
          <!-- 图标区 -->
          <div class="icon-container">
            <div class="lightning-icon"></div>
          </div>
          
          <!-- 标题 -->
          <h2 class="payment-title">电费缴纳</h2>
          
          <!-- 核心信息 -->
          <div class="core-info">
            <div class="electric-usage">

              <span class="label">当前剩余电量：</span>
              <span class="value">152 度</span>
            </div>
            <div class="estimated-cost">
              <span class="label">预估费用：</span>
              <span class="value">本月约 ¥ 268.40</span>
            </div>
          </div>
      
          <!-- 交互按钮 -->
          <div class="actions">
            <button class="recharge-button" @click="goToElectricityBillPage">预存电费</button>
            <a href="#" class="analysis-link" @click="goToPage('/electricity-analysis')">用电分析 ></a>
          </div>
      
          <!-- 动态提示 -->
            <div class="footer-note">
              当前为用电高峰时段（08:00-12:00）
              
          
          </div>
        </div>
      </div>
      <div class="right-box">
        <div class="gas-payment">
          <!-- 图标区 -->
          <div class="icon-container">
            <div class="flame-icon"></div>
          </div>
          
          <!-- 标题 -->
          <h2 class="payment-title">燃气费缴纳</h2>
          
          <!-- 核心信息 -->
          <div class="core-info">
            <div class="gas-usage">
              <span class="label">本月用气量：</span>
              <span class="value">18 立方米</span>
            </div>
            <div class="account-status">
              <span class="label">账户状态：</span>
              <span class="value">已绑定2台设备 <button class="edit-btn">✎</button></span>
            </div>
          </div>
      
          <!-- 交互按钮 -->          <div class="actions">
            <button class="recharge-button" @click="goToGasBillPage">一键充值</button>
            <a href="#" class="guide-link" @click="goToPage('/safety-guide')">安全指南 ></a>
          </div>
      
          <!-- 安全提示 -->
          <div class="footer-note">
            已安全使用 328 天
              
          
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
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const messages = ref([
  { user: '社区管理员', time: '10:00', content: '欢迎加入社区交流群！' },
  { user: '王邻居', time: '10:05', content: '大家记得今天下午停水通知' }
]);
const newMessage = ref('');

const sendMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push({
      user: '当前用户',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      content: newMessage.value
    });
    newMessage.value = '';
  }
};
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
const isChatCollapsed = ref(false);

const toggleChat = () => {
  isChatCollapsed.value = !isChatCollapsed.value;
};
</script>

<style scoped>
/* 修改聊天容器样式 */
.chat-container {
  background: linear-gradient(145deg, #f8fff9 0%, #e3f2fd 100%);
  border: 2px solid #42b983;
  box-shadow: 0 4px 20px rgba(66, 185, 131, 0.15);
}

/* 消息气泡样式优化 */
.message {
  background: linear-gradient(45deg, #ffffff, #f0fff4);
  border-left: 4px solid #42b983;
  box-shadow: 2px 2px 6px rgba(0,0,0,0.05);
}

/* 区分不同用户消息 */
.message[data-user="社区管理员"] {
  border-color: #2196F3;
  background: linear-gradient(45deg, #e3f2fd, #ffffff);
}

.message[data-user="当前用户"] {
  border-color: #FFC107;
  background: linear-gradient(45deg, #fff9c4, #ffffff);
}

/* 时间戳样式 */
.timestamp {
  color: #95a5a6;
  font-size: 0.75em;
}

/* 输入框聚焦效果 */
.chat-input input:focus {
  border-color: #42b983;
  box-shadow: 0 0 8px rgba(66, 185, 131, 0.3);
}

/* 发送按钮渐变色 */
.chat-input button {
  background: linear-gradient(135deg, #42b983 0%, #2d8e6e 100%);
  transition: all 0.3s ease;
}

.chat-input button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.4);
}

/* 新增消息头像 */
.username::before {
  content: '👤';
  margin-right: 5px;
}

.message[data-user="社区管理员"] .username::before {
  content: '👮';
}

.chat-container {
  width: 300px;
  position: fixed;
  left: 20px;
  top: 120px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.chat-box {
  padding: 15px;
  height: 400px;
  display: flex;
  flex-direction: column;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  margin: 8px 0;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 6px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  color: #666;
  margin-bottom: 4px;
}

.chat-input {
  display: flex;
  gap: 8px;
}

.chat-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.chat-input button {
  background: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
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

.boxes-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; 
  width: 100%;
  max-width: 1200px;
  margin: 50px auto 60px;
  gap: 1rem;
  flex: 1;
}

.left-box, .middle-box, .right-box {
  flex: 0 0 300px;
  height: 500px; 
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

/* 统一支付模块布局 */
.water-payment, .electric-payment, .gas-payment {
  flex: 1;
  display: grid;
  grid-template-rows: 80px auto 1fr auto;
  gap: 1.5rem;
  height: 100%; /* 新增高度继承 */
}

.core-info {
  padding: 1.5rem;
  margin: 0 -2rem; /* 消除容器内边距影响 */
}

.footer-note {
  margin-top: auto;
  padding-bottom: 0; /* 统一底部间距 */
}

/* 统一核心信息样式 */
.core-info > div {
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 统一标签和数值格式 */
.label {
  min-width: 100px;
  color: #666;
}

.value {
  font-weight: bold;
  text-align: right;
  min-width: 120px;
}

/* 统一按钮样式 */
.pay-button, .recharge-button {
  width: 100%;
  padding: 12px;
  font-size: 1.1rem;
  border-radius: 8px;
  transition: opacity 0.3s;
}

/* 统一图标容器 */
.icon-container {
  height: 80px;
  display: grid;
  place-items: center;
  margin-bottom: 1rem;
}

/* 统一附加信息样式 */
.footer-note, .safety-note {
  padding: 0.8rem;
  border-radius: 6px;
  text-align: center;
  font-size: 0.9rem;
  margin-top: auto;
}
.water-drop {
  width: 60px;
  height: 60px;
  background: #2196F3;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  margin: 0 auto;
  position: relative;
}

.water-drop::after {
  content: "";
  position: absolute;
  width: 30px;
  height: 30px;
  background: rgba(255,255,255,0.3);
  border-radius: 50%;
  top: 5px;
  left: 5px;
}

.payment-title {
  text-align: center;
  color: #2c3e50;
  margin: 0;
}

.core-info {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.current-fee {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.current-fee .value {
  font-size: 1.5rem;
  color: #2196F3;
  font-weight: bold;
}

.account-balance {
  color: #95a5a6;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between; 
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pay-button {
  background: #2196F3;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.pay-button:hover {
  background: #1976D2;
}

.history-link {
  background: none;
  border: none;
  color: #2196F3;
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
  text-decoration: none; /* 移除下划线 */
}

.history-link:hover {
  color: #1976D2; /* 添加悬停颜色变化 */
}

.footer-note {
  text-align: center;
  color: #95a5a6;
  font-size: 0.8rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}
/* 电费缴纳模块样式 */
.electric-payment {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.lightning-icon {
  width: 60px;
  height: 60px;
  background: #FFC107;
  clip-path: polygon(40% 0%, 60% 0%, 100% 60%, 60% 100%, 40% 100%, 0% 60%);
  margin: 0 auto;
  position: relative;
}

.lightning-icon::after {
  content: "⚡";
  position: absolute;
  font-size: 2rem;
  color: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.recharge-button {
  background: linear-gradient(135deg, #FFC107 0%, #FF9800 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: opacity 0.3s;
}

.recharge-button:hover {
  opacity: 0.9;
}

.alert-message {
  background: #FFF3E0;
  color: #FF9800;
  padding: 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
}

.electric-usage .value {
  color: #FFC107;
  font-weight: bold;
}

.analysis-link {
  color: #FF9800;
  text-decoration: none;
  font-size: 0.9rem;
  text-align: center;
  display: block;
  margin-top: 0.5rem;
}
/* 燃气费模块样式 */
.flame-icon {
  width: 60px;
  height: 60px;
  background: #FF9800;
  clip-path: polygon(50% 0%, 30% 40%, 50% 60%, 70% 40%, 50% 0%, 30% 30%, 50% 50%, 70% 30%);
  position: relative;
}

.gas-usage .value {
  color: #c09d69;
  font-weight: bold;
}

.recharge-button {
  background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%);
  color: white;
}

.edit-btn {
  background: none;
  border: none;
  color: #248a8e;
  margin-left: 0.5rem;
  cursor: pointer;
}

.guide-link {
  color: #d70505;
  text-decoration: none;
  font-size: 0.9rem;
  text-align: center;
  display: block;
  margin-top: 0.5rem;
}

.safety-note {
  background: #FFF3E0;
  color: #F57C00;
  padding: 0.8rem;
  border-radius: 6px;
  text-align: center;
  margin-top: auto;
}


/* 修改聊天容器样式 */
.chat-container {
  transition: all 0.3s ease;
  z-index: 99;
}

.chat-container.collapsed {
  width: 40px;
  min-height: 40px;
}

.toggle-button {
  position: absolute;
  right: -40px;
  top: 10px;
  width: 40px;
  height: 40px;
  background: #42b983;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  transition: background 0.3s;
}

.toggle-button:hover {
  background: #3aa876;
}

/* 新增折叠状态样式 */
.chat-container.collapsed .chat-box {
  display: none;
}

.chat-container.collapsed {
  left: 0;
  width: 40px;
  height: 40px;
  overflow: hidden;
}

.chat-container.collapsed .toggle-button {
  right: 0;
  border-radius: 4px 0 0 4px;
}
</style>
