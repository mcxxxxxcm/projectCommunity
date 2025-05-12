<template>
  <div class="found-item-container">
    <nav class="nav-bar">
      <button class="nav-button" @click="goToPage('/FoundItem')">寻物启事</button>
      <button class="nav-button" @click="goToPage('/lostAndFound')">失物招领</button>
    </nav>
    <h1 class="page-title">寻物启事</h1>
    <form class="lost-item-form" @submit.prevent="submitLostItem">
      <input 
        v-model="newItem.name" 
        placeholder="丢失物品名称" 
        required 
        class="form-input"
      >
      <textarea 
        v-model="newItem.description" 
        placeholder="物品描述" 
        required 
        class="form-textarea"
      ></textarea>
      <button type="submit" class="submit-button">发布寻物启事</button>
    </form>
    <ul class="lost-item-list">
      <li v-for="item in lostItems" :key="item.id" class="list-item">
        <h3 class="item-name">{{ item.name }}</h3>
        <p class="item-description">{{ item.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goToPage = (path) => {
  router.push(path);
};

// 初始化寻物启事列表
const lostItems = ref([
  { id: 1, name: '钱包', description: '黑色皮革钱包，内有身份证和几张银行卡' },
  { id: 2, name: '钥匙', description: '一串钥匙，有几把银色的和一把红色的' },
]);

// 初始化新寻物启事数据
const newItem = ref({
  name: '',
  description: '',
});

// 提交寻物启事的方法
const submitLostItem = () => {
  lostItems.value.push({
    id: lostItems.value.length + 1,
    ...newItem.value,
  });
  // 清空表单
  newItem.value = {
    name: '',
    description: '',
  };
};
</script>

<style scoped>
.found-item-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.nav-bar {
  margin-bottom: 20px;
}

.nav-button {
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.nav-button:hover {
  background-color: #1976D2;
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.lost-item-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.form-input, .form-textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}

.lost-item-list {
  list-style-type: none;
  padding: 0;
}

.list-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.item-name {
  margin-top: 0;
  margin-bottom: 10px;
}

.item-description {
  margin: 0;
}
</style>