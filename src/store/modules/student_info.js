import _students from '../../api/student'
import _classes from '../../api/class'
import { WSAEDESTADDRREQ } from 'constants';

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
        _students.getStudents(students=>{
            const { page_size, current_page } = payload
            let total = students.length
            let res = []
            let max_page = parseInt(total/page_size)
            if(max_page<current_page){
                res = students.slice((max_page-1)*page_size)
            }else if(max_page===current_page){
                if(total/page_size<page_size){
                    res = students.slice((current_page-1)*page_size)
                }else{
                    res = students.slice((current_page-1)*page_size,current_page*page_size) 
                }
            }else if(max_page>current_page){
                res = students.slice((current_page-1)*page_size,current_page*page_size) 
            }
            commit('SAVE_STUDENTS',{list:res,pagination:{page_size, current_page,total:students.length}})
        })
    },
    delete_students(){},
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
            console.log(res)
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