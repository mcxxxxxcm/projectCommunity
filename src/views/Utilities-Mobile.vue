<template>
  <div class="mobile-container">
    <!-- 状态栏和头部复用原有样式 -->
    <div class="status-bar">
      <div class="time">{{ currentTime }}</div>
      <div class="status-icons">
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>

    <div class="app-header">
      <button class="back-button" @click="goToPage('/MobilePage')">←</button>
      <h1 class="app-title">水电缴费</h1>
    </div>

    <!-- 缴费内容区域 -->
    <div class="payment-content">
      <!-- 水费卡片 -->
      <div class="payment-card" @click="goToPage('/water-bill-payment-mobile')">
        <div class="payment-icon">💧</div>
        <div class="payment-info">
          <h3>水费缴纳</h3>
          <div class="detail-row">
            <span>本月用量：18吨</span>
            <span class="amount">¥85.50</span>
          </div>
        </div>
        <span class="arrow">➔</span>
      </div>

      <!-- 电费卡片 -->
      <div class="payment-card" @click="goToPage('/electricity-bill-payment-mobile')">
        <div class="payment-icon">⚡</div>
        <div class="payment-info">
          <h3>电费缴纳</h3>
          <div class="detail-row">
            <span>剩余电量：152度</span>
            <span class="amount">¥268.40</span>
          </div>
        </div>
        <span class="arrow">➔</span>
      </div>

      <!-- 燃气费卡片 -->
      <div class="payment-card" @click="goToPage('/gas-bill-payment-mobile')">
        <div class="payment-icon">🔥</div>
        <div class="payment-info">
          <h3>燃气缴纳</h3>
          <div class="detail-row">
            <span>本月用量：18m³</span>
            <span class="amount">¥216.00</span>
          </div>
        </div>
        <span class="arrow">➔</span>
      </div>
     
    </div>

    <!-- 底部导航复用原有样式 -->
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

const goToPage = (path) => {
  router.push(path);
};
</script>

<style scoped>
/* 复用手机端基础样式 */
.payment-content {
  padding: 16px;
}

.payment-card {
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.payment-icon {
  font-size: 28px;
  margin-right: 16px;
}

.payment-info {
  flex: 1;
}

.payment-info h3 {
  margin: 0 0 4px 0;
  color: #2c3e50;
}

.payment-info p {
  margin: 0;
  color: #95a5a6;
  font-size: 0.9rem;
}

.arrow {
  color: #42b983;
  font-size: 1.2rem;
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

.app-header {
  position: relative;
  padding: 12px 40px; /* 增加左右内边距 */
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
}

.app-title {
  margin: 0 auto; /* 保持标题居中 */
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.amount {
  color: #ff6b6b;
  font-weight: 500;
}

.payment-card {
  transition: transform 0.2s ease;
}

.payment-card:active {
  transform: scale(0.98);
}
</style>
