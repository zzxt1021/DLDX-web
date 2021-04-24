<template>
    <div>
        <div class="breadcrumbTopTit">
            <p>位置：</p>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>房间</el-breadcrumb-item>
                <el-breadcrumb-item>房源管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="fyDiv">
            <div class="fyLeft" :style="{ height: windowHeight - 200 + 'px' }">
                <div class="treeTop">
                    <p @click="add(1)">
                        <img src="../../../../assets/img/add.png" />
                        <span style="color: #427fda">新增</span>
                    </p>
                    <p style="margin-left: 5%">
                        <img src="../../../../assets/img/delred.png" />
                        <span style="color: #e94c49" @click="delBd">删除</span>
                    </p>
                </div>
                <el-tree
                    :data="bdTree"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    :indent="20"
                    :highlight-current="true"
                    :style="{ height: windowHeight - 240 + 'px', 'overflow-y': 'auto' }"
                ></el-tree>
            </div>
            <div style="width: 65%; margin-left: 5%">
                <div style="margin-bottom: 15px">
                    <div style="display: flex;justify-content: space-between; align-items: baseline">
                        <div class="filterDiv">
                            <div class="filterBox">
                                <p>房间名称</p>
                                <div>
                                    <el-input placeholder="请输入名称" v-model="roomName"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="btns">
                            <el-button type="primary" icon="el-icon-search" @click="findAll">查询</el-button>
                            <el-button type="primary" icon="el-icon-refresh" @click="resetting">清空查询</el-button>
                            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add(2)">新增房间</el-button>
                        </div>
                    </div>
                </div>
                <template>
                    <el-table :data="tableData" border style="width: 100%" v-loading="loading" :header-cell-style="rowStyle">
                        <el-table-column type="index" width="80" align="center"></el-table-column>
                        <el-table-column label="房间名称" align="center" prop="roomName"></el-table-column>
                        <el-table-column label="父区域" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.buildingType1Name }}</span>
                                <span v-if="scope.row.buildingType2Name">-{{ scope.row.buildingType2Name }}</span>
                                <span v-if="scope.row.buildingType3Name">-{{ scope.row.buildingType3Name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="房间类型" align="center">
                            <template slot-scope="scope">
                                <p v-if="scope.row.roomType == '20'">工作间</p>
                                <p v-else>{{scope.row.roomTypeName}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="square" label="面积" align="center"> </el-table-column>
                        <el-table-column label="操作" width="140" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="checkRoom(scope.row)">查看</el-button>
                                <el-button type="text" size="small" @click="editRoom(scope.row)">编辑</el-button>
                                <el-button type="text" size="small" @click="delRoom(scope.row)">删除</el-button>
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
        <areaDetails @func="closePage" v-if="areaShow" :type="areaTy" :parentData="nodeData" :data="roomData"></areaDetails>
        <roomDetail @funr="closeRoom" v-if="rShow" :odata="checkData"></roomDetail>
        <editRoom @funx="closeEdit" v-if="eShow" :data="checkData"></editRoom>
    </div>
</template>
<script>
import areaDetails from './areaDetails.vue';
import roomDetail from "./roomDetail";
import editRoom from "./editRoom";
import { RoomService } from '../../../../api/room';
import { SystemService } from '../../../../api/system';
export default {
    name: 'housingManagement',
    components: {
        areaDetails,
        roomDetail,
        editRoom
    },
    data() {
        return {
            windowHeight: document.documentElement.clientHeight,
            loading: true,
            areaShow: false,
            currentPage: 1,
            pageSize: 15,
            total: 0,
            roomName: '', // 筛选条件
            tableData: [],
            bdTree: [], // 树形楼层信息
            defaultProps: {
                children: 'nodes',
                label: 'text'
            },
            nodeData: {}, //树点击
            areaTy: '' ,//新增类型
            checkData:{},// 查看的房间
            rShow:false,//查看房间显示
            eShow:false,//编辑房间
        };
    },
    mounted() {
        // 获取树形楼/单位/层
        SystemService.getBulidingTree().then((res) => {
            this.bdTree = res;
        });
        this.find();
    },
    methods: {
        // 查询按钮
        findAll() {
            this.currentPage = 1;
            this.find();
        },
        // 清空查询按钮
        resetting(){
            this.roomName = '';
            this.currentPage = 1;
            this.find();
        },
        // 查询
        find: function () {
            this.loading = true;
            let page = { curPage: this.currentPage, pageSize: this.pageSize, "sortname": "roomName","sortorder": "asc" };
            let room = {
                areaId: 'a01',
                buildingType1Id: '',
                buildingType2Id: '',
                buildingType3Id: '',
                roomName: this.roomName,
                roomType:'all'
            };
            if (JSON.stringify(this.nodeData) != '{}') {
                if (this.nodeData.value.type == 1) {
                    room.buildingType1Id = this.nodeData.value.buildingId;
                } else if (this.nodeData.value.type == 2) {
                    room.buildingType1Id = this.nodeData.value.type1Id;
                    room.buildingType2Id = this.nodeData.value.buildingId;
                } else if (this.nodeData.value.type == 3) {
                    room.buildingType1Id = this.nodeData.value.type1Id;
                    room.buildingType2Id = this.nodeData.value.type2Id;
                    room.buildingType3Id = this.nodeData.value.buildingId;
                }
            }
            RoomService.getRoomList({ page: page, room: room }).then((res) => {
                this.loading = false;
                this.tableData = res.dataList;
                this.total = res.total;
            });
        },
        // 点击树子节点
        handleNodeClick(data) {
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
        // 删除楼层。
        delBd: function () {
            if (JSON.stringify(this.nodeData) == '{}') {
                this.$message.warning('请选择节点！');
            } else {
                this.$confirm('是否确定删除该节点?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        SystemService.delBulidingTree({ buildingId: this.nodeData.id }).then((res) => {
                            console.log(res);
                            if (res.status == 0) {
                                this.$message.success('删除成功！');
                                SystemService.getBulidingTree().then((res) => {
                                    this.bdTree = res;
                                });
                            } else {
                                this.$message.error(res.message);
                            }
                        });
                    })
                    .catch(() => {});
            }
        },
        // 查看房间
        checkRoom:function(data){
            this.checkData = data;
            this.rShow = true;
        },
        // 关闭房间
        closeRoom:function(){
            this.rShow = false;
        },
        // 删除房间
        delRoom: function (data) {
            this.$confirm('是否确定删除该房间?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    RoomService.delRoom({ roomId: data.roomId }).then((res) => {
                        console.log(res);
                        if (res.status == 0) {
                            this.$message.success('删除成功！');
                            this.find();
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                })
                .catch(() => {});
        },
        // 新增
        add: function (t) {
            if(JSON.stringify(this.nodeData)=='{}' ){
                this.$message.warning('请选择节点！');
                return;
            }
            this.areaShow = true;
            this.areaTy = t;
        },
        // 关闭页面
        closePage: function (val) {
            this.areaShow = false;
            if (val == 'addTree') {
                SystemService.getBulidingTree().then((res) => {
                    this.bdTree = res;
                });
            }else if(val == 'ok'){
                this.find();
            }
        } ,
        // 编辑房间
        editRoom:function(da){
            this.eShow = true;
            this.checkData = JSON.stringify(da);
            this.areaTy = 2;
        },
        // 关闭房间
        closeEdit:function(da){
            if(da == 'ok'){
                this.find();
            }
            this.eShow=false;
        }
    }
};
</script>
<style scoped>
.fyDiv {
    display: flex;
}
.fyLeft {
    width: 25%;
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
