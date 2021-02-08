<template>
    <div>
        <div class="breadcrumbTopTit">
            <p>位置：</p>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>房间</el-breadcrumb-item>
                <el-breadcrumb-item>模板管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="display: flex;justify-content: space-between; align-items: baseline">
            <div class="filterDiv">
                <div class="filterBox">
                    <p>模板名称</p>
                    <div>
                        <el-input placeholder="请输入名称" v-model="roomTemplateName"></el-input>
                    </div>
                </div>
            </div>
            <div class="btns">
                <el-button type="primary" icon="el-icon-search" @click="findAll">查询</el-button>
                <el-button type="primary" icon="el-icon-refresh" @click="resetting">重置</el-button>
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add">新增</el-button>
            </div>
        </div>
        <div style="margin-top: 15px">
            <el-table :data="tableData" border style="width: 100%" v-loading="loading" :header-cell-style="rowStyle">
                <el-table-column type="index" width="80" align="center"></el-table-column>
                <el-table-column prop="roomTemplateName" label="模板名称" align="center"></el-table-column>
                <el-table-column label="房间类型" align="center">
                    <template slot-scope="scope">
                        <p v-if="scope.row.roomType == '20-01'">标准间</p>
                        <p v-if="scope.row.roomType == '20-02'">双人床</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="checkClick(scope.row)">查看</el-button>
                        <el-button type="text" size="small" @click="delTem(scope.row)">删除</el-button>
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
        <editTemplate v-if="editShow" :dataId="editDataId" @func="closePage"></editTemplate>
    </div>
</template>
<script>
import { RoomService } from '../../../../api/room';
import editTemplate from './editTemplate';

export default {
    name: 'templateManager',
    components: {
        editTemplate
    },
    data() {
        return {
            roomTemplateName: '',
            currentPage: 1,
            pageSize: 15,
            loading: false,
            tableData: [],
            total: 0,
            editShow: false,
            editDataId: ''
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
        //重置
        resetting(){
            this.roomTemplateName = '';
            this.currentPage = 1;
            this.find();
        },
        find: function () {
            this.loading = true;
            let page = { curPage: this.currentPage, pageSize: this.pageSize };
            RoomService.getRoomTemplate({ page: page,'templateName':this.roomTemplateName }).then((res) => {
                this.loading = false;
                this.tableData = res.dataList;
                this.total = res.total;
            });
        },
        add: function () {},
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
        // 删除模板
        delTem(dt) {
            this.$confirm('是否确定删除模板?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    RoomService.delRoomTemplate({ roomTemplateId: dt.roomTemplateId }).then((res) => {
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
        add:function(){
            this.editShow = true;
            this.editDataId = '';
        },
        // 查看
        checkClick(dt) {
            console.log('测试查看');
            this.editShow = true;
            this.editDataId = dt.roomTemplateId;
        },
        closePage(b){
            if(b == 'edit'){
                this.find();
            }
            this.editShow = false;
        }
    }
};
</script>