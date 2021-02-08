<template>
    <div>
        <el-dialog :visible.sync="dialogVisibles" :before-close="handleClose" title="设备列表" :close-on-click-modal="false" :append-to-body="true">
            <el-container>
                <div>
                    <div style="display: flex">
                        <div class="filterDiv">
                            <div class="filterBox">
                                <p>主机网关</p>
                                <div>
                                    <el-cascader
                                        v-model="gatewayIds"
                                        :options="gatewayTree"
                                        :props="{ checkStrictly: true, children: 'nodes', value: 'id', label: 'text' }"
                                        clearable
                                    ></el-cascader>
                                </div>
                            </div>
                            <div class="filterBox">
                                <p>设备类型</p>
                                <div>
                                    <el-select v-model="typeCode" placeholder="请选择" disabled>
                                        <el-option v-for="item in devList" :key="item.code+'g'" :label="item.name" :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="filterBox">
                                <p>设备名称</p>
                                <div>
                                    <el-input placeholder="请输入设备名称" v-model="deviceName"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="btns">
                            <el-button type="primary" icon="el-icon-search" @click="find">查询</el-button>
                        </div>
                    </div>
                    <template>
                        <el-table :data="tableData" border style="width: 100%;margin-top:15px;" v-loading="loading" :header-cell-style="rowStyle">
                            <el-table-column width="80" align="center">
                                <template slot-scope="scope">
                                    <el-radio v-model="radio" :label="scope.row.id">{{scope.$index+1}}</el-radio>
                                </template>
                            </el-table-column>
                            <el-table-column prop="deviceName" label="设备名称" align="center"></el-table-column>
                            <el-table-column prop="deviceTypeName" label="设备类型" align="center"></el-table-column>
                            <el-table-column prop="deviceMac" label="设备MAC" align="center"></el-table-column>
                            <el-table-column label="操作" width="100" align="center">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="checkClick(scope.row)">查看</el-button>
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
            </el-container>
            <div slot="footer" class="dialog-footer" style="height: 40px; border-top: 1px solid #ccc">
                <div class="btnss">
                    <p @click="save">
                        <img src="../../../../assets/img/gou.png" />
                        <span>确定</span>
                    </p>
                    <p style="background: #427fda" @click="handleClose">
                        <img src="../../../../assets/img/cha.png" />
                        <span>取消</span>
                    </p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {SystemService} from '../../../../api/system';
import {EquipmentService} from '../../../../api/equipment';
export default {
    name:'unboundDevices',
    props: ['funx', 'typeCode'],
    data(){
        return{
            dialogVisibles:true,
            gatewayIds:[],// 网关主机
            gatewayTree:[],
            devList:[],// 设备类型
            deviceName:'',
            tableData:[{id:111},{id:222}],
            loading:false,
            total:0,
            currentPage:1,
            pageSize:15,
            radio:''
        }
    },
    mounted(){
        // 设备大类
        SystemService.getSysCodePid('10').then((res)=>{
            this.devList = res;
        })
        // 主机网关树
        EquipmentService.getGateWayTree().then((res)=>{
            this.gatewayTree = res;
        })
    },
    methods:{
        // 数据查询
        find:function(){
            this.loading = true;
            let page = { curPage: this.currentPage, pageSize: this.pageSize };
            let device = {
                deviceName: this.deviceName,
                gateway: this.gatewayIds[1]?this.gatewayIds[1]:'',
                hostId:  this.gatewayIds[0]?this.gatewayIds[0]:'',
                deviceType:this.typeCode,
            };
            EquipmentService.getEquipmentList({'page':page,'device':device}).then((res)=>{
                this.total = res.total;
                this.tableData = res.dataList;
            })
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
        // 查看设备具体信息
        checkClick:function(val){

        },
        // 确定
        save:function(){

        },
        handleClose: function () {
            this.dialogVisibles = false;
            this.$emit('funx', 'close');
        }
    }
}
</script>
<style scoped>
.btnss {
    display: flex;
    justify-content: center;
}
.btnss p {
    width: 100px;
    line-height: 32px;
    background: #00b292;
    border-radius: 4px;
    color: #fefefe;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    margin-right: 20px;
    cursor: pointer;
}
.btnss p > img {
    margin-right: 10px;
}
</style>