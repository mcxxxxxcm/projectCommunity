<template>
  <div class="pc-page">
    <!-- 修改后的导航栏 -->
    <nav class="navbar">
      <ul class="nav-list">
        <li class="nav-item nav-title">🏃 社区跑腿</li>
        <li class="nav-item" @click="goToPage('/PCPage')">首页</li>
        <li class="nav-item" @click="handleErrand('代购')">代购</li>
        <li class="nav-item" @click="handleErrand('快递')">快递</li>
        <li class="nav-item" @click="handleErrand('送餐')">送餐</li>
        <li class="nav-item" @click="handleErrand('其他')">其他</li>
      </ul>
    </nav>
    <div class="service-prompt">
  请选择需要的服务
</div>
    <!-- 移除原有的 header-container -->
    <div class="errand-grid">
      <button class="errand-button" @click="handleErrand('代购')">
        <span class="errand-icon">🛍️</span>
        <span>代购</span>
      </button>
      <button class="errand-button" @click="handleErrand('快递')">
        <span class="errand-icon">📦</span>
        <span>快递</span>
      </button>
      <button class="errand-button" @click="handleErrand('送餐')">
        <span class="errand-icon">🍔</span>
        <span>送餐</span>
      </button>
      <button class="errand-button" @click="handleErrand('其他')">
        <span class="errand-icon">🧰</span>
        <span>其他</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToPage = (path) => {
  router.push(path);
};

// 修改处理跑腿功能的方法，实现跳转到表单页面
const handleErrand = (type) => {
  router.push({ name: 'errandForm', params: { serviceType: type } });
};
</script>

<style scoped>
.pc-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: white; /* 修改背景颜色为白色 */
}

/* 新增顶部容器样式 */
.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
}

.title {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 2.5rem;
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
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

/* 修改按钮容器样式为网格布局 */
.errand-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* 增大间距 */
  gap: 3rem; 
  padding: 2rem;
  justify-content: center; /* 水平居中 */
  justify-items: center; /* 网格项水平居中 */
  align-items: center; /* 网格项垂直居中 */
  margin: 0 auto; /* 新增，让网格容器在父元素中水平居中 */
  max-width: fit-content; /* 新增，让容器宽度适应内容 */
}

.errand-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px; /* 设置宽度 */
  height: 200px; /* 设置高度 */
  background: white;
  color: #2c3e50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  font-size: 1.5rem;
}

/* 移除特定按钮的 margin-left 样式 */
/* .errand-button:first-child{
margin-left: 500px;
}
.errand-button:nth-child(3) {
  margin-left: 500px;
} */

.errand-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  background: #42b983;
  color: white;
}

/* 新增图标样式 */
.errand-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}


/* 修改导航栏样式 */
.navbar {
  background: rgba(44,62,80); /* 修改背景颜色 */
  padding: 1rem;
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

/* 新增标题样式 */
.nav-title {
  font-size: 1.5rem;
  font-weight: bold;
  cursor: default;
  pointer-events: none;
}

.nav-item:hover:not(.nav-title) {
  background-color: rgba(255, 255, 255, 0.2);
}

</style>
<style scoped>

/* 新增提示文字样式 */
.service-prompt {
  text-align: center;
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 2rem 0;
  font-weight: bold;
}
</style>
<style scoped>
.service-prompt {
  text-align: center;
  font-size: 1.9rem;
  color: #2c3e50;
  margin: 2rem 0;
  font-weight: bold;
}
</style>