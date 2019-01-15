import { WSAEDESTADDRREQ } from 'constants';
import axios from 'axios'
import { Notification } from 'element-ui';
import { parseErrorMessage } from '../../utils/request';
import HOST from '../../common/const'
import { stringify } from 'querystring';

const state = {
    classes_data: {
        list:[],
        pagination:{
            page_size:10,
            current_page:1,
            total:0,
        }
    },
    loading: false,
    class_data: {},
}

// getters
const getters = {
    classes: (state,payload)=>{
        return state.classes_data
    },
    class: (state,payload)=>{
        return state.class_data.data
    },
}

// actions
const actions = {
    get_classes({ commit, state },{payload}){
        axios.request({
            url: HOST+'/api/classes/',
            method:'GET',
            params: payload,
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res)=>{
            if(res.data&&res.data.code===200){
                commit('SAVE_CLASSES',res.data.result)
            }else{
                parseErrorMessage(res.data)
            }
        }).catch((err)=>{
            Notification({
                type:'error',
                message: err.message,
                title: err.code,
            })
        })
    },
    get_class_by_id({ commit, state },{payload: {id, ...rest}}){
        axios.request({
            url: HOST+`/api/class/${id}`,
            method:'GET',
            headers:{
                Authorization:  'Bearer ' + localStorage.getItem('token')
            }
        }).then((res)=>{
            if(res.data&&res.data.code===200){
                commit('SAVE_CLASS',res.data)
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
    add_class({ commit, state },{payload: {data, cb} }){
        axios.request({
            url:  HOST+'/api/class/',
            method: 'POST',
            data: data,
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res)=>{
            if(res.data && res.data.code===200 && cb){
                cb(res)
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
    modify_class({ commit, state },{payload:{data, cb}}){
        axios.request({
            url:  HOST+`/api/class`,
            method: 'PATCH',
            data,
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res)=>{
            if(res.data&&res.data.code===200 && cb){
                cb(res)
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
    delete_classes({ commit, state },{payload: {data, cb} }){
        axios.request({
            url:  HOST+'/api/class/',
            method: 'DELETE',
            data,
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res)=>{
            if(res.data && res.data.code===200 && cb){
                cb(res)
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
    SAVE_CLASSES(state, payload){
        state.classes_data = payload
    },
    SAVE_CLASS(state, payload){
        state.class_data = payload
    },
    ADD_CLASSES(){},
    DELETE_CLASSES(){}
}

export default {
  state,
  getters,
  actions,
  mutations
}