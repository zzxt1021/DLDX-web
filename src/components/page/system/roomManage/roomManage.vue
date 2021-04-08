<template>
    <div>
        <div class="breadcrumbTopTit">
            <p>位置：</p>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>系统</el-breadcrumb-item>
                <el-breadcrumb-item>房型管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <div class="btns">
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add()">新增房型</el-button>
            </div>
        </div>
        <div>
            <el-table :data="tableData" border style="width: 100%" v-loading="loading" :header-cell-style="rowStyle">
                <el-table-column type="index" width="80" align="center"></el-table-column>
                <el-table-column label="房型名称" prop="name" align="center"></el-table-column>
                <el-table-column label="可入住床数" align="center">
                    <template slot-scope="scope">
                        <p>{{JSON.parse(scope.row.value)?JSON.parse(scope.row.value).bedNum:''}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="资费" align="center">
                    <template slot-scope="scope">
                        <p v-for="(v, x) in JSON.parse(scope.row.value)?JSON.parse(scope.row.value).priceList:[]" :key="x">
                            <span>计费方式：{{ v.name }}</span>
                            <span style="padding-left: 20px">价格：{{ v.price }}/元</span>
                            <span style="padding-left: 20px">押金：{{ v.deposit }}元</span>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="140" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <addRT v-if="show" @func="closeRT" :odata="cdata"></addRT>
    </div>
</template>
<script>
import { SystemService } from '../../../../api/system';
import addRT from './add';
export default {
    name: 'roomManage',
    components: {
        addRT
    },
    data() {
        return {
            tableData: [],
            loading: false,
            show: false,
            cdata: {}
        };
    },
    mounted() {
        this.find();
    },
    methods: {
        find() {
            SystemService.getSysCodePid('20').then((res) => {
                console.log(res);
                this.tableData = res;
            });
        },
        // 新增
        add() {
            this.show = true;
            this.cdata = {};
        },
        // 编辑
        edit(da) {
            this.show = true;
            this.cdata = da;
        },
        // 关闭新增界面
        closeRT(da) {
            this.show = false;
            console.log(da);
            if (da == 'ok') {
                console.log('进来');
                this.tableData = [];
                this.find();
            }
        },
        // 删除
        del(da) {
            this.$confirm('确定删除该房型?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                SystemService.delSysCode(da.code).then((res)=>{
                    if(res.status == 0){
                        this.$message.success('操作完成！');
                        this.find();
                    }
                })
            });
        },
        rowStyle: function () {
            return { background: '#427FDA !important', color: '#fff !important' };
        }
    }
};
</script>
<style scoped>
.btns {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
}
</style>