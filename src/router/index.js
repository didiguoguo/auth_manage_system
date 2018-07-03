import Vue from 'vue'
import Router from 'vue-router'
import BasicLayout from '@/Layout/BasicLayout'
import Login from '@/components/Login'
import InfoManage from '@/components/InfoManage'
import ClassDetail from '@/components/ClassDetail'
import ResultManage from '@/components/ResultManage'
import ResultDetail from '@/components/ResultDetail'
import ManagerInfo from '@/components/ManagerInfo'
import TestManage from '@/components/TestManage'
import Notfound from '@/components/Notfound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: '鉴定站管理系统',
      redirect: '/info_manage',
      component: BasicLayout,
      children: [{
          path: 'info_manage',
          name: '考生信息管理',
          component: InfoManage,
        },
        {
          path: 'results_manage',
          name: '考生成绩管理',
          component: ResultManage,
        },
        {
          path: 'result_detail/:id',
          name: '成绩详情',
          component: ResultDetail,
        },
        {
          path: 'class_detail/:id',
          name: '班级详情',
          component: ClassDetail,
        },
        {
          path: 'test_manage',
          name: '考试管理',
          component: TestManage
        },
        {
          path: 'manager_info',
          name: '管理员信息',
          component: ManagerInfo
        },
      ]
    },
    {
      path: '/login',
      name: '登录页',
      component: Login
    },
    {
      path: '**',
      name: 'NOTFOUND',
      component: Notfound
    },
  ]
})
