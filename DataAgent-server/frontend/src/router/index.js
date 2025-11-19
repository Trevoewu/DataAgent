// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import ChatIndex from '../views/chat/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/chat'
  },
  {
    path: '/chat',
    name: 'Chat',
    component: ChatIndex
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router