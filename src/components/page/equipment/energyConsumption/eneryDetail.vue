<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="房间插座详情" :close-on-click-modal="false">
            <el-container>
                <div>
                    <div v-for="(value,key,index) in socketList" :key="index">
                        <el-row>
                            <el-col :span="4" style="text-align: center">插座</el-col>
                            <el-col :span="20">
                                <div :id="'chartLineBox' + key" style="width: 95%; height: 300px"></div>
                            </el-col>
                        </el-row>
                        <div class="xuxian" v-if="index != socketList.length - 1"></div>
                    </div>
                </div>
            </el-container>
        </el-dialog>
    </div>
</template>
<script>
import { EquipmentService } from '../../../../api/equipment';
export default {
    name: 'energyDetail',
    props: ['funq', 'stime', 'etime', 'rid'],
    data() {
        return {
            dialogVisible: true,
            chartLine: null,
            socketList: {}
        };
    },
    mounted() {
            EquipmentService.getRoomEnergy({ roomId: this.rid, startDate: this.stime, endDate: this.etime }).then((res) => {
                this.socketList = res;
                setTimeout(()=>{
                    for (let key in this.socketList) {
                        this.createChart(key, this.socketList[key]);
                    }
                },200)
            });
        
    },
    methods: {
        createChart(did, dt) {
            let idn = 'chartLineBox' + did;
            let xdata = [];
            let sdata = [];
            for (let x = 0; x < dt.length; x++) {
                xdata.push(dt[x].date);
                sdata.push(dt[x].totalQuantity);
            }
            let chartLine = this.$echarts.init(document.getElementById(idn));
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['总电量']
                },
                color: ['#5999e3'],
                grid: {
                    bottom: 40
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xdata,
                    nameTextStyle: {
                        color: '#838589',
                        fontSize: 16
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#838589'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    name:'度',
                    nameTextStyle: {
                        color: '#838589',
                        fontSize: 16
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#838589'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    type: 'value'
                },
                series: [
                    {
                        name: '总电量',
                        data: sdata,
                        type: 'line', // 类型为折线图
                        lineStyle: {
                            // 线条样式 => 必须使用normal属性
                            normal: {
                                color: '#5999e3'
                            }
                        }
                    }
                ]
            };
            chartLine.setOption(option);
        },
        //取消
        handleClose: function () {
            this.dialogVisible = false;
            console.log('去下');
            this.$emit('funq');
        }
    }
};
</script>
<style scoped>
.xuxian {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #ddd;
    margin-bottom: 20px;
}
</style>