<template>
  <div class="pc-page">
    <div class="management-container">
      <!-- 今日伙食 -->
      <div class="meal-section">
        <h2>今日伙食</h2>
        <div class="meal-item">
          <h3>早餐</h3>
          <img src="/public/images/早餐.jpg" alt="早餐" />
          <p>水煮蛋、小米粥、豆沙包</p>
        </div>
        <div class="meal-item">
          <h3>午餐</h3>
          <img src="/public/images/午餐.jpg" alt="午餐" />
          <p>红烧肉、宫保鸡丁、香煎鱼、清炒时蔬、凉拌黄瓜、冬瓜肉丸汤</p>
        </div>
        <div class="meal-item">
          <h3>晚餐</h3>
          <img src="/public/images/晚餐.jpg" alt="晚餐" />
          <p>糖醋排骨、番茄牛腩、椒盐虾、炒油麦菜、蒜蓉西兰花、玉米排骨汤</p>
        </div>
      </div>
      <!-- 签到情况 -->
      <div class="attendance-section">
        <h2>签到情况</h2>
        <table>
          <thead>
            <tr>
              <th>姓名</th>
              <th>签到时间</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>张三</td>
              <td>08:00</td>
              <td>已签到</td>
            </tr>
            <tr>
              <td>李四</td>
              <td>未签到</td>
              <td>未签到</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button class="nav-button" @click="goToPage('/PCPage')">
      <span>返回首页</span>
    </button>
    <div class="contact-number">联系电话: 12345678910</div>
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
/* 使用与PCPage.vue相同的样式 */
.pc-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw; 
  height: 100vh;
  /* 修改背景为白色 */
  background: white;
  position: relative;
  margin: 0; 
  padding: 0;
  overflow: hidden; 
}

.management-container {
  width: 80%;
  max-width: 1200px;
  /* 删除白色背景 */
  /* background-color: white; */
  padding: 2rem;
  border-radius: 8px;
  /* 删除阴影 */
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
}

.meal-section, .attendance-section {
  margin-bottom: 2rem;
}

.meal-item {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  /* 使用 flex 布局 */
  display: flex;
  align-items: center;
  gap: 1rem;
}

.meal-item img {
  max-width: 200px;
  height: auto;
}

.meal-item p {
  margin: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

.title {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
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
  /* 删除阴影 */
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
  transition: all 0.3s ease;
  font-size: 1.1rem;
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.nav-button:hover {
  transform: translateY(-3px);
  /* 删除悬停阴影 */
  /* box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1); */
  background: #42b983;
  color: white;
}

.icon {
  font-size: 1.5rem;
}

.contact-number {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  color: #2c3e50;
}
</style>