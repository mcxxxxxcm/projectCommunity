<template>
    <div class="community-notice">
      <div class="back-btn-container">
        <button @click="goBack" class="back-btn">返回</button>
      </div>
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
  
  // 定义返回方法
  const goBack = () => {
    router.back();
  };
  
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
  </style>