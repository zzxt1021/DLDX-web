<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="读卡" :close-on-click-modal="false">
            <el-container>
                <div class="modelK">
                    <p class="modelTit">读卡操作</p>
                </div>
                <div class="doDiv">
                    <!-- <p @click="Connect" class="connectClass">
                        <img src="../../../../assets/img/lianjie.png" />
                        <span>1.连接读卡器</span>
                    </p> -->
                    <p @click="Connect" class="connectClass">
                        <img src="../../../../assets/img/du.png" />
                        <span>读取房卡</span>
                    </p>
                </div>
                <div class="card">
                    <img src="../../../../assets/img/cards.gif" style="" />
                </div>
                <!-- <object id="hfrdapiAX" classid="clsid:FA83A3E6-10E0-42B4-ABF5-3AA9411EE12E" style="height: 0"></object> -->

                <div class="khc">
                    <img src="../../../../assets/img/kahao.png" />
                    <p>卡号：{{ writeVal }}</p>
                </div>
                <div class="userDiv" v-if="type == 9">
                    <div>
                        <span>使用人姓名:</span>
                        <div>
                            <el-input v-model="userName" />
                        </div>
                    </div>
                    <div>
                        <span>使用房间：</span>
                        <div @click="choiceRoom">
                            <el-input v-model="roomNames" readonly />
                        </div>
                    </div>
                </div>
                <div class="userDiv" v-if="type == 9 && numDevPer != 0">
                    <div></div>
                    <div>
                        <span>设备查找：</span>
                        <div style="width: 40%">
                            <el-progress :percentage="numDevPer"></el-progress>
                        </div>
                    </div>
                </div>
                <div class="markDiv" v-if="type==9">
                    <div style="width:9.8%">有效时间：</div>
                    <div style="width: 76.5%">
                        <el-date-picker
                                v-model="times"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['00:00:00','23:59:59']"
                                prefix-icon=""
                            >
                        </el-date-picker>
                    </div>
                </div>
                <div class="markDiv">
                    <div>备注：</div>
                    <div style="width: 76.5%">
                        <el-input type="textarea" :rows="3" placeholder="备注信息" v-model="mark"> </el-input>
                    </div>
                </div>
                <div>
                    <input name="tfBlock" type="hidden" id="tfBlock" value="1" size="8" maxlength="2" />
                    <input name="tfKey" type="hidden" id="tfKey" value="FFFFFFFFFFFF" size="20" maxlength="12" />
                </div>
                <div class="userDiv" v-if="type == 9 && devper != 0">
                    <div style="width: 96%">
                        <span>设备绑定：</span>
                        <div style="width: 80%">
                            <el-progress :percentage="devper"></el-progress>
                        </div>
                    </div>
                </div>
                <el-footer style="height: 40px; border-top: 1px solid #ccc">
                    <div class="btnss">
                        <!-- <p @click="clear">清数据</p> -->
                        <p @click="save" v-if="show">
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
        <room-choice v-if="cRoom" @func="closeRoom" :hasCheck="true" :roomIdss="roomIds" :roomName="roomName"></room-choice>
    </div>
</template>
<script>
import { EquipmentService } from '../../../../api/equipment';
import { RoomService } from '../../../../api/room';
import roomChoice from '../orderManagement/roomChoice.vue';
export default {
    components: { roomChoice },
    name: 'readCard',
    props: ['funs', 'stime', 'etime', 'rid', 'rname', 'type','contractId'],
    data() {
        return {
            dialogVisible: true,
            writeVal: '00000001', //写入的值
            success: true, //写入成功
            did: '', //设备id
            show: true,
            devList: [], //门锁设备列表
            devNum: 0,
            devper: 0,
            consumers: null,
            userName: '', // 使用人
            roomName: '', // 使用房间
            cRoom: false,
            roomIds: [], // 选中的使用房间
            roomName: [], //选中的使用房间
            roomNames: '',
            mark: '', //备注
            numDev: 0, //计数
            numDevPer: 0, //设备查找
            times:[],
        };
    },
    mounted() {
        let num = '';
        if (this.rid) {
            // 查询该房间是否有门锁设备
            RoomService.getRoomDevices({ roomId: this.rid, deviceType: '10-2' }).then((res) => {
                this.did = res[0].deviceId;
                if (!this.did) {
                    this.$message.warning('该房间未绑定门锁！');
                    this.show = false;
                }
            });
            // 查询该订单下的入住人
            RoomService.checkContract(this.contractId).then((res) => {
                        this.consumers = res.consumerList;
            });
        }
    },
    methods: {
        clearDev(did) {
            let dtt = {
                action: '8',
                args: {
                    userId: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
                },
                deviceId: did
            };
            EquipmentService.updateDevice(dtt).then((res) => {});
        },
        clear() {
            let device = { deviceType: '10-2' };
            EquipmentService.getEquipmentList({ device: device }).then((res) => {
                console.log(res);
                for (let k = 0; k < res.dataList.length; k++) {
                    this.clearDev(res.dataList[k].deviceId);
                }
            });
        },
        // 选择房间
        choiceRoom() {
            this.cRoom = true;
        },
        // 关闭选择界面
        closeRoom(da) {
            if (da == 'close') {
                this.cRoom = false;
                return;
            } else {
                this.devList = [];
                this.numDev = 0;
                this.cRoom = false;
                this.roomNames = da.roomName;
                this.roomIds = da.roomIds.split(',');
                this.roomName = da.roomName.split(',');
                for (let m = 0; m < this.roomIds.length; m++) {
                    this.getDev(this.roomIds[m], this.roomName[m]);
                }
            }
        },
        getDev(rid, rname) {
            RoomService.getRoomDevices({ roomId: rid, deviceType: '10-2' }).then((res) => {
                if (res.length > 0) {
                    this.devList.push({
                        roomId: rid,
                        devId: res[0].deviceId ? res[0].deviceId : '',
                        rname: rname
                    });
                } else {
                    this.$message.warning(rname + '房间未绑定门锁！');
                }
                this.numDev++;
                this.numDevPer = parseInt((this.numDev / this.roomIds.length) * 100);
                if (this.numDev == this.roomIds.length) {
                    this.$message.success('设备查找完毕，请点击确定进行制卡！');
                }
            });
        },
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
        // 后台卡与设备绑定
        cardWithDevice(did, rid, rname, wid) {
            let st,et;
            if(this.times.length>0){
                st = this.dateFormat('YYYY-mm-dd HH:MM', new Date(this.times[0]));
                et = this.dateFormat('YYYY-mm-dd HH:MM', new Date(this.times[1]));
            }else{
                st = '0000-00-00 00:00';
                et = '0000-00-00 00:00';
            }
            EquipmentService.cardWithDevice({
                cardId: this.writeVal,
                //cardId: 'E995D194',
                deviceId: did,
                roomId: rid,
                roomName: rname,
                lockUser: wid,
                startTime: st + ':00',
                endTime: et + ':00'
            }).then(() => {
                this.jishu();
            });
        },
        cardInfo(rid,rname) {
            EquipmentService.cardInfo({
                cardId: this.writeVal,
                //cardId: 'E995D194',
                type: 'g',
                usedUser: this.userName,
                mark: this.mark,
                //usedRoomId:rid,
                //usedRoomName:rname,
            }).then(() => {
                this.jishu();
            });
        },
        upName(did, wid) {
            EquipmentService.updateDevice({
                deviceId: did,
                action: 3,
                args: { userId: wid, openType: 3, nickName: this.userName }
            }).then(() => {});
        },
        // 控客绑定
        upDevice(did, rid, rname) {
            if (!did) {
                return;
            }
            let st,et;
            if(this.times.length>0){
                st = this.dateFormat('YYYY-mm-dd HH:MM', new Date(this.times[0]));
                et = this.dateFormat('YYYY-mm-dd HH:MM', new Date(this.times[1]));
            }else{
                st = '0000-00-00 00:00';
                et = '0000-00-00 00:00';
            }
            
            EquipmentService.updateDevice({
                deviceId: did,
                action: 6,
                args: {
                    openType: 3,
                    permissions: true,
                    hijack: false,
                    weekDay: [0, 1, 2, 3, 4, 5, 6],
                    key: this.writeVal,
                    //key: 'E995D194',
                    openTimes: 0,
                    startTime: st,
                    endTime: et
                }
            })
                .then((res) => {
                    let msg = JSON.parse(res.message);
                    if (msg.data.success == true) {
                        let wid = msg.data.data;
                        this.cardWithDevice(did, rid, rname, wid);
                        this.cardInfo(rid,rname);
                        // this.upName(did, wid);
                    } else if (msg.data.success == false && (msg.data.errorCode == -515 ||msg.data.errorCode == 515)) {
                        this.$message.success('该门卡已绑定房间设备！');
                        this.jishu();
                        this.jishu();
                    } else {
                        console.log(res);
                        this.$message.warning(rname + '房间设备未绑定！');
                    }

                    if (res.status == 0) {
                        this.jishu();
                    }
                })
                .catch((err) => {
                    console.log('报错');
                    console.log(did);
                    console.log(err);
                });
        },
        jishu() {
            this.devNum++;
            this.devper = parseInt((this.devNum / (this.devList.length * 3)) * 100);
            if (this.devNum == this.devList.length * 3) {
                this.$message.success('已生成！');
                this.$emit('funs', 'ok');
            }
        },
        async save() {
            if (this.type == 9) {
                if (this.success) {
                    if (!this.userName) {
                        this.$message.warning('请填写使用人！');
                        return;
                    }
                    if (this.numDev != this.roomIds.length) {
                        this.$message.warning('设备未查找完，请稍等！');
                        return;
                    }
                    let mx = 0;
                    for (let k = 0; k < this.devList.length; k++) {
                        this.upDevice(this.devList[k].devId, this.devList[k].roomId, this.devList[k].rname);
                    }
                } else {
                    this.$message.warning('请成功写入房卡！');
                }
            } else {
              if (this.success) {
                const rLoading = this.openLoading();
                  EquipmentService.addRoomDevCard({'contractId':this.contractId,'cardId':this.writeVal}).then((res)=>{
                      rLoading.close();
                      if(res.status==0){
                        this.$message.success('绑定成功！');
                        this.dialogVisible = false;
                        this.$emit('funs', this.did);
                      }
                  })
                    // let st, et;
                    // if (!this.stime) {
                    //     st = '0000-00-00 00:00';
                    //     et = '0000-00-00 00:00';
                    // } else {
                    //     st = this.stime.substring(0,16);
                    //     et = this.etime.substring(0,16);;
                    // }
                    // const rLoading = this.openLoading();
                    // const bdata = await EquipmentService.updateDevice({
                    //     deviceId: this.did,
                    //     action: 6,
                    //     args: {
                    //         openType: 3,
                    //         permissions: true,
                    //         hijack: false,
                    //         weekDay: [0, 1, 2, 3, 4, 5, 6],
                    //         key: this.writeVal,
                    //         //key: '008881991',
                    //         openTimes: 0,
                    //         startTime: st,
                    //         endTime: et
                    //     }
                    // });
                    // let msg = JSON.parse(bdata.message);
                    // if (msg.data.success == true) {
                    //     let wid = msg.data.data;
                    //     EquipmentService.cardWithDevice({
                    //         cardId: this.writeVal,
                    //         //cardId:'008881991',
                    //         deviceId: this.did,
                    //         roomId: this.rid,
                    //         roomName: this.rname,
                    //         lockUser: wid,
                    //         startTime: this.stime,
                    //         endTime: this.etime
                    //     }).then((res) => {
                    //         if(res.status!=0){
                    //             this.$message.error(res.msg);
                    //         }
                    //     });
                    //     EquipmentService.cardInfo({
                    //         cardId: this.writeVal,
                    //         //cardId:'008881991',
                    //         type: 'k',
                    //         usedUser: this.consumers[0].consumerName,
                    //         contractId: this.contractId,
                    //         usedRoomId: this.rid,
                    //         mark: this.mark,
                    //         usedRoomName:this.rname,
                    //     }).then((res) => {
                    //         if(res.status!=0){
                    //             this.$message.error(res.msg);
                    //         }
                    //     });
                    //     rLoading.close();
                    //     this.$message.success('绑定成功！');
                    //     this.dialogVisible = false;
                    //     this.$emit('funs', this.did);
                    // } else if(msg.data.success == false && (msg.data.errorCode == -515 || msg.data.errorCode == 515)){
                    //     this.$message.success('该门卡已绑定房间设备！');
                    //     rLoading.close();
                    //     this.dialogVisible = false;
                    //     this.$emit('funs', this.did);
                    // } else {
                    //     rLoading.close();
                    //     this.$message.error('绑定失败！');
                    // }
                } else {
                    this.$message.warning('请成功写入房卡！');
                }
            }
        },
        // 绑定成功后，是否继续绑定
        bindSuccess() {
            this.$confirm('是否再绑定一张门卡?', '提示', {
                confirmButtonText: '制作',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.success = false;
                    this.writeVal = '';
                })
                .catch(() => {
                    this.dialogVisible = false;
                    this.$emit('funs', this.did);
                });
        },
        // 连接读卡器+读卡
        Connect() {
            var status;
            status = hfrdapiAX.W_Sys_IsOpen(0);
            if (status == true) {
                status = hfrdapiAX.W_Sys_Close(0);
                if (status != 0) {
                    this.$message.warning('W_Sys_Close faild !');
                    return;
                }
            }
            //Open reader
            status = hfrdapiAX.W_Sys_Open(0, 0, parseInt(0x0416), parseInt(0x8020));
            if (status != 0) {
                this.$message.warning('W_Sys_Open faild !');
                return;
            }

            //Init reader
            status = hfrdapiAX.W_Sys_SetAntenna(0, 0); //Close antenna
            if (status != 0) {
                this.$message.warning('W_Sys_SetAntenna faild !');
                return;
            }

            status = hfrdapiAX.W_Sys_InitType(0, 65); //Initialize the reader to ISO14443A mode
            if (status != 0) {
                this.$message.warning('W_Sys_InitType faild !');
                return;
            }

            status = hfrdapiAX.W_Sys_SetAntenna(0, 1); //Open antenna
            if (status != 0) {
                this.$message.warning('W_Sys_SetAntenna faild !');
                return;
            }

            //Success Tips
            hfrdapiAX.W_Sys_SetBuzzer(0, 20);
            //this.$message.success('连接成功!');
            this.ReadBlock();
        },
        Request() {
            this.devNum = 0;
            this.devper = 0;
            var status;

            //Check whether the reader is opened or not.
            status = hfrdapiAX.W_Sys_IsOpen(0);
            if (status != true) {
                this.$message.warning('Please connect the device first !');
                return;
            }

            //Get card serial number
            status = hfrdapiAX.W_TyA_GetCard(0, parseInt(0x52)); //0x52 = search all card
            if (status != 0) {
                this.$message.warning('W_TyA_GetCard faild !' + ' ErrorCode: 0x' + status.toString(16));
                return;
            }
            this.writeVal = hfrdapiAX.WP_String;
        },
        // 读卡
        ReadBlock() {
            this.Request();
            this.$message.success('读卡成功 !');
            this.success = true;
        },
        //取消
        handleClose: function () {
            this.dialogVisible = false;
            this.$emit('funs', 'close');
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
.card {
    display: flex;
    justify-content: center;
}
.card img {
    width: 200px;
    height: 150px;
}
.doDiv {
    margin-bottom: 10px;
}
.connectClass {
    width: 180px;
    line-height: 34px;
    text-align: center;
    background: #427fda;
    color: #fff;
    border-radius: 4px;
    margin-right: 5%;
    cursor: pointer;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.connectClass > img {
    margin-right: 10px;
}
.khc {
    color: #427fda;
    margin-bottom: 20px;
    display: flex;
    margin-top: 10px;
}
.khc > p {
    margin-left: 8px;
    text-decoration: underline;
}
.bdd {
    margin: 10px 0;
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
.userDiv {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}
.userDiv > div {
    width: 50%;
    display: flex;
    align-items: center;
}
.userDiv > div > span {
    margin-right: 15px;
}
.markDiv {
    overflow: hidden;
    margin-bottom: 10px;
}
.markDiv > div {
    float: left;
}
</style>