<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="信息管理" :close-on-click-modal="false">
            <el-container>
                <div>
                    <div class="modelK">
                        <p class="modelTit">{{ type == 1 ? '区域' : '房间' }}信息</p>
                    </div>
                    <div>
                        <el-row class="htp">
                            <el-col :span="11">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right; margin-top: 5px">父区域</el-col>
                                    <el-col :span="12">
                                        <el-input placeholder="请输入内容" v-model="hLevelData.text" :readonly="true"></el-input>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="11">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right; margin-top: 5px">区域名称</el-col>
                                    <el-col :span="12">
                                        <el-input placeholder="请输入内容" v-model="bdName"></el-input>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row class="htp">
                            <el-col :span="11">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right; margin-top: 5px">区域类型</el-col>
                                    <el-col :span="12">
                                        <el-select v-model="areaty" placeholder="请选择">
                                            <el-option
                                                v-for="item in areaTypes"
                                                :key="item.val + 'x'"
                                                :label="item.label"
                                                :value="item.val"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="11" v-if="type == 2">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right; margin-top: 5px">房间类型</el-col>
                                    <el-col :span="12">
                                        <el-select v-model="roomType" placeholder="请选择">
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
                        <el-row class="htp" v-if="type == 2">
                            <!-- <el-col :span="11">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right; margin-top: 5px">模板</el-col>
                                    <el-col :span="12">
                                        <el-select v-model="rtId" placeholder="请选择">
                                            <el-option
                                                v-for="item in temList"
                                                :key="item.roomTemplateId"
                                                :label="item.roomTemplateName"
                                                :value="item.roomTemplateId"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-col> -->
                            <el-col :span="11">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right; margin-top: 5px">面积</el-col>
                                    <el-col :span="12">
                                        <el-input v-model="square" placeholder="请输入面积"></el-input>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- <div class="modelK" v-if="type == 2">
                        <p class="modelTit">收费规则</p>
                        <div class="addBtn" @click="rulesAdd">
                            <img src="../../../../assets/img/add.png" />
                            <span>新增规则</span>
                        </div>
                    </div>
                    <el-row :gutter="26" class="htp" v-for="(r, q) in ruleList" :key="q + 'm'">
                        <template v-if="type == 2">
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
                    <div class="modelK" v-if="type == 2">
                        <p class="modelTit">配套设备</p>
                        <div class="addBtn" @click="addDev">
                            <img src="../../../../assets/img/add.png" />
                            <span>新增设备</span>
                        </div>
                    </div>
                    <div style="padding: 0 8.4%" v-if="type == 2">
                        <el-row :gutter="26" class="htp">
                            <el-col :span="6" style="position: relative; margin-bottom: 15px" v-for="(d, i) in deviceList" :key="i + 'ix'">
                                <el-select v-model="d.code" placeholder="请选择" style="width: 75%">
                                    <el-option
                                        v-for="(item, k) in equipmentList"
                                        :key="i + 'n' + k + 'x'"
                                        :label="item.name"
                                        :value="item.code"
                                    >
                                    </el-option>
                                </el-select>
                                <img src="../../../../assets/img/del.png" class="delImg" @click="delDev(i)" />
                                <span class="bindDev" @click="bindDev(d, i)">绑定</span>
                            </el-col>
                        </el-row>
                    </div>
                   <div class="modelK"  v-if="type == 2">
                        <p class="modelTit">情景设置</p>
                        <div class="addBtn" @click="sceneAdd">
                            <img src="../../../../assets/img/add.png" />
                            <span>新增情景</span>
                        </div>
                    </div>
                    <div v-if="type == 2">
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
                    </div>
                    

                    <div class="modelK" v-if="type == 2">
                        <p class="modelTit">备注信息</p>
                    </div>
                    <el-row :gutter="26" class="htp" v-if="type == 2">
                        <el-col :span="4" style="text-align: right; margin-top: 5px">备注</el-col>
                        <el-col :span="16">
                            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="remark"> </el-input>
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
            <unboundDevices v-if="devShow" :typeCode="devData.code" @funx="closeDev"></unboundDevices>
        </el-dialog>
    </div>
</template>
<script>
import { SystemService } from '../../../../api/system';
import { RoomService } from '../../../../api/room';
import unboundDevices from './unboundDevices';
export default {
    name: 'areaDetails',
    props: ['func', 'type', 'parentData'],
    components: {
        unboundDevices
    },
    data() {
        return {
            dialogVisible: true,
            input: '',
            remark: '',//备注
            areaty: '', //区域类型
            areaTypes: [],
            hLevelData: this.parentData,
            bdName: '', // 区域名称
            bdTree: [], // 楼层树
            roomTypeList: [], // 房间类型
            roomType: '', // 房类型
            square: '', // 面积
            temList: [], // 模板列表
            rtId: '', // 模板id
            rentalTypeList: [], // 租住类型
            ruleList: [], //
            equipmentList: [], // 设备列表
            deviceList: [], // 配套设备
            sceneList: [], // 情景
            options: [
                { label: '开', value: '1' },
                { label: '关', value: '2' }
            ],
            value: '',
            devShow: false, // 绑定设备列表界面显示
            devData: {}, // 绑定设备类型
            devI: 0 // 绑定的设备位置
        };
    },
    mounted() {
        if (this.type == 1) {
            this.areaTypes = [
                { label: '楼栋', val: '1' },
                { label: '单元', val: '2' },
                { label: '楼层', val: '3' }
            ];
        } else {
            this.deviceList.push({});
            this.sceneList.push({ deviceList: [{}] });
            this.areaTypes = [{ label: '房间', val: '4' }];
            this.areaty = '4';
            SystemService.getSysCodePid('20').then((res) => {
                this.roomTypeList = res;
            });
            // RoomService.getRoomTemplate({ areaId: 'a01' }).then((res) => {
            //     this.temList = res.dataList;
            // });
            this.rentalTypeList = [
                { label: '按时出租', value: '1' },
                { label: '按天出租', value: '2' },
                { label: '按月出租', value: '3' },
                { label: '按季度出租', value: '4' },
                { label: '按年出租', value: '5' }
            ];
            this.ruleList.push({});
            // 设备大类
            SystemService.getSysCodePid('10').then((res) => {
                this.equipmentList = res;
            });
            this.devList.push({});
            this.sceneList.push({ actives: [{}] });
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
        // 设备绑定
        bindDev: function (dt, i) {
            if (!dt.code) {
                this.$message.warning('请选择设备类型');
                return;
            }
            this.devData = dt;
            this.devI = i;
            this.devShow = true;
        },
        // 关闭设备列表界面
        closeDev: function (data) {
            this.devShow = false;
            this.devList[this.devI].bdData = data;
        },
        // 保存
        save: function () {
            if (this.type == 1) {
                let data = {
                    buildingName: this.bdName,
                    type: this.areaty,
                    type1Id: '',
                    type2Id: ''
                };
                if (this.areaty == 2) {
                    data.type1Id = this.hLevelData.value.buildingId;
                } else if (this.areaty == 3) {
                    data.type1Id = this.hLevelData.value.type1Id;
                    data.type2Id = this.hLevelData.value.buildingId;
                }
                SystemService.addBulidingTree(data).then((res) => {
                    if (res.buildingId) {
                        this.$message.success('新增成功！');
                        this.$emit('func', 'addTree');
                    }
                });
            }else{
                console.log(this.hLevelData);
                let room={
                    roomName:this.bdName,
                    roomType:this.roomType,
                    areaId:'a01',
                    square:this.square,
                    remark:this.remark
                };
                if(this.hLevelData.value.type == '1'){
                    room.buildingType1Id = this.hLevelData.id;
                }else if(this.hLevelData.value.type == '2'){
                    room.buildingType1Id = this.hLevelData.value.type1Id;
                    room.buildingType2Id = this.hLevelData.id;
                }else if(this.hLevelData.value.type == '3'){
                    room.buildingType1Id = this.hLevelData.value.type1Id;
                    room.buildingType2Id = this.hLevelData.value.type2Id;
                    room.buildingType3Id = this.hLevelData.id;
                }
                let deviceList,sceneList;
                if(JSON.stringify(this.deviceList[0]) != '{}'){
                    deviceList = this.deviceList;
                }
                if(JSON.stringify(this.sceneList[0].deviceList[0])!='{}'){
                    sceneList = this.sceneList;
                }
               
                RoomService.editRoom({'room':room,'deviceList':deviceList,'sceneList':sceneList}).then((res)=>{
                    if(res.roomId){
                        this.$message.success('新增成功！');
                        this.$emit('func', 'ok');
                    }
                })
            }
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