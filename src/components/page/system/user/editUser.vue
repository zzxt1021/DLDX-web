<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="用户密码编辑" :close-on-click-modal="false">
            <el-container>
                <div class="modelK">
                    <p class="modelTit">修改用户密码</p>
                </div>
                <el-form label-width="120px">
                    <el-form-item label="用户名">
                        <el-input v-model="userName" readonly style="width:80%"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input type="password" v-model="password" placeholder="请填写用户新密码" style="width:80%"></el-input>
                    </el-form-item>
                    <el-form-item label="确定密码">
                        <el-input type="password" v-model="passwords" placeholder="请再次填写用户新密码" style="width:80%"></el-input>
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
import {LoginService} from "../../../../api/login";
export default {
    name:'editUser',
    props:['func'],
    data(){
        return{
            dialogVisible: true,
            userName:'',
            password:'',
            passwords:'',
        }
    },
    mounted(){
        this.userName = localStorage.getItem('ms_username');
    },
    methods:{
        // 保存
        save(){
            if(!this.password && !this.passwords){
                this.$message.warning('请输入新密码！');
                return;
            }else{
                if(this.password!=this.passwords){
                    this.$message.warning('两次输入的密码请保持一致！');
                    return;
                }
            }
            let uid = localStorage.getItem('ms_userid');
            LoginService.editUser({'id':uid,'password':this.$md5(this.password+'zjgxhc')}).then((res)=>{
                if(res.status == 0){
                    this.$message.success('修改成功！');
                     this.$emit('func', 'ok');
                }
            })
           
        },
        //取消
        handleClose: function () {
            this.dialogVisible = false;
            this.$emit('func', 'close');
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
    margin-bottom: 10px;
}
.modelTit {
    border-bottom: 2px solid #08588e;
}
</style>