<template>
    <div >
        <div class="breadcrumbTopTit">
            <p>位置：</p>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>房间</el-breadcrumb-item>
                <el-breadcrumb-item>住房办理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
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
                        <p>房间名称</p>
                        <div>
                            <el-input placeholder="请输入房间名称" v-model="filterData.roomName"></el-input>
                        </div>
                    </div>
                    <div class="filterBox">
                        <p>房间类型</p>
                        <div>
                            <el-select v-model="filterData.roomType" placeholder="请选择">
                                <el-option v-for="item in roomTypeList" :key="item.code" :label="item.name" :value="item.code"> </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="filterBox">
                        <p>房间状态</p>
                        <div>
                            <el-select v-model="filterData.useState" placeholder="请选择">
                                <el-option v-for="item in roomStatusList" :key="item.code" :label="item.name" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <!-- <div class="filterBox">
                        <p>预订时间</p>
                        <div>
                            <el-date-picker
                                v-model="times"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="预定开始日期"
                                end-placeholder="预定结束日期"
                                prefix-icon=""
                            >
                            </el-date-picker>
                        </div>
                    </div> -->
                </div>
                <div class="btns">
                    <el-button type="primary" icon="el-icon-search" @click="find">查询</el-button>
                    <el-button type="primary" icon="el-icon-refresh" @click="resetting">清空查询</el-button>
                    <el-button type="primary" icon="el-icon-user" @click="moveInto({}, 2)">预定</el-button>
                </div>
            </div>
        </div>
        <div class="batch">
            <!-- <el-upload
            ref="drdDiv"
            class="drdDiv"
            action="/room/contract/import"
            :on-success="handleSuccess"
            :multiple="false"
            :limit="1"
            :show-file-list="false"
            accept=".xlsx,.xls">
                <p class="batchBtn">
                    <img src="../../../../assets/img/doing.png"/>
                    <span>入住人导入</span>
                </p>
            </el-upload> -->
            
            <p class="batchBtn" @click="batchDS">
                <img src="../../../../assets/img/doing.png"/>
                <span>批量完成打扫</span>
            </p>
        </div>
        <div>
            <div style="margin-top: 15px" v-for="(v, k, i) in roomList" :key="i">
                <p>{{ k }}</p>
                <el-row :gutter="15">
                    <el-col :span="4" style="margin-top: 10px" v-for="(a, b) in v" :key="b">
                        <el-card shadow="hover" class="roomDiv" >
                            <div class="roomTop" :class="{ fan2: a.bedNum == '1', fan1: a.bedNum == '2' }">
                                <p>{{ a.roomName }}房间</p>
                                <div
                                    class="stateP"
                                    :class="{ s1: a.useState == '0', s2: a.useState == '2', s3: a.useState == '3', s4: a.useState == '9' }"
                                    v-if="a.useState == '0' || a.useState == '2' || a.useState == '3' || a.useState == '9'"
                                    @mouseenter="a.useState == '3' ||a.useState == '9' || a.useState == '0'?two(a):''"
                                    @mouseleave="a.useState == '3'||a.useState == '9' || a.useState == '0'?twoleave(a):''"
                                >
                                    <span v-if="a.useState == '0'">空闲</span>
                                    <span v-if="a.useState == '2'">满员</span>
                                    <span v-if="a.useState == '3'">待打扫</span>
                                    <span v-if="a.useState == '9'">不可用</span>

                                    <img
                                        src="../../../../assets/img/right.png"
                                        v-if="!(a.useState == '2' && a.consumers && a.consumers.length > 0)"
                                    />
                                    <div class="stateFDiv" v-if="a.useState == '3' && wdsShow && roomData.roomId == a.roomId" @mouseenter="dsenter" @mouseleave="dsleave">
                                        <p @click.stop="okds(a,1)">已打扫</p>
                                        <p @click.stop="okds(a,2)">不可用</p>
                                    </div>
                                    <div class="stateFDiv" v-if="a.useState == '9' && wdsShow && roomData.roomId == a.roomId" @mouseenter="dsenter" @mouseleave="dsleave">
                                        <p @click.stop="okds(a,3)">可使用</p>
                                        <p @click.stop="okds(a,4)">待打扫</p>
                                    </div>
                                    <div class="stateFDiv" v-if="a.useState == '0' && wdsShow && roomData.roomId == a.roomId" @mouseenter="dsenter" @mouseleave="dsleave">
                                        <p @click.stop="okds(a,5)">待打扫</p>
                                        <p @click.stop="okds(a,6)">不可用</p>
                                    </div>
                                </div>
                            </div>
                            <div class="roomBot" v-if="a.useState!='9'">
                                <div class="chuang" v-for="(bed,y) in a.beds" :key="y">
                                        <p>
                                            <span>{{bed.name}}号床位</span>
                                            <img src="../../../../assets/img/nan.png" v-if="bed.consumerList && bed.consumerList[0].consumerSex == '男'" />
                                            <img src="../../../../assets/img/nv.png" v-if="bed.consumerList && bed.consumerList[0].consumerSex == '女'" />
                                            <img src="../../../../assets/img/doing.png" style="cursor: pointer;" v-if="bed.state == 2" @click="dsDoing(a,bed)"/>
                                        </p>
                                        <div class="yajin" v-if="bed.consumerList">
                                            <p>
                                                <span style="padding-right: 4px">{{ bed.consumerList[0].consumerName }}</span>
                                                <span class="yjIcon" v-if="bed.deposit">押</span>
                                            </p>
                                        </div>
                                        <div class="roomBtn">
                                            <p class="tf" v-if="bed.state == 1" @click="backRoom(a, bed)">退房</p>
                                        </div>
                                </div>
                            </div>
                            <div class="roomBtn">
                                <p v-if="a.useState==0 ||a.useState==1" class="ruzhu" @click="moveInto(a, 1)">办理入住</p>
                            </div>
                            <div v-if="a.useState == '9'" style="height:94px;overflow-y:auto">
                                <p style="color:#333;font-size:14px;text-align:center;margin-top:15px;">{{a.remark}}</p>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
        <roomDetails @func="closePage(arguments)" v-if="roomShow" :roomData="roomData" :rtype="rtype"></roomDetails>
        <contPage @funx="closeCot" v-if="continuePage" :roomData="roomData"></contPage>
        <readCard
            v-if="cardShow"
            @funs="markCardn"
            :stime="cardtimes[0]"
            :etime="cardtimes[1]"
            :rid="roomData.roomId"
            :rname="roomData.roomName"
            :contractId="ccontractId"
        ></readCard>
        <addConsumer v-if="addConShow" @funa="addConsumerClose" :roomData="roomData"></addConsumer>
    </div>
</template>
<script>
import roomDetails from './roomDetails.vue';
import { SystemService } from '../../../../api/system';
import { RoomService } from '../../../../api/room';
import contPage from './continuePage.vue';
import readCard from './readCard.vue';
import addConsumer from './addConsumer.vue';
export default {
    name: 'checkIn',
    components: {
        roomDetails,
        contPage,
        readCard,
        addConsumer
    },
    data() {
        return {
            buildTypeId: ['0', '0_0'],
            filterData: {
                areaId: 'a01',
                roomName: '', // 筛选：房间名称
                roomType: '', // 筛选：房间类型
                useState: '' // 筛选：房间状态
            },
            times: [], // 预定时间
            roomShow: false,
            bdTree: [],
            roomTypeList: [],
            roomStatusList: [],
            roomList: {},
            roomData: {},
            rtype: '', //入住还是预定
            continuePage: false,
            cardShow: false,
            cardtimes: [], //卡的时间
            addConShow: false, //添加入住人显示
            ccontractId: '', //入住成功传过来的订单id
            wdsShow:false, // 未打扫状态界面
            enterDS:false,//是否进入二级页面
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
        // 获取房间状态
        SystemService.getSysCodePid('21').then((res) => {
            this.roomStatusList = res;
        });
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
        // 清空查询按钮
        resetting() {
            this.buildTypeId = ['0', '0_0'];
            this.filterData = { areaId: 'a01', roomName: '', roomType: '', useState: '' };
            this.times = [];
            this.find();
        },
        // 查询
        find: function () {
            this.roomList = [];
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
            if (startDate && endData) {
                datas = { room: this.filterData, startDate: startDate, endDate: endData };
            } else {
                datas = { room: this.filterData };
            }
            RoomService.getRoomWithFloor(datas).then((res) => {
                this.roomList = res;
                for(let key in this.roomList){
                    for(let x=0;x<this.roomList[key].length;x++){
                        if((!this.roomList[key][x].beds || this.roomList[key][x].beds.length == 0) && this.roomList[key][x].bedNum!=0){
                            this.roomList[key][x].beds = [];
                            for(let y=0;y<this.roomList[key][x].bedNum;y++){
                                this.roomList[key][x].beds.push({'deposit': 0,'name': y+1,'state': "0"});
                            }
                        }
                    }
                }
            });
        },
        // 判断办理入住按钮是否显示
        doBeds(bedData){
            if(!bedData){
                return true;
            }else{
                let num =0;
                for(let x=0;x<bedData.length;x++){
                    if(bedData[x].state==0){
                        num++;
                    }
                }
                if(num != 0){
                    return true
                }else{
                    return false
                }
            }
        },
        // 退房(退押金)
        backRoom(d, bed) {
            this.roomData = d;
            this.$prompt('请输入退还押金金额,并退房！', '提示', {
                confirmButtonText: '退房退押金',
                cancelButtonText: '只退房',
                inputPattern: /^[0-9]*$/,
                inputErrorMessage: '请输入正确的数字',
                inputValue:bed.deposit,
                }).then(({ value }) => {
                    if(bed.deposit<Number(value)){
                        this.$message.warning('输入的金额大于押金!');
                    }else{
                        this.backRoomT(d,bed,1,value);
                        
                    }
                }).catch(() => {
                    this.backRoomT(d,bed,2);
            });
            
        },
        // 退房
       async backRoomT(d,bed,t,v){
            let contractId = bed.contractId;
            let dat;
            if(t == 1){
                dat={'contractId':contractId,'deposit':Number(v)};
            }else if(t == 2){
                dat={'contractId':contractId};
            }
            RoomService.checkOutRoomBad(dat).then(async(res) => {
                if(res.status == 0){
                    this.$message.success('退房成功！');
                    let roomDa = (await RoomService.getListRoom(d.roomId))[0];
                    this.roomData.useState =roomDa.useState;
                    this.roomData.beds = roomDa.beds;
                }
            });
        },
        // 房间详情页打开
        moveInto: function (d, t) {
            this.roomData = d;
            this.rtype = t;
            this.roomShow = true;
        },
        // 打开续房
        continueRoom: function (d) {
            this.roomData = d;
            this.continuePage = true;
        },
        //关闭续房
        closeCot: function () {
            this.continuePage = false;
        },
        // 添加入住人
        addConsumer: function (da) {
            this.roomData = da;
            this.addConShow = true;
        },
        // 关闭入住人
        addConsumerClose: function (da) {
            if (da == 'ok') {
                this.roomData.consumers.push({});
            }
            this.addConShow = false;
        },
        // 关闭详情页
        closePage: function (data) {
            if (data[0] == 'ok') {
                if (data[1] == 1) {
                    this.ccontractId = data[3];
                    this.roomData.beds = data[2].beds;
                    this.roomData.useState = data[2].useState;
                    this.$forceUpdate();
                }
            } else if (data[0] == 'close') {
            } else {
                if (data[1] == 1) {
                    this.ccontractId = data[3];
                    this.roomData.beds = data[2].beds;
                    this.roomData.useState = data[2].useState;
                    this.$forceUpdate();
                }
                this.meakCard(this.roomData, data[3]);
            }
            this.roomShow = false;
        },
        // 制作房卡
        meakCard: function (da, contractId) {
            this.roomData = da;
            RoomService.checkContractByRomm(da.roomId).then((res) => {
                for (let k = 0; k < res.length; k++) {
                    if (res[k].contract.contractId == contractId) {
                        this.cardtimes[0] = res[k].contract.reserveStartDate;
                        this.cardtimes[1] = res[k].contract.reserveEndDate;
                    }
                }
                this.cardShow = true;
            });
        },
        markCardn: function () {
            this.cardShow = false;
        },
        // 房间状态切换有2级
        two(d){
            this.roomData = d;
            this.wdsShow = true;
        },
        twoleave(d){
            this.roomDate = d;
            let that = this;
            setTimeout(()=>{
                if(!this.enterDS){
                    that.wdsShow = false;
                }
            },500)
        },
        // 
        dsenter(){
            this.enterDS=true;
            this.wdsShow = true
        },
        dsleave(){
            this.enterDS=false;
            this.wdsShow = false;
        },
        //已打扫,维修中
        okds(a,x){
            this.roomData = a;
            this.wdsShow = false;
            this.enterDS=false;
            if(x == 1){
                this.$confirm('确定已打扫完毕?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let data = {
                        roomIds: a.roomId,
                        state: 0
                    };
                    RoomService.updateRoom(data).then(async(res) => {
                        if (res.status == 0) {
                            this.$message.success('打扫完成！');
                            let roomDa = (await RoomService.getListRoom(a.roomId))[0];
                            this.roomData.useState =roomDa.useState;
                            this.roomData.beds = roomDa.beds;
                        }
                    });
                });
            }else if(x == 2){
                this.$prompt('确定房间不可用?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPlaceholder: '请填写备注',
                }).then(({ value }) => {
                    let data = {
                        roomIds: a.roomId,
                        state: 9,
                        remark: value
                    };
                    RoomService.updateRoom(data).then(async(res)=>{
                        if (res.status == 0) {
                            this.$message.success('该房间不可用！');
                            let roomDa = (await RoomService.getListRoom(a.roomId))[0];
                            this.roomData.useState =roomDa.useState;
                            this.roomData.beds = roomDa.beds;
                            this.roomData.remark = value;
                        }
                    })
                }).catch(() => {});
            }else if(x == 3){
                this.$confirm('确定房间可正常使用?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let data = {
                        roomIds: a.roomId,
                        state: 0
                    };
                    RoomService.updateRoom(data).then(async(res) => {
                        if (res.status == 0) {
                            this.$message.success('可正常入住！');
                            let roomDa = (await RoomService.getListRoom(a.roomId))[0];
                            this.roomData.useState =roomDa.useState;
                            this.roomData.beds = roomDa.beds;
                        }
                    });
                });
            }else if(x == 4){
                this.$confirm('确定房间可使用并待打扫?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let data = {
                        roomIds: a.roomId,
                        state: 3
                    };
                    RoomService.updateRoom(data).then(async(res) => {
                        if (res.status == 0) {
                            this.$message.success('待打扫！');
                            let roomDa = (await RoomService.getListRoom(a.roomId))[0];
                            this.roomData.useState =roomDa.useState;
                            this.roomData.beds = roomDa.beds;
                        }
                    });
                });
            }else if(x == 5){
                this.$confirm('确定房间待打扫?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let data = {
                        roomIds: a.roomId,
                        state: 3
                    };
                    RoomService.updateRoom(data).then(async(res) => {
                        if (res.status == 0) {
                            this.$message.success('待打扫！');
                            let roomDa = (await RoomService.getListRoom(a.roomId))[0];
                            this.roomData.useState =roomDa.useState;
                            this.roomData.beds = roomDa.beds;
                        }
                    });
                });
            }else if(x == 6){
                this.$prompt('确定房间不可用?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPlaceholder: '请填写备注',
                }).then(({ value }) => {
                    let data = {
                        roomIds: a.roomId,
                        state: 9,
                        remark: value
                    };
                    RoomService.updateRoom(data).then(async(res)=>{
                        if (res.status == 0) {
                            this.$message.success('该房间不可用！');
                            let roomDa = (await RoomService.getListRoom(a.roomId))[0];
                            this.roomData.useState =roomDa.useState;
                            this.roomData.beds = roomDa.beds;
                            this.roomData.remark = roomDa.remark;
                        }
                    })
                }).catch(() => {});
            }
            
        },
        // 批量完成打扫
        batchDS(){
            this.$confirm('确定已完成所有房间的清扫？','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let rids = [];
                for(let key in this.roomList){
                    this.roomList[key].forEach((da)=>{
                        if(da.useState == "3"){
                            rids.push(da.roomId);
                        }
                    })
                }
                RoomService.editRoomStatus({"roomIds":rids.join(),"state":"0"}).then((res)=>{
                    if(res.status == 0){
                        this.$message.success('操作完成！');
                        this.find();
                    }
                })
            })
        },
        // 床完成打扫
        dsDoing(r,b){
            this.roomData = r;
            this.$confirm('确定该床位已清扫完成？','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                RoomService.cleanDed({"roomId":r.roomId,"bedName":b.name}).then(async(res)=>{
                    if(res.status == 0){
                        this.$message.success('操作完成！');
                        let roomDa = (await RoomService.getListRoom(r.roomId))[0];
                        this.roomData.useState =roomDa.useState;
                        this.roomData.beds = roomDa.beds;
                    }
                })
            })
        },
        //文件导入入住人
        handleSuccess(rd){
            console.log(rd);
            // if(rd.msg == '操作成功'){
            //     this.$message.success('导入成功！');
            //     this.getList();
            // }
        },
    }
};
</script>
<style>
.roomDiv .el-card__body {
    padding: 0;
}
.drdDiv .el-upload--text{
    width: auto;
    height: auto;
    border:none;
    background: transparent;
}
</style>
<style scoped>
.roomDiv {
    border: 1px solid #ddd;
    padding: 10px;
}
.roomTop {
    height: 44px;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: #fff;
}
.fan1 {
    background-image: url(../../../../assets/img/fan1.png);
}
.fan2 {
    background-image: url(../../../../assets/img/fan2.png);
}
.stateP {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 14px;
    padding: 2px 8px;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
}
.stateFDiv{
    position: absolute;
    background: #fff;
    z-index: 2222;
    width: 62px;
    top: 26px;
    right: 0;
    border-radius: 4px;
    box-shadow: 0px 2px 10px 0px #C8D5E7;
}
.stateFDiv>p{
    line-height: 36px;
    color: #333;
    border-bottom: 1px solid #ccc;
    text-align: center;
}
.stateFDiv>p:last-child{
    border:none;
}
.stateP > img {
    padding-left: 5px;
}
.s1 {
    background: #21bb6d;
}
.s2 {
    background: #ff8b41;
}
.s3 {
    background: #a0a0a0;
}
.s4 {
    background: #f05555;
}
.roomBot {
    display: flex;
    justify-content: space-around;
    color: #333;
    height: 94px;
}
.xian {
    width: 1px;
    height: 96px;
    background: #ddd;
}
.chuang {
    flex: 1;
}
.chuang > p {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
}
.chuang > p > img {
    margin-left: 5px;
}
.yajin {
    height: 40px;
    line-height: 40px;
    text-align: center;
}
.roomBtn {
    display: flex;
    justify-content: center;
    height: 25px;
    margin-top: 5px;
}
.roomBtn > p {
    color: #538add;
    border: 1px solid #538add;
    border-radius: 4px;
    padding: 2px 8px;
    font-size: 14px;
    cursor: pointer;
}
.ruzhu:hover {
    background: #538add;
    color: #fff;
}
.yuding {
    color: #15a15a;
    border-color: #19bc69;
}
.yuding:hover {
    background: #19bc69;
    color: #fff;
}
.roomBtn > .tf {
    color: #fe6931;
    border-color: #fe6931;
    cursor: pointer;
}
.tf:hover {
    background: #fe6931;
    color: #fff;
}
.yjIcon {
    color: #fe6931;
    border-radius: 50%;
    border: 1px solid #fe6931;
    padding: 2px;
    font-size: 14px;
    cursor: pointer;
}
.roomBG {
    display: flex;
    width: 100%;
    height: 90px;
    background-image: url(../../../../assets/img/fang1.png);
    background-size: 100% 100%;
    justify-content: space-between;
}
.roomBG-L,
.roomBG-R {
    padding: 5px 20%;
    padding-right: 0;
    color: #fff;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.roomBG-L p {
    margin-top: 6px;
}
.roomBG-R {
    font-size: 16px;
    padding-left: 0;
    padding-right: 20%;
}
.roomBG-R img {
    margin-top: 8px;
    margin-bottom: 16px;
}
.jz {
    display: flex;
    justify-content: center;
    align-items: center;
}
.jz > img {
    margin: 0;
    margin-left: 10px;
    cursor: pointer;
}
.roomBtns {
    display: flex;
    height: 40px;
    justify-content: space-around;
}
.roomBtns .rbtns {
    color: #1d59bc;
    border: 1px solid #538add;
    line-height: 28px;
    border-radius: 4px;
    height: 28px;
    padding: 0 5%;
    /* margin-left: 18%; */
    font-size: 14px;
    margin-top: 10px;
    cursor: pointer;
}
.rbtns:hover {
    background: #538add;
    color: #fff;
}
.roomBtns .xz {
    color: #15a15a;
    border-color: #19bc69;
}
.xz:hover {
    background: #19bc69;
    color: #fff;
}
.roomBtns .tf {
    color: #fe6931;
    border-color: #fe6931;
}
.tf:hover {
    background: #fe6931;
    color: #fff;
}
.wdsDiv {
    height: 30px;
    display: flex;
    justify-content: flex-end;
}
.wdsDiv > p {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 10px;
    margin-top: 5px;
    cursor: pointer;
    font-size: 14px;
}
.batch{
    display: flex;
}
.batchBtn{
    display: flex;
    align-items: center;
    margin-top: 10px;
    cursor: pointer;
    margin-right:15px;
}
.batchBtn>span{
    color:#1d59bc;
    font-size: 14px;
    border-bottom:1px solid #1d59bc;
}
</style>