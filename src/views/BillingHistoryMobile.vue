<template>
    <div class="mobile-container">
      <div class="status-bar">
        <div class="time">{{ currentTime }}</div>
        <div class="status-icons">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>
  
      <div class="app-header">
        <button class="back-button" @click="goBack">←</button>
        <h1 class="app-title">历史账单</h1>
      </div>
  
      <div class="history-list">
        <div class="month-card" v-for="month in billingData" :key="month.id">
          <div class="month-header">
            <span>{{ month.month }}月账单</span>
            <span class="amount">{{ month.total }}元</span>
          </div>
          
          <div class="bill-item" v-for="bill in month.items" :key="bill.id">
            <div class="bill-icon">📅</div>
            <div class="bill-info">
              <span class="date">{{ bill.date }}</span>
              <span class="type">{{ bill.type }}</span>
            </div>
            <span class="price">{{ bill.amount }}元</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  
  const router = useRouter();
  const currentTime = ref('');
  
  // 复用时间更新逻辑
  onMounted(() => {
    const updateTime = () => {
      const now = new Date();
      currentTime.value = now.toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit'
      });
    };
    updateTime();
    setInterval(updateTime, 60000);
  });
  
  const goBack = () => {
    router.go(-1);
  };
  
  const handlePayment = () => {
    // 支付逻辑
  };
  
  const goToPage = (path) => {
    router.push(path);
  };
  
  // 示例数据
  const billingData = ref([
    {
      id: 1,
      month: 3,
      total: 285.5,
      items: [
        { id: 11, date: '2025-03-05', type: '水费', amount: 85.5 },
        { id: 12, date: '2025-03-12', type: '电费', amount: 156.0 },
        { id: 13, date: '2025-03-19', type: '燃气费', amount: 44.0 }
      ]
    },
    // 更多月份数据...
  ]);
  </script>
  
  <style scoped>
  .history-list {
    padding: 16px;
    max-height: calc(100vh - 160px);
    overflow-y: auto;
  }
  
  .month-card {
    background: white;
    border-radius: 12px;
    margin-bottom: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    transition: transform 0.2s ease;
  }
  
  .month-card:active {
    transform: scale(0.98);
  }
  
  .bill-item {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    background: #f8f9fa;
    margin: 8px;
    border-radius: 8px;
  }
  
  .price {
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  
  .load-more {
    text-align: center;
    padding: 16px;
    color: #2196F3;
    font-weight: 500;
  }
  
  .month-header {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #eee;
    font-weight: 500;
  }
  
  .bill-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #f5f5f5;
  }
  
  .bill-item:last-child {
    border-bottom: none;
  }
  
  .bill-icon {
    margin-right: 12px;
  }
  
  .bill-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .date {
    font-size: 0.9rem;
    color: #666;
  }
  
  .type {
    font-size: 0.8rem;
    color: #999;
  }
  
  .price {
    color: #ff6b6b;
    font-weight: 500;
  }
  
  .amount {
    color: #2196F3;
  }
  
  .mobile-container {
    width: 375px;
    height: 667px;
    margin: 2rem auto;
    border: 12px solid #222;
    border-radius: 36px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    background: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  /* 手机状态栏 */
  .status-bar {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    background: #f8f8f8;
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }
  
  /* 顶部导航栏统一风格 */
  .app-header {
    padding: 12px 16px;
    background: #42b983;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .app-title {
    max-height: 20px;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    text-align: center; /* 确保文本居中 */
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
  }
  
  .back-button {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(120, 18, 18, 0.1);
    border: none;
    color: white;
    font-size: 1.8rem;
    cursor: pointer;
    padding: 12px; /* 增大触摸区域 */
    border-radius: 50%;
    transition: all 0.2s ease;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .back-button:hover {
    background: rgba(255,255,255,0.2);
    transform: translateY(-50%) scale(1.1);
  }
  
  .back-button:active {
    transform: translateY(-50%) scale(0.9);
    background: rgba(255,255,255,0.3);
  }
  </style>
  