import Vue from 'vue'
import Vuex from 'vuex'
import student_info from './modules/student_info'
import class_info from './modules/class_info'
import student_res from './modules/student_res'
import test from './modules/test'
import user from './modules/user'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    student_info,
    class_info,
    student_res,
    test,
    user,
  },
  // strict: debug,
//   plugins: debug ? [createLogger()] : []
})