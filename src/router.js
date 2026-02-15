import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import AdminDashboard from './views/AdminDashboard.vue'
import { auth } from './firebase'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/admin', name: 'admin-login', component: Admin, meta: { guestOnly: true } },
  { path: '/admin/dashboard', name: 'admin-dashboard', component: AdminDashboard, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to) => {
  const user = auth.currentUser || await getCurrentUser()

  if (to.meta.requiresAuth && !user) {
    return { name: 'admin-login' }
  }

  if (to.meta.guestOnly && user) {
    return { name: 'admin-dashboard' }
  }

  return true
})

export default router
