import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'

const routes = [
  { path: '/home', name: 'home', component: Home },
  { path: '/', name: 'admin', component: Admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
