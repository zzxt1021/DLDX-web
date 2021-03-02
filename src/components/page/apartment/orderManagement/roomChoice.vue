<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="房间选择" :close-on-click-modal="false">
            <el-container>
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: baseline">
                        <div class="filterDiv">
                            <div class="filterBox">
                                <p>所在位置</p>
                                <div>
                                    <el-cascader
                                        v-model="buildTypeId"
                                        :options="bdTree"
                                        :props="{ checkStrictly: true, children: 'nodes', value: 'id', label: 'text' }"
                                        clearable
                                    ></el-cascader>
                                </div>
                            </div>
                            <div class="filterBox">
                                <p>房间类型</p>
                                <div>
                                    <el-select v-model="filterData.roomType" placeholder="请选择">
                                        <el-option v-for="item in roomTypeList" :key="item.code" :label="item.name" :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="filterBox" v-if="!hasCheck">
                                <p>预订时间</p>
                                <div>
                                    <el-date-picker
                                        v-model="times"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="预定开始日期"
                                        end-placeholder="预定结束日期"
                                        prefix-icon=""
                                        disabled
                                    >
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="bh" v-if="hasCheck" @click="clickAll">
                                <img src="../../../../assets/img/checkk.png" v-if="!bhShow"/>
                                <img src="../../../../assets/img/checkked.png" v-if="bhShow"/>
                                <p>只查工作间</p>
                            </div>
                        </div>
                        <div class="btns" >
                            <el-button type="primary" icon="el-icon-search" @click="find">查询</el-button>
                        </div>
                    </div>
                </div>
                <div class="qchoice" v-if="hasCheck">
                    <div @click="bhShow?allChoicebh():allChoice()">
                        <img src="../../../../assets/img/radio.png" v-if="!allS"/>
                        <img src="../../../../assets/img/radioed.png" v-if="allS"/>
                        <span>全选</span>
                    </div>
                </div>
                <div class="oy" v-if="!bhShow">
                   <div style="margin-top: 15px" v-for="(v, k, i) in roomList" :key="i">
                        <p>{{ k }}</p>
                        <el-row :gutter="12">
                            <el-col :span="4" style="margin-top: 10px" v-for="(a, b) in v" :key="b">
                                <el-card shadow="hover" class="roomDiv"  :class="{'roomAct':!hasCheck && a.roomId == croom.roomId}">
                                    <div @click="choice(a)" class="roomDS">
                                        <div class="xk" v-if="hasCheck">
                                            <img src="../../../../assets/img/checkk.png" v-if="roomIds.indexOf(a.roomId)<0"/>
                                            <img src="../../../../assets/img/checkked.png" v-if="roomIds.indexOf(a.roomId)>-1"/>
                                        </div>
                                        <div>
                                            <p class="rn">{{a.roomName}}</p>
                                            <p class="rt" v-if="a.roomType == '20-01'">标准间</p>
                                            <p class="rt" v-if="a.roomType == '20-02'">大床房</p>
                                            <p class="rt" v-if="a.roomType == '20'">工作间</p>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="oy" v-if="bhShow">
                   <div style="margin-top: 15px" v-for="(v, k, i) in roomList" :key="i">
                        <p>{{ k }}</p>
                        <el-row :gutter="12">
                            <el-col :span="4" style="margin-top: 10px" v-for="(a, b) in v" :key="b">
                                <el-card shadow="hover" class="roomDiv"  :class="{'roomAct':!hasCheck && a.roomId == croom.roomId}">
                                    <div @click="choicebh(a)" class="roomDS">
                                        <div class="xk" v-if="hasCheck">
                                            <img src="../../../../assets/img/checkk.png" v-if="gzjroomIds.indexOf(a.roomId)<0"/>
                                            <img src="../../../../assets/img/checkked.png" v-if="gzjroomIds.indexOf(a.roomId)>-1"/>
                                        </div>
                                        <div>
                                            <p class="rn">{{a.roomName}}</p>
                                            <p class="rt" v-if="a.roomType == '20-01'">标准间</p>
                                            <p class="rt" v-if="a.roomType == '20-02'">大床房</p>
                                            <p class="rt" v-if="a.roomType == '20'">工作间</p>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <el-footer style="height: 40px; border-top: 1px solid #ccc">
                    <div class="btnss">
                        <p @click="save">
                            <img src="../../../../assets/img/gou.png" />
                            <span>确定</span>
                        </p>
                        <p style="background: #427fda" @click="handleClose">
                            <img src="../../../../assets/img/cha.png" />
                            <span>取消</span>
                        </p>
                    </div>
                </el-footer>
            </el-container>
        </el-dialog>
    </div>
</template>
<style>
.roomDiv .el-card__body {
    padding: 0;
}
</style>
<script>
import { SystemService } from '../../../../api/system';
import {RoomService} from '../../../../api/room';
export default {
    name: 'roomChoicce',
    props: ['func','hasCheck','roomIdss','roomName','reservetime'],
    data() {
        return {
            dialogVisible: true,
            bdTree: [],
            buildTypeId: ['0', '0_0'],
            times: this.reservetime,
            filterData: {
                areaId: 'a01',
                roomName: '', // 筛选：房间名称
                roomType: '', // 筛选：房间类型
                useState: '' // 筛选：房间状态
            },
            roomType: '',
            buildingType1Id: ['0', '0_0'],
            roomTypeList:[],
            roomList:[],
            isDisabled: {
                disabledDate(time) {
                    return time.getTime() <= new Date().getTime() - 8.64e7;
                }
            },
            croom:'',// 被选中的房间
            roomIds:[],//多选选中的房间
            roomNames:[],
            gzjroomIds:[],//工作间的room
            gzjroomNames:[],
            allS:false,// 全选
            bhShow:false,//只查工作间
        };
    },
    mounted() {
        // 获取树形楼/单位/层
        SystemService.getBulidingTree().then((res) => {
            this.bdTree = res;
        });
        // 获取房间类型
        SystemService.getSysCodePid('20').then((res) => {
            this.roomTypeList = res;
        });
        this.roomNames = this.roomName?this.roomName:[];
        this.roomIds = this.roomIdss?this.roomIdss:[];
        this.find();
    },
    methods: {
        // 格式化时间
        dateFormat(fmt, date) {
            let ret;
            const opt = {
                'Y+': date.getFullYear().toString(), // 年
                'm+': (date.getMonth() + 1).toString(), // 月
                'd+': date.getDate().toString(), // 日
                'H+': date.getHours().toString(), // 时
                'M+': date.getMinutes().toString(), // 分
                'S+': date.getSeconds().toString() // 秒
            };
            for (let k in opt) {
                ret = new RegExp('(' + k + ')').exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
                }
            }
            return fmt;
        },
        clickAll:function(){
            console.log('测试');
            if(this.bhShow){
                this.bhShow = false;
            }else{
                this.bhShow = true;
            }
            console.log(this.bhShow )
            this.find();
        },
        find: function () {
            if (this.buildTypeId.length > 0) {
                if (this.buildTypeId.length == 1) {
                    this.filterData.buildingType1Id = this.buildTypeId[0];
                } else if (this.buildTypeId.length == 2) {
                    this.filterData.buildingType1Id = this.buildTypeId[0];
                    this.filterData.buildingType2Id = this.buildTypeId[1];
                } else if (this.buildTypeId.length == 3) {
                    this.filterData.buildingType1Id = this.buildTypeId[0];
                    this.filterData.buildingType2Id = this.buildTypeId[1];
                    this.filterData.buildingType3Id = this.buildTypeId[2];
                }
            }
            let startDate = '',
                endData = '',
                datas = {};
            if (this.times && this.times.length > 0) {
                startDate = this.dateFormat('YYYY-mm-dd', new Date(this.times[0]));
                endData = this.dateFormat('YYYY-mm-dd', new Date(this.times[1]));
            }
            let filterData =JSON.parse(JSON.stringify(this.filterData)) ;
            if(this.bhShow == true){
                filterData.roomType ='20'
            }
            if (startDate && endData) {
                datas = { room: filterData, startDate: startDate, endDate: endData };
            } else {
                datas = { room: filterData };
            }
            RoomService.getRoomWithFloor(datas).then((res) => {
                this.roomList = res;
            });
        },
        allChoice(){
            if(this.allS){
                this.allS = false;
                this.roomIds = [];
                this.roomNames = [];
            }else{
                this.allS = true;
                this.roomIds = [];
                this.roomNames = [];
                for(let key in this.roomList){
                    for(let k=0;k<this.roomList[key].length;k++){
                        this.roomIds.push(this.roomList[key][k].roomId);
                        this.roomNames.push(this.roomList[key][k].roomName);
                    }
                }
            }
        },
        allChoicebh(){
             if(this.allS){
                this.allS = false;
                this.gzjroomIds = [];
                this.gzjroomNames = [];
            }else{
                this.allS = true;
                this.gzjroomIds = [];
                this.gzjroomNames = [];
                for(let key in this.roomList){
                    for(let k=0;k<this.roomList[key].length;k++){
                        this.gzjroomIds.push(this.roomList[key][k].roomId);
                        this.gzjroomNames.push(this.roomList[key][k].roomName);
                    }
                }
            }
        },
        choice(d){
            if(this.hasCheck){
                if(this.roomIds.indexOf(d.roomId)>-1){
                    let x=this.roomIds.indexOf(d.roomId);
                    this.roomNames.splice(x,1);
                    this.roomIds.splice(x,1);
                }else{
                    this.roomIds.push(d.roomId);
                    this.roomNames.push(d.roomName);
                }
            }else{
                 this.croom = d;
            }
        },
        choicebh(d){
            if(this.hasCheck){
                if(this.gzjroomIds.indexOf(d.roomId)>-1){
                    let x=this.gzjroomIds.indexOf(d.roomId);
                    this.gzjroomNames.splice(x,1);
                    this.gzjroomIds.splice(x,1);
                }else{
                    this.gzjroomIds.push(d.roomId);
                    this.gzjroomNames.push(d.roomName);
                }
            }else{
                 this.croom = d;
            }
        },
        save() {
            if(this.hasCheck){
                if(this.roomIds.length==0 && this.gzjroomIds.length == 0){
                    this.$message.warning('请选择合适的房间！');
                    return;
                }else{
                    let roomIdss = this.roomIds.concat(this.gzjroomIds).join(',');
                    let roomNamess = this.roomNames.concat(this.gzjroomNames).join(',');
                    let da = {roomIds:roomIdss,roomName:roomNamess};
                    this.$emit('func', da);
                }
            }else{
                if(!this.croom.roomId){
                    this.$message.warning('请选择合适的房间！');
                    return;
                }else{
                    this.$emit('func', this.croom);
                }
            }
        },
        //取消
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
.roomDiv {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    cursor: pointer;
}
.roomDS{
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.roomDS>.xk{
    margin-right: 10%;
    margin-left: 10%;
}
.rn{
    font-size:20px;
}
.rt{
    font-size: 14px;
    color: #427fda;
}
.oy{
    height:40vh;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 1vh;
    margin-top:1vh;
}
.roomAct{
    background: #427FDA;
    border-color: #427FDA;
}
.roomAct .rt{
    color: #fff;
}
.roomAct .rn{
    color: #fff;
}
.qchoice{
    display: flex;
    margin-top: 15px;
}
.qchoice>div{
    cursor: pointer;
    display: flex;
    align-items: center;
}
.qchoice>div>img{
    width: 15px;
    height:15px;
    margin-right:10px;
}
.bh{
    display: flex;
    align-items: center;
    margin-top: 8px;
    cursor: pointer;
}
.bh>img{    
    margin-right: 5px;
}
</style>