import About from '@/views/About.vue'
import Home from '@/views/Home.vue'
import Hotlines from '@/views/Hotlines.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import Register from '@/views/Register.vue'
import Screening from '@/views/Screening.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/hotlines', component: Hotlines },
  { path: '/screening', component: Screening },
  { path: '/profile', component: Profile },
  // Catch-all for unmatched routes
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
