import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App";

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

import {BootstrapVueIcons } from 'bootstrap-vue'
Vue.use(BootstrapVueIcons)

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "구글 지도 API 발급 키",
    libraries:"places",
  },
  installComponents: true
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  // beforeCreate() {
  //    this.$store.dispatch("getUserInfo")
  // },
  render: (h) => h(App),
}).$mount("#app");
