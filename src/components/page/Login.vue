<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="login-left">
                <img src="../../assets/img/login-left.png" style="width:100%;height:100%"/>
            </div>
            <div class="login-right">
                <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                    <p class="loginT">登录账号</p>
                    <el-form-item prop="userName">
                        <div class="kd">
                            <div class="usname">
                                <img src="../../assets/img/username.png" />
                            </div>
                            <div class="usname-inp">
                                <el-input v-model="param.userName" placeholder="请输入用户名"></el-input>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item prop="password">
                        <div class="kd">
                            <div class="usname">
                                <img src="../../assets/img/password.png" />
                            </div>
                            <div class="usname-inp">
                                <el-input
                                    type="password"
                                    v-model="param.password"
                                    placeholder="密码"
                                    @keyup.enter.native="submitForm()"
                                ></el-input>
                            </div>
                        </div>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm()">登录</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { LoginService } from '../../api/login';
export default {
    data: function () {
        return {
            param: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate((valid) => {
                if (valid) {
                    //this.param.password = this.$md5(this.param.password+'zjgxhc');
                    let cs = {
                        userName:this.param.userName,
                        password:this.$md5(this.param.password+'zjgxhc')
                    }
                    LoginService.login(cs).then((res) => {
                        if(res.data){
                            this.$message.success('登录成功！');
                            localStorage.setItem('ms_username', res.data.userName);
                            localStorage.setItem('ms_token', res.data.token);
                            localStorage.setItem('ms_userid', res.data.userId);
                            this.$router.push('/apartment/checkIn');
                            //this.$router.push('/overview');
                        }else{
                            this.$message.error('登录失败！');
                        }
                    }).catch((err)=>{
                        console.log('走catch');
                        console.log(err);
                    });
                    
                } else {
                    this.$message.error('请输入账号和密码!');
                    return false;
                }
            });
        }
    }
};
</script>
<style >
.usname-inp .el-input__inner {
    background: transparent;

    border: none;
}
</style>
<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.png);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 36px;
    background: linear-gradient(to top, #99a0c2, #ffffff);
    -webkit-background-clip: text;
    color: transparent;
}
.ms-login {
    position: absolute;
    left: 20%;
    top: 20%;
    width: 60%;
    height: 60%;
    overflow: hidden;
}
.login-left {
    float: left;
    width: 50%;
    height: 100%;
}
.login-right {
    float: left;
    width: 50%;
    background: #fff;
    height: 100%;
}
.loginT {
    text-align: center;
    margin-bottom: 30px;
    font-size: 30px;
    font-weight: 400;
    color: #3889e4;
    margin-top: 10%;
}
.ms-content {
    padding: 30px 30px;
    background: rgba(255, 255, 255, 0.1);
}
.login-btn {
    text-align: center;
    margin-top: 15%;
}
.login-btn button {
    width: 70%;
    height: 36px;
    margin-bottom: 10px;
    background: #3889E4;
}
.kd {
    display: flex;
    border-bottom: 1px solid #ccc;
    margin-top:3%;
}
.usname {
    padding: 0 10px;
}
.usname-inp {
    flex: 1;
}
</style>