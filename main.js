import Vue from 'vue'
import store from './store/store.js'
import App from './App'
import loading from './components/loading.vue'

Vue.config.productionTip = false
Vue.component('Loading',loading)
Vue.prototype.$store = 'store';
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
