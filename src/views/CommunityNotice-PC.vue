<template>
    <div class="community-notice">
        <!-- 修改顶部导航栏 -->
        <header class="header">
          <div class="logo">
            <span>社区公告</span>
          </div>
          <nav class="main-nav">
            <a href="/PCPage" class="nav-item">首页</a>
            <!-- 可根据实际需求添加更多导航项 -->
          </nav>
        </header>
        <!-- 删除下面这部分代码 -->
        <!-- <div class="back-btn-container">
            <button @click="goBack" class="back-btn">返回</button>
        </div> -->
        <h1>社区公告-pc版</h1>
      <!-- 添加搜索框 -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索公告标题或内容"
        class="search-input"
      />
      <ul>
        <!-- 过滤公告数据 -->
        <li v-for="notice in filteredNotices" :key="notice.id">
          <h2>{{ notice.title }}</h2>
          <p class="date">{{ notice.date }}</p>
          <p class="content">{{ notice.content }}</p>
        </li>
      </ul>
      <!-- 添加分页组件 -->
      <div class="pagination">
        <button
          :disabled="currentPage === 1"
          @click="currentPage--"
          class="page-btn"
        >
          上一页
        </button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="currentPage++"
          class="page-btn"
        >
          下一页
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  // 获取路由实例
  const router = useRouter();
  
  // 定义返回首页方法
  const goToHome = () => {
      router.push('/PCPage'); // 假设首页路径为 /PCPage，可根据实际情况修改
  };
  
  // 移除 goBack 方法
  // const goBack = () => {
  //     router.back();
  // };
  
  // 模拟公告数据
  const notices = ref([
    {
      id: 1,
      title: '社区安全提醒',
      date: '2024-07-15',
      content: '近期社区内加强安全巡逻，请居民注意保管好个人财物。'
    },
    {
      id: 2,
      title: '社区活动通知',
      date: '2024-07-20',
      content: '本周六将举办社区亲子活动，欢迎大家积极参与。'
    }
  ]);
  
  // 搜索查询
  const searchQuery = ref('');
  // 每页显示的公告数量
  const itemsPerPage = ref(5);
  // 当前页码
  const currentPage = ref(1);
  
  // 过滤后的公告数据
  const filteredNotices = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return notices.value
      .filter(notice =>
        notice.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
      .slice(start, end);
  });
  
  // 总页数
  const totalPages = computed(() => {
    return Math.ceil(
      notices.value.filter(notice =>
        notice.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchQuery.value.toLowerCase())
      ).length / itemsPerPage.value
    );
  });
  </script>
  
  <style scoped>
  .community-notice {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  /* 确保注释正确闭合，移除可能导致解析错误的残留内容 */
  /* 
  .back-btn-container {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 20px;
  }
  
  .back-btn {
      padding: 8px 15px;
      border: 1px solid #e74c3c;
      background-color: #fff;
      color: #e74c3c;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
  }
  
  .back-btn:hover {
      background-color: #e74c3c;
      color: #fff;
  }
  */
  
  h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .search-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 10px;
    transition: box-shadow 0.3s ease;
  }
  
  li:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    margin-top: 0;
    color: #3498db;
  }
  
  .date {
    color: #95a5a6;
    font-size: 14px;
    margin-bottom: 10px;
  }
  
  .content {
    line-height: 1.6;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  .page-btn {
    padding: 8px 15px;
    margin: 0 10px;
    border: 1px solid #3498db;
    background-color: #fff;
    color: #3498db;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .page-btn:hover {
    background-color: #3498db;
    color: #fff;
  }
  
  .page-btn:disabled {
    border-color: #ddd;
    color: #ddd;
    cursor: not-allowed;
  }
  .top-nav {
      margin-bottom: 20px;
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

  <style scoped>
  /* 确保 html 和 body 没有默认外边距和内边距 */
  html, body {
      margin: 0;
      padding: 0;
      overflow-x: hidden; /* 防止出现水平滚动条 */
  }
  
  .community-notice {
      padding: 20px;
      /* 删除 max-width 和 margin，让内容从左边开始显示 */
      max-width: none; 
      margin: 0; 
  }
  
  /* 修改顶部导航栏样式 */
  .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 5%;
      background: #2c3e50;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
      width: 100vw; /* 使用视口宽度 */
      max-width: none;
      box-sizing: border-box;
      left: 0; /* 确保从最左边开始 */
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
  }
  
  .main-nav {
    display: flex;
    gap: 2rem;
  }
  
  .nav-item {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    transition: color 0.3s ease;
    padding: 0.5rem 0;
    position: relative;
  }
  
  .nav-item:hover,
  .nav-item:focus {
    color: #42b983;
    outline: none;
  }
  
  .nav-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #42b983;
    transition: width 0.3s ease;
  }
  
  .nav-item:hover::after {
    width: 100%;
  }
  </style>