import {createRouter, createWebHashHistory} from "vue-router";

export default createRouter({
    //路由模式
    history: createWebHashHistory(),

    routes: [
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/home/index.vue')
        },
        {
            path: '/hospital',
            name: 'hospital',
            component: () => import('@/views/hospital/index.vue'),
            children: [
                {
                    path: 'register',
                    name: '预约挂号',
                    meta: {
                        title: '预约挂号',
                        icon: 'register'
                    },
                    component: () => import('@/views/hospital/register/index.vue')
                },
                {
                    path: 'detail',
                    name: '医院详情',
                    meta: {
                        title: '医院详情',
                        icon: 'detail'
                    },
                    component: () => import('@/views/hospital/detail/index.vue')
                },
                {
                    path: 'notice',
                    name: '预约通知',
                    meta: {
                        title: '预约通知',
                        icon: 'notice'
                    },
                    component: () => import('@/views/hospital/pause/index.vue')
                },
                {
                    path: 'pause',
                    name: '停诊信息',
                    meta: {
                        title: '停诊信息',
                        icon: 'pause'
                    },
                    component: () => import('@/views/hospital/notice/index.vue')
                },
                {
                    path: 'search',
                    name: '查询/取消',
                    meta: {
                        title: '查询/取消',
                        icon: 'search'
                    },
                    component: () => import('@/views/hospital/search/index.vue')
                }
            ]
        },
        {
            path: '/',
            redirect: '/home'
        }
    ],

    //滚动行为：控制滚动条的位置
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})