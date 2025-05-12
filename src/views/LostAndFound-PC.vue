<template>
  <div class="pc-page">
    <!-- 返回主页面按钮 -->
    <button class="return-home" @click="goToPage('/PCPage')">返回首页</button>
    <!-- 温馨提示 -->
    <div class="温馨提示">
      <p>若您有物品丢失或拾获，请点击下方按钮发布信息，帮助更多人找回失物。</p>
    </div>
    <!-- 失物招领和寻物启事按钮 -->
    <div class="center-buttons">
      <button class="nav-item" @click="goToPage('/lostandfound')">失物招领</button>
      <!-- 修改跳转路径 -->
      <button class="nav-item" @click="goToPage('/FoundItem')">寻物启事</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToPage = (path) => {
  router.push(path);
};
</script>

<style scoped>
.return-home {
  position: fixed;
  right: 20px;
  bottom: 20px;
  margin: 0 10px;
  padding: 5px 15px;
  background-color: #2196F3; 
  border: none; 
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px; 
  color: white; 
}

.return-home:hover {
  background-color: #1976D2; 
}

.温馨提示 {
  text-align: center;
  margin-top: 100px;
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
}

.center-buttons {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 20px;
}

.nav-item {
  margin: 0 10px;
  /* 增加 padding 值 */
  padding: 10px 30px; 
  background-color: #2196F3; 
  border: none; 
  border-radius: 4px;
  cursor: pointer;
  /* 增加字体大小 */
  font-size: 24px; 
  color: white; 
}

.nav-item:hover {
  background-color: #1976D2; 
}
</style>