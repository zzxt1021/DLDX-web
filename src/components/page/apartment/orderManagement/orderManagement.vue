<template>
    <div>
        <div class="breadcrumbTopTit">
            <p>位置：</p>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>房间</el-breadcrumb-item>
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <div style="display: flex; justify-content: space-between; align-items: baseline">
                <div class="filterDiv">
                    <div class="filterBox">
                        <p>订单状态</p>
                        <div>
                            <el-select v-model="contract.contractState" placeholder="请选择">
                                <el-option v-for="item in orderStatusList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="filterBox">
                        <p>订单人</p>
                        <div>
                            <el-input placeholder="请输入订单人" v-model="consumer.consumerName"></el-input>
                        </div>
                    </div>
                    <div class="filterBox">
                        <p>订单时间</p>
                        <div>
                            <el-date-picker
                                v-model="times"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="订单开始日期"
                                end-placeholder="订单结束日期"
                                prefix-icon=""
                            >
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="filterBox">
                        <p>房间号</p>
                        <div>
                            <el-input placeholder="请输入房间号" v-model="room.roomName"></el-input>
                        </div>
                    </div>
                    <div class="filterBox">
                        <p>房间类型</p>
                        <div>
                            <el-select v-model="room.roomType" placeholder="请选择">
                                <el-option v-for="item in roomTypeList" :key="item.code" :label="item.name" :value="item.code"> </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="btns">
                    <el-button type="primary" icon="el-icon-search" @click="findAll">查询</el-button>
                    <el-button type="primary" icon="el-icon-refresh" @click="resetting">清空查询</el-button>
                </div>
            </div>
            <div style="margin-top: 15px">
                <template>
                    <el-table :data="tableData" border style="width: 100%" v-loading="loading" :header-cell-style="rowStyle">
                        <el-table-column type="index" width="80" align="center"></el-table-column>
                        <el-table-column label="订单时间" align="center" width="180">
                            <template slot-scope="scope">
                                <span v-if="scope.row.contract.reserveStartDate"
                                    >{{ scope.row.contract.reserveStartDate.substring(0, 10) }} 至
                                    {{ scope.row.contract.reserveEndDate.substring(0, 10) }}</span
                                >
                            </template>
                        </el-table-column>
                        <el-table-column label="订单人" align="center">
                            <template slot-scope="scope">
                                <span v-for="(cn, k) in scope.row.consumerList" :key="cn.consumerNo">
                                    {{ cn.consumerName }}
                                    <span v-if="k != scope.row.consumerList.length - 1">,</span>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单人电话" align="center">
                            <template slot-scope="scope">
                                <span v-for="(cn, k) in scope.row.consumerList" :key="cn.consumerNo">
                                    {{ cn.consumerTel }}
                                    <span v-if="k != scope.row.consumerList.length - 1">,</span>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="roomDto.roomName" label="房间号" align="center"></el-table-column>
                        <el-table-column label="房间位置" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.roomDto.buildingType1Name }}</span>
                                <span v-if="scope.row.roomDto.buildingType2Name"
                                    >&nbsp;-&nbsp;{{ scope.row.roomDto.buildingType2Name }}</span
                                >
                                <span v-if="scope.row.roomDto.buildingType3Name"
                                    >&nbsp;-&nbsp;{{ scope.row.roomDto.buildingType3Name }}</span
                                >
                            </template>
                        </el-table-column>
                        <el-table-column label="房间类型" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.roomDto.roomType == '20-01'">标准间</span>
                                <span v-if="scope.row.roomDto.roomType == '20-02'">大床房</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="入住时间" align="center" prop="contract.checkInTime" width="140"></el-table-column>
                        <el-table-column label="押金" align="center" width="100">
                            <template slot-scope="scope">
                                <div style="display:flex;justify-content:center">
                                    <p>{{ scope.row.consumerList[0].deposit ? scope.row.consumerList[0].deposit : 0 }}</p>
                                    <p class="tuiIcon" v-if="scope.row.consumerList[0].deposit && scope.row.contract.contractState == '4'" @click="backDes(scope.row)">退</p>
                                </div>
                                
                            </template>
                        </el-table-column>
                        <el-table-column label="订单状态" align="center">
                            <template slot-scope="scope">
                                <p v-if="scope.row.contract.contractState == '1'">已入住</p>
                                <p v-if="scope.row.contract.contractState == '2'">单人预定</p>
                                <p v-if="scope.row.contract.contractState == '3'">集体预定</p>
                                <p v-if="scope.row.contract.contractState == '4'">已完结</p>
                                <p v-if="scope.row.contract.contractState == '5'">已取消</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="开票状态" align="center">
                            <template slot-scope="scope">
                                <p v-if="scope.row.contract.invoice">已开票</p>
                                <p v-else>未开票</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="155" align="center">
                            <template slot-scope="scope">
                                <!-- <el-button type="text" size="small" @click="checkOrder(scope.row)">查看</el-button> -->
                                <el-button
                                    type="text"
                                    size="small"
                                    v-if="scope.row.contract.contractState == '5'"
                                    >-</el-button
                                >
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="doRoom(scope.row)"
                                    v-if="scope.row.contract.contractState == '2' || scope.row.contract.contractState == '3'"
                                    >入住</el-button
                                >
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="markCard(scope.row)"
                                    v-if="scope.row.contract.contractState == '1'|| scope.row.contract.contractState == '2' || scope.row.contract.contractState == '3'"
                                    >制卡</el-button
                                >
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="editRoom(scope.row)"
                                    v-if="!(scope.row.contract.contractState == '4' || scope.row.contract.contractState == '5')"
                                    >编辑</el-button
                                >
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="cancelRoom(scope.row)"
                                    v-if="scope.row.contract.contractState == '2' || scope.row.contract.contractState == '3'"
                                    >取消</el-button
                                >
                                <el-button
                                    type="text"
                                    size="small"
                                    v-if="scope.row.contract.contractState == '4'"
                                    @click="doInvoice(scope.row)"
                                    >开票</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div style="background: #fff; text-align: right; padding: 5px 0">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[15, 30, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                >
                </el-pagination>
            </div>
        </div>
        <readCard
            v-if="doShow"
            @funs="readCardn"
            :stime="checkData.contract.reserveStartDate"
            :etime="checkData.contract.reserveEndDate"
            :rid="checkData.roomDto.roomId"
            :rname="checkData.roomDto.roomName"
            :contractId="checkData.contract.contractId"
        ></readCard>
        <editOrder v-if="editShow" @funx="closeE" :oData="orderData"></editOrder>
    </div>
</template>
<script>
import { SystemService } from '../../../../api/system';
import { RoomService } from '../../../../api/room';
import roomDetails from '../checkIn/roomDetails';
import readCard from '../checkIn/readCard';
import editOrder from './editOrder';
export default {
    name: 'orderManagement',
    components: {
        roomDetails,
        readCard,
        editOrder
    },
    data() {
        return {
            contract: {}, // 订单查询
            consumer: {}, // 订单查询
            room: {}, // 订单查询
            orderStatusList: [
                { value: '', label: '全部' },
                { value: '1', label: '已入住' },
                { value: '2', label: '单人预定' },
                { value: '3', label: '集体预定' },
                { value: '4', label: '已完结' },
                { value: '5', label: '已取消' }
            ],
            times: [], //订单时间
            loading: false,
            currentPage: 1,
            pageSize: 15,
            total: 0,
            tableData: [],
            roomTypeList: [],
            doShow: false,
            checkData: {},
            editShow: false, //编辑界面
            orderData: {}
        };
    },
    mounted() {
        // 获取房间类型
        SystemService.getSysCodePid('20').then((res) => {
            this.roomTypeList = res;
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
        // 查询按钮
        findAll() {
            this.currentPage = 1;
            this.find();
        },
        // 清空查询按钮
        resetting() {
            this.times = [];
            this.currentPage = 1;
            this.contract = {};
            this.consumer = {};
            this.room = {};
            this.find();
        },
        find() {
            this.loading = true;
            if (this.times && this.times.length > 0) {
                this.contract.reserveStartDate = this.dateFormat('YYYY-mm-dd', new Date(this.times[0]));
                this.contract.reserveEndDate = this.dateFormat('YYYY-mm-dd', new Date(this.times[1]));
            } else {
                this.contract.reserveStartDate = '';
                this.contract.reserveEndDate = '';
            }
            let page = {
                curPage: this.currentPage,
                pageSize: this.pageSize
            };
            RoomService.getOrderList({ page: page, contract: this.contract, consumer: this.consumer, room: this.room }).then((res) => {
                this.loading = false;
                this.tableData = res.dataList;
                this.total = res.total;
            });
        },
        // 每页数改变
        handleSizeChange: function (pg) {
            this.pageSize = pg;
            this.find();
        },
        // 第几页
        handleCurrentChange: function (cg) {
            this.currentPage = cg;
            this.find();
        },
        // 表头样式
        rowStyle: function () {
            return { background: '#427FDA !important', color: '#fff !important' };
        },
        // 办理
        doRoom(d) {
            this.checkData = d;
            let dtt1 = new Date().getTime();
            let dtt2 = new Date(this.checkData.contract.reserveStartDate.substring(0, 10)).getTime();
            if (dtt1 < dtt2) {
                this.$message.warning('未到预定时间不可办理入住！');
                return;
            }
            this.doShow = true;
        },
        readCardn(val) {
            this.doShow = false;
            if (val != 'close') {
                RoomService.checkInRoom({ contractId: this.checkData.contract.contractId }).then((res) => {
                    if (res.r == '0') {
                        this.$message.success('入住成功！');
                        this.find();
                    }
                });
            }
        },
        // 取消订单
        cancelRoom(d) {
            this.$confirm('是否确定取消该订单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                RoomService.editOrder({
                    contract: {
                        contractId: d.contract.contractId,
                        contractState: 5,
                        reserveEndDate: d.contract.reserveEndDate,
                        reserveStartDate: d.contract.reserveStartDate,
                        roomId: d.roomDto.roomId
                    }
                }).then((res) => {
                    if (res.status == 0) {
                        this.$message.success('订单取消成功！');
                        this.find();
                    }
                });
            });
        },
        // 编辑订单
        editRoom(d) {
            this.orderData = d;
            this.editShow = true;
        },
        //关闭编辑
        closeE(d) {
            if (d != 'close') {
                this.find();
            }
            this.editShow = false;
        },
        // 制卡
        markCard(d) {
            this.doShow = true;
            this.checkData = d;
        },
        // 退还押金
        backDes(d){
            this.$prompt('请输入退还押金金额！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[0-9]*$/,
                inputErrorMessage: '请输入正确的数字',
                inputValue:d.consumerList[0].deposit,
                }).then(({ value }) => {
                    if(d.consumerList[0].deposit<Number(value)){
                        this.$message.warning('输入的金额大于押金!');
                    }else{
                        RoomService.backDeposit({'contractId':d.contract.contractId,'deposit':Number(value)}).then((res)=>{
                            if(res.m){
                                this.$message.success(res.m);
                                this.find();
                            }else{
                                this.$message.error('退还押金失败！');
                            }
                            
                        })
                        
                    }
                }).catch(() => {
            });
        },
        // 开票
        doInvoice(da){
            this.$confirm('该订单确定已开票?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                RoomService.editOrder({
                    contract: {
                        contractId: da.contract.contractId,
                        invoice: '1',
                    }
                }).then((res) => {
                    if (res.status == 0) {
                        this.$message.success('操作成功！');
                        this.find();
                    }
                });
            })
        }
    }
};
</script> 
<style scoped>
.tuiIcon{
    color: #fe6931;
    border-radius: 4px;
    border: 1px solid #fe6931;
    padding: 0 2px;
    font-size: 14px;
    cursor: pointer;
    margin-left: 10px;
}
</style>