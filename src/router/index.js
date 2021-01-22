import Vue from 'vue'
import VueRouter from 'vue-router'
import ProjectsList from '../views/ProjectsList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'projects',
    component: ProjectsList
  },
  {
    path: '/project/:id',
    name: 'project',
    params: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Project.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
