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
                <object id="hfrdapiAX" classid="clsid:FA83A3E6-10E0-42B4-ABF5-3AA9411EE12E" style="height: 0"></object>

                <div class="khc">
                    <img src="../../../../assets/img/kahao.png" />
                    <p>卡号：{{ writeVal }}</p>
                </div>
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
export default {
    name:'checkRead',
    props: ['func'],
    data(){
        return{
             dialogVisible: true,
             writeVal:''
        }
    },
    methods:{
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
        },
        save(){
            this.$emit('funs', this.writeVal);
        },
        //取消
        handleClose: function () {
            this.dialogVisible = false;
            this.$emit('funs', 'close');
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