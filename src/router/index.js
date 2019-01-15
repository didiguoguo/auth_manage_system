import Vue from 'vue'
import Router from 'vue-router'
import BasicLayout from '@/Layout/BasicLayout'
import Login from '@/pages/Login'
import InfoManage from '@/pages/InfoManage'
import ClassDetail from '@/pages/ClassDetail'
import ResultManage from '@/pages/ResultManage'
import ResultDetail from '@/pages/ResultDetail'
import ManagerInfo from '@/pages/ManagerInfo'
import TestManage from '@/pages/TestManage'
import Notfound from '@/pages/Notfound'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: '鉴定站管理系统',
            meta: {
                requiresAuth: true,
            },
            redirect: '/info_manage',
            component: BasicLayout,
            children: [
                {
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
                    path: 'class_detail',
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

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') ==='' || localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
            next({
                path: '/login',
            })
        } else {
            next()
        }
    } else {
        next()
    }
    next()
})

export default router
