<template>
  <div>
    <h1>失物招领</h1>
    <!-- 添加失物招领表单 -->
    <form @submit.prevent="submitFoundItem">
      <input v-model="newItem.name" placeholder="捡到物品名称" required>
      <textarea v-model="newItem.description" placeholder="物品描述" required></textarea>
      <button type="submit">发布失物招领</button>
    </form>
    <!-- 展示失物招领列表 -->
    <ul>
      <li v-for="item in foundItems" :key="item.id">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 初始化失物招领列表
const foundItems = ref([
  { id: 1, name: '钱包', description: '黑色皮革钱包，内有身份证和几张银行卡' },
  { id: 2, name: '钥匙', description: '一串钥匙，有几把银色的和一把红色的' },
]);

// 初始化新失物招领数据
const newItem = ref({
  name: '',
  description: '',
});

// 提交失物招领的方法
const submitFoundItem = () => {
  foundItems.value.push({
    id: foundItems.value.length + 1,
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
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

input,
textarea {
  padding: 5px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>