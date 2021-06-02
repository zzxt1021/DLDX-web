<template>
    <div>
        <div class="breadcrumbTopTit">
            <p>位置：</p>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>告警</el-breadcrumb-item>
                <el-breadcrumb-item>告警列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <div style="display: flex; justify-content: space-between; align-items: baseline">
                <div class="filterDiv">
                    <div class="filterBox">
                        <p>告警时间</p>
                        <div>
                            <el-date-picker
                                v-model="times"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions"
                            >
                            </el-date-picker>
                        </div>
                    </div>
                    <!-- <div class="filterBox">
                        <p>房间号</p>
                        <div>
                            <el-input placeholder="请输入名称"></el-input>
                        </div>
                    </div> -->
                    <div class="filterBox">
                        <p>告警等级</p>
                        <div>
                            <el-select v-model="alarmLevel" placeholder="请选择">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
        <div style="margin-top:15px">
             <template>
                    <el-table :data="tableData" border style="width: 100%" v-loading="loading" :header-cell-style="rowStyle">
                        <el-table-column type="index" width="100" align="center"></el-table-column>
                        <el-table-column label="告警内容" align="center" width="250">
                            <template slot-scope="scope">
                                <p class="contp">
                                    <span class="yz" v-if="scope.row.alarmLevel == 3">严重</span>
                                    <span class="tx" v-if="scope.row.alarmLevel == 2">一般</span>
                                    <span class="tx2" v-if="scope.row.alarmLevel == 1">提示</span>
                                    <span>{{scope.row.roomName}}房间&nbsp;{{contentBack(scope.row.alarmContent)}}</span>
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column label="告警时间" align="center" width="250">
                            <template slot-scope="scope" style="overflow:hidden">
                                <p>{{fmtTime(scope.row.alarmTime)}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="roomName" label="房间号" align="center" width="150"></el-table-column>
                        <el-table-column label="处理状态" align="center" width="250">
                            <template slot-scope="scope" style="overflow:hidden">
                                <p v-if="scope.row.dealType == 4">已处理</p>
                                <p v-else>未处理</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="处理信息" align="center" width="250">
                            <template slot-scope="scope" style="overflow:hidden">
                                <div v-if="scope.row.dealType == 4">
                                    <p>处理人：{{scope.row.dealUser}}</p>
                                    <p>备注：{{scope.row.dealDesc}}</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="handle(scope.row)" v-if="scope.row.dealType != 4">处理</el-button>
                                <el-button type="text" size="small" v-if="scope.row.dealType == 4">-</el-button>
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
        <handlePage :cdata="checkData" v-if="showDo" @func="closeHandle"></handlePage>
    </div>
</template>
<script>
import {AlarmService} from "../../../../api/alarm";
import alarmDetail from "./alarmDetail.vue";
import handlePage from "./handle";
export default {
    name: 'alarmList',
    components:{
        alarmDetail,
        handlePage
    },
    data(){
        return{
            options2:[{'label':'全部',value:''},{'label':'普通提示',value:'1'},{'label':'一般告警',value:'2'},{'label':'严重告警',value:'3'}],
            times:'',
            alarmLevel:'',
            pickerOptions:{
                disabledDate(time) {
                    return time.getTime() > Date.now() 
                }
            },
            loading:false,
            tableData:[{}],
            currentPage: 1,
            pageSize: 15,
            total: 0,
            checkData:{},// 选中的告警
            showDo:false,
        }
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
        fmtTime(t){
            return this.dateFormat('YYYY-mm-dd HH:MM:SS',new Date(t));
        },
        // 查询按钮
        findAll(){
            this.currentPage = 1;
            this.find();
        },
        // 重置按钮
        resetting(){
            this.times = [];
            this.currentPage = 1;
            this.find()
        },
        find(){
            this.loading = true;
            let page={ curPage:this.currentPage,pageSize:this.pageSize,sortname:'alarm_Time',sortorder:'desc'};
            let alarm={};
            if(this.times && this.times.length>0){
                alarm.beginTime =this.dateFormat("YYYY-mm-dd",new Date(this.times[0])) +' 00:00:00';
                alarm.endTime =this.dateFormat("YYYY-mm-dd",new Date(this.times[1])) +' 23:59:59' ;
            }
            alarm.alarmLevel = this.alarmLevel;
            AlarmService.getAlarmList({'page':page,'alarm':alarm}).then((res)=>{
                this.tableData = res.dataList;
                this.loading = false;
                this.total = res.total;
            })
            
        },
        check(dt){
            this.checkData = dt;
        },
        // 处理
        handle(dt){
            this.showDo = true;
            this.checkData = dt;
        },
        closeHandle(da){
            if(da == 'ok'){
                this.find();
            }
            this.showDo = false;
        },
        //告警内容截取
        contentBack(cont){
            if(cont){
                let ct = cont.indexOf('告警时间戳');
                if(ct>-1){
                    let conts = cont.substring(0,ct);
                    return conts;
                }else{
                    return cont;
                }
            }
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
};
</script>
<style scoped>
.contp{
    display: flex;
    justify-content: center;
}
.yz{
    color: #ff1919;
    border:1px solid #ff1919;
    border-radius: 4px;
}
.tx{
    color:#409EFF;
    border:1px solid #409EFF;
    border-radius: 4px;
}
.tx2{
    color:#88a1c6;
    border:1px solid #88a1c6;
}
</style>