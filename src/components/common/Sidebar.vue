<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#FFFFFF"
            text-color="#111F28"
            active-text-color="#FFFFFF"
            @select="handleSelect"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: '/overview',
                    title: '首页'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '2',
                    title: '房间',
                    subs: [
                        {
                            index: '/apartment/checkIn',
                            title: '住房办理'
                        },
                        {
                            index: '/apartment/orderManagement',
                            title: '订单管理'
                        },
                        {
                            index: '/apartment/housingManagement',
                            title: '房源管理'
                        },
                        {
                            index: '/apartment/templateManager',
                            title: '模板管理'
                        },
                        
                    ]
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '设备',
                    subs: [
                        {
                            index: '/equipment/equipmentList',
                            title: '设备列表'
                        },
                        {
                            index: '/equipment/cardManagement',
                            title: '门卡管理'
                        },
                        {
                            index: '/equipment/energyConsumption',
                            title: '能耗统计'
                        },
                    ]
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '4',
                    title: '告警',
                    subs: [
                        {
                            index: '/alarm/alarmList',
                            title: '告警列表'
                        },
                    ]
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '5',
                    title: '系统',
                    subs: [
                        {
                            index: '/system/staffManagement',
                            title: '员工管理'
                        },
                        // {
                        //     index: '/system/positionManagement',
                        //     title: '岗位管理'
                        // },
                        // {
                        //     index: '/system/dataDictionary',
                        //     title: '数据字典'
                        // },
                        {
                            index: '/system/roomManage',
                            title: '房型管理'
                        },
                    ]
                },
            ]
        };
    },
    computed: {
        onRoutes() {
            //return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    },
    methods:{
        handleSelect:function(key, keyPath){
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}

</style>
