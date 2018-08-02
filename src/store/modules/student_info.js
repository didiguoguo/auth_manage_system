import { WSAEDESTADDRREQ } from 'constants';
import axios from 'axios'
import { Notification } from 'element-ui';
import { parseErrorMessage } from '../../utils/request';

const state = {
    students_data: {
        list:[],
        pagination:{
            page_size:10,
            current_page:1,
            total:0,
        }
    },
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
    student_data: {}
}

// getters
const getters = {
    students: (state,payload)=>{
        return state.students_data
    },
    classes: (state,payload)=>{
        return state.classes_data
    },
    class: (state,payload)=>{
        return state.class_data.data
    },
}

// actions
const actions = {
    get_students({ commit, state },{payload}){
        axios.request({
            url:'http://192.168.1.14:5000/students/',
            method:'GET',
            params: payload,
            headers:{
                token: localStorage.getItem('token')
            }
        }).then((res)=>{
            if(res.data&&res.data.code===200){
                commit('SAVE_STUDENTS',res.data)
            }else{
                parseErrorMessage(res.data)
            }
        }).catch((err)=>{
            Notification({
                type:'error',
                message: err
            })
        })
    },
    add_student({ commit, state },{payload:{data,cb}}){
        axios.request({
            url: 'http://192.168.1.14:5000/add/student/',
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
    modify_student({ commit, state },{payload:{data:{id,...rest},cb}}){
        axios.request({
            url: `http://192.168.1.14:5000/modify/student/${id}`,
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
    delete_students({ commit, state },{payload:{data,cb}}){
        axios.request({
            url: 'http://192.168.1.14:5000/delete/students/',
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
    get_classes({ commit, state },{payload}){
        axios.request({
            url:'http://192.168.1.14:5000/classes/',
            method:'GET',
            params: payload,
            headers:{
                token: localStorage.getItem('token')
            }
        }).then((res)=>{
            commit('SAVE_CLASSES',res.data)
        })
    },
    get_class_by_id({ commit, state },{payload:{ id, ...rest }}){
        axios.request({
            url:`http://192.168.1.14:5000/class/${id}`,
            method:'GET',
            params: rest,
            headers:{
                token: localStorage.getItem('token')
            }
        }).then((res)=>{
            commit('SAVE_CLASS',res.data)
        })
    },
    add_class({ commit, state },{payload:{data,cb}}){
        axios.request({
            url: 'http://192.168.1.14:5000/add/class/',
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
    modify_class({ commit, state },{payload:{data:{id,...rest},cb}}){
        axios.request({
            url: `http://192.168.1.14:5000/modify/class/${id}`,
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
    delete_classes({ commit, state },{payload:{data,cb}}){
        axios.request({
            url: 'http://192.168.1.14:5000/delete/classes/',
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
    SAVE_STUDENTS(state, payload){
        state.students_data = payload
    },
    SAVE_CLASSES(state, payload){
        state.classes_data = payload
    },
    SAVE_CLASS(state, payload){
        state.class_data = payload
    },
    ADD_STUDENTS(){},
    DELETE_STUDENTS(){},
    ADD_CLASSES(){},
    DELETE_CLASSES(){}
}

export default {
  state,
  getters,
  actions,
  mutations
}