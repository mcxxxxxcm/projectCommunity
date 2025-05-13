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
      <h1 class="app-title">安全指南</h1>
    </div>

    <div class="guide-content">
      <div class="safety-card">
        <div class="warning-icon">⚠️</div>
        <h3>燃气使用安全须知</h3>
        <ul class="safety-list">
          <li>使用后请关闭燃气阀门</li>
          <li>定期检查燃气管道连接处</li>
          <li>发现漏气立即开窗通风</li>
          <li>勿在燃气设备旁使用明火</li>
        </ul>
      </div>

      <div class="emergency-card">
        <h3>紧急处理流程</h3>
        <div class="step">1. 关闭燃气总阀</div>
        <div class="step">2. 打开门窗通风</div>
        <div class="step">3. 撤离到安全区域</div>
        <div class="step">4. 拨打急救电话：
          <a href="tel:17612345678" class="emergency-call">176-1234-5678</a>
        </div>
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
// ... existing time logic ...

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
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
.guide-content {
  padding: 16px;
}

.safety-card, .emergency-card {
  background: white;
  border-radius: 12px;
  padding: 10px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.warning-icon {
  font-size: 48px;
  text-align: center;
  margin: 10px 0;
}

.safety-list {
  padding-left: 20px;
}

.safety-list li {
  margin: 8px 0;
  color: #2c3e50;
}

.emergency-card .step {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.emergency-call {
  color: #ff5722;
  text-decoration: none;
  font-weight: 500;
}
</style>