<template>
  <div class="home">
    <div class="background-overlay"></div>
    <div class="content">
      <h1 class="title">社区服务平台</h1>
      
      <!-- 登录表单 -->
      <div class="login-form" v-if="!isLoggedIn">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="请输入用户名"
          >
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="请输入密码"
          >
        </div>
        <button class="login-btn" @click="handleLogin">登录</button>
      </div>

      <!-- 登录后的导航按钮 -->
      <div class="nav-buttons" v-else>
        <button class="nav-button" @click="goToPage('pc')">
          <span class="icon">💻</span>
          <span>进入PC端首页</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const username = ref('')
const password = ref('')

const handleLogin = () => {
  if (username.value && password.value) {
    authStore.login(username.value)
    router.push('/PCPage')
  } else {
    alert('请输入用户名和密码')
  }
}

const goToPage = (type) => {
  router.push(`/${type}page`)
}
</script>

<style scoped>
.home {
  position: fixed; /* 改为fixed定位 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; /* 完全覆盖视口 */
  overflow: hidden;
  background: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') no-repeat center center;
  background-size: cover;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; /* 内容也完全覆盖 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
}

.title {
  color: white;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 350px;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.form-group label {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

.form-group input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.login-btn {
  padding: 0.8rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-btn:hover {
  background: #3aa876;
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