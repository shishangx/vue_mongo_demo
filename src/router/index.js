import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import LoginView from '@/components/LoginView'
import TableView from '@/components/TableView'

Vue.use(Router)

export default new Router({
  routes: [
    // {
      // path: '/',
      // name: 'HelloWorld',
      // component: HelloWorld
    // },
    // {
        // path: '/',
        // name: 'LoginView',
        // component: LoginView
    // },
    {
        path: '/',
        name: 'TableView',
        component: TableView
    }
  ]
})
