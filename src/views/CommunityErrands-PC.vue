<template>
  <div class="pc-page">
    <h1 class="title">社区跑腿-PC版</h1>
    <button class="nav-button" @click="goToPage('/PCPage')">
      <span class="icon">⬅️</span>
      <span>返回首页</span>
    </button>
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
/* 使用与上面相同的样式 */
.pc-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
}

.title {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: white;
  color: #2c3e50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.nav-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  background: #42b983;
  color: white;
}

.icon {
  font-size: 1.5rem;
}
</style>