import jquery from 'jquery';
window.$ = window.jQuery = jquery; //If you have normal javascript file (main.js)
import 'bootstrap';
import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router';
import Vuex from 'vuex';
// import VueResource from 'vue-resource';

import VueTables from 'vue-tables-2';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import routes from './components/routes'
import Auth from './packages/auth/Auth'

Vue.use(Vuex)
Vue.use(Auth)
Vue.component('pagination', require('laravel-vue-pagination'));
axios.defaults.baseURL = 'http://localhost:8000/api';
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.auth.getToken();
axios.defaults.headers.common = {
  'Authorization': 'Bearer ' + Vue.auth.getToken()
};
// Vue.use(ClientTable, [options = {}], [useVuex = false], [theme = 'bootstrap4'], [template = 'default']);
// Vue.use(ServerTable, [options = {}], [useVuex = false], [theme = 'bootstrap4'], [template = 'default']);
Vue.use(VueTables.ClientTable);
Vue.use(BootstrapVue)
Vue.use(VueRouter)
// Vue.use(VueResource)
Vue.use(VueAxios, axios)



const router = new VueRouter({
	mode:'history',
	routes
})

router.beforeEach(
  (to, from, next)=>{
    if(to.matched.some(record => record.meta.requiresAuth))
    {
      if(Vue.auth.isAuthenticated()){
        next()
      }
      else{
        next({
          path: '/'
        })
      }
    }
    else{
      next()
    }
  }
)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(require('./App.vue').default),
}).$mount('#app')
