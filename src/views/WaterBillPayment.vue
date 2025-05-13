<template>
  <div class="water-bill-page">
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
    <nav class="nav-bar">
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
 
    <div>
      <h1 class="title">水费缴纳页面</h1>
      <!-- 去掉返回按钮 -->
    </div>
    <form @submit.prevent="submitPayment" class="payment-form">
      <div class="form-group">
        <label for="accountNumber">账户号码:</label>
        <input 
          type="text" 
          id="accountNumber" 
          v-model="accountNumber" 
          required 
          :class="{ 'is-invalid': errors.accountNumber }"
        >
        <p v-if="errors.accountNumber" class="error-message">{{ errors.accountNumber }}</p>
      </div>
      <div class="form-group">
        <label for="name">用户姓名:</label>
        <input 
          type="text" 
          id="name" 
          v-model="name" 
          required 
          :class="{ 'is-invalid': errors.name }"
        >
        <p v-if="errors.name" class="error-message">{{ errors.name }}</p>
      </div>
      <div class="form-group">
        <label for="phone">联系电话:</label>
        <input 
          type="tel" 
          id="phone" 
          v-model="phone" 
          pattern="[0-9]{11}" 
          required 
          :class="{ 'is-invalid': errors.phone }"
        >
        <p v-if="errors.phone" class="error-message">{{ errors.phone }}</p>
      </div>
      <div class="form-group">
        <label for="amount">缴费金额:</label>
        <input 
          type="number" 
          id="amount" 
          v-model="amount" 
          min="0.01" 
          step="0.01" 
          required 
          :class="{ 'is-invalid': errors.amount }"
        >
        <p v-if="errors.amount" class="error-message">{{ errors.amount }}</p>
      </div>
      <button type="submit" class="submit-button" :disabled="isSubmitting">
        {{ isSubmitting ? '提交中...' : '提交缴费' }}
      </button>
    </form>
    <transition name="fade">
      <p v-if="paymentSuccess" class="success-message">缴费成功！</p>
    </transition>
    <transition name="fade">
      <p v-if="paymentError" class="error-message">{{ paymentError }}</p>
    </transition>
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
// 初始化表单数据
const accountNumber = ref('');
const name = ref('');
const phone = ref('');
const amount = ref(0);
const paymentSuccess = ref(false);
const paymentError = ref('');
const isSubmitting = ref(false);
const errors = ref({
  accountNumber: '',
  name: '',
  phone: '',
  amount: ''
});

const goBack = () => {
  router.go(-1);
};

const validateForm = () => {
  let isValid = true;
  errors.value = {
    accountNumber: '',
    name: '',
    phone: '',
    amount: ''
  };

  if (!accountNumber.value) {
    errors.value.accountNumber = '请输入账户号码';
    isValid = false;
  }

  if (!name.value) {
    errors.value.name = '请输入用户姓名';
    isValid = false;
  }

  if (!phone.value || !/^[0-9]{11}$/.test(phone.value)) {
    errors.value.phone = '请输入有效的 11 位手机号码';
    isValid = false;
  }

  if (amount.value <= 0) {
    errors.value.amount = '请输入有效的缴费金额';
    isValid = false;
  }

  return isValid;
};

const submitPayment = async () => {
  if (!validateForm()) return;

  // 弹出二次确认对话框
  const isConfirmed = window.confirm(`您确定要缴纳 ${amount.value} 元的水费吗？`);
  if (!isConfirmed) return;

  isSubmitting.value = true;
  paymentError.value = '';

  try {
    // 模拟不同的错误场景
    const randomError = Math.random() < 0.2; // 20% 的概率出现错误
    if (randomError) {
      throw new Error('服务器繁忙，请稍后重试');
    }

    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('提交缴费信息:', { 
      accountNumber: accountNumber.value, 
      name: name.value,
      phone: phone.value,
      amount: amount.value 
    });
    paymentSuccess.value = true;
    // 清空表单
    accountNumber.value = '';
    name.value = '';
    phone.value = '';
    amount.value = 0;
  } catch (error) {
    paymentError.value = error.message || '缴费失败，请稍后重试';
  } finally {
    isSubmitting.value = false;
  }
};

const goToPage = (path) => {
  router.push(path);
};
</script>

<style scoped>
.header {
  transition: transform 0.3s ease-in-out;
}

.header-hidden {
  transform: translateY(-100%);
}
.water-bill-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f5f5 0%, #f5f5f5 100%);
  padding-top: 80px; 
}

/* 新增导航栏样式 */
.nav-bar {
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

.header {
  display: flex;
  /* 修改为 space-between，让 logo 居左，导航项居中 */
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
}


.title {
  color: #2c3e50;
  font-size: 2.5rem;
  margin: 0;
}

.back-button {
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #c0392b;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  /* 增加最大宽度，让表单更宽 */
  width: 100%;
  max-width: 700px; 
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: bold;
  color: #2c3e50;
}

.form-group input {
  /* 增加内边距，让输入框变长 */
  padding: 1rem; 
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input.is-invalid {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 0.9rem;
  animation: fadeIn 0.3s ease;
}

.success-message {
  color: #27ae60;
  font-weight: bold;
  margin-top: 1rem;
  font-size: 1.1rem;
  animation: fadeIn 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.submit-button {
  /* 增加内边距，让按钮变长变宽 */
  padding: 1rem; 
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;
}

.submit-button:hover {
  background-color: #359d6f;
}

.submit-button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
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
</style>