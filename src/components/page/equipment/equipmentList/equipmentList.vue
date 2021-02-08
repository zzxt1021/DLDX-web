<template>
    <div>
        <div class="breadcrumbTopTit">
            <p>位置：</p>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>设备</el-breadcrumb-item>
                <el-breadcrumb-item>设备列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="fyDiv">
            <div class="fyLeft" :style="{ height: windowHeight - 200 + 'px' }">
                <el-tree
                    :data="bdTree"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    :indent="20"
                    :highlight-current="true"
                    :style="{ height: windowHeight - 240 + 'px', 'overflow-y': 'auto' }"
                ></el-tree>
            </div>
            <div style="width: 67%; margin-left: 3%">
                <div style="margin-bottom: 15px">
                    <div style="display: flex; justify-content: space-between; align-items: baseline">
                        <div class="filterDiv">
                            <div class="filterBox">
                                <p>设备名称</p>
                                <div>
                                    <el-input placeholder="请输入设备名称" v-model="device.deviceName"></el-input>
                                </div>
                            </div>
                            <div class="filterBox">
                                <p>设备类型</p>
                                <div>
                                    <el-select v-model="device.deviceType" placeholder="请选择">
                                        <el-option v-for="item in devList" :key="item.code + 'g'" :label="item.name" :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="filterBox">
                                <p>设备状态</p>
                                <div>
                                    <el-select v-model="device.onlineState" placeholder="请选择">
                                        <el-option v-for="item in devstatusList" :key="item.val + 'g'" :label="item.name" :value="item.val">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="btns">
                            <el-button type="primary" icon="el-icon-search" @click="findAll">查询</el-button>
                            <el-button type="primary" icon="el-icon-refresh" @click="resetting">重置</el-button>
                        </div>
                    </div>
                </div>
                <template>
                    <el-table :data="tableData" border style="width: 100%" v-loading="loading" :header-cell-style="rowStyle">
                        <el-table-column type="index" width="80" align="center"></el-table-column>
                        <el-table-column prop="deviceName" label="设备名称" align="center"></el-table-column>
                        <el-table-column prop="deviceType" label="设备类型" align="center">
                            <template slot-scope="scope">
                                <p v-if="scope.row.deviceType == '10-1'">灯</p>
                                <p v-if="scope.row.deviceType == '10-2'">门锁</p>
                                <p v-if="scope.row.deviceType == '10-3'">面板</p>
                                <p v-if="scope.row.deviceType == '10-4'">插座</p>
                                <p v-if="scope.row.deviceType == '10-5'">控制</p>
                                <p v-if="scope.row.deviceType == '10-6'">传感器</p>
                                <p v-if="scope.row.deviceType == '10-99'">其他</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="mac" label="设备mac" align="center"></el-table-column>
                        <el-table-column prop="hostId" label="主机" align="center"></el-table-column>
                        <el-table-column prop="gateway" label="网关" align="center"></el-table-column>
                        <el-table-column label="设备状态" align="center" width="100">
                            <template slot-scope="scope">
                                <p>{{statusBack(scope.row)}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="checkDev(scope.row)">查看</el-button>
                                <el-button type="text" size="small" @click="remove(scope.row.deviceId)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
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
        </div>
        <lightView v-if="ltShow" :orgData="orgData" @func="closePage"></lightView>
        <cipherTrunk v-if="ctShow" @funct="closePage"></cipherTrunk>
        <sos v-if="sosShow" @funcss="closePage"></sos>
        <socket v-if="stShow" @funv="closePage"></socket>
    </div>
</template>
<script>
import { SystemService } from '../../../../api/system';
import { EquipmentService } from '../../../../api/equipment';
import lightView from './lightView';
import cipherTrunk from './cipherTrunk';
import sos from './sos';
import socket from './socket';
import readCard from '../../apartment/checkIn/readCard';
export default {
    name: 'equipmentList',
    components: {
        lightView,
        cipherTrunk,
        sos,
        socket,
        readCard
    },
    data() {
        return {
            windowHeight: document.documentElement.clientHeight,
            loading: false,
            bdTree: [], // 树形楼层信息
            gateWayTree:[],//主机网关树
            defaultProps: {
                children: 'nodes',
                label: 'text'
            },
            device: {'onlineState':'all'},
            devList: [], // 设备类型
            tableData: [],
            currentPage: 1,
            pageSize: 15,
            total: 0,
            nodeData:{},//点击树节点
            devstatusList:[{name:'全部',val:'all'},{name:'离线',val:'off'}],
            ltShow: false, // 灯显示
            ctShow: false, //锁显示
            sosShow: false, //sos面板
            stShow: false, //插座
            orgData:{},// 需展示的数据
        };
    },
    mounted() {
        // 获取树形楼/单位/层
        SystemService.getBulidingTree().then((res) => {
            this.bdTree = res;
        });
        // 设备大类
        SystemService.getSysCodePid('10').then((res) => {
            this.devList = res;
        });
        // 主机网关
        // EquipmentService.getGateWayTree().then((res)=>{
        //     this.gateWayTree = res;
        // })
        this.find();
    },
    methods: {
        //查询按钮
        findAll(){
            this.currentPage = 1;
            this.find();
        },
        // 重置
        resetting(){
            this.device = {'onlineState':'all'};
            this.currentPage = 1;
            this.find();
        },
        // 查询
        find() {
            this.loading = true;
            let page = {
                "curPage": this.currentPage,
                "pageSize": this.pageSize,
                "sortname": "deviceName",
                "sortorder": "asc"
            };
             if (JSON.stringify(this.nodeData) != '{}') {
                if (this.nodeData.value.type == 1) {
                    this.device.buildingType1Id = this.nodeData.value.buildingId;
                } else if (this.nodeData.value.type == 2) {
                    this.device.buildingType1Id = this.nodeData.value.type1Id;
                    this.device.buildingType2Id = this.nodeData.value.buildingId;
                } else if (this.nodeData.value.type == 3) {
                    this.device.buildingType1Id = this.nodeData.value.type1Id;
                    this.device.buildingType2Id = this.nodeData.value.type2Id;
                    this.device.buildingType3Id = this.nodeData.value.buildingId;
                }
            }
            EquipmentService.getEquipmentLists({ page: page, 'deviceName':this.device.deviceName,'deviceType':this.device.deviceType,'onlineState':this.device.onlineState, 'buildingType1Id':this.device.buildingType1Id,'buildingType2Id':this.device.buildingType2Id,'buildingType3Id':this.device.buildingType3Id}).then((res) => {
                this.loading = false;
                this.tableData = res.dataList;
                this.total = res.total;
            });
        },
        // 删除设备
        remove(id) {
            this.$confirm('是否确定删除该设备?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                EquipmentService.delEquipment(id).then((res) => {
                    if (res.status == 0) {
                        this.$message.success('删除成功！');
                        this.find();
                    }
                });
            });
        },
        // 查看设备
        checkDev(d){
            this.orgData = d;
            this.ltShow = true;
        },
        // 点击树子节点
        handleNodeClick(data) {
            // this.device.hostId = '';
            // this.device.gateway = '';
            // if(data.nodes){
            //     this.device.hostId = data.id;
            // }else{
            //     this.device.gateway = data.id;
            // }
            this.nodeData = data;
            this.find();
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
        // 显示具体面板
        show: function (t) {
            if (t == 1) {
                // 灯
                this.ltShow = true;
            } else if (t == 2) {
                // 锁
                this.ctShow = true;
            } else if (t == 3) {
                // sos
                this.sosShow = true;
            } else if (t == 4) {
                this.stShow = true;
            }
        },
        // 关闭具体面板
        closePage: function (t) {
            console.log('关闭');
            this.ltShow = false;
            // if (t == 1) {
                
            // } else if (t == 2) {
            //     this.ctShow = false;
            // } else if (t == 3) {
            //     this.sosShow = false;
            // } else if (t == 4) {
            //     this.stShow = false;
            // }
            if(t!='close'){
                this.find();
            }
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
    }
};
</script>
<style scoped>
.fyDiv {
    display: flex;
}
.fyLeft {
    width: 23%;
    background: #fff;
    padding: 15px 20px;
    padding-top: 0;
}
.treeTop {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #ccc;
    height: 40px;
}
.treeTop p {
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
}
.treeTop p span {
    text-decoration: underline;
    margin-left: 6px;
}
</style>