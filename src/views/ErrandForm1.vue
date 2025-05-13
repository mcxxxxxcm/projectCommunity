<template>
  <div class="mobile-container">
    <!-- 手机状态栏 -->
    <div class="status-bar">
      <div class="time">{{ currentTime }}</div>
      <!-- 将图标移到右侧 -->
      <div class="status-icons">
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>
    <div class="app-header">
      <button class="back-btn" @click="goToPage('/CommunityErrands-Mobile')">←</button>
      <h1 class="app-title">{{ serviceType }}服务表单</h1>
    </div>
    <main class="mobile-main">
      <form @submit.prevent="submitForm" class="errand-form">
        <!-- 快递服务 -->
        <div v-if="serviceType === '快递'" class="input-group">
          <label for="pickupCode">请输入取件码:</label>
          <input type="text" id="pickupCode" v-model="pickupCode" required>
        </div>
        <!-- 代购服务 -->
        <div v-if="serviceType === '代购'" class="input-group">
          <label for="productName">请输入商品名称:</label>
          <input type="text" id="productName" v-model="productName" required>
        </div>
        <!-- 送餐服务 -->
        <div v-if="serviceType === '送餐'" class="input-group">
          <label for="mealName">请输入餐品名称:</label>
          <input type="text" id="mealName" v-model="mealName" required>
        </div>
        <!-- 其他服务 -->
        <div v-if="serviceType === '其他'" class="input-group">
          <label for="description">请输入需要的服务:</label>
          <input type="text" id="description" v-model="description" required>
        </div>
        <!-- 所有服务共用的地址字段 -->
        <div class="input-group">
          <label for="address">请输入详细地址:</label>
          <input type="text" id="address" v-model="address" required>
        </div>
        <button type="submit" class="service-button">确认</button>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted } from 'vue';

const router = useRouter();
const props = defineProps(['serviceType']);

// 跳转页面
const goToPage = (path) => {
  router.push(path);
};

const pickupCode = ref('');
const productName = ref('');
const mealName = ref('');
const description = ref('');
const address = ref('');

const submitForm = () => {
  const formData = {
    serviceType: props.serviceType,
    pickupCode: pickupCode.value,
    productName: productName.value,
    mealName: mealName.value,
    description: description.value,
    address: address.value
  };
  
  // console.log('提交的表单数据:', formData);
  // alert('已提交，请耐心等待哦！！！');
  goToPage('/CommunityErrands-Mobile'); 
};

// 时间更新函数
const currentTime = ref('');
const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
};

onMounted(() => {
  updateTime();
  const interval = setInterval(updateTime, 1000);
  return () => clearInterval(interval);
});
</script>

<style scoped>
/* 添加缩放变换 */
.mobile-page {
  min-height: 100vh;
  background: white;
  transform: scale(0.9); /* 可根据需要调整缩放比例，这里设置为 0.9 */
  transform-origin: top left; /* 设置缩放原点为左上角 */
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
  display: flex;
  flex-direction: column;
}
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
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.back-btn {
  position: absolute;
  left: 16px;
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
}

/* 顶部导航栏 */
.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgb(44,62,80);
  color: white;
  z-index: 1000;
}

.header-left {
  cursor: pointer;
}

.back-icon {
  font-size: 1.5rem;
}

.header-title {
  font-size: 1.2rem;
  font-weight: bold;
}

/* 服务选择区域 */
.mobile-main {
  padding: 6rem 1rem 1rem;
}

.service-prompt {
  text-align: center;
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.errand-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.service-button {
  width: auto; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: white;
  color: #2c3e50;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.service-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  background: #42b983;
  color: white;
}

.service-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.service-name {
  font-size: 1.1rem;
}


.input-group {
  margin-bottom: 1rem;
  width: 100%;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.input-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}

.status-icons {
  display: flex;
  gap: 8px;
}

</style>