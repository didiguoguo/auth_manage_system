import _students from '../../api/student'
import _classes from '../../api/class'
import { WSAEDESTADDRREQ } from 'constants';
import axios from 'axios'

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
}

// actions
const actions = {
    get_students({ commit, state },{payload}){
        axios.request({
            url:'http://192.168.1.58:5000/students/',
            method:'GET',
            params: payload
        }).then((res)=>{
            commit('SAVE_STUDENTS',res.data)
        })
    },
    add_student({ commit, state },{payload:{data,cb}}){
        axios.request({
            url: 'http://192.168.1.58:5000/add/student/',
            method: 'POST',
            data: data
        }).then((res)=>{
            if(cb){
                cb(res)
            }
        })
    },
    modify_student({ commit, state },{payload:{data:{id,...rest},cb}}){
        axios.request({
            url: `http://192.168.1.58:5000/modify/student/${id}`,
            method: 'PATCH',
            data: rest
        }).then((res)=>{
            if(cb){
                cb(res)
            }
        })
    },
    delete_students({ commit, state },{payload:{data,cb}}){
        axios.request({
            url: 'http://192.168.1.58:5000/delete/students/',
            method: 'DELETE',
            data: data
        }).then((res)=>{
            if(cb){
                cb(res)
            }
        })
    },
    get_classes({ commit, state },{payload}){
        _classes.getClasses(classes=>{
            const { page_size, current_page } = payload
            let total = classes.length
            let res = []
            let max_page = parseInt(total/page_size)
            if(max_page<current_page){
                res = classes.slice((max_page-1)*page_size)
            }else if(max_page===current_page){
                if(total/page_size<page_size){
                    res = classes.slice((current_page-1)*page_size)
                }else{
                    res = classes.slice((current_page-1)*page_size,current_page*page_size) 
                }
            }else if(max_page>current_page){
                res = classes.slice((current_page-1)*page_size,current_page*page_size) 
            }
            commit('SAVE_CLASSES',{list:res,pagination:{page_size, current_page,total:classes.length}})
        })
    },
    delete_classes(){},
}

// mutations
const mutations = {
    SAVE_STUDENTS(state, payload){
        state.students_data = payload
    },
    SAVE_CLASSES(state, payload){
        state.classes_data = payload
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