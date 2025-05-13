<template>
  <div class="mobile-container">
    <div class="status-bar">
      <div class="time">{{ currentTime }}</div>
      <div class="status-icons">
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>

    <div class="app-header">
      <button class="back-button" @click="goBack">←</button>
      <h1 class="app-title">水费缴纳</h1>
    </div>

    <div class="payment-detail">
      <div class="water-icon">💧</div>
      
      <div class="info-card">
        <div class="info-row">
          <span>本月用量</span>
          <span class="value">18 吨</span>
        </div>
        <div class="info-row">
          <span>应缴金额</span>
          <span class="value red">¥85.50</span>
        </div>
        <div class="info-row">
          <span>账户余额</span>
          <span class="value">¥200.00</span>
        </div>
      </div>

      <button class="pay-button" @click="handlePayment">立即支付</button>
      
      <div class="notice">
        <p>最后缴费日期：2025-03-25</p>
        <a href="#" @click="goToPage('billing-history-mobile')">查看历史账单 →</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const currentTime = ref('');

// 复用时间更新逻辑
onMounted(() => {
  const updateTime = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  updateTime();
  setInterval(updateTime, 60000);
});

const goBack = () => {
  router.go(-1);
};

const handlePayment = () => {
  // 支付逻辑
};

const goToPage = (path) => {
  router.push(path);
};
</script>

<style scoped>
.payment-detail {
  padding: 20px;
}

.water-icon {
  font-size: 64px;
  text-align: center;
  margin: 20px 0;
}

.info-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.info-row:last-child {
  border-bottom: none;
}

.value {
  color: #2c3e50;
  font-weight: 500;
}

.red {
  color: #ff6b6b;
}

.pay-button {
  width: 100%;
  padding: 16px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  margin: 20px 0;
}

.notice {
  text-align: center;
  color: #95a5a6;
  font-size: 0.9rem;
}
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
.back-button {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  padding: 8px; /* 新增触摸区域 */
  transition: all 0.2s ease; /* 添加过渡效果 */
}

.back-button:hover {
  color: #42b983; /* 悬停颜色变化 */
}

.back-button:active {
  transform: translateY(-50%) scale(0.9); /* 点击缩放效果 */
}

</style>