<template>
    <div>
         <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="锁" :close-on-click-modal="false">
            <el-container>
                <div>
                    <div class="modelK">
                        <p class="modelTit">基础信息</p>
                    </div>
                    <div>
                        <el-row class="htp">
                            <el-col :span="4" :offset="4">所属区域：</el-col>
                            <el-col :span="10">酒店 > 一栋 > 一单元 > 一楼 > 101室</el-col>
                        </el-row>
                        <el-row class="htp">
                            <el-col :span="4" :offset="4">设备类型：</el-col>
                            <el-col :span="10">锁</el-col>
                        </el-row>
                        <el-row class="htp">
                            <el-col :span="4" :offset="4">设备MAC：</el-col>
                            <el-col :span="10">10.20.30.40</el-col>
                        </el-row>
                        <el-row class="htp">
                            <el-col :span="4" :offset="4">所属网关：</el-col>
                            <el-col :span="10">10.20.30.40</el-col>
                        </el-row>
                    </div>
                    <div class="modelK">
                        <p class="modelTit">状态信息</p>
                    </div>
                    <div>
                        <el-row class="htp">
                            <el-col :span="4" :offset="4">网络状态：</el-col>
                            <el-col :span="10">在线</el-col>
                        </el-row>
                        <el-row class="htp">
                            <el-col :span="4" :offset="4">设备状态：</el-col>
                            <el-col :span="10">正常</el-col>
                        </el-row>
                        <el-row class="htp">
                            <el-col :span="4" :offset="4">通知状态：</el-col>
                            <el-col :span="10">正常</el-col>
                        </el-row>
                    </div>
                    <div class="modelK">
                        <p class="modelTit">用户列表</p>
                    </div>
                    <div>
                        <p class="htp htp2">
                            <span class="more">更多</span>
                        </p>
                        <template>
                            <el-table :data="tableData" border style="width: 100%" v-loading="loading">
                                <el-table-column label="密码用户" align="center"></el-table-column>
                                <el-table-column label="密码类型" align="center"></el-table-column>
                                <el-table-column label="剩余次数" align="center"></el-table-column>
                                <el-table-column label="有效时段" align="center"></el-table-column>
                            </el-table>
                        </template>
                    </div>
                </div>
            </el-container>
            <div slot="footer" class="dialog-footer" style="height: 40px; border-top: 1px solid #ccc">
                <div class="btnss">
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
export default {
    name:'cipherTrunk',
    props:['funct'],
    data(){
        return{
            dialogVisible: true,
            value1:'',
            tableData:[],
            loading:false
        }
    },
    methods:{
        handleClose: function () {
            this.dialogVisible = false;
            this.$emit('funct', '2');
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
.modelK {
    height: 40px;
    border-bottom: 1px solid #e2e2e2;
    color: #08588e;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
}
.modelTit {
    border-bottom: 2px solid #08588e;
}
.htp{
    margin-top: 15px;
}
.more{
    color:#409eff;
    text-decoration:underline;
    cursor: pointer;
    text-align: right;
}
.htp2{
    margin-bottom: 15px;
    text-align: right;
}
</style>