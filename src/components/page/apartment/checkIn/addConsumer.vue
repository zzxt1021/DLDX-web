<template>
    <div>
         <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="入住人添加" :close-on-click-modal="false">
            <el-container>
                <div class="modelK">
                    <p class="modelTit">添加入住人</p>
                </div>
                <el-form label-width="120px">
                    <el-form-item label="入住人姓名">
                        <el-input v-model="consumerList[0].consumerName" placeholder="请填写入住人姓名" style="width:80%"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号码">
                        <el-input v-model="consumerList[0].consumerNo" placeholder="请填写入住人身份证号" style="width:80%"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="consumerList[0].consumerTel" placeholder="请填写入住人手机号" style="width:80%"></el-input>
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
import {RoomService} from '../../../../api/room';
export default {
    name:'addConsumer',
    props:['funa','roomData'],
    data(){
        return{
            dialogVisible: true,
            consumerList:[{}],
        }
    },
    mounted(){
        //  RoomService.checkContractByRomm(this.roomData.roomId).then((res)=>{
        //     this.contractId = res.contract.contractId;
        //     this.stime = res.contract.reserveStartDate.substring(0,10);
        //     this.etime = res.contract.reserveEndDate.substring(0,10)
        // })
    },
    methods:{
        save(){
            if(this.consumerList.length == 0){
                this.$message.warning('请填写入住人信息！')
            }else{
                for(let k=0;k<this.consumerList.length;k++){
                   if (this.consumerList[k].consumerName && this.consumerList[k].consumerNo) {
                        let reg = /(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)|(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^\d{17}(\d|X|x)$)/;
                        // if (reg.test(this.consumerList[k].consumerNo) === false) {
                        //     this.$message.warning('身份证不合法！');
                        //     return;
                        // }
                    } else {
                        this.$message.warning('请填写正确的入住人信息！');
                        return;
                    }
                    if (this.consumerList[k].consumerTel) {
                        let reg = /^1[0-9]{10}$/;
                        // if (reg.test(this.consumerList[k].consumerTel) == false) {
                        //     this.$message.warning('手机号不合法！');
                        //     return;
                        // }
                    } else {
                        this.$message.warning('请填写预留手机号！');
                        return;
                    }
                }
            }
            let contract = {
                'contractId': this.contractId,
                'roomId':this.roomData.roomId,
                reserveStartDate: this.stime,
                reserveEndDate: this.etime,
            };
            RoomService.editOrder({ consumers: this.consumerList, contract: contract }).then((res) => {
                if (res.status == 0) {
                    this.$message.success('办理成功！');
                    this.$emit('funa', 'ok');
                } else {
                    this.$message.warning(res.message);
                }
            });
        },
        handleClose(){
            this.dialogVisible = false;
            this.$emit('funa', 'close');
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