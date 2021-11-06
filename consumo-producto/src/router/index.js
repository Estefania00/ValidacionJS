import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  
  {
    path: '/listar',
    name: 'Listar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Producto/Lista.vue')
  },
  {
    path: '/alerta',
    name: 'alerta',
    component: () => import(/* webpackChunkName: "about" */ '../views/Producto/alerta.vue')
  },
  {
    path: '/listar2',
    name: 'Listar2',
    component: () => import(/* webpackChunkName: "about" */ '../views/Producto/segundo/ListaP.vue')
  },
  {
    path: '/nuevo',
    name: 'Nuevo',
    component: () => import(/* webpackChunkName: "about" */ '../views/Producto/Nuevo.vue')
  },
  {
    path: '/editar/:id',
    name: 'editar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Producto/Editar.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
