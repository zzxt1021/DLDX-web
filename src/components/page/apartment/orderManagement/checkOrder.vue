<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="订单查看" :close-on-click-modal="false">
            <el-container>
                <div>
                    <div class="modelK">
                        <p class="modelTit">订单信息</p>
                    </div>
                    <div>
                        <el-row class="htp" :gutter="20">
                            <el-col :span="12">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">订单人：</el-col>
                                    <el-col :span="12">
                                        <span>{{ odata.consumerList[0].consumerName }}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="12">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">电话号码：</el-col>
                                    <el-col :span="12">
                                        <p>{{ odata.consumerList[0].consumerTel }}</p>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row class="htp" :gutter="20">
                            <el-col :span="12">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">性别：</el-col>
                                    <el-col :span="12">
                                        <span>{{ odata.consumerList[0].consumerSex }}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="12">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">证件号：</el-col>
                                    <el-col :span="12">
                                        <span>{{ odata.consumerList[0].consumerNo }}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row class="htp" :gutter="20">
                            <el-col :span="12">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">订单时间：</el-col>
                                    <el-col :span="16">
                                        <span>{{ odata.contract.reserveStartDate }}</span>
                                        <span>至</span>
                                        <span>{{odata.contract.reserveEndDate}}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="12">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">团队名称：</el-col>
                                    <el-col :span="16">
                                        <span>{{ odata.contract.publicName }}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row class="htp" :gutter="20">
                            <el-col :span="12">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">入住时间：</el-col>
                                    <el-col :span="12">
                                        <span>{{ odata.contract.checkInTime }}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="12">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">退房时间：</el-col>
                                    <el-col :span="12">
                                        <span>{{ odata.contract.checkOutTime }}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row class="htp" :gutter="20">
                            <el-col :span="12">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">房间号：</el-col>
                                    <el-col :span="12">
                                        <span>{{ odata.roomDto.roomName }}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="12">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">房间位置：</el-col>
                                    <el-col :span="12">
                                        <span>{{ odata.roomDto.buildingType1Name }}</span>
                                        <span>-</span>
                                        <span>{{ odata.roomDto.buildingType2Name }}</span>
                                        <span>-</span>
                                        <span>{{ odata.roomDto.buildingType3Name }}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row class="htp" :gutter="20">
                            <el-col :span="12">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">房费(元)：</el-col>
                                    <el-col :span="12">
                                        <span>{{ odata.contract.paid }}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="12">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">押金(元)：</el-col>
                                    <el-col :span="12">
                                        <span>{{ odata.contract.deposit }}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row class="htp" :gutter="20">
                            <el-col :span="12">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">开票状态：</el-col>
                                    <el-col :span="12">
                                        <p v-if="odata.contract.invoice">已开票</p>
                                        <p v-else>未开票</p>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="12">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">扣费(元)：</el-col>
                                    <el-col :span="12">
                                        <span>{{ odata.contract.deduction }}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row class="htp" :gutter="20">
                            <el-col :span="12">
                                <el-row :gutter="20">
                                    <el-col :span="8" style="text-align: right">是否包房：</el-col>
                                    <el-col :span="12">
                                        <p v-if="odata.contract.contractType == '1'">包房</p>
                                        <p v-if="odata.contract.contractType == '2'">不包房</p>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                    <el-footer style="height: 40px; border-top: 1px solid #ccc;margin-top:20px">
                        <div class="btnss">
                            <p style="background: #427fda" @click="handleClose">
                                <img src="../../../../assets/img/cha.png" />
                                <span>取消</span>
                            </p>
                        </div>
                    </el-footer>
                </div>
            </el-container>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'checkOrder',
    props:['odata','func'],
    data(){
        return{
            dialogVisible:true,
            odata:{}
        }
    },
    mounted(){
        console.log(this.func)
    },
    methods:{
        handleClose(){
            this.dialogVisible = false;
            this.$emit('func');
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
    margin-top:15px;
}
</style>