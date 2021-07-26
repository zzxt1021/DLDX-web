<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="房间查看" :close-on-click-modal="false">
            <el-container>
                <div>
                    <div class="modelK">
                        <p class="modelTit">房间信息</p>
                    </div>
                    <div>
                        <el-row class="htp">
                            <el-col :span="11">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">房间位置：</el-col>
                                    <el-col :span="12">
                                        <span>{{ odata.buildingType1Name }}</span>
                                        <span v-if="odata.buildingType2Name">&nbsp;-&nbsp;{{ odata.buildingType2Name }}</span>
                                        <span v-if="odata.buildingType3Name">&nbsp;-&nbsp;{{ odata.buildingType3Name }}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="11">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">房间名称：</el-col>
                                    <el-col :span="12">
                                        <p>{{ odata.roomName }}</p>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row class="htp">
                            <el-col :span="11">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">房间类型：</el-col>
                                    <el-col :span="12">
                                        <p>{{odata.roomTypeName}}</p>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="11">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">面积：</el-col>
                                    <el-col :span="12">
                                        {{ odata.square }}
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row class="htp">
                            <el-col :span="11">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">可入住床数：</el-col>
                                    <el-col :span="12">
                                        <p>{{odata.bedNum}}</p>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- <div class="modelK">
                        <p class="modelTit">收费规则</p>
                    </div>
                    <el-row :gutter="26" class="htp" v-for="(r, q) in ruleList" :key="q + 'm'">
                        <template>
                            <el-col :span="4" style="text-align: right; margin-top: 5px">租住类型</el-col>
                            <el-col :span="6" style="padding-left: 3px">
                                <el-select v-model="r.rentalType" placeholder="请选择" style="width: 100%">
                                    <el-option
                                        v-for="item in rentalTypeList"
                                        :key="item.value + 'c'"
                                        :label="item.label"
                                        :value="item.value"
                                        disabled
                                    >
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6"><el-input v-model="r.price" placeholder="请输入价格" disabled></el-input></el-col>
                            <el-col :span="2" style="margin-top: 5px" v-if="r.rentalType == 1">/小时</el-col>
                            <el-col :span="2" style="margin-top: 5px" v-if="r.rentalType == 2">/天</el-col>
                            <el-col :span="2" style="margin-top: 5px" v-if="r.rentalType == 3">/月</el-col>
                            <el-col :span="2" style="margin-top: 5px" v-if="r.rentalType == 4">/季度</el-col>
                            <el-col :span="2" style="margin-top: 5px" v-if="r.rentalType == 5">/年</el-col>
                        </template>
                    </el-row> -->
                    <div class="modelK">
                        <p class="modelTit">配套设备</p>
                    </div>
                    <div style="padding: 0 8.4%">
                        <el-row :gutter="10" class="htp">
                            <el-col :span="8" v-for="(d, i) in deviceList" :key="i + 'ix'">
                                <el-row :gutter="5" style="margin-bottom: 5px">
                                    <el-col :span="12">{{ d.deviceName }}</el-col>
                                    <el-col :span="6">({{ statusBack(d) }})</el-col>
                                    <el-col :span="6" v-if="d.deviceType != '10-3' && d.deviceType != '10-5'">
                                        <img
                                            src="../../../../assets/img/check.png"
                                            v-if="!checkShow(d)"
                                            class="onc"
                                            @click="clickOn(d, i)"
                                        />
                                        <img
                                            src="../../../../assets/img/checked.png"
                                            v-if="checkShow(d)"
                                            class="onc"
                                            @click="clickOn(d, i)"
                                        />
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="xxian"></div>
                    <div style="margin-top:10px">
                        <el-row v-for="(d, x) in deviceList" :key="x">
                            <div v-if="d.deviceType == '10-5' && d.channel == 1">
                                <el-row>
                                    <el-col :span="4" >空调开关操作</el-col>
                                    <el-col :span="4">
                                        <p class="ktbtn" @click="airConditioning('1',d.deviceId)">开空调</p>
                                    </el-col>
                                    <el-col :span="4">
                                        <p  class="ktbtn" @click="airConditioning('2',d.deviceId)">关空调</p>
                                    </el-col>
                                </el-row>
                               <el-row style="margin-top:15px">
                                   <el-col :span="4" >空调温度操作</el-col>
                                    <el-col :span="3">
                                        <p  class="ktbtn" @click="airConditioning('4',d.deviceId)">20℃</p>
                                    </el-col>
                                    <el-col :span="3">
                                        <p  class="ktbtn" @click="airConditioning('5',d.deviceId)">21℃</p>
                                    </el-col>
                                    <el-col :span="3">
                                        <p  class="ktbtn" @click="airConditioning('6',d.deviceId)">22℃</p>
                                    </el-col>
                                    <el-col :span="3">
                                        <p  class="ktbtn" @click="airConditioning('7',d.deviceId)">23℃</p>
                                    </el-col>
                                    <el-col :span="3">
                                        <p  class="ktbtn" @click="airConditioning('8',d.deviceId)">24℃</p>
                                    </el-col>
                                    <el-col :span="3">
                                        <p  class="ktbtn" @click="airConditioning('9',d.deviceId)">25℃</p>
                                    </el-col>
                               </el-row>
                               <el-row style="margin-top:8px">
                                    <el-col :span="4">
                                        <p >&nbsp;</p>
                                    </el-col>
                                    <el-col :span="3">
                                        <p  class="ktbtn" @click="airConditioning('10',d.deviceId)">26℃</p>
                                    </el-col>
                                    <el-col :span="3">
                                        <p  class="ktbtn" @click="airConditioning('11',d.deviceId)">27℃</p>
                                    </el-col>
                                    <el-col :span="3">
                                        <p  class="ktbtn" @click="airConditioning('12',d.deviceId)">28℃</p>
                                    </el-col>
                                    <el-col :span="3">
                                        <p  class="ktbtn" @click="airConditioning('13',d.deviceId)">29℃</p>
                                    </el-col>
                                    <el-col :span="3">
                                        <p  class="ktbtn" @click="airConditioning('14',d.deviceId)">30℃</p>
                                    </el-col>
                               </el-row>
                               <el-row style="margin-top:15px">
                                    <el-col :span="4" >空调模式切换</el-col>
                                     <el-col :span="4">
                                        <p  class="ktbtn" @click="airConditioning('16',d.deviceId)">制冷</p>
                                    </el-col>
                                     <el-col :span="4">
                                        <p  class="ktbtn" @click="airConditioning('17',d.deviceId)">除湿</p>
                                    </el-col>
                                     <el-col :span="4">
                                        <p  class="ktbtn" @click="airConditioning('18',d.deviceId)">送风</p>
                                    </el-col>
                                     <el-col :span="4">
                                        <p  class="ktbtn" @click="airConditioning('15',d.deviceId)">制热</p>
                                    </el-col>
                               </el-row>
                            </div>
                        </el-row>
                    </div>
                    <div class="modelK" v-if="sceneList.length > 0">
                        <p class="modelTit">情景设置</p>
                    </div>
                    <div v-for="(s, c) in sceneList" :key="c + 'v'">
                        <el-row :gutter="26" class="htp">
                            <el-col :span="4" style="text-align: right; margin-top: 5px">情景名称</el-col>
                            <el-col :span="14"><el-input v-model="s.sceneName" placeholder="请输入内容" disabled></el-input></el-col>
                            <el-col :span="4">
                                <p class="addBtn delBtn" @click="delScene(c)">
                                    <img src="../../../../assets/img/delred.png" />
                                    <span>删除情景</span>
                                </p>
                            </el-col>
                        </el-row>
                        <el-row :gutter="26" class="htp">
                            <el-col :span="4" style="text-align: right; margin-top: 5px">情景动作</el-col>
                            <el-col :span="16">
                                <el-row :gutter="20" v-for="(a, n) in s.deviceList" :key="n + 'b'" style="margin-bottom: 15px">
                                    <el-col :span="10">
                                        <el-select v-model="a.deviceId" placeholder="请选择" style="width: 100%" disabled>
                                            <el-option
                                                v-for="item in equipmentList"
                                                :key="item.code + 'n'"
                                                :label="item.name"
                                                :value="item.code"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-select v-model="a.operation" placeholder="请选择" style="width: 100%" disabled>
                                            <el-option
                                                v-for="item in options"
                                                :key="item.value + 'm'"
                                                :label="item.label"
                                                :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>

                    <div class="modelK">
                        <p class="modelTit">备注信息</p>
                    </div>
                    <el-row :gutter="26" class="htp">
                        <el-col :span="4" style="text-align: right; margin-top: 5px">备注</el-col>
                        <el-col :span="16">
                            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="room.remark" disabled> </el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-container>
            <div slot="footer" class="dialog-footer" style="height: 40px; border-top: 1px solid #ccc">
                <div class="btnss">
                    <p style="background: #427fda" @click="handleClose">
                        <img src="../../../../assets/img/cha.png" />
                        <span>取消</span>
                    </p>
                </div>
            </div>
        </el-dialog>
        <lockPassword v-if="lockShow" @funl="closel"></lockPassword>
    </div>
</template>
<script>
import { RoomService } from '../../../../api/room';
import { SystemService } from '../../../../api/system';
import { EquipmentService } from '../../../../api/equipment';
import lockPassword from './lockPassword';
export default {
    name: 'roomDetail',
    props: ['funr', 'odata'],
    components: {
        lockPassword
    },
    data() {
        return {
            dialogVisible: true,
            room: {},
            deviceList: [],
            sceneList: [],
            lockShow: false,
            device: {},
            intime: ''
        };
    },
    mounted() {
        this.finddev();
        this.intime = setInterval(() => {
            this.finddev();
        }, 20000);
    },
    methods: {
        finddev: function () {
            RoomService.getRoomDevices({roomId:this.odata.roomId}).then((res) => {
                this.deviceList = res;
            });
        },
        // 匹配不规则json对象
        parse(str) {
            //str = str.replace(/=/g, ":'");
            str = str.replace(/[\,][^\{]/g, "',");
            str = str.replace(/[\}]/g, "'}");
            return str;
        },
        // 状态显示
        statusBack: function (d) {
            let status;
            if (!d.status) {
                status = { onlineState: 'ONLINE' };
            } else {
                status = JSON.parse(d.status);
            }
            if (
                d.deviceType == '10-4' ||
                d.deviceType == '10-1' ||
                d.deviceType == '10-3' ||
                d.deviceType == '10-5' ||
                d.deviceType == '10-2' ||
                d.deviceType == '10-6'
            ) {
                if (status.onlineState == 'ONLINE') {
                    return '在线';
                } else {
                    return '离线';
                }
            }
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
                        this.finddev();
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
                        this.finddev();
                    }
                });
            } else if (d.deviceType == '10-2') {
                this.lockShow = true;
                this.device = d;
            }
        },
        handleClose: function () {
            this.dialogVisible = false;
            this.$emit('funr', 'close');
        },
        closel: function (d) {
            if (d != 'close') {
                this.password = d;
                EquipmentService.updateDevice({
                    deviceId: this.device.deviceId,
                    action: 1,
                    args: {
                        password: d,
                        on: true
                    }
                }).then((res) => {
                    if (res.status == 0) {
                        this.$message.success('操作成功！');
                        this.finddev();
                    }
                });
            }
            this.lockShow = false;
        },
        // 空调操作
        airConditioning:function(t,d){
            EquipmentService.updateDevice({
                deviceId: d,
                    action: 1,
                    args: {
                        buttonId:t
                    }
            }).then((res)=>{
                if (res.status == 0) {
                    this.$message.success('操作成功！');
                }
            })
        },
    },
    destroyed() {
        // 销毁监听
        clearInterval(this.intime);
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
.xxian {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #ddd;
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