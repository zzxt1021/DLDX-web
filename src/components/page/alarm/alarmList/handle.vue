<template>
    <div>
         <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="告警处理" :close-on-click-modal="false">
            <el-container>
                <div class="modelK">
                    <p class="modelTit">处理信息</p>
                </div>
                <el-form label-width="120px">
                    <el-form-item label="处理人">
                        <el-input v-model="people" style="width:80%" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="处理备注">
                        <el-input type="textarea" :rows="4" v-model="mark" placeholder="可填写处理方式等" style="width:80%"></el-input>
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
    </div>
</template>
<script>
import {AlarmService} from"../../../../api/alarm"
export default {
    name:'handle',
    props:['func','cdata'],
    data(){
        return{
            dialogVisible:true,
            people:localStorage.getItem('ms_username'),
            mark:'',
        }
    },
    methods:{
        save(){
            AlarmService.updateAlarm({'id':this.cdata.id,'dealUser':this.people,'dealDesc':this.mark,'dealType':4}).then((res)=>{
                if(res.status == 0){
                    this.$message.success('操作成功！');
                    this.$emit('func','ok');
                }
            })
        },
        handleClose(){
            this.dialogVisible = false;
            this.$emit('func', 'close');
        }
    }
}
</script>
