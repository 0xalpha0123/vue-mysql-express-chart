import Vue from 'vue'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css";
import VueBootstrapToasts from "vue-bootstrap-toasts";

Vue.use(VueBootstrapToasts);
Vue.use(Vuelidate);

import store from "./store";
import router from "./router";

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
