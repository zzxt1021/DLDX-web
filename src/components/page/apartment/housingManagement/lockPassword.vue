<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="门锁密码" :close-on-click-modal="false" width="28%">
            <el-container>
                <el-row :gutter="10">
                    <el-col :span="6" style="text-align:center">密码</el-col>
                    <el-col :span="16">
                        <el-input v-model="inp" type="number" oninput="if(value.length>8)value=value.slice(0,8)"></el-input>
                    </el-col>
                </el-row>
            </el-container>
             <div slot="footer" class="dialog-footer" style="height: 40px; border-top: 1px solid #ccc">
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
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'lockPassword',
    props:['funl'],
    data(){
        return{
            dialogVisible:true,
            inp:'',
        }
    },
    methods:{
        save:function(){
            this.dialogVisible = false;
            this.$emit('funl', this.inp);
        },
        handleClose: function () {
            this.dialogVisible = false;
            this.$emit('funl', 'close');
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
</style>