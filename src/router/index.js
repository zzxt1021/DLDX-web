import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path:'/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' },
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/overview',
                    component: () => import(/* webpackChunkName: "overview" */ '../components/page/Overview.vue'),
                    meta: { title: '首页' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/apartment',
                    component: () => import(/* webpackChunkName: "apartment" */ '../components/page/apartment/Apartment.vue'),
                    meta: { title: '房间' },
                    children: [
                        {
                            path: '/apartment/checkIn',
                            component: () => import(/* webpackChunkName: "checkIn" */ '../components/page/apartment/checkIn/checkIn.vue'),
                            meta: { title: '住房办理' },
                        },
                        {
                            path: '/apartment/housingManagement',
                            component: () => import(/* webpackChunkName: "housingManagement" */ '../components/page/apartment/housingManagement/housingManagement.vue'),
                            meta: { title: '房源管理' },
                        },
                        {
                            path: '/apartment/templateManager',
                            component: () => import(/* webpackChunkName: "templateManager" */ '../components/page/apartment/templateManager/templateManager.vue'),
                            meta: { title: '模板管理' },
                        },
                        {
                            path: '/apartment/orderManagement',
                            component: () => import(/* webpackChunkName: "orderManagement" */ '../components/page/apartment/orderManagement/orderManagement.vue'),
                            meta: { title: '订单管理' },
                        },
                    ]
                },
                {
                    path: '/equipment',
                    component: () => import(/* webpackChunkName: "equipment" */ '../components/page/equipment/Equipment.vue'),
                    meta: { title: '设备' },
                    children: [
                        {
                            path: '/equipment/equipmentList',
                            component: () => import(/* webpackChunkName: "equipmentList" */ '../components/page/equipment/equipmentList/equipmentList.vue'),
                            meta: { title: '设备列表' }
                        },
                        {
                            path: '/equipment/cardManagement',
                            component: () => import(/* webpackChunkName: "cardManagement" */ '../components/page/equipment/cardManagement/cardManagement.vue'),
                            meta: { title: '门卡管理' }
                        },
                        {
                            path: '/equipment/energyConsumption',
                            component: () => import(/* webpackChunkName: "energyConsumption" */ '../components/page/equipment/energyConsumption/energyConsumption.vue'),
                            meta: { title: '能耗统计' }
                        }
                    ]
                },
                {
                    path: '/alarm',
                    component: () => import(/* webpackChunkName: "alarm" */ '../components/page/alarm/Alarm.vue'),
                    meta: { title: '告警' },
                    children: [
                        {
                            path: '/alarm/alarmList',
                            component: () => import(/* webpackChunkName: "alarmList" */ '../components/page/alarm/alarmList/alarmList.vue'),
                            meta: { title: '告警列表' }
                        }
                    ]
                },
                {
                    path: '/system',
                    component: () => import(/* webpackChunkName: "system" */ '../components/page/system/System.vue'),
                    meta: { title: '系统' },
                    children: [
                        {
                            path: '/system/staffManagement',
                            component: () => import(/* webpackChunkName: "staffManagement" */ '../components/page/system/staffManagement/staffManagement.vue'),
                            meta: { title: '员工管理' }
                        },
                        {
                            path: '/system/positionManagement',
                            component: () => import(/* webpackChunkName: "positionManagement" */ '../components/page/system/positionManagement/positionManagement.vue'),
                            meta: { title: '岗位管理' }
                        },
                        {
                            path: '/system/dataDictionary',
                            component: () => import(/* webpackChunkName: "dataDictionary" */ '../components/page/system/dataDictionary/dataDictionary.vue'),
                            meta: { title: '数据字典' }
                        }
                    ]
                },
            ]
        },
        
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
