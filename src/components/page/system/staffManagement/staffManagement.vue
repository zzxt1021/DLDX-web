<template>
    <div>
        <div class="breadcrumbTopTit">
            <p>位置：</p>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>系统</el-breadcrumb-item>
                <el-breadcrumb-item>员工管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="display: flex">
            <div class="ygDivLeft">
                <div class="deptBtns">
                    <p @click="addDept">
                        <img src="../../../../assets/img/add.png" />
                        <span>新增</span>
                    </p>
                </div>
                <el-tree
                    :data="deptTree"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    :indent="20"
                    :highlight-current="true"
                    :default-expand-all="false"
                    :expand-on-click-node="false"
                    :style="{ height: windowHeight - 240 + 'px', 'overflow-y': 'auto','border':'1px solid #D8DDE4','border-top':'none' }" >
                    <template #default="{ node, data }">
                        <div class="custom-tree-node node-div">
                            <p>{{ data.deptName }}</p>
                            <div style="display:flex">
                                <p @click="edit(data)" class="check">编辑</p>
                                <p @click="remove(data)" class="premove">删除</p>
                            </div>
                        </div>
                    </template>
                </el-tree>
            </div>
            <div class="ygDivRight">
                <div style="display: flex; justify-content: space-between; align-items: baseline">
                    <div class="filterDiv">
                        <div class="filterBox">
                            <p>员工名称</p>
                            <div>
                                <el-input placeholder="请输入姓名" v-model="name"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="btns">
                        <el-button type="primary" icon="el-icon-search" @click="getPeople">查询</el-button>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPeople">新增员工</el-button>
                    </div>
                </div>
                <template>
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%; margin-top: 15px"
                        v-loading="loading"
                        :header-cell-style="rowStyle"
                    >
                        <el-table-column type="index" width="80" align="center"></el-table-column>
                        <el-table-column label="员工姓名" align="center" prop="name"></el-table-column>
                        <el-table-column label="性别" align="center" prop="sex"></el-table-column>
                        <el-table-column prop="tel" label="手机号" align="center"></el-table-column>
                        <el-table-column prop="deptName" label="所属部门" align="center">
                            <template slot-scope="scope">
                                <p>{{getDeptName(scope.row.deptId)}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="checkPeople(scope.row)">编辑</el-button>
                                <el-button type="text" size="small" @click="delPeople(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </div>
        <deptDetails @func="closeDeptPage" :odata="deptData" v-if="deptShow"></deptDetails>
        <peopleDetails @func="closePeoplePage" :odata="pdata" v-if="peopleShow"></peopleDetails>
    </div>
</template>
<script>
import deptDetails from './deptDetails.vue';
import peopleDetails from './peopleDetails.vue';
import { SystemService } from '../../../../api/system';
export default {
    name: 'staffManagement',
    components: {
        deptDetails,
        peopleDetails
    },
    data() {
        return {
            loading: false,
            areaShow: false,
            currentPage: 1,
            value1: true,
            deptShow: false,
            peopleShow: false,
            tableData: [], // 人员列表
            deptTree: [], //部门列表
            defaultProps: {
                children: 'nodes',
                label: 'deptName'
            },
            windowHeight: document.documentElement.clientHeight,
            deptData:{},
            name:'',// 筛选，
            deptId:'',//筛选
            pdata:null,
        };
    },
    created(){
        this.getDept();
    },
    mounted() {
        this.getPeople();
    },
    methods: {
        // 获取部门
        getDept() {
            SystemService.getDept({}).then((res) => {
                this.deptTree = res;
            });
        },
        // 查询人员
        getPeople() {
            SystemService.getPeople({deptId:this.deptId,name:this.name}).then((res) => {
                this.tableData = res;
            });
        },
        rowStyle: function () {
            return { background: '#427FDA !important', color: '#fff !important' };
        },
        // 编辑部门
        edit(dept){
            this.deptData = dept;
            this.deptShow = true;
        },
        // 删除部门
        remove(dept){
            this.$confirm('此操作将会删除本部门以及下级部门，同时删除所属人员！','提示',{ 
                confirmButtonText: '我已确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let da = {id:dept.id};
                SystemService.delDept(da).then((res)=>{
                    if(res.status == 0){
                        this.$message.success('操作成功！');
                        this.getDept();
                    }
                })
            })
        },
        handleNodeClick: function (da) {
            this.deptId = da.id;
            this.getPeople();
        },
        getDeptN(list,id){
            for(let x=0;x<list.length;x++){
                if(list[x].id == id){
                    return list[x].deptName;
                }else{
                    if(list[x].nodes && list[x].nodes.length>0){
                        this.getDeptN(list[x].nodes,id)
                    }
                } 

            }
        },
        getDeptName(id){
            let name = this.getDeptN(this.deptTree,id);
            return name;
        },
        handleCurrentChange: function () {},
        // 新增部门
        addDept: function () {
            this.deptData = null;
            this.deptShow = true;
        },
        // 关闭部门页面
        closeDeptPage: function (d) {
            if(d == 'ok'){
                this.getDept();
            }
            this.deptShow = false;
        },
        // 新增员工
        addPeople: function () {
            this.peopleShow = true;
        },
        // 关闭员工页面
        closePeoplePage: function (da) {
            if(da == 'ok'){
                this.getPeople();
            }
            this.peopleShow = false;
        },
        // 编辑员工
        checkPeople(da){
            this.pdata = da;
            this.peopleShow = true;
        },
        // 删除员工
        delPeople(daa){
            this.$confirm('确定删除该名员工！','提示',{ 
                confirmButtonText: '我已确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let da = {id:daa.id};
                SystemService.delUser(da).then((res)=>{
                    if(res.status == 0){
                        this.$message.success('操作成功！');
                        this.getPeople();
                    }
                })
            })
        }
    }
};
</script>
<style scoped>
.ygDivLeft {
    width: 20%;
    margin-right: 3%;
}
.deptDiv {
    width: 63%;
    height: 100px;
    background: #ffffff;
    border: 1px solid #d8dde4;
    border-radius: 4px;
    padding: 20px 15px;
    padding-left: 10%;
    margin-bottom: 15px;
}
.deptDiv > p:first-child {
    color: #333;
    font-size: 20px;
}
.peoNum {
    display: flex;
    align-items: center;
    font-size: 28px;
    color: #ec6834;
    margin-top: 34px;
    margin-left: 5%;
}
.deptDived {
    border-color: #427fda;
}
.deptBtns {
    height: 32px;
    padding: 0px 15px;
    background: #ffffff;
    border: 1px solid #d8dde4;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    margin-top: 15px;
}
.deptBtns > p {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    color: #427fda;
}
.deptBtns > p > span {
    text-decoration: underline;
    margin-left: 8px;
}
.ygDivRight {
    width: 76%;
}
.node-div{
    display: flex;
    justify-content: space-between;
    color: #333;
    font-size: 14px;
    width: 84%;
}
.premove{
    color:#3a8ee6 ;
}
.check{
    color:#3a8ee6;
    margin-right: 10px;
}
</style>