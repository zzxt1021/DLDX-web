<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover" class="cardDiv">
                    <p class="cardTit">总体入住情况</p>
                    <el-row>
                        <el-col :span="8" class="colC">
                            <div class="kd">
                                <img src="../../assets/img/home1.png" />
                                <p>
                                    <span>{{ status2 }}</span>
                                    <span style="color: #7a7a7a; font-size: 14px; padding-left: 5px">间</span>
                                </p>
                            </div>
                        </el-col>
                        <el-col :span="8" class="colC">
                            <div class="kd">
                                <img src="../../assets/img/home2.png" />
                                <p>
                                    <span>{{ status1 }}</span>
                                    <span style="color: #7a7a7a; font-size: 14px; padding-left: 5px">间</span>
                                </p>
                            </div>
                        </el-col>
                        <el-col :span="8" class="colC">
                            <div class="kd">
                                <img src="../../assets/img/home3.png" />
                                <p>
                                    <span>{{ status0 }}</span>
                                    <span style="color: #7a7a7a; font-size: 14px; padding-left: 5px">间</span>
                                </p>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover" class="cardDiv">
                    <p class="cardTit">设备在线情况</p>
                    <el-row class="kd2">
                        <el-col :span="6">
                            <div id="ecs" style="width: 100%; height: 200px"></div>
                            <p style="text-align: center; font-size: 14px">设备在线率</p>
                        </el-col>
                        <el-col :span="6">
                            <div class="devNum">
                                <div>
                                    <img src="../../assets/img/homeDev.png" />
                                    <p class="zs">设备总数</p>
                                    <p class="sz">{{devTotal}}</p>
                                </div>
                                <div>
                                    <img src="../../assets/img/homeDev.png" />
                                    <p class="zs">在线数</p>
                                    <p class="sz">{{devOnTotal}}</p>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="3" class="devNum">
                            <p class="xian"></p>
                        </el-col>
                        <el-col :span="9">
                            <p class="cardTit" style="margin-bottom:10px">离线数</p>
                            <el-row class="mbb">
                                <el-col :span="12">
                                    <el-row>
                                        <el-col :span="12">
                                            <img src="../../assets/img/deng.png" />
                                        </el-col>
                                        <el-col :span="12">
                                            <p class="cardTit2">{{undNum}}</p>
                                            <p class="cardTit3">灯</p>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="12">
                                    <el-row>
                                        <el-col :span="12">
                                            <img src="../../assets/img/chaz.png" />
                                        </el-col>
                                        <el-col :span="12">
                                            <p class="cardTit2">{{unczNum}}</p>
                                            <p class="cardTit3">插座</p>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-row class="mbb">
                                <el-col :span="12">
                                    <el-row>
                                        <el-col :span="12">
                                            <img src="../../assets/img/mb.png" />
                                        </el-col>
                                        <el-col :span="12">
                                            <p class="cardTit2">{{unmbNum}}</p>
                                            <p class="cardTit3">面板</p>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="12">
                                    <el-row>
                                        <el-col :span="12">
                                            <img src="../../assets/img/ms.png" />
                                        </el-col>
                                        <el-col :span="12">
                                            <p class="cardTit2">{{unmsNum}}</p>
                                            <p class="cardTit3">门锁</p>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-row class="mbb">
                                <el-col :span="12">
                                    <el-row>
                                        <el-col :span="12">
                                            <img src="../../assets/img/kz.png" />
                                        </el-col>
                                        <el-col :span="12">
                                            <p class="cardTit2">{{unkzNum}}</p>
                                            <p class="cardTit3">控制</p>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="12">
                                    <el-row>
                                        <el-col :span="12">
                                            <img src="../../assets/img/cgq.png" />
                                        </el-col>
                                        <el-col :span="12">
                                            <p class="cardTit2">{{uncgqNum}}</p>
                                            <p class="cardTit3">传感器</p>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-row>
                                        <el-col :span="12">
                                            <img src="../../assets/img/qt.png" />
                                        </el-col>
                                        <el-col :span="12">
                                            <p class="cardTit2">{{unqtNum}}</p>
                                            <p class="cardTit3">其他</p>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="12"> </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
            <el-col :span="12">
                <el-card shadow="hover" class="cardDiv">
                    <p class="cardTit">能耗总体情况</p>
                    <div id="energy" style="width: 100%; height: 350px"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover" class="cardDiv">
                    <p class="cardTit">告警总体情况</p>
                    <div class="tp">
                        <el-row class="rowD" v-for="(a,i) in alarmList" :key="a.id">
                            <el-col :span="4" style="text-align: center">{{i+1}}</el-col>
                            <el-col :span="10">{{a.alarmTime}}</el-col>
                            <el-col :span="10">{{a.roomName}}房间&nbsp;{{upCont(a.alarmContent)}}</el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { RoomService } from '../../api/room';
import { EquipmentService } from '../../api/equipment';
import { AlarmService } from '../../api/alarm';
export default {
    name: 'overview',
    data() {
        return {
            status1: 0, //空闲房间
            status2: 0, //入住房间
            status0: 0, //不可用房间
            alarmList:[],
            devTotal:0,
            devOnTotal:0,
            undNum:0,
            unmsNum:0,
            unmbNum:0,
            unczNum:0,
            unkzNum:0,
            uncgqNum:0,
            unqtNum:0,
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 格式化时间
        dateFormat(fmt, date) {
            let ret;
            const opt = {
                'Y+': date.getFullYear().toString(), // 年
                'm+': (date.getMonth() + 1).toString(), // 月
                'd+': date.getDate().toString(), // 日
                'H+': date.getHours().toString(), // 时
                'M+': date.getMinutes().toString(), // 分
                'S+': date.getSeconds().toString() // 秒
            };
            for (let k in opt) {
                ret = new RegExp('(' + k + ')').exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
                }
            }
            return fmt;
        },
        createChart(onNum,tnum) {
            let chart = this.$echarts.init(document.getElementById('ecs'));
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                legend: {
                    show: false,
                    data: ['在线数', '离线数']
                },
                color: ['#b5b5b5', '#32d79f'],
                series: [
                    {
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: tnum-onNum, name: '离线数' },
                            { value: onNum, name: '在线数' }
                        ]
                    }
                ]
            };
            chart.setOption(option);
        },
        upCont(cont){
            let ct = cont.indexOf('告警时间戳');
            if(ct>-1){
                let conts = cont.substring(0,ct);
                return conts;
            }else{
                return cont;
            }
            
        },
        createLine(xd,sd) {
            let chartLine = this.$echarts.init(document.getElementById('energy'));
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
                    data: xd,
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
                        data: sd,
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
        getData() {
            //房间统计
            RoomService.getRoomStatus().then((res) => {
                for (let x = 0; x < res.length; x++) {
                    if (res[x].status == '1') {
                        this.status1 = res[x].cnt;
                    }
                    if (res[x].status == '2') {
                        this.status2 = res[x].cnt;
                    }
                    if (res[x].status == '0') {
                        this.status0 = res[x].cnt;
                    }
                }
            });
            // 设备在离线
            EquipmentService.getDeviceStatus().then((res) => {
                for(let m=0;m<res.length;m++){
                    this.devTotal+=res[m].total;
                    this.devOnTotal+=res[m].onLine;
                    if(res[m].deviceType == '10-1'){
                        this.undNum = res[m].offLine
                    }else if(res[m].deviceType == '10-2'){
                        this.unmsNum = res[m].offLine
                    }else if(res[m].deviceType == '10-3'){
                        this.unmbNum = res[m].offLine
                    }else if(res[m].deviceType == '10-4'){
                        this.unczNum = res[m].offLine
                    }else if(res[m].deviceType == '10-5'){
                        this.unkzNum = res[m].offLine
                    }else if(res[m].deviceType == '10-6'){
                        this.uncgqNum = res[m].offLine
                    }else if(res[m].deviceType == '10-99'){
                        this.unqtNum = res[m].offLine
                    }
                }
                this.createChart(this.devOnTotal,this.devTotal);
            });
            let etime = this.dateFormat('YYYY-mm-dd', new Date());
            let date1 = new Date();
            let date2 = new Date(date1);
            date2.setDate(date1.getDate() - 2);
            let btime = this.dateFormat('YYYY-mm-dd', date2);
            // 告警
            AlarmService.getAlarmList({ 'alarm':{'beginTime':etime+' 00:00:00','endTime':etime+' 23:59:59'},page:{curPage: 1, pageSize: 10000,sortname: "alarm_Time", sortorder: "desc"}}).then((res) => {
                this.alarmList = res.dataList;
            });
            let date3 = new Date(date1);
            date3.setDate(date1.getDate() - 7);
            let btimes = this.dateFormat('YYYY-mm-dd', date3);
            //能耗
            EquipmentService.getEnergy({'startDate':btimes,'endDate':etime}).then((res)=>{
                let xData = [];
                let sdata = [];
                for(let x=0;x<res.length;x++){
                    xData.push(res[x].date);
                    sdata.push(res[x].TOTAL_QUANTITY);
                }
                this.createLine(xData,sdata);
            })
        }
    }
};
</script>


<style scoped>
.cardDiv {
    background: #fff;
    padding: 0px 10px;
    border-radius: 10px;
}
.cardTit {
    color: #333;
    font-size: 14px;
}
.cardTit2 {
    color: #333;
    font-size: 16px;
}
.cardTit3 {
    color: #7f7f7f;
    font-size: 14px;
}
.colC {
    margin-top: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
}
.kd {
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    text-align: center;
}
.kd > p {
    line-height: 60px;
    color: #333;
    font-size: 18px;
}
.kd2 {
    margin-top: 60px;
    margin-bottom: 36px;
}
.devNum {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.devNum > div {
    margin-top: 28px;
}
.zs {
    font-size: 14px;
    color: #7f7f7f;
}
.sz {
    margin-top: 2px;
    font-size: 18px;
    color: #333;
}
.xian {
    width: 3px;
    height: 218px;
    background: #edeff3;
}
.mbb {
    margin-bottom: 7px;
}
.rowD {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background: #f7f8fb;
    color: #333;
    margin-bottom: 8px;
}
.tp {
    margin-top: 10px;
    height: 340px;
    overflow-y: auto;
}
</style>
