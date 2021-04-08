import request from '../utils/request';

export const AlarmService = {
    // 查询告警列表
    getAlarmList(data) {
        return request.sendPost('/alarm/list', data);
    },
    //查询单条告警
    getAlarm(id) {
        return request.sendGet('/alarm/query/'+id);
    },
    //处理告警
    updateAlarm(data) {
        return request.sendPost('/alarm/update',data);
    },
}