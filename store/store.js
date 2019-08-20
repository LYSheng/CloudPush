import Vue from 'vue';
// import "babel-polyfill";
import Vuex from 'vuex';
import * as types from './types'
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    loading:false,
    count:false,
    provinceId:null,
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.token = data;
      state.token = data;
    },
    [types.LOGOUT]: (state) => {
      // localStorage.removeItem('token');
      state.token = null
    },
    [types.LOADING]: (state, data) => {
		console.log(data)
      state.loading = data;
            if(data!=undefined){
                state.loading = data;
            }else{
                state.loading = !state.loading
            }
			console.log(state.loading)
    },
  }
})
