import Vue from 'vue'
import App from './App'
import uniCloudFunction from './common/api'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$uniCloudFunction = uniCloudFunction

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
