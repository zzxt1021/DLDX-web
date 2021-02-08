<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{ 'content-collapse': collapse }">
            <div class="content">
                <transition name="move" mode="out-in">
                    <router-view></router-view>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
        <audio id="music" loop="loop"><source src="../../assets/sos.mp3" type="audio/mp3" /></audio>
        <div class="sosDiv" v-if="sosShow">
            <div class="sosContentDiv">
                <div class="sosheader">
                    <img src="../../assets/img/sos.png" />
                </div>
                <p class="bj">{{ wsData.roomName }}房间发出报警！</p>
                <el-footer style="height: 40px; border-top: 1px solid #ccc; margin-top: 20px">
                    <div class="btnss">
                        <p @click="save" style="background: #ff1919">
                            <img src="../../assets/img/gou.png" />
                            <span>处理</span>
                        </p>
                        <p style="background: #a3a3a3" @click="handleClose">
                            <img src="../../assets/img/cha.png" />
                            <span>忽略</span>
                        </p>
                    </div>
                </el-footer>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
import { EquipmentService } from '../../api/equipment';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false,
            path: 'ws://47.114.112.229:80/ws/device',
            socket: '',
            sosShow: false,
            wsData: {} //ws返回数据
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    created() {
        bus.$on('collapse-content', (msg) => {
            this.collapse = msg;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', (msg) => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
        this.init();
    },
    methods: {
        play2(){
            this.play();
        },
        play() {
            let audio = document.getElementById('music');
            audio.currentTime = 0;
            audio.play();
        },
        pause() {
            let audio = document.getElementById('music');
            audio.pause();
        },
        init: function () {
            if (typeof WebSocket === 'undefined') {
                alert('您的浏览器不支持socket');
            } else {
                // 实例化socket
                this.socket = new WebSocket(this.path);
                // 监听socket连接
                this.socket.onopen = this.open;
                // 监听socket错误信息
                this.socket.onerror = this.error;
                // 监听socket消息
                this.socket.onmessage = this.getMessage;
            }
        },
        open: function () {
            console.log('socket连接成功!!');
        },
        error: function () {
            console.log('连接错误!!');
        },
        getMessage: function (msg) {
            if (msg.data != '连接成功') {
                this.sosShow = true;
                this.play2();
                this.wsData = JSON.parse(msg.data);
            }
        },
        send: function () {
            this.socket.send(params);
        },
        close: function () {
            console.log('socket已经关闭');
        },
        save: function () {
            EquipmentService.updateDevice({
                deviceId: this.wsData.deviceId,
                action: 1,
                args: {}
            }).then((res) => {
                if (res.status == 0) {
                    this.$message.success('已处理！');
                    this.pause();
                    this.sosShow = false;
                }
            });
        },
        handleClose: function () {
            this.pause();
            this.sosShow = false;
        }
    },
    destroyed() {
        // 销毁监听
        this.socket.onclose = this.close;
    }
};
</script>
<style scoped>
.sosDiv {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid #ddd;
    top: 0;
    z-index: 2;
}
.sosContentDiv {
    width: 500px;
    height: 346px;
    background: #fff;
    margin-top: calc((50% - 346px) / 2);
    margin-left: calc((100% - 300px) / 2);
    border: 1px solid #ddd;
    border-radius: 4px;
}
.sosheader {
    display: flex;
    justify-content: center;
    margin-top: 40px;
}
.bj {
    text-align: center;
    font-size: 18px;
    margin-top: 25px;
}
.btnss {
    display: flex;
    justify-content: center;
}
.btnss p {
    width: 100px;
    line-height: 32px;
    border-radius: 4px;
    color: #fefefe;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    margin-right: 20px;
    cursor: pointer;
}
.btnss p > img {
    margin-right: 10px;
}
</style>
