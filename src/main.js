import Vue from 'vue'
import App from './App.vue'

window.axios = require('axios').default;
window._ = require('lodash');


axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

// https: //github.com/laravel/airlock
axios.defaults.withCredentials = true;

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
