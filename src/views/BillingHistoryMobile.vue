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
    <div class="history-container">
    <div class="filter-section">
      <div class="filter-group">
        <select v-model="selectedYear" class="filter-select">
          <option v-for="year in years" :value="year">{{ year }}年</option>
        </select>
        <select v-model="selectedMonth" class="filter-select">
          <option value="">全部月份</option>
          <option v-for="month in 12" :value="month">{{ month }}月</option>
        </select>
        <select v-model="selectedType" class="filter-select">
          <option value="">全部类型</option>
          <option>水费</option>
          <option>电费</option>
          <option>燃气费</option>
        </select>
      </div>
        
        <div class="amount-group">
          <input 
            v-model.number="amountRange.min" 
            type="number" 
            placeholder="最小金额"
            class="filter-input"
          >
          <input 
            v-model.number="amountRange.max" 
            type="number" 
            placeholder="最大金额"
            class="filter-input"
          >
        </div>
        
        <button class="filter-button" @click="applyFilter">查询</button>
      </div>

      <table class="billing-table">
        <thead>
          <tr>
            <th>缴费类型</th>
            <th>缴费日期</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(bill, index) in filteredBills" :key="index">
            <td>{{ bill.type }}</td>
            <td>{{ bill.date }}</td>
            <td>¥ {{ bill.amount }}</td>
            <td :class="{'paid': bill.status === '已支付'}">{{ bill.status }}</td>
            <td>
              <button class="detail-button" @click="viewDetail(bill)">查看详情</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button 
          v-for="page in totalPages" 
          :key="page"
          @click="currentPage = page"
          :class="{active: currentPage === page}"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted } from 'vue';

const router = useRouter();
const currentTime = ref('');
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



// 模拟账单数据
const bills = ref([
  { type: '水费', date: '2024-03-15', amount: '85.50', status: '已支付' },
  { type: '电费', date: '2024-03-10', amount: '268.40', status: '已支付' },
  { type: '燃气费', date: '2024-03-05', amount: '120.00', status: '未支付' },
  // 可添加更多模拟数据...
]);

const selectedYear = ref(new Date().getFullYear());
const years = ref([2024, 2023, 2022]);
const currentPage = ref(1);
const itemsPerPage = 10;

const selectedMonth = ref('');
const selectedType = ref('');
const amountRange = ref({ min: null, max: null });

const filteredBills = computed(() => {
  return bills.value
    .filter(bill => {
      const billYear = new Date(bill.date).getFullYear()
      const billMonth = new Date(bill.date).getMonth() + 1
      const amount = parseFloat(bill.amount)
      
      return (
        billYear === selectedYear.value &&
        (selectedMonth.value === '' || billMonth === selectedMonth.value) &&
        (selectedType.value === '' || bill.type === selectedType.value) &&
        (amountRange.value.min === null || amount >= amountRange.value.min) &&
        (amountRange.value.max === null || amount <= amountRange.value.max)
      )
    })
    .slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(bills.value.length / itemsPerPage);
});

const applyFilter = () => {
  currentPage.value = 1;
};

const viewDetail = (bill) => {
  router.push(`/bill-detail/${bill.type}`);
};
const goToPage = (path) => {
  router.push(path);
};



const isHeaderVisible = ref(true);
const lastScrollPosition = ref(0);

const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScrollPosition > lastScrollPosition.value) {
    // 向下滚动
    isHeaderVisible.value = currentScrollPosition < 100; // 滚动超过100px时隐藏
  } else {
    // 向上滚动
    isHeaderVisible.value = true;
  }
  
  lastScrollPosition.value = currentScrollPosition;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
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
  background: #46a87c;
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
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  padding: 8px; /* 新增触摸区域 */
  transition: all 0.2s ease; /* 添加过渡效果 */
}

.back-button:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-50%) scale(1.1);
}

.back-button:active {
  transform: translateY(-50%) scale(0.9);
  background: rgba(255,255,255,0.3);
}
.history-container {
  max-height: calc(100vh - 200px); /* 留出顶部导航和筛选区域空间 */
  overflow-y: auto;
  padding: 0 16px;
  -webkit-overflow-scrolling: touch; /* 启用弹性滚动 */
}

/* 隐藏滚动条 */
.history-container::-webkit-scrollbar {
  display: none;
}

.billing-table {
  min-width: 480px; /* 调整为更合理的宽度 */
  width: 100%;
  table-layout: fixed;
}

.billing-table th:nth-child(4),
.billing-table td:nth-child(4) {
  width: 80px; /* 固定状态列宽度 */
}

.billing-table th:nth-child(5),
.billing-table td:nth-child(5) {
  width: 100px; /* 固定操作列宽度 */
}

.history-container {
  overflow-x: auto; /* 启用水平滚动 */
  overflow-y: auto;
}
.filter-section {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 8px;
  padding: 8px 0;
  -webkit-overflow-scrolling: touch;
}

.filter-group {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.filter-select {
  width: 120px;
  flex-shrink: 0;
  white-space: nowrap;
}
.filter-select, .filter-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.filter-button {
  width: 100%;
  padding: 12px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
}


.billing-table {
  font-size: 0.9rem;
}

.billing-table th,
.billing-table td {
  padding: 10px;
}

.detail-button {
  padding: 6px 12px;
  font-size: 0.8rem;
}

.pagination {
  display: flex;
  justify-content: center; /* 新增居中属性 */
  gap: 4px;
  margin: 16px 0;
  padding-bottom:16px;
}

.pagination button {
  min-width: 36px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px; /* 调大圆角值 */
  background: white;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.pagination button.active {
  background: #2196F3;
  color: white;
  border-color: #2196F3;
  transform: scale(1.05);
}
.filter-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 120px;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 120px;
}
.history-container {
  height: calc(100vh - 160px); /* 修改max-height为height */
  display: flex;
  flex-direction: column;
}

.billing-table {
  flex: 1;
  overflow-y: auto; /* 添加表格内容滚动 */
}

.pagination {
  position: sticky;
  bottom: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 20%);
  padding: 12px 0;
  z-index: 2;
  box-shadow: 0 -4px 12px rgba(0,0,0,0.05);
}
</style>
