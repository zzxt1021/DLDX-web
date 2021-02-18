<template>
    <div>
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
                    <el-button type="primary" icon="el-icon-refresh" @click="resetting">重置</el-button>
                    <el-button type="primary" icon="el-icon-user" @click="reserve">预定</el-button>
                </div>
            </div>
        </div>
        <div>
            <div style="margin-top: 15px" v-for="(v, k, i) in roomList" :key="i">
                <p>{{ k }}</p>
                <el-row :gutter="15">
                    <el-col :span="4" style="margin-top: 10px" v-for="(a, b) in v" :key="b">
                        <el-card shadow="hover" class="roomDiv">
                            <div class="roomTop">
                                <p>{{ a.roomName }}房间</p>
                                <img src="../../../../assets/img/empty.png" v-if="a.useState == 1" />
                                <img src="../../../../assets/img/filled.png" v-if="a.useState == 2" />
                            </div>
                            <div class="roomBot" v-if="a.consumers">
                                <div class="chuang" v-if="a.consumers[0]">
                                    <p>
                                        <span>1号床位</span>
                                        <img src="../../../../assets/img/nan.png"/>
                                    </p>
                                    <div class="yajin">
                                        <p>
                                            <span style="padding-right:4px">{{a.consumers[0].consumerName}}</span>
                                            <span class="yjIcon">押</span>
                                        </p>
                                    </div>
                                    <div class="roomBtn">
                                        <p class="tf">退房</p>
                                    </div>
                                </div>
                                <div class="xian"></div>
                                <div class="chuang" v-if="a.consumers[1]">
                                    <p>
                                        <span>2号床位</span>
                                        <img src="../../../../assets/img/nv.png"/>
                                    </p>
                                    <div class="yajin">
                                        <span style="padding-right:4px">{{a.consumers[1].consumerName}}</span>
                                        <span class="yjIcon">押</span>
                                    </div>
                                    <div class="roomBtn">
                                        <p class="tf">退房</p>
                                    </div>
                                </div>
                                <div class="chuang" v-if="!a.consumers[1]">
                                    <p>
                                        <span>2号床位</span>
                                        <img src="../../../../assets/img/nv.png"/>
                                    </p>
                                    <div class="yajin">
                                    </div>
                                    <div class="roomBtn">
                                        <p class="ruzhu" >入住</p>
                                    </div>
                                </div>
                            </div> 
                            <div class="roomBot" v-if="!a.consumers">
                                <div class="chuang">
                                    <p>
                                        <span>1号床位</span>
                                        <img src="../../../../assets/img/nan.png"/>
                                    </p>
                                    <div class="yajin">
                                    </div>
                                    <div class="roomBtn">
                                        <p class="ruzhu" >入住</p>
                                    </div>
                                </div>
                                <div class="xian"></div>
                                <div class="chuang" >
                                    <p>
                                        <span>2号床位</span>
                                        <img src="../../../../assets/img/nv.png"/>
                                    </p>
                                    <div class="yajin">
                                    </div>
                                    <div class="roomBtn">
                                        <p class="ruzhu">入住</p>
                                    </div>
                                </div>
                            </div> 
                            <!-- <div class="roomBG">
                                <div class="roomBG-L">
                                    <img src="../../../../assets/img/chuang1.png" v-if="a.roomType == '20-01'" />
                                    <img src="../../../../assets/img/chuang2.png" v-if="a.roomType == '20-02'" />
                                    <img src="../../../../assets/img/chuang3.png" v-if="a.roomType == '20-03'" />
                                    <p v-if="a.roomType == '20-01'">标准间</p>
                                    <p v-if="a.roomType == '20-02'">大床房</p>
                                </div>
                                <div class="roomBG-R">
                                    <img src="../../../../assets/img/empty.png" v-if="a.useState == 1" />
                                    <img src="../../../../assets/img/filled.png" v-if="a.useState == 2" />
                                    <p class="jz">
                                        <span>{{ a.roomName }}</span>
                                        <img src="../../../../assets/img/kahao2.png" v-if="a.useState == 2" @click="meakCard(a)" />
                                        <img src="../../../../assets/img/addConsumer.png" v-if="a.useState == 2 && (a.consumers && a.consumers.length == 1)" @click="addConsumer(a)" />
                                    </p>
                                </div>
                            </div>
                            <div class="roomBtns">
                                <p class="rbtns" @click="moveInto(a, 1)" v-if="a.useState == 1">入住</p>
                                <p class="rbtns tf" v-if="a.useState == 2" @click="backRoom(a)" >退房</p>
                                <p class="rbtns" v-if="a.useState == 2" @click="continueRoom(a)">续住</p>
                                <p class="rbtns xz" @click="moveInto(a, 2)">
                                    预定
                                </p>
                            </div> -->
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
        ></readCard>
        <addConsumer v-if="addConShow" @funa="addConsumerClose" :roomData="roomData"></addConsumer>
    </div>
</template>
<script>
import roomDetails from './roomDetails.vue';
import { SystemService } from '../../../../api/system';
import { RoomService } from '../../../../api/room';
import { EquipmentService } from '../../../../api/equipment';
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
            addConShow:false,//添加入住人显示
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
        // 重置按钮
        resetting(){
            this.buildTypeId =  ['0', '0_0'];
            this.filterData={ areaId: 'a01',roomName: '', roomType: '', useState: '' };
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
            });
        },
        unbindCardDev(cid,did){
            EquipmentService.unbindCardDev({'cardId':cid,'deviceId':did}).then(()=>{})
        },
        // 退房
        backRoom(d) {
            this.roomData = d;
            this.$confirm('是否确定退房?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                RoomService.checkOutRoom(d.roomId).then((res) => {
                    if (res.m.length >= 0) {
                        this.$message.success('退房成功！');
                        this.roomData.useState = 1;
                        this.roomData.consumers = null;
                    }
                    if(res.m && res.m.length>0){
                        let cardDevList = res.m;
                        let uid = [];
                        for (let k = 0; k < cardDevList.length; k++) {
                            // 门卡管理注销
                            this.unbindCardDev(cardDevList[k].cardId,cardDevList[k].deviceId);
                            uid.push(Number(cardDevList[k].lockUser));
                        }
                        //控客注销
                        let dtt = {
                            action: '8',
                            args: {
                                userId: uid
                            },
                            deviceId: cardDevList[0].deviceId
                        };
                        EquipmentService.updateDevice(dtt).then((res) => {});
                    }
                    //this.find();
                });
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
        addConsumer:function(da){
            this.roomData = da;
            this.addConShow = true;
        },
        // 关闭入住人
        addConsumerClose:function(da){
            if(da == 'ok'){
                this.roomData.consumers.push({});
            }
            this.addConShow = false;
        },
        // 关闭详情页
        closePage: function (data) {
            console.log(data);
            if (data[0] == 'ok') {
                if(data[1] == 1){
                    this.roomData.useState = 2;
                    this.roomData.consumers = data[2];
                }
                
                //this.find();
            } else if (data[0] == 'close') {
            } else {
                if(data[1] == 1){
                    this.roomData.useState = 2;
                    this.roomData.consumers = data[2];
                }
                
                //this.find();
                this.meakCard(this.roomData);
            }
            this.roomShow = false;
        },
        // 制作房卡
        meakCard: function (da) {
            this.roomData = da;
            RoomService.checkContractByRomm(da.roomId).then((res) => {
                this.cardtimes[0] = res.contract.reserveStartDate.substring(0, 10);
                this.cardtimes[1] = res.contract.reserveEndDate.substring(0, 10);
                this.cardShow = true;
            });
        },
        markCardn: function () {
            this.cardShow = false;
        }
    }
};
</script>
<style>
.roomDiv .el-card__body {
    padding: 0;
}
</style>
<style scoped>
.roomDiv {
    border: 1px solid #ddd;
   padding:10px;
}
.roomTop{
    height:44px;
    background-image: url(../../../../assets/img/fan.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 20px;
    color:#fff;
}
.roomBot{
    display: flex;
    justify-content: space-around;
    color: #333;
}
.xian{
    width: 1px;
    height: 100px;
    background: #ddd;
}
.chuang{
    flex:1;
}
.chuang>p{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}
.chuang>p>img{
    margin-left: 5px;
}
.yajin{
    height: 40px;
    line-height:40px;
    text-align: center;
}
.roomBtn{
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
}
.roomBtn>p{
    color: #538add;
    border:1px solid #538add;
    border-radius: 4px;
    padding:2px 8px;
    font-size: 14px;
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
.roomBtn>.tf {
    color: #fe6931;
    border-color: #fe6931;
    cursor: pointer;
}
.tf:hover {
    background: #fe6931;
    color: #fff;
}
.yjIcon{
    color: #fe6931;
    border-radius: 50%;
    border:1px solid #fe6931;
    padding:2px;
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
</style>