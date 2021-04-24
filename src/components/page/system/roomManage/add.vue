<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="房型管理" :close-on-click-modal="false">
            <el-container>
                <div>
                    <div class="modelK">
                        <p class="modelTit">房型信息</p>
                    </div>
                    <el-row>
                        <el-col :span="4">房型名称</el-col>
                        <el-col :span="16">
                            <el-input v-model="name"></el-input>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px">
                        <el-col :span="4">可入住床数</el-col>
                        <el-col :span="16">
                            <el-input v-model="bedNum" type="number" :disabled="odata.code"></el-input>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 15px">
                        <el-col :span="4">
                            <p style="text-align: center">&nbsp;</p>
                        </el-col>
                        <el-col :span="16">
                            <el-row>
                                <el-col :span="8">
                                    <p style="text-align: center; color: #999">计费类型</p>
                                </el-col>
                                <el-col :span="8">
                                    <p style="text-align: center; color: #999">价格/元</p>
                                </el-col>
                                <el-col :span="8">
                                    <p style="text-align: center; color: #999">押金/元</p>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="4">
                            <div class="addczr" @click="add">
                                <p>
                                    <img src="../../../../assets/img/add.png" style="margin-right: 5px" />
                                </p>
                                <p class="hzr">新增</p>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 10px">
                        <el-col :span="4">资费</el-col>
                        <el-col :span="16">
                            <el-row v-for="(val, x) in valueList" :key="x" style="margin-bottom: 10px">
                                <el-col :span="8">
                                    <el-select v-model="val.type" placeholder="请选择" style="width: 100%">
                                        <el-option v-for="item in roomT" :key="item.code + 'p'" :label="item.name" :value="item.code">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="7" :push="1">
                                    <el-input v-model="val.price" type="number" placeholder="请填写价格"></el-input>
                                </el-col>
                                <el-col :span="7" :push="2">
                                    <el-input v-model="val.deposit" type="number" placeholder="请填写押金"></el-input>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="4">
                            <p class="addBtn delBtn" v-for="(val, u) in valueList" :key="u" @click="del(u)">
                                <img src="../../../../assets/img/delred.png" />
                                <span>删除</span>
                            </p>
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
    props: ['func', 'odata'],
    data() {
        return {
            dialogVisible: true,
            roomT: [
                { name: '整房', code: 'r' },
                { name: '按床', code: 'b' }
            ],
            val: '',
            name: '', //房型名称
            valueList: [{}],
            code: null,
            bedNum:1
        };
    },
    mounted() {
        if (JSON.stringify(this.odata) != '{}') {
            this.name = this.odata.name;
            this.valueList = (JSON.parse(this.odata.value)).priceList;
            this.code = this.odata.code;
            this.bedNum = (JSON.parse(this.odata.value)).bedNum;
        }
    },
    methods: {
        // 新增
        add() {
            this.valueList.push({});
        },
        // 删除
        del(x) {
            this.valueList.splice(x, 1);
        },
        save() {
            if (!this.name) {
                this.$message.warning('请输入房型名称');
                return;
            }
            if (this.valueList.length == 0) {
                this.$message.warning('请填写资费要求');
                return;
            } else {
                for (let i = 0; i < this.valueList.length; i++) {
                    if (!(this.valueList[i].type && this.valueList[i].price && this.valueList[i].deposit)) {
                        this.$message.warning('请填写完整的资费信息');
                        return;
                    }
                    if (this.valueList[i].type == 'r') {
                        this.valueList[i].name = '整房';
                    } else if (this.valueList[i].type == 'b') {
                        this.valueList[i].name = '按床';
                    }
                }
            }
            if(this.bedNum<1){
                this.$message.warning('请填写合理的床数');
                return;
            }
            let pdata = { name: this.name, value: JSON.stringify({'bedNum':Number(this.bedNum),'priceList':this.valueList}), enable: 1, type: 20 };
            if (this.code) {
                pdata.code = this.code;
            }
            SystemService.editSysCode(pdata).then((res) => {
                if (res.status == 0) {
                    this.$message.success('保存成功！');
                    this.$emit('func', 'ok');
                    this.dialogVisible = false;
                }
            });
        },
        handleClose() {
            this.dialogVisible = false;
            this.$emit('func', 'close');
        }
    }
};
</script>
<style scoped>
.addczr {
    display: flex;
    margin-left: 20px;
}
.hzr {
    text-decoration: underline;
    color: #427fda;
    cursor: pointer;
}
.addBtn {
    display: flex;
    align-items: center;
    color: #427fda;
    cursor: pointer;
    margin-left: 20px;
}
.addBtn span {
    border-bottom: 1px solid #427fda;
    margin-left: 6px;
    line-height: 18px;
    border-color: #e94c49;
}
.delBtn {
    color: #e94c49;
    margin-top: 5px;
    margin-bottom: 22px;
}
</style>