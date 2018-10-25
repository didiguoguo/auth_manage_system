import axios from 'axios'
import HOST from '../../common/const'

const state = {
    tests_data: {
        list:[],
        pagination:{
            page_size:10,
            current_page:1,
            total:0,
        }
    },
}

// getters
const getters = {
    tests: (state,payload)=>{
        return state.tests_data
    },
}

// actions
const actions = {
    get_tests({ commit, state },{payload}){
        axios.request({
            url: HOST+'/tests/',
            method:'GET',
            params: payload,
            headers:{
                token: localStorage.getItem('token')
            }
        }).then((res)=>{
            commit('SAVE_TESTS',res.data)
        })
    },
    add_test({ commit, state },{payload:{data,cb}}){
        axios.request({
            url:  HOST+'/add/test/',
            method: 'POST',
            data: data,
            headers:{
                token: localStorage.getItem('token')
            }
        }).then((res)=>{
            if(cb){
                cb(res)
            }
        })
    },
    modify_test({ commit, state },{payload:{data:{id,...rest},cb}}){
        axios.request({
            url:  HOST+`/modify/test/${id}`,
            method: 'PATCH',
            data: rest,
            headers:{
                token: localStorage.getItem('token')
            }
        }).then((res)=>{
            if(cb){
                cb(res)
            }
        })
    },
    delete_tests({ commit, state },{payload:{data,cb}}){
        axios.request({
            url:  HOST+'/delete/tests/',
            method: 'DELETE',
            data: data,
            headers:{
                token: localStorage.getItem('token')
            }
        }).then((res)=>{
            if(cb){
                cb(res)
            }
        })
    },
}

// mutations
const mutations = {
    SAVE_TESTS(state, payload){
        state.tests_data = payload
    },
    ADD_TESTS(){},
    DELETE_TESTS(){},
}

export default {
  state,
  getters,
  actions,
  mutations
}