<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="设备详情" :close-on-click-modal="false">
            <el-container>
                <div>
                    <div class="modelK">
                        <p class="modelTit">基础信息</p>
                    </div>
                    <div>
                        <el-row class="htp">
                            <el-col :span="4" :offset="4">所属区域：</el-col>
                            <el-col :span="10"
                                >{{ orgData.buildingType1Name }} > {{ orgData.buildingType2Name }} > {{ orgData.buildingType3Name }} >
                                {{ orgData.roomName }}</el-col
                            >
                        </el-row>
                        <el-row class="htp">
                            <el-col :span="4" :offset="4">设备类型：</el-col>
                            <el-col :span="10" v-if="orgData.deviceType == '10-1'">灯</el-col>
                            <el-col :span="10" v-if="orgData.deviceType == '10-2'">门锁</el-col>
                            <el-col :span="10" v-if="orgData.deviceType == '10-3'">面板</el-col>
                            <el-col :span="10" v-if="orgData.deviceType == '10-4'">插座</el-col>
                            <el-col :span="10" v-if="orgData.deviceType == '10-5'">控制</el-col>
                            <el-col :span="10" v-if="orgData.deviceType == '10-6'">传感器</el-col>
                            <el-col :span="10" v-if="orgData.deviceType == '10-99'">其他</el-col>
                        </el-row>
                        <el-row class="htp">
                            <el-col :span="4" :offset="4">设备MAC：</el-col>
                            <el-col :span="10">{{ orgData.mac }}</el-col>
                        </el-row>
                        <el-row class="htp">
                            <el-col :span="4" :offset="4">所属主机：</el-col>
                            <el-col :span="10">{{ orgData.hostId }}</el-col>
                        </el-row>
                        <el-row class="htp">
                            <el-col :span="4" :offset="4">所属网关：</el-col>
                            <el-col :span="10">{{ orgData.gateway }}</el-col>
                        </el-row>
                    </div>
                    <div class="modelK">
                        <p class="modelTit">状态信息</p>
                    </div>
                    <div>
                        <el-row class="htp">
                            <el-col :span="4" :offset="4">网络状态：</el-col>
                            <el-col :span="10">在线</el-col>
                        </el-row>
                        <el-row class="htp">
                            <el-col :span="4" :offset="4">设备状态：</el-col>
                            <el-col :span="10">{{ devStatus ? '正常' : '异常' }}</el-col>
                        </el-row>
                    </div>
                    <div class="modelK" v-if="orgData.deviceType != '10-3'">
                        <p class="modelTit">操作</p>
                    </div>
                    <div v-if="orgData.deviceType != '10-3' && orgData.deviceType != '10-5'">
                        <el-row class="htp">
                            <el-col :span="4" :offset="4">开关：</el-col>
                            <el-col :span="10">
                                <img
                                    src="../../../../assets/img/check.png"
                                    v-if="!checkShow(orgData)"
                                    class="onc"
                                    @click="clickOn(orgData)"
                                />
                                <img
                                    src="../../../../assets/img/checked.png"
                                    v-if="checkShow(orgData)"
                                    class="onc"
                                    @click="clickOn(orgData)"
                                />
                            </el-col>
                        </el-row>
                    </div>
                    <div v-if="orgData.deviceType == '10-5' && orgData.channel == 1">
                        <el-col :span="4" >空调操作</el-col>
                        <el-col :span="4">
                            <p class="ktbtn" @click="openKT(orgData.deviceId)">开空调</p>
                        </el-col>
                        <el-col :span="4">
                            <p  class="ktbtn" @click="closeKT(orgData.deviceId)">关空调</p>
                        </el-col>
                    </div>
                </div>
            </el-container>
            <div slot="footer" class="dialog-footer" style="height: 40px; border-top: 1px solid #ccc">
                <div class="btnss">
                    <!-- <p @click="save">
                        <img src="../../../../assets/img/gou.png" />
                        <span>保存</span>
                    </p> -->
                    <p style="background: #427fda" @click="handleClose">
                        <img src="../../../../assets/img/cha.png" />
                        <span>取消</span>
                    </p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { EquipmentService } from '../../../../api/equipment';
export default {
    name: 'lightView',
    props: ['func', 'orgData'],
    data() {
        return {
            dialogVisible: true,
            on: false,
            devStatus: true //设备状态
        };
    },
    mounted() {
        let status = JSON.parse(this.orgData.status);
        if (this.orgData.deviceType == '10-1' || this.orgData.deviceType == '10-4') {
            if (status.onlineState == 'ONLINE') {
                this.devStatus = true;
            } else {
                this.devStatus = false;
            }
            if (status.on == 'true') {
                this.on = true;
            } else {
                this.on = false;
            }
        } else if (this.orgData.deviceType == '10-2') {
            if (status.onlineState == 'ONLINE') {
                this.devStatus = true;
            } else {
                this.devStatus = false;
            }
            if (status.doorOpen == 'true') {
                this.on = true;
            } else {
                this.on = false;
            }
        } else if (this.orgData.deviceType == '10-3') {
            if (status.onlineState == 'ONLINE') {
                this.devStatus = true;
            } else {
                this.devStatus = false;
            }
        }
    },
    methods: {
        // 匹配不规则json对象
        parse(str) {
            str = str.replace(/=/g, ":'");
            str = str.replace(/[\,][^\{]/g, "',");
            str = str.replace(/[\}]/g, "'}");
            return str;
        },
        // 开关显示
        checkShow: function (d) {
            let status;
            if (!d.status) {
                status = {};
            } else {
                status = JSON.parse(d.status);
            }
            if (d.deviceType == '10-4' || d.deviceType == '10-1') {
                if (status.on == true) {
                    return true;
                } else {
                    return false;
                }
            } else if (d.deviceType == '10-2') {
                if (status.doorOpen == true) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        //开关操作
        clickOn: function (d) {
            //let status = eval('(' + this.parse(d.status) + ')');
            let status;
            if (!d.status) {
                status = {};
            } else {
                status = JSON.parse(d.status);
            }
            if (d.deviceType == '10-4') {
                EquipmentService.updateDevice({
                    deviceId: d.deviceId,
                    action: 1,
                    args: {
                        on: status.on == true ? false : true
                    }
                }).then((res) => {
                    if (res.status == 0) {
                        this.$message.success('操作成功！');
                        this.dialogVisible = false;
                        this.$emit('func', 'ok');
                    }
                });
            } else if (d.deviceType == '10-1') {
                EquipmentService.updateDevice({
                    deviceId: d.deviceId,
                    action: 1,
                    args: {
                        on: status.on == true ? false : true
                    }
                }).then((res) => {
                    if (res.status == 0) {
                        this.$message.success('操作成功！');
                        this.dialogVisible = false;
                        this.$emit('func', 'ok');
                    }
                });
            } else if (d.deviceType == '10-2') {
                this.lockShow = true;
                this.device = d;
            }
        },
         // 开空调
        openKT:function(d){
            EquipmentService.updateDevice({
                deviceId: d,
                    action: 1,
                    args: {
                        buttonId:1
                    }
            }).then((res)=>{
                if (res.status == 0) {
                    this.$message.success('操作成功！');
                }
            })
        },
         // 关空调
        closeKT:function(d){
            EquipmentService.updateDevice({
                deviceId: d,
                    action: 1,
                    args: {
                        buttonId:2
                    }
            }).then((res)=>{
                if (res.status == 0) {
                    this.$message.success('操作成功！');
                }
            })
        },
        // 保存
        save() {},
        handleClose: function () {
            console.log('进来了');
            this.dialogVisible = false;
            this.$emit('func', 'close');
        }
    }
};
</script>
<style scoped>
.btnss {
    display: flex;
    justify-content: center;
}
.btnss p {
    width: 100px;
    line-height: 32px;
    background: #00b292;
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
.modelK {
    height: 40px;
    border-bottom: 1px solid #e2e2e2;
    color: #08588e;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
}
.modelTit {
    border-bottom: 2px solid #08588e;
}
.htp {
    margin-top: 15px;
}
.onc {
    cursor: pointer;
}
.ktbtn{
    float: left;
    width: 80px;
    line-height: 28px;
    border-radius: 30px;
    background: #427fda;
    text-align: center;
    color: #fff;
    cursor: pointer;
}
</style>