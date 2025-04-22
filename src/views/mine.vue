<template>
  <div class="mine-container">
    <!-- 顶部导航 -->
    <header class="mine-header">
      <div class="back-btn" @click="goBack">
        <span>←</span>
        <span>返回</span>
      </div>
    </header>

    <!-- 个人信息卡片 -->
    <div class="profile-card">
      <div class="avatar">
        <img src="https://img.icons8.com/ios/100/000000/user-male-circle--v1.png" alt="头像">
      </div>
      <div class="user-info">
        <h2>{{ authStore.username }}</h2>
        <p>积分: {{ points }} 分</p>
      </div>
    </div>

    <!-- 功能列表 -->
    <div class="function-list">
      <div class="function-item" @click="addPoints">
        <span>获取积分</span>
        <span>→</span>
      </div>
      <div class="function-item" @click="goToPage('/settings')">
        <span>设置</span>
        <span>→</span>
      </div>
      <div class="function-item" @click="goToPage('/orders')">
        <span>兑换记录</span>
        <span>→</span>
      </div>
      <div class="function-item" @click="logout">
        <span>退出登录</span>
        <span>→</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { ElMessageBox, ElMessage } from 'element-plus';

const router = useRouter();
const authStore = useAuthStore();
const points = ref(0);

// 初始化积分
onMounted(() => {
  points.value = authStore.points !== undefined ? authStore.points : 5000;
  localStorage.setItem('userPoints', points.value);
});

// 监听积分变化
watch(() => authStore.points, (newPoints) => {
  points.value = newPoints;
  localStorage.setItem('userPoints', newPoints);
});

const goBack = () => {
  router.go(-1);
};

const goToPage = (path) => {
  router.push(path);
};

const logout = () => {
  ElMessageBox.confirm(
    '确定要退出登录吗？',
    '退出登录',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true
    }
  ).then(() => {
    authStore.logout();
    router.push('/');
    ElMessageBox.alert('已成功退出登录', '提示', {
      confirmButtonText: '确定',
      type: 'success'
    });
  }).catch(() => {
    // 用户点击了取消
  });
};

const addPoints = () => {
  const newPoints = points.value + 1000;
  points.value = newPoints;
  authStore.points = newPoints;
  localStorage.setItem('userPoints', newPoints);
  
  ElMessage({
    message: '成功获取1000积分',
    type: 'success',
    duration: 3000
  });
};
</script>

<style scoped>
.mine-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.mine-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #2c3e50;
  color: white;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.profile-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: white;
  margin: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 1.5rem;
}

.user-info h2 {
  margin: 0 0 0.5rem 0;
}

.function-list {
  margin: 1rem;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.function-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.function-item:last-child {
  border-bottom: none;
  color: #ff4d4f; /* 退出登录文字颜色改为红色 */
}

.function-item:last-child:hover {
  background-color: rgba(255, 77, 79, 0.1); /* 透明红色背景 */
  color: #ff4d4f;
}

.function-item:hover {
  background: #f9f9f9;
}
</style>