<template>
    <div>
        <div class="breadcrumbTopTit">
            <p>位置：</p>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>设备</el-breadcrumb-item>
                <el-breadcrumb-item>门卡管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline">
            <div class="filterDiv">
                <div class="filterBox">
                    <p>使用人</p>
                    <div>
                        <el-input placeholder="请输入使用人名称" v-model="card.usedUser"></el-input>
                    </div>
                </div>
                <div class="filterBox">
                    <p>卡号</p>
                    <div>
                        <el-input placeholder="请输入卡号" v-model="card.cardId"></el-input>
                    </div>
                </div>
                <p class="readCardClass" @click="read">读卡</p>
            </div>
            <div class="btns">
                <el-button type="primary" icon="el-icon-search" @click="findAll">查询</el-button>
                <el-button type="primary" icon="el-icon-refresh" @click="resetting">重置</el-button>
                <el-button type="primary" icon="el-icon-setting" @click="markCard">制作功能卡</el-button>
            </div>
        </div>
        <div style="margin-top: 15px">
            <el-table :data="tableData" border style="width: 100%" v-loading="loading" :header-cell-style="rowStyle">
                <el-table-column type="index" width="80" align="center"></el-table-column>
                <el-table-column prop="cardId" label="卡号" align="center"></el-table-column>
                <el-table-column prop="usedUser" label="使用人姓名" align="center"> </el-table-column>
                <el-table-column prop="roomName" label="使用房间" align="center"></el-table-column>
                <el-table-column label="使用时间" align="center">
                    <template slot-scope="scope">
                        <p v-if="scope.row.type == 'k'">
                            <span>{{ scope.row.startTime.substring(0, 10) }}</span>
                            <span> 至 </span>
                            <span>{{ scope.row.endTime.substring(0, 10) }}</span>
                        </p>
                        <p v-if="scope.row.type == 'g'">无期限</p>
                    </template>
                </el-table-column>
                <el-table-column prop="mark" label="备注" align="center"></el-table-column>
                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" v-if="scope.row.roomName" @click="delTem(scope.row)">解绑</el-button>
                        <el-button type="text" size="small" v-if="!scope.row.roomName">-</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
        <readCard v-if="cardShow" @funs="markCardn" :type="9"></readCard>
        <checkCard v-if="checkRead" @func="backRead" ></checkCard>
    </div>
</template>
<script>
import { EquipmentService } from '../../../../api/equipment';
import readCard from '../../apartment/checkIn/readCard.vue';
import checkCard from './checkRead';
export default {
    name: 'cardManagement',
    components: {
        readCard,
        checkCard
    },
    data() {
        return {
            roomName: '',
            currentPage: 1,
            pageSize: 15,
            loading: false,
            tableData: [],
            total: 0,
            card: {},
            cardShow: false,
            devNum: 0,
            dev: [], //需解绑的设备,
            checkRead:false
        };
    },
    mounted() {
        this.find();
    },
    methods: {
        // 查询按钮
        findAll(){
            this.currentPage = 1;
            this.find();
        },
        // 重置
        resetting(){
            this.card = {};
            this.currentPage = 1;
            this.find();
        },
        // 查询
        find: function () {
            this.loading = true;
            let page = { curPage: this.currentPage, pageSize: this.pageSize };
            EquipmentService.cardList({ page: page, card: this.card }).then((res) => {
                this.loading = false;
                this.tableData = res.dataList;
                this.total = res.total;
            });
        },
        delItem(cid, did) {
            EquipmentService.unbindCardDev({ cardId: cid, deviceId: did }).then((res) => {
                if (res.status == 0) {
                    this.devNum++;
                }
                if (this.devNum == this.dev.length) {
                    this.$message.success('解绑成功！');
                    this.find();
                }
            });
        },
        //控客-解绑
        delDev(dtt){
             EquipmentService.updateDevice(dtt).then((res) => {});
        },
        // 解绑
        delTem(da) {
            this.$confirm('是否确定解除门卡与门锁的关系?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.devNum = 0;
                let uid = da.lockUser.split(',');
                let uids = [];
                for (let i = 0; i < uid.length; i++) {
                    uids.push(Number(uid[i]));
                }
                this.dev = da.deviceId.split(',');
                for (let x = 0; x < this.dev.length; x++) {
                    let dtt = {
                        action: '8',
                        args: {
                            userId: [uids[x]]
                        },
                        deviceId: this.dev[x]
                    };
                    this.delDev(dtt);
                    this.delItem(da.cardId, this.dev[x]);
                }
            })
            
        },
        // 制作功能卡
        markCard() {
            this.cardShow = true;
        },
        markCardn(da) {
            if (da == 'ok') {
                this.find();
            }
            this.cardShow = false;
        },
        // 表头样式
        rowStyle: function () {
            return { background: '#427FDA !important', color: '#fff !important' };
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
        //读卡-查询
        read(){
            this.checkRead = true;
        },
        backRead(bt){
            if(bt!='close'){
                this.card.cardId = bt;
            }
            this.checkRead = false;
        }
    }
};
</script>
<style scoped>
.readCardClass{
    cursor: pointer;
    text-decoration: underline;
    margin-top: 20px;
    color: #427fda;
}
</style>