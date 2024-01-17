import {createRouter, createWebHashHistory} from "vue-router";

export default createRouter({
    //路由模式
    history: createWebHashHistory(),

    routes: [
        {
            path: '/home',
            component: () => import('@/views/home/index.vue')
        },
        {
            path: '/hospital-search',
            component: () => import('@/views/hospitalDetail/index.vue')
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