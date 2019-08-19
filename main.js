import Vue from 'vue'
import App from './App'
import loading from './components/loading.vue'

Vue.config.productionTip = false
Vue.component('Loading',loading)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
