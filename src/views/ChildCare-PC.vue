<template>
  <div class="pc-page">
    <header class="header">
      <div class="logo">
        <span>儿童托管</span>
      </div>
      <nav class="main-nav">
        <a href="/PCPage" class="nav-item">首页</a>
        <a href="#meal-section" class="nav-item">今日伙食</a>
        <a href="#attendance-section" class="nav-item">签到情况</a>
      </nav>
    </header>

    <main class="management-container">
      <!-- 今日伙食 -->
      <section id="meal-section" class="meal-section">
        <h2 class="section-title">今日伙食</h2>
        <div class="meal-grid">
          <article class="meal-card">
            <h3>早餐</h3>
            <img src="/images/早餐.jpg" alt="早餐" />
            <p>水煮蛋、小米粥、豆沙包</p>
          </article>
          <article class="meal-card">
            <h3>午餐</h3>
            <img src="/images/午餐.jpg" alt="午餐" />
            <p>红烧肉、宫保鸡丁、香煎鱼、清炒时蔬、凉拌黄瓜、冬瓜肉丸汤</p>
          </article>
          <article class="meal-card">
            <h3>晚餐</h3>
            <img src="/images/晚餐.jpg" alt="晚餐" />
            <p>糖醋排骨、番茄牛腩、椒盐虾、炒油麦菜、蒜蓉西兰花、玉米排骨汤</p>
          </article>
        </div>
      </section>

      <!-- 签到情况 -->
      <section id="attendance-section" class="attendance-section">
        <div class="attendance-container"> 
          <!-- 新增签到表单 --> 
          <form @submit.prevent="handleSubmit" class="attendance-form"> 
            <div class="form-header"> 
              <i class="icon icon-user"></i> 
              <h3>签到</h3> 
            </div> 
            
            <div class="form-grid"> 
              <div class="form-group"> 
                <label for="studentName"> 
                  <i class="icon icon-id-card"></i> 
                  学员姓名 
                </label> 
                <input 
                  type="text" 
                  id="studentName" 
                  v-model="formData.studentName" 
                  placeholder="请输入学员全名" 
                  class="input-field" 
                > 
              </div> 
  
              <div class="form-group"> 
                <label for="checkinTime"> 
                  <i class="icon icon-clock"></i> 
                  签到时间 
                </label> 
                <input 
                  type="datetime-local" 
                  id="checkinTime" 
                  v-model="formData.checkinTime" 
                  class="input-field" 
                > 
              </div> 
  
              <div class="form-group"> 
                <label for="checkoutTime"> 
                  <i class="icon icon-clock"></i> 
                  签退时间 
                </label> 
                <input 
                  type="datetime-local" 
                  id="checkoutTime" 
                  v-model="formData.checkoutTime" 
                  class="input-field" 
                > 
              </div> 
  
              <div class="form-group"> 
                <label for="guardian"> 
                  <i class="icon icon-users"></i> 
                  接送人 
                </label> 
                <input 
                  type="text" 
                  id="guardian" 
                  v-model="formData.guardian" 
                  placeholder="请输入监护人姓名" 
                  class="input-field" 
                > 
              </div> 
            </div> 
  
            <button type="submit" class="submit-btn"> 
              <i class="icon icon-check"></i> 
              提交记录 
            </button> 
          </form> 
  
          <!-- 原签到表格保持不变 --> 
          <div class="sign-table"> 
            <table>
              <thead> 
                <tr> 
                  <th>序号</th> 
                  <th>姓名</th> 
                  <th>签到时间</th> 
                  <th>签退时间</th> 
                  <th>接送人</th> 
                </tr> 
              </thead> 
              <tbody> 
                <tr v-for="(record, index) in attendanceRecords" :key="record.id"> 
                  <td>{{ index + 1 }}</td> 
                  <td>{{ record.name }}</td> 
                  <td>{{ record.checkin || '未签到' }}</td> 
                  <td>{{ record.checkout || '未签退' }}</td> 
                  <td>{{ record.guardian }}</td> 
                </tr> 
                <tr> 
                  <td colspan="5" style="text-align: center; padding: 20px; color: #95a5a6;"> 
                    当前签到率：{{ Math.round((attendanceRecords.filter(r => r.checkin).length / attendanceRecords.length) * 100) }}% 
                    | 应到：{{ attendanceRecords.length }}人 
                    实到：{{ attendanceRecords.filter(r => r.checkin).length }}人 
                  </td> 
                </tr> 
              </tbody> 
            </table>
          </div> 
        </div> 
      </section>
    </main>

    <footer class="contact-footer">
      <p>联系电话: 12345678910</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'; 
 
 // 签到记录数据 
 const attendanceRecords = ref([ 
   { 
     id: 1, 
     name: '王小明', 
     checkin: '08:45', 
     checkout: '17:30', 
     guardian: '王大明' 
   }, 
   { 
     id: 2, 
     name: '陈晓华', 
     checkin: '09:00', 
     checkout: '17:15', 
     guardian: '陈芳' 
   } 
 ]); 
 
 // 表单数据 
 const formData = ref({ 
   studentName: '', 
   checkinTime: '', 
   checkoutTime: '', 
   guardian: '' 
 }); 
 
 // 提交处理 
 const handleSubmit = () => { 
   const { studentName, checkinTime, checkoutTime, guardian } = formData.value; 
   
   // 验证必填字段 
   if (!studentName || !guardian) { 
     alert('姓名和接送人必须填写'); 
     return; 
   } 
 
   // 检查是否存在签到记录 
   const existingRecord = attendanceRecords.value.find( 
     record => record.name === studentName 
   ); 
 
   if (checkoutTime) { 
     // 签退逻辑 
     if (!existingRecord) { 
       alert('该学员尚未签到'); 
       return; 
     } 
     
     existingRecord.checkout = formatTime(checkoutTime); 
     existingRecord.guardian = guardian; 
     alert('签退成功'); 
   } else { 
     // 签到逻辑 
     if (!checkinTime) { 
       alert('请选择签到时间'); 
       return; 
     } 
     
     if (existingRecord) { 
       alert('该学员已签到'); 
       return; 
     } 
 
     attendanceRecords.value.push({ 
       id: Date.now(), 
       name: studentName, 
       checkin: formatTime(checkinTime), 
       checkout: '', 
       guardian: guardian 
     }); 
     alert('签到成功'); 
   } 
 
   // 清空表单 
   formData.value = { 
     studentName: '', 
     checkinTime: '', 
     checkoutTime: '', 
     guardian: '' 
   }; 
 }; 
 
 // 时间格式化 
 const formatTime = (datetime) => { 
   const date = new Date(datetime); 
   return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`; 
 }; 
</script>

<style scoped>
/* 基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Helvetica Neue', system-ui, sans-serif;
}

/* 布局容器 */
.pc-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

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

/* 主要内容区域 */
.management-container {
  flex: 1;
  width: 90%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
}

/* 伙食展示 */
.meal-section {
  margin: 3rem 0;
}

.section-title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.meal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.meal-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.meal-card:hover {
  transform: translateY(-5px);
}

.meal-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 3px solid #42b983;
}

.meal-card h3 {
  font-size: 1.25rem;
  color: #2c3e50;
  padding: 1rem;
  margin: 0;
}

.meal-card p {
  color: #666;
  padding: 0 1rem 1.5rem;
  line-height: 1.6;
}

/* 签到表格 */
.sign-table {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}

thead {
  background: #2c3e50;
}

th {
  padding: 1rem;
  color: #fff;
  font-weight: 500;
  text-align: left;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  color: #444;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover {
  background: #f8f9fb;
}

.signature {
  width: 150px;
  height: 35px;
  border-bottom: 2px solid #ecf0f1;
}

/* 页脚 */
.contact-footer {
  text-align: center;
  padding: 1.5rem;
  background: #f8f9fa;
  color: #666;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .main-nav {
    gap: 1rem;
  }

  .meal-grid {
    grid-template-columns: 1fr;
  }

  th, td {
    padding: 0.75rem;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .nav-item {
    font-size: 0.9rem;
  }

  .signature {
    width: 100px;
  }
}

/* 新增表单样式 */ 
.attendance-container { 
  display: grid; 
  gap: 2rem; 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 0 1rem; 
} 

.attendance-form { 
  background: #fff; 
  border-radius: 12px; 
  padding: 2rem; 
  box-shadow: 0 5px 15px rgba(0,0,0,0.08); 
  transition: transform 0.3s ease; 
} 

.attendance-form:hover { 
  transform: translateY(-3px); 
} 

.form-header { 
  display: flex; 
  align-items: center; 
  gap: 1rem; 
  margin-bottom: 2rem; 
  color: #2c3e50; 
} 

.form-header h3 { 
  font-size: 1.5rem; 
  margin: 0; 
} 

.form-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
  gap: 1.5rem; 
} 

.form-group { 
  display: flex; 
  flex-direction: column; 
  gap: 0.5rem; 
} 

label { 
  display: flex; 
  align-items: center; 
  gap: 0.5rem; 
  color: #4a5568; 
  font-weight: 500; 
} 

.input-field { 
  padding: 0.8rem 1rem; 
  border: 2px solid #e2e8f0; 
  border-radius: 8px; 
  transition: all 0.3s ease; 
} 

.input-field:focus { 
  border-color: #42b983; 
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.2); 
  outline: none; 
} 

.submit-btn { 
  width: 100%; 
  margin-top: 1.5rem; 
  padding: 1rem; 
  background: linear-gradient(135deg, #42b983 0%, #2c3e50 100%); 
  color: white; 
  border: none; 
  border-radius: 8px; 
  cursor: pointer; 
  transition: all 0.3s ease; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  gap: 0.5rem; 
} 

.submit-btn:hover { 
  transform: scale(1.02); 
  box-shadow: 0 5px 15px rgba(66, 185, 131, 0.3); 
} 

/* 图标样式 */ 
.icon { 
  width: 20px; 
  height: 20px; 
  fill: currentColor; 
} 

/* 响应式设计 */ 
@media (min-width: 768px) { 
  .attendance-container { 
    grid-template-columns: 1fr 2fr; 
    padding: 0 2rem; 
  } 
} 

@media (max-width: 480px) { 
  .form-grid { 
    grid-template-columns: 1fr; 
  } 
}
</style>