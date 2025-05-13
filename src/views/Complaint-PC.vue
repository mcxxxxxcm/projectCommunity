<template>
  <div class="pc-layout">
    <!-- 添加导航栏 -->
    <header class="header" :class="{ 'header-hidden': !isHeaderVisible }">
      <div class="logo">
        <div class="house-icon">
          <div class="roof"></div>
          <div class="wall">
            <div class="door"></div>
            <div class="window"></div>
          </div>
        </div>
        <span>社区服务平台</span>
      </div>
      <nav class="main-nav">
        <button class="nav-item" @click="goToPage('/PCPage')">首页</button>
        <button class="nav-item" @click="goToPage('/PointsMall-PC')">积分商城</button>
        <button class="nav-item" @click="goToPage('/ChildCare-PC')">儿童托管</button>
        <button class="nav-item" @click="goToPage('/Utilities-PC')">水电缴费</button>
        <button class="nav-item" @click="goToPage('/CommunityErrands-PC')">社区跑腿</button>
        <button class="nav-item" @click="goToPage('/Privacy-PC')">隐私管理</button>
        <button class="nav-item" @click="goToPage('/Complaint-PC')">投诉建议</button>
        <button class="nav-item" @click="goToPage('/LostAndFound-PC')">寻物启事</button>
        <!-- 添加我的按钮 -->
        <button class="nav-item" @click="goToPage('/mine')">我的</button>
      </nav>
      <!-- 添加建议喇叭图片 -->
      <img  
        alt="建议喇叭" 
        class="suggestion-horn"
      >
      <button class="mobile-switch" @click="goToMobile">
        <span class="icon">📱</span>
        <span>手机版</span>
      </button>
    </header>
    <div class="pc-page">
      <h1 class="title">投诉与建议</h1>
      <el-form :model="formData">
        <!-- 匿名按钮 -->
        <el-form-item>
          <el-switch
            v-model="isAnonymous"
            active-text="匿名模式"
            inactive-text="正常模式"
          ></el-switch>
        </el-form-item>
        <!-- 个人信息，匿名模式下隐藏 -->
        <el-form-item v-if="!isAnonymous">
          <label>姓名：</label>
          <el-input 
            v-model="formData.name" 
            placeholder="请输入姓名"
            class="elegant-input">
          </el-input>
        </el-form-item>
        
        <el-form-item v-if="!isAnonymous">
          <label>手机号码：</label>
          <el-input 
            v-model="formData.phone" 
            placeholder="请输入手机号码"
            class="elegant-input">
          </el-input>
        </el-form-item>

        <!-- 投诉对象 -->
        <el-form-item>
          <label>投诉对象：</label>
          <el-select 
            v-model="formData.target" 
            placeholder="请选择投诉对象"
            class="elegant-select">
            <el-option label="物业服务" value="property"></el-option>
            <el-option label="社区设施" value="facility"></el-option>
            <el-option label="其他住户" value="neighbor"></el-option>
          </el-select>
        </el-form-item>

        <!-- 问题描述 -->
        <el-form-item>
          <label>问题描述：</label>
          <el-input 
            type="textarea"
            :rows="5"
            v-model="formData.description" 
            placeholder="请详细描述您的问题（500字以内）"
            class="elegant-textarea"
            maxlength="500"
            show-word-limit>
          </el-input>
        </el-form-item>
        
        <!-- 新增底部按钮 -->
        <div class="form-actions">
          <el-button 
            type="primary" 
            @click="handleSubmit"
            class="submit-button">
            提交建议
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const formData = ref({
  name: '',
  phone: '',
  target: '',
  description: ''
});
const isAnonymous = ref(false);
const isHeaderVisible = ref(true); // 添加缺失的响应式变量
const lastScrollPosition = ref(0); // 添加缺失的响应式变量

const goToPage = (path) => {
  const protectedRoutes = ['/mine', '/PointsMall-PC'];
  if (protectedRoutes.includes(path) && !authStore.isLoggedIn) {
    router.push('/');
    return;
  }
  router.push(path);
};

const goToMobile = () => {
  router.push('/MobilePage');
};

const handleSubmit = () => {
  if (!isAnonymous.value && (!formData.value.name || !formData.value.phone)) {
    ElMessage.error('请填写完整个人信息');
    return;
  }
  if (!formData.value.description) {
    ElMessage.error('请填写问题描述');
    return;
  }
  ElMessage.success('提交成功，我们会尽快处理！');
  // 传递建议数据到 ComplaintProcessing 页面
  router.push({ 
    name: 'ComplaintProcessing',
    state: {
      newComplaint: {
        content: formData.value.description,
        isCompleted: false
      }
    }
  });
};

const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  isHeaderVisible.value = currentScrollPosition < lastScrollPosition.value || currentScrollPosition < 10;
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
/* 添加导航栏样式 */
.pc-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #2c3e50;
  color: white;
  /* 移除导航栏阴影 */
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */ 
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: transform 0.3s ease;
  z-index: 1000;
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

.mobile-switch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #42b983; /* 改为更显眼的绿色背景 */
  border: none;
  border-radius: 20px; /* 增加圆角 */
  color: white;
  cursor: pointer;
  font-weight: bold; /* 加粗文字 */
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 添加阴影 */
}

.mobile-switch:hover {
  background: #3aa876; /* 悬停时颜色变深 */
  transform: translateY(-2px); /* 悬停时轻微上浮 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 悬停时阴影加深 */
}

.mobile-switch .icon {
  font-size: 1.2rem; /* 增大图标 */
}

.header-hidden {
  transform: translateY(-100%);
}

/* 移除 form-container 相关样式 */
.pc-page {
  margin-top: 80px;
  padding: 40px; 
  max-width: none;  
  margin: 80px auto 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* 修改宽度为 100%，让其自适应浏览器窗口 */
  width: 80%; 
  box-sizing: border-box; /* 确保内边距和边框包含在宽度内 */
}

.elegant-input,
.elegant-select,
.elegant-textarea {
  width: 100%; 
  max-width: none; 
  margin: 15px 0; 
  box-sizing: border-box; 
  height: 45px; 
  display: block;
  border-radius: 8px;
  border: none; /* 删除边框 */
  padding: 0 15px; /* 添加内边距 */
  font-size: 14px; /* 设置字体大小 */
  transition: all 0.3s ease;
  color: black; /* 保持输入框内文字颜色为黑色 */
}

.elegant-textarea {
  min-height: 180px; 
  height: auto; 
  padding: 15px;
  margin: 0;
}

/* 悬停效果 */
.elegant-input:hover,
.elegant-select:hover,
.elegant-textarea:hover {
  border-color: #c0c4cc;
}

/* 焦点效果 */
.elegant-input:focus,
.elegant-select:focus,
.elegant-textarea:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.elegant-input,
.elegant-select{
  width: 90%;         
  /* 移除最小宽度限制，让输入框适应浏览器 */
  /* min-width: 500px;   */
  height: 45px;
  margin: 15px auto;
  display: block;
}
.elegant-textarea {
  
  width: 100%; 
  min-height: 180px;
  margin: 0 auto;
  display: block;
  border-radius: 8px;
  padding: 15px;
  transition: all 0.3s ease;
}

.el-form-item {
  margin-bottom: 25px;
}

.el-select__placeholder {
  color: #909399;
}

.elegant-input,
.elegant-select{
  width: 90%;         
  /* 移除最小宽度限制，让输入框适应浏览器 */
  /* min-width: 500px;   */
  height: 45px;
  margin: 15px auto;
  display: block;
}
.elegant-textarea {
  border-radius: 8px;
  padding: 12px;
  transition: all 0.3s ease;
  min-height: 150px;
  margin: 0 auto;
  display: block;
}

.el-select__placeholder {
  color: #909399;
}

.el-form-item {
  margin-bottom: 22px;
}
.el-input, .el-select {
  width: 100%;
}
.el-textarea {
  margin-top: 10px;
}
.title {
  background: linear-gradient(to right, #ffffff, #ffffff); 
  -webkit-text-fill-color: transparent; 
  font-family: 'Microsoft YaHei', 'SimSun', sans-serif; 
  text-align: center; 
}
.el-form-item label {
  color: #409EFF; /* 修改标题颜色与提交按钮颜色一致 */
  font-weight: bold; /* 保持标题字体加粗 */
}
.suggestion-horn {
  width: 30px; /* 调整图片宽度 */
  height: 30px; /* 调整图片高度 */
  margin-left: 1rem; /* 添加左边距，与其他元素保持间距 */
  cursor: pointer; /* 鼠标悬停时显示手型 */
}
</style>


