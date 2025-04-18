<template>
  <div class="home">
    <h1 class="title">欢迎来到我的项目</h1>
    <div class="nav-buttons">
      <button class="nav-button" @click="goToPage('mobile')">
        <span class="icon">📱</span>
        <span>移动端页面</span>
      </button>
      <button class="nav-button" @click="goToPage('pc')">
        <span class="icon">💻</span>
        <span>PC端页面</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToPage = (type) => {
  router.push(`/${type}page`)
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.title {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.nav-buttons {
  display: flex;
  gap: 1.5rem;
}

.nav-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 2rem;
  background: white;
  color: #2c3e50;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.nav-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  background: #42b983;
  color: white;
}

.icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
</style>