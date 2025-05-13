<template>
  <div class="errand-form">
    <!-- 导航栏固定在顶部 -->
    <nav class="navbar">
      <ul class="nav-list">
        <li class="nav-item nav-title">社区跑腿</li>
        <li class="nav-item" @click="goToPage('/PCPage')">首页</li>
        <li class="nav-item" @click="handleErrand('代购')">代购</li>
        <li class="nav-item" @click="handleErrand('快递')">快递</li>
        <li class="nav-item" @click="handleErrand('送餐')">送餐</li>
        <li class="nav-item" @click="handleErrand('其他')">其他</li>
      </ul>
    </nav>
    
    <div class="content">
      <h1>
        <span v-if="serviceType === '代购'">🛍️</span>
        <span v-if="serviceType === '快递'">📦</span>
        <span v-if="serviceType === '送餐'">🍔</span>
        <span v-if="serviceType === '其他'">🧰</span>
        {{ serviceType }}服务
      </h1>
      <form @submit.prevent="submitForm">
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
        <button type="submit">确认</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps(['serviceType']);

// 添加导航栏相关方法
const goToPage = (path) => {
  router.push(path);
};

const handleErrand = (type) => {
  router.push({ name: 'errandForm', params: { serviceType: type } });
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
  
  console.log('提交的表单数据:', formData);
  alert('已提交，请耐心等待哦！！！');
  setTimeout(() => {
    router.push('/CommunityErrands-PC'); // 修改为跳转到社区跑腿页面
  }, 500);
};
</script>

<style scoped>
/* 修改导航栏样式 */
.navbar {
  position: fixed; /* 固定在顶部 */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* 确保导航栏在最上层 */
  background: rgb(44,62,80);
  padding: 1rem;
}

/* 新增内容区域样式 */
.content {
  margin-top: 80px; /* 为导航栏留出空间 */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-list {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  color: white;
  padding: 0.5rem 1.5rem;
  margin: 0 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.nav-title {
  font-size: 1.5rem;
  font-weight: bold;
  cursor: default;
  pointer-events: none;
}

.nav-item:hover:not(.nav-title) {
  background-color: rgba(255, 255, 255, 0.2);
}
.errand-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
}

label {
  font-weight: bold;
}

input,
textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #359a6d;
}

/* 调整输入框组样式 */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem; /* 增加间距 */
  margin-bottom: 1.5rem; /* 增加底部间距 */
  width: 350px; /* 增加宽度 */
}

.input-group label {
  font-weight: bold;
  font-size: 1.2rem; /* 增大字体 */
}

.input-group input {
  padding: 0.8rem; /* 增加内边距 */
  border: 1px solid #ccc;
  border-radius: 6px; /* 增加圆角 */
  width: 100%;
  font-size: 1.1rem; /* 增大字体 */
}

button {
  padding: 0.6rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  margin-left: 50px; /* 增加左边距，使按钮右移 */
  width: 120px;
}

button:hover {
  background-color: #359a6d;
}

h1 {
  font-size: 2.2rem;
  margin-bottom: 4rem; /* 增加底部间距 */
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem; /* 增加底部间距 */
  width: 350px;
}

.input-group label {
  font-weight: bold;
  font-size: 1.2rem; /* 增大字体 */
}

.input-group input {
  padding: 0.8rem; /* 增加内边距 */
  border: 1px solid #ccc;
  border-radius: 6px; /* 增加圆角 */
  width: 100%;
  font-size: 1.1rem; /* 增大字体 */
}

button {
  padding: 0.6rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  margin-left: 110px; /* 增加左边距，使按钮右移 */
  width: 120px;
}

button:hover {
  background-color: #359a6d;
}

/* 新增图标样式 */
h1 span {
  margin-right: 0.5rem;
  font-size: 2.5rem;
}
</style>