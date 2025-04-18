<template>
  <div class="mobile-page">
    <h1 class="title">这是手机端页面</h1>
    <button class="switch-button" @click="goToPC">
      <span class="icon">💻</span>
      <span>切换到 PC 端</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToPC = () => {
  router.push('/PCPage');
};
</script>

<style scoped>
.mobile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
}

.title {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.switch-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: white;
  color: #2c3e50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.switch-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  background: #42b983;
  color: white;
}

.icon {
  font-size: 1.5rem;
}
</style>