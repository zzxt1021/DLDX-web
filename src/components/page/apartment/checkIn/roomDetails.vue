<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="登记" :close-on-click-modal="false">
            <el-container>
                <div class="modelK">
                    <p class="modelTit">入住信息</p>
                </div>
                <el-form ref="ruleForm" label-width="120px">
                    <el-form-item label="入住人">
                        <el-row v-for="(value, i) in consumerList" :key="i" style="margin-bottom: 10px">
                            <el-col :span="6" class="czr">
                                <el-input v-model="value['consumerName']" placeholder="请填写入住人姓名" ></el-input>
                            </el-col>
                            <el-col :span="12" :offset="1">
                                <el-input v-model="value['consumerNo']" placeholder="请填写入住人身份证" ></el-input>
                            </el-col>
                            <el-col :span="4">
                                <div style="display:flex">
                                    <p class="hzr" style="margin-left:10px" @click="ReadIDCard">读取证件</p>
                                    <p class="hzr" style="margin-left:10px" @click="randomNum">随机</p>
                                </div>
                            </el-col>
                            <!-- <object id="CertCtl" classid="clsid:30516390-004F-40B9-9FC6-C9096B59262E" type="application/cert-reader"  style="height: 20px;width:20px"></object> -->

                            <!-- <object id="CertCtl" TYPE="application/cert-reader" width="0" height="0"></object> -->
                            <!-- <el-col :span="4" :offset="1">
                                <p class="addBtn delBtn" @click="delConsumer(i)">
                                    <img src="../../../../assets/img/delred.png" />
                                    <span>删除</span>
                                </p>
                            </el-col> -->
                        </el-row>
                        <!-- <el-row  v-if="consumerList.length<2">
                            <el-col :span="10">
                                <div class="addczr">
                                    <p style="height: 20px">
                                        <img src="../../../../assets/img/add.png" style="margin-top: 6px; margin-right: 5px" />
                                    </p>
                                    <p class="hzr" @click="addConsumer">添加入住人</p>
                                </div>
                            </el-col>
                        </el-row> -->
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="预留手机号">
                                <div v-for="(cn,k) in consumerList" :key="k">
                                    <el-input v-model="cn.consumerTel" placeholder="请填写入住人手机号" style="margin-bottom:10px"></el-input>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别">
                                <div v-for="(cn,k) in consumerList" :key="k" style="width:100%">
                                    <el-radio-group v-model="cn.consumerSex" size="medium" >
                                        <el-radio-button label="男"></el-radio-button>
                                        <el-radio-button label="女"></el-radio-button>
                                    </el-radio-group>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="团队名称">
                                <el-input v-model="publicName" placeholder="请填写团队名称" style="margin-bottom:10px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="是否包房">
                        <el-radio-group v-model="contractType" size="medium" >
                            <el-radio-button label="1" :disabled="!okbf">包房</el-radio-button>
                            <el-radio-button label="2" :disabled="nobf">不包房</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <!-- <el-form-item label="收费标准" prop="fees">
                        <div class="detailTable">
                            <div class="detailTablehd">
                                <p></p>
                                <p>收费规则</p>
                                <p>房费(元)</p>
                                <p>押金(元)</p>
                            </div>
                            <div class="detailTablehd detailTablebd" v-for="(mo, k) in moneyList" :key="k">
                                <p @click="checkMoney(mo, k)">
                                    <img src="../../../../assets/img/radio.png" v-if="!mo.checked" />
                                    <img src="../../../../assets/img/radioed.png" v-if="mo.checked" />
                                </p>
                                <p>{{ mo.rules }}</p>
                                <p>{{ mo.money }}</p>
                                <p>{{ mo.deposit }}</p>
                            </div>
                        </div>
                    </el-form-item> -->
                    <el-form-item label="入住时间" prop="times">
                        <div class="timeDiv">
                            <div v-if="rtype == 1">
                                <el-date-picker class="date" v-model="times[0]" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" disabled> </el-date-picker>
                                <span style="padding: 0 10px">至</span>
                                <el-date-picker
                                    class="date"
                                    v-model="times[1]"
                                    :picker-options="endDatePicker"
                                    type="datetime"
                                    placeholder="结束时间"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :default-time="['15:00:00']"
                                    :clearable='false'
                                >
                                </el-date-picker>
                            </div>
                            <div v-else>
                                <el-date-picker
                                    v-model="times"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="isDisabled"
                                    :default-time="['00:00:00','15:00:00']"
                                >
                                </el-date-picker>
                            </div>
                            <div class="dayDiv">
                                <el-input v-model="days" :disabled="true"></el-input>
                                <span style="padding-left: 10px">天</span>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="房间选择" prop="rid" v-if="rtype == 2">
                        <div style="display:flex">
                            <p style="padding-right:20px">{{roomName}}房间</p>
                            <p class="hzr" @click="choiceRoom">点击选择房间</p>
                        </div>
                    </el-form-item>
                    <el-form-item label="实收押金" prop="">
                        <div class="yushouDiv">
                            <el-input v-model="deposit"></el-input>
                            <span style="padding-left: 10px">元</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="实收房费" prop="">
                        <div class="yushouDiv">
                            <el-input v-model="paid"></el-input>
                            <span style="padding-left: 10px">元</span>
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
                            <span>保存</span>
                        </p>
                        <p style="background: #427fda" @click="handleClose">
                            <img src="../../../../assets/img/cha.png" />
                            <span>取消</span>
                        </p>
                    </div>
                </el-footer>
            </el-container>
        </el-dialog>
        <roomChoice v-if="rcShow" :hasCheck="false" :reservetime="times" @func="closeChoice" :isbed="isbed"></roomChoice>
    </div>
</template>
<script>
import { RoomService } from '../../../../api/room';
import { SystemService } from '../../../../api/system';
import { EquipmentService } from '../../../../api/equipment';
import roomChoice from '../orderManagement/roomChoice.vue';
export default {
    name: 'roomDetails',
    props: ['func', 'roomData', 'rtype'],
    components:{
        roomChoice
    },
    data() {
        let okbed = 0;
        if(this.roomData.beds && this.roomData.beds.length>0){
            let beds = this.roomData.beds ;
            for(let x=0;x<beds.length;x++){
                if(beds[x].state=='0'){
                    okbed++
                }
            }
        }else{
            okbed = this.roomData.bedNum;
        }
        return {
            consumerList:[{consumerSex:'男'}],// 入住人数组
            moneychecked: {}, //选中的收费标准
            times: [], // 入住时间
            days: 0, //入住天数
            moneyList: [], //收费规则
            contract: {}, //订单
            consumerTel: '', // 预留电话
            yushou: '', // 预收参考
            dialogVisible: true,
            remark: '', //备注
            did: '', // 门锁id
            deposit:'',// 押金
            isDisabled: {
                disabledDate(time) {
                    // 设置日期限制 小于某个日期不能选择
                    let dt = new Date();
                    let dt1 = dt.getFullYear() + '-' + (dt.getMonth() + 1).toString() + '-' + dt.getDate().toString();
                    let dtt1 = new Date(dt1 + ' 06:00').getTime();
                    let dtt2 = new Date().getTime();
                    if (dtt2 <= dtt1) {
                        return time.getTime() <= new Date().getTime() - 8.64e7;
                    } else {
                        return time.getTime() <= new Date().getTime() - 8.64e7 ;
                    }
                }
            },
            rcShow:false,
            roomName:'',
            contractType:'2',//2-床，1房
            paid:0,//房费
            deposit:0,//押金
            okbf:okbed == this.roomData.bedNum?true:false,
            isbed:'10',
            nobf:this.roomData.bedNum == 1?true:false,//是否包房
            publicName:'',//团队名称
            allRoomTypeList:[],//收费标准所有 
            endDatePicker: this.endDate(),
            saving:true,//正在保存
        };
    },
    mounted() {
        // 收费标准
        SystemService.getSysCodePid('20').then((res) => {
            this.allRoomTypeList = res;
            for (let x = 0; x < res.length; x++) {
                if(res[x].code == this.roomData.roomType){
                    this.moneyList = JSON.parse(res[x].value).priceList;
                }
            }
            for(let q=0;q<this.moneyList.length;q++){
                if((this.moneyList[q].type == 'b' && this.contractType == 2) || (this.moneyList[q].type == 'r' && this.contractType == 1)){
                    this.moneychecked = this.moneyList[q];
                }
            }
        });
        if(this.rtype == 1){
            this.times[0] = this.dateFormat('YYYY-mm-dd',new Date())+' 00:00:00';
            this.times[1] = this.dateFormat('YYYY-mm-dd',new Date())+' 15:00:00';
        }
        if(this.roomData.bedNum == 1){
            this.contractType = 1;
        }
    },

    methods: {
        // 删除入住人
        delConsumer(i) {
            this.consumerList.splice(i, 1);
        },
        // 添加入住人
        addConsumer() {
            this.consumerList.push({consumerSex:'男'});
        },
        // 选择收费标准
        // checkMoney(d, i) {
        //     for (let k = 0; k < this.moneyList.length; k++) {
        //         this.moneyList[k].checked = false;
        //     }
        //     this.moneyList[i].checked = true;
        //     this.moneychecked = this.moneyList[i];
        // },
        // 格式化时间
        dateFormat(fmt, date) {
            let ret;
            const opt = {
                'Y+': date.getFullYear().toString(), // 年
                'm+': (date.getMonth() + 1).toString(), // 月
                'd+': date.getDate().toString(), // 日
                'H+': date.getHours().toString(), // 时
                'M+': date.getMinutes().toString(), // 分
                'S+': date.getSeconds().toString() // 秒
            };
            for (let k in opt) {
                ret = new RegExp('(' + k + ')').exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
                }
            }
            return fmt;
        },
        endDate() {
            return {
                disabledDate(time) {
                    return time.getTime() <= new Date().getTime() - 8.64e7;
                }
            };
        },
        // 选择房间
        choiceRoom:function(){
            if(this.times.length!=2){
                this.$message.warning('请选择入住时间！');
                return
            }
            this.rcShow = true;
        },
        // 关闭选择
        closeChoice:function(da){
            this.rcShow = false;
            if(da!='close'){
                this.roomName = da.roomName;
                this.roomData={roomId:da.roomId,roomType:da.roomType,useState:da.useState,roomName:da.roomName};
                console.log(this.roomData);
                for (let x = 0; x < this.allRoomTypeList.length; x++) {
                    if(this.allRoomTypeList[x].code == this.roomData.roomType){
                        this.moneyList = JSON.parse(this.allRoomTypeList[x].value).priceList;
                    }
                }
                for(let q=0;q<this.moneyList.length;q++){
                    if((this.moneyList[q].type == 'b' && this.contractType == 2) || (this.moneyList[q].type == 'r' && this.contractType == 1)){
                        this.moneychecked = this.moneyList[q];
                    }
                }
            }
        },
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
                this.$set(this.consumerList[0],'consumerNo',cert.resultContent.certNumber);
                this.$set(this.consumerList[0],'consumerName',cert.resultContent.partyName);
                this.$set(this.consumerList[0],'consumerSex',cert.resultContent.gender == 1?'男':'女');
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
            this.$set(this.consumerList[0],'consumerNo',timesNum + String(num));
        },
        // 保存
        save: function () {
            if (this.times.length == 0) {
                this.$message.warning('请选择入住时间！');
                return;
            }
            // 办理入住-1
            if(this.rtype == 1){
                 if(this.consumerList.length == 0){
                    this.$message.warning('请填写入住人信息！')
                }else{
                    for(let k=0;k<this.consumerList.length;k++){
                    if (this.consumerList[k].consumerName) {
                            let reg = /(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)|(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^\d{17}(\d|X|x)$)/;
                            // if (reg.test(this.consumerList[k].consumerNo) === false) {
                            //     this.$message.warning('身份证不合法！');
                            //     return;
                            // }
                        } else {
                            this.$message.warning('请填写正确的入住人信息！');
                            return;
                        }
                        // if (this.consumerList[k].consumerTel) {
                        //     let reg = /^1[0-9]{10}$/;
                        //     if (reg.test(this.consumerList[k].consumerTel) == false) {
                        //         this.$message.warning('手机号不合法！');
                        //         return;
                        //     }
                        // } else {
                        //     this.$message.warning('请填写预留手机号！');
                        //     return;
                        // }
                    }
                }
            }
           
            if(!this.roomData && this.roomData.roomId){
                this.$message.warning("请选择房间！");
                return;
            }
            let checkInTime,checkOutTime;
            if(this.rtype == 1){
                checkInTime = new Date(this.times[0].replace('-','/'));
                checkOutTime = new Date(this.times[1].replace('-','/'));
            }else{
                checkInTime = new Date(this.times[0]);
                checkOutTime = new Date(this.times[1]);
            }
           
            if(this.saving){
                this.saving = false;
            }else{
                return
            }
            let contract = {
                roomId: this.roomData.roomId,
                reserveStartDate: this.dateFormat('YYYY-mm-dd HH:MM:SS', checkInTime),
                reserveEndDate: this.dateFormat('YYYY-mm-dd HH:MM:SS', checkOutTime),
                remark: this.remark,
                deposit:this.deposit,
                contractType:this.contractType,
                paid:this.paid,
                publicName:this.publicName
            };
            // 是否是预定的
            if (this.rtype == 1) {
                contract.contractState = 1;
            } else {
                contract.contractState = 2;
            }
            const rLoading = this.openLoading();
            RoomService.addOrder({ consumers: this.consumerList, contract: contract }).then((res) => {
                this.saving = true;
                rLoading.close();
                if (res.status == 0) {
                    this.$message.success('办理成功！');
                    //if(contract.contractState == 1){
                         this.markSuccess(res.data);
                    //}else{
                       // this.$emit('func', 'ok',2);
                    //}
                } else {
                    this.$alert('出错了：'+res.message);
                }
            }).catch((err)=>{
                rLoading.close();
                this.$message.error(err);
            })
        },
        // 办理成功后，是否绑定卡
        markSuccess:function(data){
            this.$confirm('是否绑定门卡?', '提示', {
                confirmButtonText: '绑定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.dialogVisible = false;
                for(let v=0;v<this.consumerList.length;v++){
                    this.consumerList[v].deposit = this.deposit;
                }
                this.$emit('func', 'okcard',1,data.room?data.room:this.roomData,data.contract);
            }).catch(()=>{
                this.dialogVisible = false;
                for(let v=0;v<this.consumerList.length;v++){
                    this.consumerList[v].deposit = this.deposit;
                }
                this.$emit('func', 'ok',1,data.room,data.contract);
            })
        },
        //取消
        handleClose: function () {
            if (this.did) {
                // 查询锁用户
                let dt = {
                    action: '4',
                    args: null,
                    deviceId: this.did
                };
                EquipmentService.updateDevice(dt).then((resc) => {
                    let msg = JSON.parse(resc.message);
                    let uary = msg.data.data;
                    let uid = [];
                    for (let i = 0; i < uary.length; i++) {
                        if (uary[i].user_nickname == 'zzyy') {
                            uid.push(Number(uary[i].userid));
                        }
                    }
                    let dtt = {
                        action: '8',
                        args: {
                            userId: uid
                        },
                        deviceId:this.did
                    };
                    EquipmentService.updateDevice(dtt).then((res) => {});
                });
            }
            this.dialogVisible = false;
            this.$emit('func', 'close');
        }
    },
    computed: {
        changeData() {
            const { times, moneychecked } = this;
            return { times, moneychecked };
        }
    },
    watch: {
        contractType:function(){
            for(let q=0;q<this.moneyList.length;q++){
                if((this.moneyList[q].type == 'r' && this.contractType == 1) || (this.moneyList[q].type == 'b' && this.contractType == 2)){
                    this.moneychecked = this.moneyList[q];
                }
            }
            if(this.contractType == 1){
                this.isbed = '0'
            }else{
                this.isbed = '10';
            }
        },
        // 计算天数
        times: function () {
            if (this.times.length>0) {
                console.log(this.times);
                let dateDiff = 0;
                //时间差的毫秒数
                if(this.rtype == 1){
                    dateDiff = new Date(this.times[1].replace('-','/')).getTime() - new Date(this.times[0].replace('-','/')).getTime(); 
                }else{
                    dateDiff = new Date(this.times[1]).getTime() - new Date(this.times[0]).getTime()
                }
                let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
                this.days = dayDiff;
            } else {
                this.days = 0;
            }
        },
        //计算预收金额
        changeData() {
            if (this.rtype == 1 && this.times.length > 0 && JSON.stringify(this.moneychecked) != '{}') {
                this.paid = Number(this.days * this.moneychecked.price) ;
                this.deposit = Number(this.moneychecked.deposit)
            }
        },
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
.czr {
    position: relative;
}
.addczr {
    display: flex;
}
.hzr {
    text-decoration: underline;
    color: #427fda;
    cursor: pointer;
}
.delImg {
    position: absolute;
    right: 10px;
    top: 8px;
    cursor: pointer;
}
.detailTable {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #f9f9f9;
}
.detailTablehd {
    display: flex;
    color: #333;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
}
.detailTablehd p {
    width: 25%;
    text-align: center;
    border-right: 1px solid #ccc;
}
.detailTablehd p:last-child {
    border-right: none;
}
.detailTablehd p:first-child {
    width: 15%;
}
.detailTablehd p:nth-child(2) {
    width: 35%;
}
.detailTablehd:last-child {
    border: none;
}
.detailTablebd img {
    cursor: pointer;
}
.timeDiv {
    display: flex;
}
.dayDiv {
    margin-left: 15px;
    width: 70px;
    display: flex;
}
.yushouDiv {
    display: flex;
    width: 60%;
}
.fangkaDiv {
    display: flex;
}
.fangkaDiv p:first-child {
    padding-top: 2px;
    height: 30px;
    margin-right: 10px;
}
.fangkaDiv p:first-child img {
    cursor: pointer;
}
.addBtn {
    display: flex;
    align-items: center;
    color: #427fda;
    cursor: pointer;
}
.addBtn span {
    border-bottom: 1px solid #427fda;
    margin-left: 6px;
    line-height: 18px;
}
.delBtn {
    color: #e94c49;
    margin-top: 5px;
}
.delBtn span {
    border-color: #e94c49;
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