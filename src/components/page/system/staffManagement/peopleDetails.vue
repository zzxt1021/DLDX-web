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
                            <el-input placeholder="请输入ID"></el-input>
                        </el-col>
                        <el-col :span="4" style="text-align: right; margin-top: 5px">员工工号</el-col>
                        <el-col :span="7">
                            <el-input placeholder="请输入ID"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="htp">
                        <el-col :span="4" style="text-align: right; margin-top: 5px">手机号</el-col>
                        <el-col :span="7">
                            <el-input placeholder="请输入ID"></el-input>
                        </el-col>
                        <el-col :span="4" style="text-align: right; margin-top: 5px">电子邮箱</el-col>
                        <el-col :span="7">
                            <el-input placeholder="请输入ID"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="htp">
                        <el-col :span="4" style="text-align: right; margin-top: 5px">所属部门</el-col>
                        <el-col :span="7">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" style="text-align: right; margin-top: 5px">所属岗位</el-col>
                        <el-col :span="7">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="htp">
                        <el-col :span="4" style="text-align: right; margin-top: 5px">备注</el-col>
                        <el-col :span="18">
                            <el-input type="textarea" :rows="3" placeholder="请输入ID"></el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-container>
            <div slot="footer" class="dialog-footer" style="height: 40px; border-top: 1px solid #ccc">
                <div class="btnss">
                    <p>
                        <img src="../../../../assets/img/gou.png" />
                        <span>保存</span>
                    </p>
                    <p style="background: #427fda">
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
    name: 'peopleDetails',
    props: ['func'],
    data() {
        return {
            dialogVisible: true,
            input: '',
            textarea: '',
            options: []
        };
    },
    methods: {
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