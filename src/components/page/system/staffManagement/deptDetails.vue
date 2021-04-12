<template>
    <div>
        <el-dialog
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            :width="40 + '%'"
            title="部门信息"
            :close-on-click-modal="false"
        >
            <el-container>
                <div>
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-row :gutter="20" class="htp">
                                <el-col :span="8" style="text-align: right; margin-top: 5px">上级部门</el-col>
                                <el-col :span="14">
                                    <el-cascader
                                        v-model="lastdeptId"
                                        :options="deptList"
                                        :props="{ checkStrictly: true, children: 'nodes', value: 'id', label: 'deptName' }"
                                        clearable
                                        style="width: 100%"
                                    ></el-cascader>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" class="htp">
                                <el-col :span="8" style="text-align: right; margin-top: 5px">部门名称</el-col>
                                <el-col :span="14">
                                    <el-input placeholder="请输入部门名称" v-model="dept.deptName"></el-input>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" class="htp">
                                <el-col :span="8" style="text-align: right; margin-top: 5px">部门电话</el-col>
                                <el-col :span="14">
                                    <el-input placeholder="请输入部门电话" v-model="dept.tel"></el-input>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" class="htp">
                                <el-col :span="8" style="text-align: right; margin-top: 5px">备注</el-col>
                                <el-col :span="14">
                                    <el-input type="textarea" :rows="3" placeholder="请输入备注" v-model="dept.note"></el-input>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="8">
                            <p>菜单权限</p>
                            <el-tree
                                :data="roleData"
                                show-checkbox
                                node-key="mfId"
                                :default-checked-keys="checkedIds"
                                :props="defaultProps"
                                :style="{ height: windowHeight - 240 + 'px', 'overflow-y': 'auto' }"
                                ref="roleTree"
                            >
                            </el-tree>
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
    name: 'deptDetails',
    props: ['func', 'odata'],
    data() {
        return {
            dialogVisible: true,
            roleData: [], //权限
            defaultProps: {
                children: 'nodes',
                label: 'mfName'
            },
            windowHeight: document.documentElement.clientHeight * 0.7,
            checkedIds: [], //有权限的
            lastdeptId: [], // 上级部门
            deptList: [], // 部门列表
            dept: {}
        };
    },
    mounted() {
        SystemService.allRole('').then((res) => {
            this.roleData = res;
            if (this.odata) {
                SystemService.allRole(this.odata.id).then((res) => {
                    this.$refs.roleTree.setCheckedNodes(res);
                });
            }
        });
        SystemService.getDept({}).then((res) => {
            this.deptList = res;
        });
        if (this.odata) {
            if(this.odata.idPath){
                this.lastdeptId = this.odata.idPath.split('.');
                this.lastdeptId.pop();
            }
            this.dept= {...this.odata};
        }
    },
    methods: {
        // 保存
        save() {
            if (!this.dept.deptName) {
                this.$message.warning('请输入部门名称！');
                return;
            }
            let parentCode, dept, idPath;
            if (this.lastdeptId.length > 0) {
                parentCode = this.lastdeptId[this.lastdeptId.length - 1];
                idPath = this.lastdeptId.join('.');
                if(this.odata){
                    idPath+='.'+this.odata.id;
                }
            }else{
                idPath = this.odata.id;
            }
            dept = Object.assign(this.dept, { parentCode, idPath });
            SystemService.editDept(dept).then((res) => {
                let deptId = res.data.id;
                let mfIds = this.$refs.roleTree.getCheckedKeys().join();
                SystemService.editRole({ deptId, mfIds }).then((res) => {
                    this.$message.success('操作成功！');
                    this.$emit('func', 'ok');
                });
            });
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