<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">UEIOTS系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 消息中心 -->
                <!-- <div class="btn-bell">
                    <el-tooltip
                        effect="dark"
                        :content="message?`有${message}条未读消息`:`消息中心`"
                        placement="bottom"
                    >
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div> -->
                <!-- 用户头像 -->
                <div class="user-avator">
                    <!-- <img src="../../assets/img/img.jpg" /> -->
                    <i class="el-icon-s-custom"></i>
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                        <el-dropdown-item divided command="editUser">修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <editUser v-if="editUserShow" @func="closeUser"></editUser>
    </div>
</template>
<script>
import bus from '../common/bus';
import { LoginService } from '../../api/login';
import editUser from "../page/system/user/editUser"
export default {
    data() {
        return {
            collapse: false,
            fullscreen: false,
            name: 'admin超级管理员',
            message: 2,
            editUserShow:false
        };
    },
    components:{
        editUser
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            // 退出登录
            if (command == 'loginout') {
                let token = localStorage.getItem('token');
                LoginService.loginOut({'token':token}).then((res)=>{
                    if(res.status == 0){
                        this.$router.push('/login');
                        localStorage.clear();
                    }
                })
            } else if(command == 'editUser'){
                this.editUserShow = true;
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        closeUser(da){
            console.log(da);
            this.editUserShow = false;
            if(da == 'ok'){
                this.$router.push('/login');
            }
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 68px;
    font-size: 22px;
    color: #fff;
    background: #fff;
    box-shadow: 0px 2px 10px 0px rgba(51, 51, 67, 0.2);
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
    color:#333;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell ,.el-icon-s-custom,.el-dropdown-link,.el-icon-caret-bottom{
    color: #778B98;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
