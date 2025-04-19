import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'  // 添加Element Plus引入
import 'element-plus/dist/index.css'    // 添加Element Plus样式

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)  // 注册Element Plus
app.mount('#app')