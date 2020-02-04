import Vue from 'vue'
import App from './App.vue'

window.axios = require('axios').default;
window._ = require('lodash');

axios.defaults.baseURL = 'https://dev.premediapower.com';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
// https: //github.com/laravel/airlock
axios.defaults.withCredentials = true;


axios.interceptors.request.use(
	function (config) {
		const token = window.localStorage.getItem("apiToken");
		if (token != null) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error.response);
	}
);


Vue.config.productionTip = false
Vue.config.preserveWhitespace = false












Object.defineProperty(Vue.prototype, '$_', {
	value: _
});

new Vue({
	render: function (h) {
		return h(App)
	},
}).$mount('#app')
