import Header from '@/Layouts/Header.vue'
import SideBar from '@/Layouts/SideBar.vue'
import DashboardAdmin from '@/views/DashboardAdmin.vue'
import DashboardDoctor from '@/views/DashboardDoctor.vue'
import DashboardRecept from '@/views/DashboardRecept.vue'
import Doctors from '@/views/Doctors.vue'
import FormComs from '@/views/FormComs.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/Not-Found.vue'
import Patients from '@/views/Patients.vue'
import Rdv from '@/views/Rdv.vue'
import Rooms from '@/views/Rooms.vue'
import Users from '@/views/Users.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admindash',
    name: 'admindash',
    component: DashboardAdmin,
    meta: { requiresAuth: true, requiresRole: 'admin' }
  },
  {
    path: '/doctordash',
    name: 'doctordash',
    component: DashboardDoctor,
    meta: { requiresAuth: true, requiresRole: 'doctor' }
  },
  {
    path: '/receptdash',
    name: 'receptdash',
    component: DashboardRecept,
    meta: { requiresAuth: true, requiresRole: 'recept' }
  },
  {
    path: '/doctors',
    name: 'doctors',
    component: Doctors
  },
  {
    path: '/patients',
    name: 'patients',
    component: Patients
  },
  {
    path: '/patients/formulaire',
    name: 'formulaire',
    component: FormComs
  },
  {
    path: '/rdv',
    name: 'rdv',
    component: Rdv
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: Rooms
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/header',
    name: 'header',
    component: Header
  },
  {
    path: '/sidebar',
    name: 'sidebar',
    component: SideBar
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
// })

export default router
