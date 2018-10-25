import { WSAEDESTADDRREQ } from 'constants';
import axios from 'axios'
import { Notification } from 'element-ui';
import { parseErrorMessage } from '../../utils/request';
import HOST from '../../common/const'

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
}

// actions
const actions = {
    get_students({ commit, state },{payload}){
        console.log(HOST)
        axios.request({
            url: HOST+'/students/',
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
            url:  HOST+'/add/student/',
            method: 'POST',
            data: data,
            headers:{
                token: localStorage.getItem('token')
            }
        }).then((res)=>{
            if(res.data && res.data.code === 200 && cb){
                cb(res)
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
    modify_student({ commit, state },{payload:{data:{id,...rest},cb}}){
        axios.request({
            url:  HOST+`/modify/student/${id}`,
            method: 'PATCH',
            data: rest,
            headers:{
                token: localStorage.getItem('token')
            }
        }).then((res)=>{
            if(res.data && res.data.code === 200 && cb){
                cb(res)
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
    delete_students({ commit, state },{payload:{data,cb}}){
        axios.request({
            url:  HOST+'/delete/students/',
            method: 'DELETE',
            data: data,
            headers:{
                token: localStorage.getItem('token')
            }
        }).then((res)=>{
            if(res.data && res.data.code === 200 && cb){
                cb(res)
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
}

// mutations
const mutations = {
    SAVE_STUDENTS(state, payload){
        state.students_data = payload
    },
}

export default {
  state,
  getters,
  actions,
  mutations
}