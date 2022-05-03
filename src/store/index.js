import { createStore } from 'vuex'
// const axios = require ('axios')
// let instance = axios.create({
//   baseURL: 'http://localhost:3000/api/',
// });

export default createStore({
  state: {
    userData:{},
  },
  getters: {
    setUser(state){
      return state.userData
    },
  },
  mutations: {
    SET_USER(state,userData){
      state.userData=userData
    },
  },
  actions: {
    setUser({commit},userData){
      commit("SET_USER",userData);
    },
  },
  modules: {
  }
})
