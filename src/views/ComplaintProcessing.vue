<template>
  <div class="pc-page">
    <div class="form-container">
      <h1 class="title">投诉与建议处理状态</h1>
      <div class="complaint-tables">
        <!-- 展示已处理的建议和投诉表格 -->
        <div class="complaint-list">
          <h2>已处理的建议和投诉</h2>
          <table border="1">
            <thead>
              <tr>
                <th>建议与投诉内容</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(complaint, index) in completedComplaints" :key="index">
                <td>{{ complaint.content }}</td>
              </tr>
              <!-- 没有数据时显示提示 -->
              <tr v-if="completedComplaints.length === 0">
                <td colspan="1">暂无已处理的建议和投诉</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 展示正在处理的建议和投诉表格 -->
        <div class="complaint-list">
          <h2>正在处理的建议和投诉</h2>
          <table border="1">
            <thead>
              <tr>
                <th>建议与投诉内容</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(complaint, index) in processingComplaints" :key="index">
                <td>{{ complaint.content }}</td>
                <td>
                  <el-button @click="markComplaintAsCompleted(complaint)">已处理</el-button>
                </td>
              </tr>
              <!-- 没有数据时显示提示 -->
              <tr v-if="processingComplaints.length === 0">
                <td colspan="2">暂无正在处理的建议和投诉</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p v-if="status === 'submitting'">您的投诉与建议正在提交中，请稍候。</p>
      <p v-if="status === 'processing'">您的投诉与建议已提交，我们正在处理中，请耐心等待。</p>
      <p v-if="status === 'completed' && isResolved">您的投诉与建议已处理完成，感谢您的反馈！</p>
      <!-- 将按钮移动到页面下方 -->
      <div class="header-actions">
        <el-button type="danger" @click="clearProcessingComplaints">清除处理中建议</el-button>
      </div>
      <el-button type="primary" icon="el-icon-plus" @click="goToSubmitPage" style="margin-bottom: 20px;">
        添加建议
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';

console.log('ComplaintProcessing.vue 开始加载');

const router = useRouter();
const route = useRoute();

// 定义状态变量
const status = ref('submitting');
// 定义是否已解决的变量
const isResolved = ref(false);
// 模拟提交的建议和投诉数据，包含状态信息
const allComplaints = ref([
  { content: '小区卫生太差了，希望尽快清理', isCompleted: false },
  { content: '建议增加一些健身设施', isCompleted: false }
]);

// 计算正在处理的投诉
const processingComplaints = computed(() => allComplaints.value.filter(complaint => !complaint.isCompleted));
// 计算已处理的投诉
const completedComplaints = computed(() => allComplaints.value.filter(complaint => complaint.isCompleted));

// 根据状态计算进度
const getProgressStatus = computed(() => {
  if (status.value === 'submitting') {
    return 'active';
  } else if (status.value === 'processing') {
    return 'active';
  } else if (status.value === 'completed') {
    return 'success';
  }
  return '';
});

// 标记单个投诉为已完成的方法
const markComplaintAsCompleted = (complaint) => {
  complaint.isCompleted = true;
};

// 跳转至提交建议页面的方法
const goToSubmitPage = () => {
  router.push({ 
    name: 'SubmitComplaint'  // 使用新的路由名称
  });
};

// 处理新提交的建议
const handleNewComplaint = () => {
  if (route.state?.newComplaint) {
    allComplaints.value.push(route.state.newComplaint);
  }
};

onMounted(() => {
  handleNewComplaint();
  setTimeout(() => {
    status.value = 'processing';
    setTimeout(() => {
      status.value = 'completed';
    }, 3000);
  }, 1000);
});

onBeforeRouteUpdate(() => {
  handleNewComplaint();
});
</script>
<style>
/* 复制 Complaint-PC.vue 的样式 */
.pc-page {
  padding: 20px;
  width: 90%; /* 设置宽度为浏览器的 90% */
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.form-container {
  margin: 60px auto 0;
  width: 100%; /* 让表单容器宽度占满父容器 */
  padding: 60px 80px; 
  background: #fff;
  border-radius: 12px;
  box-shadow: none; /* 移除阴影 */
}

.title {
  background: linear-gradient(to right, #409eff, #67c23a); 
  -webkit-text-fill-color: transparent; 
  font-family: 'Microsoft YaHei', 'SimSun', sans-serif; 
  text-align: center; 
}

.complaint-list {
  margin-top: 20px;
  flex: 1;
  margin: 0 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.complaint-tables {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
}

th {
  background-color: #409eff;
  color: white;
  padding: 12px;
  text-align: left;
  font-weight: 500;
}

td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

tr:hover {
  background-color: #f5f7fa;
}

/* 增大按钮大小并加高高度 */
.el-button {
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 18px 24px; /* 增大垂直方向的内边距以加高按钮 */
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px; 
}

.el-button--danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
  padding: 18px 24px; /* 增大垂直方向的内边距以加高按钮 */
  font-size: 16px; 
}

.el-button:hover {
  background-color: #66b1ff;
}

.el-button--danger:hover {
  background-color: #f78989;
  border-color: #f78989;
}

/* 无数据提示样式 */
td[colspan] {
  text-align: center;
  color: #909399;
  padding: 20px;
}

/* 添加清除按钮样式 */
.header-actions {
  margin: 20px 0;
  text-align: right;
}
.el-button--danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.el-button--danger:hover {
  background-color: #f78989;
  border-color: #f78989;
}
</style>