import Vue from "vue";
import App from "./App.vue";

window.axios = require("axios").default;
/* global axios */

window._ = require("lodash");
/* global _ */

const appVersion = require("../package.json").version;

axios.defaults.baseURL = "https://dev.premediapower.com";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
// https: //github.com/laravel/airlock
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  function(config) {
    const token = window.localStorage.getItem("apiToken");
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error.response);
  }
);

Vue.config.productionTip = false;
Vue.config.preserveWhitespace = false;

Object.defineProperty(Vue.prototype, "$_", {
  value: _
});

var app = {
  version: appVersion,
  debug: process.env.NODE_ENV !== "production",
  connected_to_internet: true
};

new Vue({
  data: app,
  mounted() {
    const vm = this;
    console.log("Vue Instance mounted");

    window.addEventListener(
      "online",
      function() {
        vm.connected_to_internet = true;
      },
      true
    );
    window.addEventListener(
      "offline",
      function() {
        vm.connected_to_internet = false;
      },
      true
    );
  },
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
