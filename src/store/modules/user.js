import axios from 'axios'
import { parseErrorMessage } from '../../utils/request'
import router from '../../router'
import { Notification } from 'element-ui';
import { LOGIN_HOST } from '../../common/const'

const state = {
  user_data: {}
}

// getters
const getters = {
  user: (state,payload)=>{
    return state.user_data
  },
}

// actions
const actions = {
  login({ commit, state },{payload}){
    axios.request({
        url: LOGIN_HOST+'/auth/login',
        method:'POST',
        data: payload
    }).then((res)=>{
        if(res.data && res.data.code === 200){
          localStorage.setItem('token',res.data.token)
          router.push('/')
        }else{
          parseErrorMessage(res.data)
        }
    }).catch((err)=>{
        Notification({
            type:'error',
            message: err.message
        })
    })
  },
  logout({ commit, state },{payload}){
    axios.request({
        url: LOGIN_HOST+'/user/logout/',
        method:'POST',
        data: payload,
        headers:{
          Authorization: 'Bearerer ' + localStorage.getItem('token')
        }
    }).then((res)=>{
      localStorage.removeItem('token')
      router.push('/login')
      if(!(res.data && res.data.code === 200)){
        parseErrorMessage(res.data)
      }
    }).catch((err)=>{
        Notification({
            type:'error',
            message: err.message
        })
    })
  },
  // get_user_by_id({ commit, state },{payload}){
  //   axios.request({
  //       url: LOGIN_HOST+'/user/' + payload.id,
  //       method:'GET',
  //       params: payload,
  //       headers:{
  //         Authorization: 'Bearerer ' + localStorage.getItem('token')
  //       }
  //   }).then((res)=>{
  //       if(res.data && res.data.code === 200){
  //         commit('SAVE_USER', res.data.data)
  //       }else{
  //           parseErrorMessage(res.data)
  //       }
  //   }).catch((err)=>{
  //       Notification({
  //           type:'error',
  //           message: err.message
  //       })
  //   })
  // },
  get_current_user({ commit, state },{payload}){
    axios.request({
        url: LOGIN_HOST+'/auth/currentUser/',
        method:'GET',
        params: payload,
        headers:{
          Authorization: 'Bearerer ' + localStorage.getItem('token')
        }
    }).then((res)=>{
        if(res.data && res.data.code === 200){
          commit('SAVE_USER', res.data.data)
        }else{
            parseErrorMessage(res.data)
        }
    }).catch((err)=>{
        Notification({
            type:'error',
            message: err.message
        })
    })
  },
}

// mutations
const mutations = {
  SAVE_USER(state, payload){
    state.user_data = payload
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}