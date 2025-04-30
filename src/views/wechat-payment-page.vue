<template>
    <div class="wechat-payment-page">
      <!-- 添加顶部导航栏 -->
      <header class="header">
        <div class="logo">
          <span>社区服务平台</span>
        </div>
        <nav class="main-nav">
          <button class="nav-item" @click="goToPage('/PCPage')">首页</button>
        </nav>
      </header>
      <h1 class="title">使用微信扫码支付</h1>
      <!-- 更新图片路径 -->
      <img src="/public/images/qr-code.jpg" alt="微信支付二维码" class="qr-code">
      <!-- 移除原有的返回首页按钮 -->
      <button class="nav-button" @click="goToPage('/PCPage')">
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
  /* 添加顶部导航栏样式 */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #2c3e50;
    color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    /* 新增样式，使导航栏贯穿页面 */
    width: 100%; 
    box-sizing: border-box; 
    position: fixed;
    left: 0;
    top: 0;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .main-nav {
    display: flex;
    gap: 1.5rem;
  }
  
  .nav-item {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;
  }
  
  .nav-item:hover {
    color: #42b983;
  }
  
  .wechat-payment-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: white;
  }
  
  .title {
    color: #2c3e50;
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }
  
  
  
  
  </style>
  