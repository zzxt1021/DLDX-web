<template>
    <div>
        <el-dialog
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            :width="40 + '%'"
            title="员工信息"
            :close-on-click-modal="false"
        >
            <el-container>
                <div>
                    <el-row :gutter="20" class="htp">
                        <el-col :span="4" style="text-align: right; margin-top: 5px">员工姓名</el-col>
                        <el-col :span="7">
                            <el-input placeholder="请输入姓名" v-model="user.name"></el-input>
                        </el-col>
                        <el-col :span="4" style="text-align: right; margin-top: 5px">性别</el-col>
                        <el-col :span="7">
                            <el-radio-group v-model="user.sex" size="medium" >
                                <el-radio-button label="男"></el-radio-button>
                                <el-radio-button label="女"></el-radio-button>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="htp">
                        <el-col :span="4" style="text-align: right; margin-top: 5px">登录名</el-col>
                        <el-col :span="7">
                            <el-input placeholder="请输入登录时用的用户名" v-model="user.userName"></el-input>
                        </el-col>
                        <el-col :span="4" style="text-align: right; margin-top: 5px">密码</el-col>
                        <el-col :span="7">
                            <el-input placeholder="请输入登录时用的密码" type="password" v-model="user.password"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="htp">
                        <el-col :span="4" style="text-align: right; margin-top: 5px">手机号</el-col>
                        <el-col :span="7">
                            <el-input placeholder="请输入手机号" v-model="user.tel"></el-input>
                        </el-col>
                        <el-col :span="4" style="text-align: right; margin-top: 5px">电子邮箱</el-col>
                        <el-col :span="7">
                            <el-input placeholder="请输入电子邮箱" v-model="user.email"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="htp">
                        <el-col :span="4" style="text-align: right; margin-top: 5px">所属部门</el-col>
                        <el-col :span="7">
                            <el-cascader
                                v-model="deptIds"
                                :options="deptList"
                                :props="{ checkStrictly: true, children: 'nodes', value: 'id', label: 'deptName' }"
                                clearable
                                style="width: 100%"
                            ></el-cascader>
                        </el-col>
                        <!-- <el-col :span="4" style="text-align: right; margin-top: 5px">所属岗位</el-col>
                        <el-col :span="7">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                            </el-select>
                        </el-col> -->
                    </el-row>
                    <el-row :gutter="20" class="htp">
                        <el-col :span="4" style="text-align: right; margin-top: 5px">备注</el-col>
                        <el-col :span="18">
                            <el-input type="textarea" :rows="3" placeholder="请输入备注"></el-input>
                        </el-col>
                    </el-row>
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
export default {
    name: 'peopleDetails',
    props: ['func','odata'],
    data() {
        return {
            dialogVisible: true,
            deptList: [],
            user:{},
            deptIds:[],
        };
    },
    mounted(){
        SystemService.getDept({}).then((res)=>{
            this.deptList = res;
        })
        if(this.odata){
            this.user = {...this.odata};
            this.deptIds =[this.odata.deptId] ;
        }
    },
    methods: {
        save(){
            if(!this.user.name){
                this.$message.warning('请输入员工姓名');
                return;
            }
            if(this.deptIds.length == 0){
                this.$message.warning('请选择所属部门');
                return;
            }
            if(this.user.password && this.user.userName){
                if(this.user.password.length != 32){
                    this.user.password = this.$md5(this.user.password+'zjgxhc')
                }
                
            }else{
                this.$message.warning('请完善登录信息');
                return;
            }
            let user = Object.assign(this.user,{'deptId':this.deptIds.pop()})
            SystemService.editPeople(user).then((res)=>{
                if(res.status == 0){
                    this.$message.success('操作成功！');
                    this.$emit('func', 'ok');
                }
            })
        },
        handleClose: function () {
            this.dialogVisible = false;
            this.$emit('func', 'close');
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
.htp {
    margin-top: 15px;
}
</style>