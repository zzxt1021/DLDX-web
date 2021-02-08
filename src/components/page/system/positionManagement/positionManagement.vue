<template>
    <div>
        <div class="breadcrumbTopTit">
            <p>位置：</p>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>系统</el-breadcrumb-item>
                <el-breadcrumb-item>岗位管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <div style="display: flex">
                <div class="filterDiv">
                    <div class="filterBox">
                        <p>岗位名称</p>
                        <div>
                            <el-input placeholder="请输入名称"></el-input>
                        </div>
                    </div>
                    <div class="filterBox">
                        <p>所属部门</p>
                        <div>
                            <el-input placeholder="请输入名称"></el-input>
                        </div>
                    </div>
                </div>
                <div class="btns">
                    <el-button type="primary" icon="el-icon-search">查询</el-button>
                    <el-button type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
                </div>
            </div>
            <div style="margin-top: 15px">
                <template>
                    <el-table :data="tableData" border style="width: 100%" v-loading="loading" :header-cell-style="rowStyle">
                        <el-table-column type="index" width="80" header-align="center" align="center"></el-table-column>
                        <el-table-column label="岗位名称" header-align="center"></el-table-column>
                        <el-table-column label="所属部门" header-align="center"></el-table-column>
                        <el-table-column prop="岗位描述" label="启用状态" header-align="center"></el-table-column>
                        <el-table-column label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="checkClick(scope.row)">编辑</el-button>
                                <el-button type="text" size="small" @click="checkClick(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <div style="background: #fff; text-align: right; padding: 5px 0">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[20, 50, 100]"
                        :page-size="20"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'positionManagement',
    data() {
        return {
            loading: false,
            currentPage: 1,
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    imgsrc: '../../../assets/img/img.jpg',
                    num: 11112,
                    zip: 200333
                }
            ]
        };
    },
    methods: {
        handleSizeChange: function () {},
        handleCurrentChange: function () {},
        rowStyle: function () {
            return { background: '#427FDA !important', color: '#fff !important' };
        }
    }
};
</script>
<style scoped>
</style>