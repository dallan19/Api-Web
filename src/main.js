import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

Vue.use(BootstrapVue);
Vue.use(Bootstrap);

new Vue({
  el: '#app',
  render: h => h(App)
})


