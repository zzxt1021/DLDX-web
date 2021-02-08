<template>
    <div>
        <div class="breadcrumbTopTit">
            <p>位置：</p>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>系统</el-breadcrumb-item>
                <el-breadcrumb-item>数据字典</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="fyDiv">
            <div class="fyLeft" :style="{ height: windowHeight - 200 + 'px' }">
                <div class="treeTop">
                    <p @click="add">
                        <img src="../../../../assets/img/add.png"/>
                        <span style="color: #427fda">新增</span>
                    </p>
                    <p style="margin-left: 5%">
                        <img src="../../../../assets/img/delred.png"/>
                        <span style="color: #e94c49">删除</span>
                    </p>
                </div>
                <el-tree
                    :data="treeData"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    :indent="20"
                    :highlight-current="true"
                ></el-tree>
            </div>
            <div style="width: 65%; margin-left: 5%">
                <div  style="margin-bottom:15px">
                    <div style="display: flex">
                        <div class="filterDiv">
                            <div class="filterBox">
                                <p>名称</p>
                                <div>
                                    <el-input placeholder="请输入名称"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="btns">
                            <el-button type="primary" icon="el-icon-search">查询</el-button>
                        </div>
                    </div>
                </div>
                <template>
                    <el-table :data="tableData" border style="width: 100%" v-loading="loading" :header-cell-style="rowStyle">
                        <el-table-column type="index" width="80" header-align="center" align="center"></el-table-column>
                        <el-table-column label="编号" header-align="center"></el-table-column>
                        <el-table-column label="名称" header-align="center"></el-table-column>
                        <el-table-column prop="address" label="启用状态" header-align="center"></el-table-column>
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
    name: 'dataDictionary',
    data() {
        return {
            windowHeight: document.documentElement.clientHeight,
            loading: false,
            areaShow: false,
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
            ],
            treeData: [
                {
                    label: '一级 1',
                    children: [
                        {
                            label: '二级 1-1',
                            children: [
                                {
                                    label: '三级 1-1-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '一级 2',
                    children: [
                        {
                            label: '二级 2-1',
                            children: [
                                {
                                    label: '三级 2-1-1'
                                }
                            ]
                        },
                        {
                            label: '二级 2-2',
                            children: [
                                {
                                    label: '三级 2-2-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '一级 3',
                    children: [
                        {
                            label: '二级 3-1',
                            children: [
                                {
                                    label: '三级 3-1-1'
                                }
                            ]
                        },
                        {
                            label: '二级 3-2',
                            children: [
                                {
                                    label: '三级 3-2-1'
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        handleSizeChange: function () {},
        handleCurrentChange: function () {},
        rowStyle: function () {
            return { background: '#427FDA !important', color: '#fff !important' };
        },
        // 新增
        add: function () {
            this.areaShow = true;
        },
        // 关闭页面
        closePage: function () {
            this.areaShow = false;
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