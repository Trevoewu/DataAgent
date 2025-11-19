import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import MateChat from '@matechat/core';
import 'ant-design-vue/dist/reset.css';
import router from './router'
import '@devui-design/icons/icomoon/devui-icon.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './theme/index.scss'

const app = createApp(App)
app.use(Antd)
app.use(router)
app.use(MateChat)
app.use(ElementPlus)
app.mount('#app')