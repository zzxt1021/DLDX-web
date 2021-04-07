<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="订单编辑" :close-on-click-modal="false">
            <el-container>
                <div class="modelK">
                    <p class="modelTit">入住信息</p>
                </div>
                <el-form label-width="120px">
                    <el-form-item label="入租人">
                        <el-row style="margin-bottom: 10px" v-for="(c, x) in consumerList" :key="x">
                            <el-col :span="5" class="czr">
                                <el-input
                                    v-model="c['consumerName']"
                                    placeholder="请填写入住人姓名"
                                ></el-input>
                            </el-col>
                            <el-col :span="9" :offset="1">
                                <el-input
                                    v-model="c['consumerNo']"
                                    placeholder="请填写入住人身份证"
                                ></el-input>
                            </el-col>
                            <el-col :span="4">
                                <div style="display:flex">
                                    <p class="hzr" style="margin-left:10px" @click="ReadIDCard">读取证件</p>
                                    <p class="hzr" style="margin-left:10px" @click="randomNum">随机</p>
                                </div>
                            </el-col>
                            <el-col :span="4" :offset="1">
                                <el-radio-group v-model="c.consumerSex" size="medium" >
                                    <el-radio-button label="男"></el-radio-button>
                                    <el-radio-button label="女"></el-radio-button>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="预留手机号">
                        <el-row>
                            <el-col :span="6" v-for="(c, x) in consumerList" :key="x">
                                <el-input v-model="c.consumerTel" placeholder="请填写入住人手机号"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="房间类型">
                        <div class="timeDiv">
                            <div>
                                <el-select v-model="roomType" placeholder="请选择" :disabled="contractState == 1">
                                    <el-option v-for="item in roomTypeList" :key="item.code" :label="item.name" :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <p class="rmn">房间名称：{{ roomName }}</p>
                            <p class="crm" v-if="contractState == 2 || contractState == 3" @click="choiceRoom">选择房间</p>
                        </div>
                    </el-form-item>
                    <el-form-item label="入住时间" prop="times">
                        <div class="timeDiv">
                            <div v-if="contractState == 1">
                                <el-date-picker class="date" v-model="times[0]" type="date" disabled> </el-date-picker>
                                <span style="padding: 0 10px">至</span>
                                <el-date-picker
                                    class="date"
                                    v-model="times[1]"
                                    :picker-options="endDatePicker"
                                    type="datetime"
                                    placeholder="结束时间"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :default-time="['15:00:00']"
                                >
                                </el-date-picker>
                            </div>
                            <div v-if="contractState == 2 || contractState == 3">
                                <el-date-picker
                                    v-model="times"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="isDisabled"
                                    :default-time="['00:00:00', '15:00:00']"
                                >
                                </el-date-picker>
                            </div>
                            <div class="dayDiv">
                                <el-input v-model="days" :disabled="true"></el-input>
                                <span style="padding-left: 10px">天</span>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="押金">
                        <div class="timeDiv">
                            <el-input
                                v-model="oData.contract.deposit"
                                style="width: 220px"
                            ></el-input>
                            <span style="padding-left: 10px">元</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="备注">
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
        <roomChoice v-if="rshow" @func="closer"></roomChoice>
    </div>
</template>
<script>
import { SystemService } from '../../../../api/system';
import { RoomService } from '../../../../api/room';
import roomChoice from './roomChoice';
export default {
    name: 'editOrder',
    props: ['funx', 'oData'],
    components: {
        roomChoice
    },
    data() {
        return {
            dialogVisible: true,
            consumerList: [],
            roomType: '',
            times: '',
            etime: '',
            roomTypeList: [],
            endDatePicker: this.endDate(),
            days: 0,
            remark: '',
            contractState: '',
            roomName: '',
            isDisabled: {
                disabledDate(time) {
                    return time.getTime() <= new Date().getTime() - 8.64e7;
                }
            },
            rshow: false
        };
    },
    created() {
        this.consumerList = this.oData.consumerList.length == 0?[{}]:this.oData.consumerList;
        this.roomType = this.oData.roomDto.roomType;
        this.times = [this.oData.contract.reserveStartDate, this.oData.contract.reserveEndDate];
        this.etime = this.oData.contract.reserveEndDate;
        this.remark = this.oData.contract.remark;
        this.contractState = this.oData.contract.contractState;
        this.roomName = this.oData.roomDto.roomName;
        // 获取房间类型
        SystemService.getSysCodePid('20').then((res) => {
            this.roomTypeList = res;
        });
    },
    methods: {
        // 读取身份证
        ReadIDCard:function(){
            var ret = CertCtl.connect();
            var conn = JSON.parse(ret);
            if(conn.resultFlag != 0){
                this.$message.warning("连接失败:"+conn.errorMsg);
            }
            ret = CertCtl.readCert();
        
            var cert  = JSON.parse(ret);
            if(cert.resultFlag != 0){
                this.$message.warning("readCert失败:"+cert.errorMsg);
            }else{
                this.$message.success("读卡成功");
                this.consumerList[0].consumerNo = cert.resultContent.certNumber;
                this.consumerList[0].consumerName = cert.resultContent.partyName;
                this.consumerList[0].consumerSex = cert.resultContent.gender == 1?'男':'女';
                this.$forceUpdate();
            }
            ret = CertCtl.disconnect();
            var disConn = JSON.parse(ret);
            if(disConn.resultFlag != 0){
                this.$message.warning("disconnect失败:"+disConn.errorMsg);
            }
        },
        // 随机身份证号
        randomNum:function(){
            let timesNum = (new Date()).getTime();
            var num=parseInt(Math.random()*100000);
            this.consumerList[0].consumerNo = timesNum + String(num);
            this.$forceUpdate();
        },
        save() {
            let dc = {
                contract: {
                    contractId: this.oData.contract.contractId,
                    reserveEndDate: this.times[1],
                    reserveStartDate: this.times[0],
                    deposit: this.oData.contract.deposit,
                },
                consumers:this.consumerList
            };
            if (this.roomId) {
                dc.contract.roomId = this.roomId;
            } else {
                dc.contract.roomId = this.oData.roomDto.roomId;
            }
            RoomService.editOrder(dc).then((res) => {
                if (res.status == 0) {
                    this.$message.success('编辑成功！');
                    this.$emit('funx', 'ok');
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        endDate() {
            const self = this;
            return {
                disabledDate(time) {
                    return time.getTime() <= new Date().getTime() - 8.64e7;
                }
            };
        },
        // 选择房间
        choiceRoom() {
            console.log(this.rshow);
            this.rshow = true;
        },
        closer(d) {
            if (d != 'close') {
                this.roomType = d.roomType;
                this.roomName = d.roomName;
                this.roomId = d.roomId;
            }
            this.rshow = false;
        },
        //取消
        handleClose: function () {
            this.dialogVisible = false;
            this.$emit('funx', 'close');
        }
    },
    watch: {
        // 计算天数
        times: function () {
            if (this.times) {
                console.log(this.times);
                let dateDiff = new Date(this.times[1]).getTime() - new Date(this.times[0]).getTime(); //时间差的毫秒数
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
.rmn {
    margin-left: 20px;
}
.crm {
    margin-left: 20px;
    color: #427fda;
    text-decoration: underline;
    cursor: pointer;
}
.hzr {
    text-decoration: underline;
    color: #427fda;
    cursor: pointer;
}
</style>