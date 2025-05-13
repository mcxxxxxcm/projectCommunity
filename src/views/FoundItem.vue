<template>
  <div class="pc-page">
    <!-- 导航栏 -->
    <nav class="new-nav-bar">
      <button class="new-nav-item" @click="goToPage('/PCPage')">返回首页</button>
      <button class="new-nav-item" @click="goToPage('/lostandfound')">失物招领</button>
      <button class="new-nav-item" @click="goToPage('/FoundItem')">寻物启事</button>
    </nav>
    <div class="found-item-page">
      <h1>寻物启事</h1>
      <!-- 添加寻物启事表单 -->
      <form @submit.prevent="submitLostItem">
        <input v-model="newItem.name" placeholder="丢失物品名称" required>
        <textarea v-model="newItem.description" placeholder="物品描述" required></textarea>
        <!-- 添加丢失地点输入框 -->
        <input v-model="newItem.location" placeholder="丢失地点" required>
        <!-- 修改丢失时间输入框 -->
        <input v-model="newItem.time" placeholder="示例：2024年01月01日上午10时" required>
        <!-- 替换为上传图片按钮 -->
        <label class="upload-button" for="image-upload">
          上传图片
        </label>
        <input 
          id="image-upload" 
          type="file" 
          @change="handleImageUpload" 
          accept="image/*" 
          style="display: none;"
        >
        <button type="submit">发布寻物启事</button>
      </form>
      <!-- 展示寻物启事列表 -->
      <ul>
        <li v-for="item in lostItems" :key="item.id" class="item-container">
          <div class="text-content">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <!-- 显示丢失地点 -->
            <p>丢失地点: {{ item.location }}</p>
            <!-- 显示丢失时间 -->
            <p>丢失时间: {{ item.time }}</p>
          </div>
          <!-- 显示图片 -->
          <img :src="item.image" alt="物品图片" v-if="item.image" class="item-image">
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToPage = (path) => {
  router.push(path);
};

// 初始化更多寻物启事数据，添加图片字段
const lostItems = ref([
  { id: 1, name: '钱包', description: '黑色皮革钱包，内有身份证和几张银行卡', location: '商场门口', time: '2024年01月01日上午10时', image: 'path/to/wallet.jpg' },
  { id: 2, name: '钥匙', description: '一串钥匙，有几把银色的和一把红色的', location: '地铁站', time: '2024年01月02日下午2时', image: 'path/to/keys.jpg' },
  { id: 3, name: '手机', description: '蓝色的智能手机，背面有卡通贴纸', location: '餐厅', time: '2024年01月03日下午6时', image: 'path/to/phone.jpg' },
  { id: 4, name: '笔记本', description: '棕色封面的笔记本，里面有重要笔记', location: '图书馆', time: '2024年01月04日上午9时', image: 'path/to/notebook.jpg' },
]);

// 初始化新寻物启事数据，添加图片字段
const newItem = ref({
  name: '',
  description: '',
  location: '',
  time: '',
  image: ''
});

// 处理图片上传
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newItem.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// 提交寻物启事的方法
const submitLostItem = () => {
  // 这里可以添加时间格式校验逻辑
  lostItems.value.push({
    id: lostItems.value.length + 1,
    ...newItem.value,
  });
  // 清空表单
  newItem.value = {
    name: '',
    description: '',
    location: '',
    time: '',
    image: ''
  };
};
</script>

<style scoped>
/* 导航栏样式 */
.new-nav-bar {
  display: flex;
  justify-content: center;
  background-color: #2196F3; 
  padding: 10px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; 
}

.new-nav-item {
  margin: 0 10px;
  padding: 5px 15px;
  background-color: #2196F3; 
  border: none; 
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px; 
  color: white; 
}

.new-nav-item:hover {
  background-color: #1976D2; 
}

.pc-page {
  /* 为了防止内容被导航栏遮挡，添加顶部内边距 */
  padding-top: 50px; 
}

/* 设置页面整体背景色为浅蓝色 */
.found-item-page {
  background-color: #e3f2fd; 
}

h1 {
  color: #1976d2; /* 设置标题颜色为深蓝色 */
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

input,
textarea {
  padding: 5px;
  border: 1px solid #90caf9; /* 设置输入框边框颜色为蓝色 */
  border-radius: 4px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: #2196f3; /* 设置按钮背景色为蓝色 */
  color: white; /* 设置按钮文字颜色为白色 */
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #1976d2; /* 设置按钮悬停时的背景色为深蓝色 */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border: 1px solid #90caf9; /* 设置列表项边框颜色为蓝色 */
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.item-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.text-content {
  flex: 1;
  margin-right: 20px;
}

.item-image {
  width: 200px; /* 设置固定宽度 */
  height: 200px; /* 设置固定高度，与宽度相同 */
  object-fit: cover; /* 让图片覆盖容器，可能会裁剪部分图片 */
  object-position: center; /* 图片居中显示 */
}

.upload-button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: #2196f3; 
  color: white; 
  border: none;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
}

.upload-button:hover {
  background-color: #1976d2; 
}
</style>