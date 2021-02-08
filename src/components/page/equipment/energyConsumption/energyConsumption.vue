<template>
    <div>
        <div class="breadcrumbTopTit">
            <p>位置：</p>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>设备</el-breadcrumb-item>
                <el-breadcrumb-item>能耗统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline">
            <div class="filterDiv">
                <div class="filterBox">
                    <p>房间名称</p>
                    <div>
                        <el-input placeholder="请输入房间名称" v-model="roomName"></el-input>
                    </div>
                </div>
                <div class="filterBox">
                    <p>统计时间</p>
                    <div>
                        <div>
                            <el-date-picker
                                v-model="times"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                prefix-icon=""
                                :picker-options="pickerOptions"
                            >
                            </el-date-picker>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btns">
                <el-button type="primary" icon="el-icon-search" @click="findAll">查询</el-button>
                 <el-button type="primary" icon="el-icon-refresh" @click="resetting">重置</el-button>
            </div>
        </div>
        <div style="margin-top:15px">
             <template>
                    <el-table :data="tableData" border style="width: 100%" v-loading="loading" :header-cell-style="rowStyle">
                        <el-table-column type="index" width="80" align="center"></el-table-column>
                        <el-table-column label="设备名称" align="center">
                            <p>插座</p>
                        </el-table-column>
                        <el-table-column prop="roomName" label="房间名称" align="center"></el-table-column>
                        <el-table-column label="统计时间" align="center">
                            <p>{{tjsTime}}至{{tjeTime}}</p>
                        </el-table-column>
                        <el-table-column prop="normalQuantity" label="平时电量" align="center"></el-table-column>
                        <el-table-column prop="peakQuantity" label="峰时电量" align="center"></el-table-column>
                        <el-table-column prop="valleyQuantity" label="谷时电量" align="center"></el-table-column>
                        <el-table-column prop="totalQuantity" label="总电量" align="center"></el-table-column>
                        <el-table-column label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="check(scope.row)">查看</el-button>
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
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                    >
                    </el-pagination>
                </div>
        </div>
        <energyDetail v-if="detShow" @funq="unCheck" :stime="tjsTime" :etime="tjeTime" :rid="checkData.roomId"></energyDetail>
    </div>
</template>
<script>
import energyDetail from "./eneryDetail.vue";
import{EquipmentService}from "../../../../api/equipment"
export default {
    name:'energyConsumption',
    components:{
        energyDetail
    },
    data(){
        return{
            times:[],
            tableData: [],
            currentPage: 1,
            pageSize: 15,
            total: 0,
            pickerOptions:{
                disabledDate(time) {
                    return time.getTime() > Date.now() 
                }
            },
            loading:false,
            roomName:'',
            detShow:false,
            tjsTime:'',//统计开始时间
            tjeTime:'',//统计结束时间
            checkData:{},// 选中的数据

        }
    },
    created(){
         this.times[1] =this.dateFormat("YYYY-mm-dd",new Date());
        let date1 = new Date();
        let date2 = new Date(date1);
        date2.setDate(date1.getDate()-7);
        this.times[0] =this.dateFormat("YYYY-mm-dd",date2);
    },
    mounted(){
        this.find();
    },
    methods:{
        // 格式化时间
        dateFormat(fmt, date) {
            let ret;
            const opt = {
                "Y+": date.getFullYear().toString(),        // 年
                "m+": (date.getMonth() + 1).toString(),     // 月
                "d+": date.getDate().toString(),            // 日
                "H+": date.getHours().toString(),           // 时
                "M+": date.getMinutes().toString(),         // 分
                "S+": date.getSeconds().toString()          // 秒
            };
            for (let k in opt) {
                ret = new RegExp("(" + k + ")").exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                };
            };
            return fmt;
        },
        // 查询按钮
        findAll(){
            this.currentPage = 1;
            this.find();
        },
        // 重置按钮
        resetting(){
            this.times = [];
            this.times[1] =this.dateFormat("YYYY-mm-dd",new Date());
            let date1 = new Date();
            let date2 = new Date(date1);
            date2.setDate(date1.getDate()-7);
            this.times[0] =this.dateFormat("YYYY-mm-dd",date2);
            this.roomName = '';
            this.currentPage = 1;
            this.find();
        },
        find(){
            this.loading = true;
            let page={ curPage:this.currentPage,pageSize:this.pageSize};
            let stime,etime;
            if(this.times && this.times.length>0){
                stime =this.dateFormat("YYYY-mm-dd",new Date(this.times[0])) ;
                etime =this.dateFormat("YYYY-mm-dd",new Date(this.times[1])) ;
            }else{
                this.$message.warning('请选择统计时间！');
                return;
            }
            
            EquipmentService.getEnergyList({'page':page,'startDate':stime?stime:'','endDate':etime?etime:'','roomName':this.roomName}).then((res)=>{
                this.tjsTime = stime;
                this.tjeTime = etime;
                this.tableData = res.dataList;
                this.loading = false;
                this.total = res.total;
            })
        },
        check(dt){
            console.log('查看');
            this.checkData = dt;
            this.detShow = true;
        },
        unCheck(){
            console.log('false');
            this.detShow = false;
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
    }
}
</script>
<style scoped>

</style>