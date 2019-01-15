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
            url: HOST+'/api/tests/',
            method:'GET',
            params: payload,
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res)=>{
            commit('SAVE_TESTS',res.data.result)
        })
    },
    add_test({ commit, state },{payload:{data,cb}}){
        axios.request({
            url:  HOST+'/api/test/',
            method: 'POST',
            data: data,
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res)=>{
            if(cb){
                cb(res)
            }
        })
    },
    modify_test({ commit, state },{payload:{data,cb}}){
        axios.request({
            url:  HOST+`/api/test/${id}`,
            method: 'PATCH',
            data,
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res)=>{
            if(cb){
                cb(res)
            }
        })
    },
    delete_tests({ commit, state },{payload:{data,cb}}){
        axios.request({
            url:  HOST+'/api/tests/',
            method: 'DELETE',
            data: data,
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
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