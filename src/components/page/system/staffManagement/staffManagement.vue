<template>
    <div>
        <div class="breadcrumbTopTit">
            <p>位置：</p>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>系统</el-breadcrumb-item>
                <el-breadcrumb-item>员工管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="display:flex">
            <div class="ygDivLeft">
                <div class="deptDiv">
                    <p>总经办</p>
                    <div class="peoNum">
                        <img src="../../../../assets/img/people.png"/>
                        <p style="margin-left:5%">
                            <span>32</span>                               
                            <span style="color:#333;font-size:14px;padding-left:10px">人</span>
                        </p>
                    </div>
                </div>
                <div class="deptDiv deptDived">
                    <p>人力资源部</p>
                    <div class="peoNum">
                        <img src="../../../../assets/img/people.png"/>
                        <p style="margin-left:5%">
                            <span>32</span>
                            <span style="color:#333;font-size:14px;padding-left:10px">人</span>
                        </p>
                    </div>
                </div>
                <div class="deptBtns">
                    <p @click="addDept">
                        <img src="../../../../assets/img/add.png"/>
                        <span>新增</span>
                    </p>
                    <p style="margin-left:10%">
                        <img src="../../../../assets/img/delred.png"/>
                        <span style="color:#E94C49">删除</span>
                    </p>
                </div>
            </div>
            <div class="ygDivRight">
                <div style="display: flex">
                    <div class="filterDiv">
                        <div class="filterBox">
                            <p>员工名称</p>
                            <div>
                                <el-input placeholder="请输入ID"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="btns">
                        <el-button type="primary" icon="el-icon-search">查询</el-button>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPeople">新增员工</el-button>
                    </div>
                </div>
                <template>
                    <el-table :data="tableData" border style="width: 100%;margin-top:15px;" v-loading="loading" :header-cell-style="rowStyle">
                        <el-table-column type="index" width="80" align="center"></el-table-column>
                        <el-table-column label="员工姓名" align="center"></el-table-column>
                        <el-table-column label="员工号" align="center"></el-table-column>
                        <el-table-column prop="address" label="手机号" align="center"></el-table-column>
                        <el-table-column prop="address" label="岗位" align="center"> </el-table-column>
                        <el-table-column prop="address" label="启用开关" align="center">
                            <template>
                                <el-switch v-model="value1"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="checkClick(scope.row)">查看</el-button>
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
        <deptDetails @func="closeDeptPage" v-if="deptShow"></deptDetails>
        <peopleDetails @func="closePeoplePage" v-if="peopleShow"></peopleDetails>
    </div>
</template>
<script>
import deptDetails from "./deptDetails.vue";
import peopleDetails from "./peopleDetails.vue";
import {SystemService} from "../../../../api/system";
export default {
    name:'staffManagement',
    components:{
        deptDetails,
        peopleDetails
    },
    data(){
        return{
            loading: false,
            areaShow:false,
            currentPage:1,
            value1:true,
            deptShow:false,
            peopleShow:false,
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
        }
    },
    mounted(){
        //this.getDept();
        this.getPeople();
    },
    methods:{
        // 获取部门
        getDept(){
            SystemService.getDept().then((res)=>{
                console.log(res);
            })
        },
        // 查询人员
        getPeople(){
            SystemService.getPeople({'deptId':'d0'}).then((res)=>{
                console.log(res);
            })
        },
        rowStyle:function(){
            return {background:'#427FDA !important',color:'#fff !important'}
        },
        handleSizeChange:function(){

        },
        handleCurrentChange:function(){

        },
        // 新增部门
        addDept:function(){
            this.deptShow = true;
        },
        // 关闭部门页面
        closeDeptPage:function(){
            this.deptShow = false;
        },
        // 新增员工
        addPeople:function(){
            this.peopleShow = true;
        },
        // 关闭员工页面
        closePeoplePage:function(){
            this.peopleShow = false;
        }
    }
}
</script>
<style scoped>
.ygDivLeft{
    width: 20%;
}
.deptDiv{
    width: 63%;
    height: 100px;
    background: #FFFFFF;
    border: 1px solid #D8DDE4;
    border-radius: 4px;
    padding: 20px 15px;
    padding-left:10%;
    margin-bottom:15px;
}
.deptDiv>p:first-child{
    color: #333;
    font-size: 20px;
}
.peoNum{
    display: flex;
    align-items: center;
    font-size: 28px;
    color: #EC6834;
    margin-top: 34px;
    margin-left: 5%;
}
.deptDived{
    border-color:#427FDA ;
}
.deptBtns{
    width: 70%;
    height: 32px;
    padding: 0px 15px;
    background: #FFFFFF;
    border: 1px solid #D8DDE4;
    border-radius: 4px;
    display: flex;
    justify-content: center;
}
.deptBtns>p{
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    color: #427FDA;
}
.deptBtns>p>span{
    text-decoration: underline;
    margin-left: 8px;
}
.ygDivRight{
    width: 76%;
}
</style>