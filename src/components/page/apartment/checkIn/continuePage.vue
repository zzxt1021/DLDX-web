<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="续住" :close-on-click-modal="false">
            <el-container>
                <div class="modelK">
                    <p class="modelTit">入住信息</p>
                </div>
                <el-form label-width="120px">
                    <el-form-item label="入租人">
                        <el-row style="margin-bottom: 10px">
                            <el-col :span="6" class="czr">
                                <el-input v-model="consumer['consumerName']" placeholder="请填写入住人姓名" disabled></el-input>
                            </el-col>
                            <el-col :span="12" :offset="1">
                                <el-input v-model="consumer['consumerNo']" placeholder="请填写入住人身份证" disabled></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="预留手机号">
                        <el-input v-model="consumer.consumerTel" placeholder="请填写入住人手机号" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="入住时间" prop="times">
                        <div class="timeDiv">
                            <div>
                                <el-date-picker
                                    class="date"
                                    v-model="times[0]"
                                    type="date"
                                    disabled
                                >
                                </el-date-picker>
                                <span style="padding:0 10px">至</span>
                                <el-date-picker
                                    class="date"
                                    v-model="times[1]"
                                    :picker-options="endDatePicker"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="结束时间"
                                >
                                </el-date-picker>
                            </div>
                            <div class="dayDiv">
                                <el-input v-model="days" :disabled="true"></el-input>
                                <span style="padding-left: 10px">天</span>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="备注" prop="">
                        <el-input type="textarea" :rows="3" placeholder="备注信息" v-model="remark"> </el-input>
                    </el-form-item>
                </el-form>
                <el-footer style="height: 40px; border-top: 1px solid #ccc">
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
                </el-footer>
            </el-container>
        </el-dialog>
    </div>
</template>
<script>
import {RoomService} from '../../../../api/room'
export default {
    name: 'continuePage',
    props: ['roomData', 'funx'],
    data() {
        return {
            consumer: {},
            days: 0,
            times: [],
            endTime:'',
            dialogVisible: true,
            endDatePicker:this.endDate() ,
            remark:'',
            contractId:'',
        };
    },
    mounted(){
        // RoomService.checkContractByRomm(this.roomData.roomId).then((res)=>{
        //     console.log(res);
        //     this.contractId = res.contract.contractId;
        //     this.consumer.consumerName =  res.contract.consumerName;
        //     this.consumer.consumerTel =  res.contract.consumerTel;
        //     this.consumer.consumerNo =  res.contract.consumerNo;
        //     this.times = [res.contract.reserveStartDate.substring(0,10),res.contract.reserveEndDate.substring(0,10)];
        //     this.endTime = res.contract.reserveEndDate.substring(0,10)

        // })
    },
    methods: {
        endDate(){
            const self = this
            return{
                disabledDate(time) {
                    return time.getTime() <= (new Date(self.endTime)).getTime() - 8.64e7;
                }
            }
        },
        save(){
            RoomService.editOrder({'contract':{'contractId':this.contractId,'roomId':this.roomData.roomId,'reserveStartDate':this.times[0],'reserveEndDate':this.times[1]}}).then((res)=>{
                if(res.status == 0){
                    this.$message.success('续住成功！');
                    this.$emit('funx', 'close');
                }else{
                    this.$alert('出错了：'+res.message);
                }
            })
        },
        //取消
        handleClose: function () {
            this.dialogVisible = false;
            this.$emit('funx', 'close');
        },
    },
    watch: {
        // 计算天数
        times: function () {
            if (this.times) {
                console.log(this.times);
                let dateDiff =new Date(this.times[1]).getTime() - new Date(this.times[0]).getTime(); //时间差的毫秒数
                let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
                this.days = dayDiff;
            } else {
                this.days = 0;
            }
        }
    }
};
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
.timeDiv {
    display: flex;
}
.dayDiv {
    margin-left: 15px;
    width: 70px;
    display: flex;
}
.modelK {
    height: 40px;
    border-bottom: 1px solid #e2e2e2;
    color: #08588e;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.modelTit {
    border-bottom: 2px solid #08588e;
}
</style>