import _test from '../../api/test'

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
        _test.getTests(tests=>{
            const { page_size, current_page } = payload
            let total = tests.length
            let res = []
            let max_page = parseInt(total/page_size)
            if(max_page<current_page){
                res = tests.slice((max_page-1)*page_size)
            }else if(max_page===current_page){
                if(total/page_size<page_size){
                    res = tests.slice((current_page-1)*page_size)
                }else{
                    res = tests.slice((current_page-1)*page_size,current_page*page_size) 
                }
            }else if(max_page>current_page){
                res = tests.slice((current_page-1)*page_size,current_page*page_size) 
            }
            commit('SAVE_TESTS',{list:res,pagination:{page_size, current_page,total:tests.length}})
        })
    },
    delete_tests(){},
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