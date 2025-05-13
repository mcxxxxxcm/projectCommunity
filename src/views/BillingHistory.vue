<template>
 <div class="pc-page">
    <!-- 新增导航栏 -->
    <header class="header" :class="{ 'header-hidden': !isHeaderVisible }">
      <!-- 将 logo 部分移到前面 -->
      <div class="logo">
        <div class="house-icon">
          <div class="roof"></div>
          <div class="wall">
            <div class="door"></div>
            <div class="window"></div>
          </div>
        </div>
        <span>历史账单</span>
      </div>
      <nav class="utilities-nav">
        <button class="nav-item" @click="goToPage('/PCPage')">首页</button>
        <button class="nav-item" @click="goToPage('/Utilities-PC')">缴费主页</button>
        <button class="nav-item" @click="goToPage('/billing-history')">历史账单</button>
        <button class="nav-item" @click="goToPage('/electricity-analysis')">用电分析</button>
        <button class="nav-item" @click="goToPage('/safety-guide')">安全指南</button>
        <button class="nav-item" @click="goToPage('/water-bill-payment')">水费缴纳</button>
        <button class="nav-item" @click="goToElectricityBillPage">电费缴纳</button>
        <button class="nav-item" @click="goToGasBillPage">燃气费缴纳</button>
      </nav>
    </header>

    <div class="history-container">
      <div class="filter-section">
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
        <button class="filter-button" @click="applyFilter">查询</button>
      </div>

      <table class="billing-table">
        <thead>
          <tr>
            <th>缴费类型</th>
            <th>缴费日期</th>
            <th>金额</th>
            <th>状态</th>
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
    <footer class="footer">
      <p>© 2025 社区服务平台 版权所有</p>
      <div class="footer-links">
        <a href="#">关于我们</a>
        <a href="#">联系方式</a>
        <a href="#">隐私政策</a> <br><br>
        <a href="#">便民电话：176*****456</a>
      </div>
    </footer>
      <!-- 保持原有页脚结构 -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted } from 'vue';

const router = useRouter();

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


const goToWaterBillPage = () => {
  router.push('/water-bill-payment');
};

const goToElectricityBillPage = () => {
  router.push('/electricity-bill-payment');
};

const goToGasBillPage = () => {
  router.push('/gas-bill-payment');
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
.header {
  transition: transform 0.3s ease-in-out;
}

.header-hidden {
  transform: translateY(-100%);
}

.history-container {
  max-width: 1200px;
  margin: 80px auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.filter-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filter-button {
  padding: 0.5rem 1rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.billing-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.billing-table th,
.billing-table td {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.billing-table th {
  background: #f8f9fa;
}

.paid {
  color: #42b983;
}

.detail-button {
  padding: 0.5rem 1rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.pagination button.active {
  background: #2196F3;
  color: white;
  border-color: #2196F3;
}
.pc-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 设置最小高度为视口高度 */
  background: linear-gradient(135deg, #f5f5f5 0%, #f5f5f5 100%);
  padding-top: 80px; 
}

.pc-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  display: flex;
  /* 修改为 space-between，让 logo 居左，导航项居中 */
  justify-content: space-between; 
  align-items: center;
  padding: 1rem 2rem;
  background: #2c3e50;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed; 
  top: 0; 
  left: 0;
  right: 0;
  z-index: 100; 
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.house-icon {
  position: relative;
  width: 40px;
  height: 40px;
}

.roof {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 15px solid #ff6b6b;
}

.wall {
  position: absolute;
  bottom: 0;
  left: 5px;
  width: 30px;
  height: 25px;
  background: #f8a5c2;
  border-radius: 0 0 5px 5px;
}

.door {
  position: absolute;
  bottom: 0;
  left: 10px;
  width: 8px;
  height: 12px;
  background: #786fa6;
  border-radius: 3px 3px 0 0;
}

.window {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  background: #f7f1e3;
  border-radius: 2px;
}

.utilities-nav {
  /* 让导航项在父元素中居中 */
  margin: 0 auto; 
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
.footer {
  background: #2c3e50;
  color: white;
  padding: 2rem;
  text-align: center;
  margin-top: auto; /* 让页脚自动位于底部 */
  width: 100%; /* 确保页脚宽度铺满页面 */
}

.footer-links {
  margin-top: 1rem;
}
.footer-links a {
  color: #42b983;
  margin: 0 1rem;
  text-decoration: none;
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
</style>

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