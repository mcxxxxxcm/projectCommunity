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
        <h1 class="app-title">消息</h1>
      </div>
  
      <!-- 页面内容 -->
      <div class="mobile-content">
        <!-- 消息列表 -->
        <div class="message-list">
          <div 
            v-for="message in messages" 
            :key="message.id" 
            class="message-item"
            @click="viewMessage(message)"
          >
            <div class="avatar">
              <img :src="message.avatar" alt="头像">
            </div>
            <div class="message-content">
              <div class="message-header">
                <span class="sender">{{ message.sender }}</span>
                <span class="time">{{ message.time }}</span>
              </div>
              <div class="message-text">{{ message.preview }}</div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 底部导航栏 -->
      <div class="bottom-nav">
        <div class="nav-item" @click="goToPage('/MobilePage')">
          <span class="nav-icon">🏠</span>
          <span class="nav-text">首页</span>
        </div>
        <div class="nav-item active">
          <span class="nav-icon">💬</span>
          <span class="nav-text">消息</span>
        </div>
        <div class="nav-item" @click="goToPage('/mine-Mobile')">
          <span class="nav-icon">👤</span>
          <span class="nav-text">我的</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const currentTime = ref('');
  
  // 模拟消息数据
  const messages = ref([
    {
      id: 1,
      avatar: 'https://img.icons8.com/ios/100/000000/user-male-circle--v1.png',
      sender: '系统通知',
      time: '10:30',
      preview: '您有新的积分到账',
      content: '恭喜您获得1000积分奖励'
    },
    {
      id: 2,
      avatar: 'https://img.icons8.com/ios/100/000000/user-male-circle--v1.png',
      sender: '社区管理员',
      time: '昨天',
      preview: '关于社区活动的通知',
      content: '本周六下午3点社区将举办活动'
    }
  ]);
  
  const updateTime = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };
  
  const goBack = () => {
    router.go(-1);
  };
  
  const goToPage = (path) => {
    router.push(path);
  };
  
  const viewMessage = (message) => {
    // 这里可以跳转到消息详情页
    console.log('查看消息:', message);
  };
  
  onMounted(() => {
    updateTime();
  });
  </script>
  
  <style scoped>
  /* 复用MobilePage的样式 */
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
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .back-btn {
    position: absolute;
    left: 16px;
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
  }
  
  /* 消息列表样式 */
  .message-list {
    margin: 1rem;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .message-item {
    display: flex;
    padding: 1rem;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  
  .message-item:hover {
    background: #f9f9f9;
  }
  
  .avatar img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
  }
  
  .message-content {
    flex: 1;
  }
  
  .message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  
  .sender {
    font-weight: 600;
  }
  
  .time {
    color: #888;
    font-size: 0.8rem;
  }
  
  .message-text {
    color: #666;
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  </style>