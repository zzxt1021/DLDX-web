<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="模板管理" :close-on-click-modal="false">
            <el-container>
                <div>
                    <div class="modelK">
                        <p class="modelTit">模板信息</p>
                    </div>
                    <div>
                        <el-row class="htp">
                            <el-col :span="11">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right; margin-top: 5px">模板名称</el-col>
                                    <el-col :span="12">
                                        <el-input placeholder="请输入名称" v-model="roomTemplate.roomTemplateName" ></el-input>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="11">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right; margin-top: 5px">房间类型</el-col>
                                    <el-col :span="12">
                                         <el-select v-model="roomTemplate.roomType" placeholder="请选择">
                                            <el-option
                                                v-for="item in roomTypeList"
                                                :key="item.code + 'p'"
                                                :label="item.name"
                                                :value="item.code"
                                            >
                                            </el-option>
                                         </el-select>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- <div class="modelK">
                        <p class="modelTit">收费规则</p>
                        <div class="addBtn" @click="rulesAdd">
                            <img src="../../../../assets/img/add.png" />
                            <span>新增规则</span>
                        </div>
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
                                    >
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6"><el-input v-model="r.price" placeholder="请输入价格"></el-input></el-col>
                            <el-col :span="2" style="margin-top: 5px" v-if="r.rentalType == 1">/小时</el-col>
                            <el-col :span="2" style="margin-top: 5px" v-if="r.rentalType == 2">/天</el-col>
                            <el-col :span="2" style="margin-top: 5px" v-if="r.rentalType == 3">/月</el-col>
                            <el-col :span="2" style="margin-top: 5px" v-if="r.rentalType == 4">/季度</el-col>
                            <el-col :span="2" style="margin-top: 5px" v-if="r.rentalType == 5">/年</el-col>
                            <el-col :span="4">
                                <p class="addBtn delBtn" @click="delRules(q)">
                                    <img src="../../../../assets/img/delred.png" />
                                    <span>删除</span>
                                </p>
                            </el-col>
                        </template>
                    </el-row> -->
                    <div class="modelK">
                        <p class="modelTit">点位配置</p>
                        <div class="addBtn" @click="addDev">
                            <img src="../../../../assets/img/add.png" />
                            <span>新增设备</span>
                        </div>
                    </div>
                    <div style="padding: 0 8.4%">
                        <el-row :gutter="10" class="htp">
                            <div v-for="(d,x) in deviceList" :key="x+'oi'">
                                <el-col :span="6">
                                    <el-input placeholder="请输入点位名称" v-model="d.deviceName"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-select placeholder="请选择" style="width: 100%" v-model="d.deviceType">
                                        <el-option
                                            v-for="(item, k) in equipmentList"
                                            :key="x + 'n' + k + 'x'"
                                            :label="item.name"
                                            :value="item.code"
                                        >
                                        </el-option> 
                                    </el-select>
                                </el-col>
                                <el-col :span="2">
                                    <p class="addBtn delBtn" @click="delDev(x)">
                                        <img src="../../../../assets/img/delred.png" />
                                        <span>删除</span>
                                    </p>
                                </el-col>
                            </div>
                        </el-row>
                    </div>
                    <div class="modelK" >
                        <p class="modelTit">情景设置</p>
                        <div class="addBtn" @click="sceneAdd">
                            <img src="../../../../assets/img/add.png" />
                            <span>新增情景</span>
                        </div>
                    </div>
                    <div v-for="(s, c) in sceneList" :key="c + 'v'">
                        <el-row :gutter="26" class="htp">
                            <el-col :span="4" style="text-align: right; margin-top: 5px">情景名称</el-col>
                            <el-col :span="14"><el-input v-model="s.sceneName" placeholder="请输入内容"></el-input></el-col>
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
                                        <el-select v-model="a.deviceId" placeholder="请选择" style="width: 100%">
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
                                        <el-select v-model="a.operation" placeholder="请选择" style="width: 100%">
                                            <el-option
                                                v-for="item in options"
                                                :key="item.value + 'm'"
                                                :label="item.label"
                                                :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="4">
                                        <p class="addBtn delBtn" @click="delActive(c, n)">
                                            <img src="../../../../assets/img/delred.png" />
                                            <span>删除</span>
                                        </p>
                                    </el-col>
                                </el-row>
                                <p class="addBtn">
                                    <img src="../../../../assets/img/add.png" />
                                    <span @click="addActive(c)">添加动作</span>
                                </p>
                            </el-col>
                        </el-row>
                    </div>

                    <div class="modelK" >
                        <p class="modelTit">备注信息</p>
                    </div>
                    <el-row :gutter="26" class="htp" >
                        <el-col :span="4" style="text-align: right; margin-top: 5px">备注</el-col>
                        <el-col :span="16">
                            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="roomTemplate.remark"> </el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-container>
            <div slot="footer" class="dialog-footer" style="height: 40px; border-top: 1px solid #ccc">
                <div class="btnss">
                    <p @click="save">
                        <img src="../../../../assets/img/gou.png" />
                        <span>保存</span>
                    </p>
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
import { SystemService } from '../../../../api/system';
import { RoomService } from '../../../../api/room';
export default {
    name: 'editTemplate',
    props: ['func', 'dataId'],
    data() {
        return {
            dialogVisible: true,
            roomTemplate:{
                roomType:'',
                areaId:'a01'
            },
            roomTypeList: [], // 房间类型
            rentalTypeList: [], // 租住类型
            ruleList: [], //
            deviceList: [], // 配套设备
            equipmentList: [], // 设备列表
            sceneList: [], // 情景
            options: [
                { label: '开', value: 'off' },
                { label: '关', value: 'on' }
            ],
        };
    },
    mounted() {
            SystemService.getSysCodePid('20').then((res) => {
                this.roomTypeList = res;
            });
            this.rentalTypeList = [
                { label: '按时出租', value: '1' },
                { label: '按天出租', value: '2' },
                { label: '按月出租', value: '3' },
                { label: '按季度出租', value: '4' },
                { label: '按年出租', value: '5' }
            ];
             // 设备大类
            SystemService.getSysCodePid('10').then((res) => {
                this.equipmentList = res;
            });
            if(!this.dataId){
                this.ruleList.push({});
                this.deviceList.push({});
                this.sceneList.push({ deviceList: [{}] });
            }else{
                 RoomService.checkRoomTem(this.dataId).then((res)=>{
                     this.deviceList = res.deviceList;
                     this.roomTemplate = res.roomTemplate;
                     this.sceneList = res.sceneList;
            })
            }
            
    },
    methods: {
        // 新增规则
        rulesAdd: function () {
            this.ruleList.push({});
        },
        // 删除规则
        delRules: function (i) {
            this.ruleList.splice(i, 1);
        },
        // 新增设备
        addDev: function () {
            this.deviceList.push({});
        },
        // 删除设备
        delDev: function (i) {
            this.deviceList.splice(i, 1);
        },
        // 新增情景
        sceneAdd: function () {
            this.sceneList.push({ deviceList: [{}] });
        },
        // 新增情景动作
        addActive: function (i) {
            this.sceneList[i].deviceList.push({});
        },
        // 删除情景动作
        delActive: function (i, k) {
            this.sceneList[i].deviceList.splice(k, 1);
        },
        // 删除情景
        delScene: function (i) {
            this.sceneList.splice(i, 1);
        },
        // 保存
        save: function () {
            let deviceList,sceneList;
            if(JSON.stringify(this.deviceList[0]) != '{}'){
                deviceList = this.deviceList;
            }
            if(JSON.stringify(this.sceneList[0].deviceList[0])!='{}'){
                sceneList = this.sceneList;
            }
            RoomService.editRoomTemplate({'roomTemplate':this.roomTemplate,'deviceList':deviceList,'sceneList':sceneList}).then((res)=>{
                if(res.roomTemplateId){
                    this.$message.success('保存成功！');
                    this.$emit('func', 'edit');
                }
            })
        },

        handleClose: function () {
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
.addBtn {
    display: flex;
    align-items: center;
    color: #427fda;
    cursor: pointer;
}
.addBtn span {
    border-bottom: 1px solid #427fda;
    margin-left: 6px;
    line-height: 18px;
}
.htp {
    margin-top: 15px;
}
.delImg {
    position: absolute;
    top: 8px;
    right: 30%;
    cursor: pointer;
}
.delBtn {
    color: #e94c49;
    margin-top: 5px;
}
.delBtn span {
    border-color: #e94c49;
}
.bindDev {
    color: #427fda;
    text-decoration: underline;
    padding-left: 10px;
    cursor: pointer;
}
</style> 