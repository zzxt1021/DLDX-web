<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="房间管理" :close-on-click-modal="false">
            <el-container>
                <div>
                    <div class="modelK">
                        <p class="modelTit">房间信息</p>
                    </div>
                    <div style="overflow:hidden">
                        <el-row class="htp">
                            <el-col :span="12">
                                <el-row>
                                    <el-col :span="5">所在位置：</el-col>
                                    <el-col :span="16">
                                        <el-input v-model="bdName" disabled></el-input>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="12">
                                <el-row>
                                    <el-col :span="5">房间类型：</el-col>
                                    <el-col :span="16">
                                        <el-select v-model="oData.roomType" placeholder="请选择">
                                            <el-option
                                                v-for="item in roomTypeList"
                                                :key="item.code + 'p'"
                                                :label="item.name"
                                                :value="item.code"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row class="htp">
                            <el-col :span="12">
                                <el-row>
                                    <el-col :span="5">房间名称：</el-col>
                                    <el-col :span="16">
                                        <el-input v-model="oData.roomName" ></el-input>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="12">
                                <el-row>
                                    <el-col :span="5">面积：</el-col>
                                    <el-col :span="16">
                                        <el-input v-model="oData.square"></el-input>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row class="htp" v-if="oData.roomType!='20'">
                            <el-col :span="12">
                                <el-row>
                                    <el-col :span="5">房间状态：</el-col>
                                    <el-col :span="16">
                                        <el-select v-model="oData.useState" placeholder="请选择">
                                            <el-option
                                                v-for="item in roomStateList"
                                                :key="item.code"
                                                :label="item.name"
                                                :value="item.code"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="modelK" v-if="oData.roomType!='20'">
                        <p class="modelTit">收费信息</p>
                    </div>
                    <div class="detailTable" v-if="oData.roomType!='20'">
                            <div class="detailTablehd">
                                <p>收费规则</p>
                                <p>房费(元)</p>
                                <p>押金(元)</p>
                            </div>
                            <div class="detailTablehd detailTablebd" v-for="(mo, k) in moneyList" :key="k">
                                <p>{{ mo.name }}</p>
                                <p>{{ mo.price }}</p>
                                <p>{{ mo.deposit }}</p>
                            </div>
                        </div>
                    <div class="modelK">
                        <p class="modelTit">备注信息</p>
                    </div>
                    <el-input type="textarea" rows="3" v-model="oData.remark"></el-input>
                </div>
                
            </el-container>
            <div slot="footer" class="dialog-footer" style="height: 40px; border-top: 1px solid #ccc">
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
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { SystemService } from '../../../../api/system';
import { RoomService } from "../../../../api/room";
export default {
    name:'editRoom',
    props:['funx','data'],
    data(){
        return{
            dialogVisible:true,
            bdName:'',
            oData:JSON.parse(this.data),
            roomTypeList:[],
            roomStateList:[{'name':'空闲','code':'0'},{'name':'满员','code':'2'},{'name':'待打扫','code':'3'},{'name':'不可用','code':'9'}],
        }
    },
    mounted(){
        this.bdName = this.oData.buildingType1Name + this.oData.buildingType2Name + this.oData.buildingType3Name;
        SystemService.getSysCodePid('20').then((res) => {
            this.roomTypeList = res;
            this.roomTypeList.push({name:'工作间',code:'20'});
        });
    },
    computed:{
        moneyList(){
            for(let x=0;x<this.roomTypeList.length;x++){
                if(this.roomTypeList[x].code == this.oData.roomType){
                    console.log(this.roomTypeList[x].value)
                    return this.roomTypeList[x].value?JSON.parse(this.roomTypeList[x].value):[];
                }
            }
            return [];
        }
    },
    methods:{
        save:function(){
            RoomService.updateBaseRoom(this.oData).then((res) => {
                if (res.status == 0) {
                    this.$message.success('保存成功！');
                    this.$emit('funx','ok');
                }
            });
        },
        handleClose:function(){
            this.dialogVisible = false;
            this.$emit('funx');
        }
    }
}
</script>
<style scoped>
.htp {
    margin-top: 15px;
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
    line-height: 30px;
}
.detailTablehd p {
    width: 33%;
    text-align: center;
    border-right: 1px solid #ccc;
}
.detailTablehd p:last-child {
    border-right: none;
}
.detailTablehd:last-child {
    border: none;
}
.detailTablebd img {
    cursor: pointer;
    margin-top: 6px;
}
</style>