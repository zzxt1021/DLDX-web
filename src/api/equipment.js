import request from '../utils/request';

export const EquipmentService = {
  // 设备列表
  getEquipmentList(data) {
    return request.sendPost('/device/list', data);
  },

  // 设备列表
  getEquipmentLists(data) {
    return request.sendPost('/device/devices', data);
  },

  // 删除设备
  delEquipment(id) {
    return request.sendDelete('/device/remove/'+id);
  },

  // 根据设备id查询设备数据
  getEquipment(id){
    return request.sendGet('/device/query/'+id);
  },

  // 主机网关树
  getGateWayTree(){
    return request.sendGet('/device/tree');
  },

  //更改设备状态
  updateDevice(data){
    return request.sendPost('/device/operate',data);
  },
  //批量
  updateDevices(data){
    return request.sendPost('/device/operates',data);
  },

  // 门锁卡列表
  cardList(data){
    return request.sendPost('/base/card/use/list',data);
  },
  //登记门禁卡在门锁使用权限
  cardWithDevice(data){
    return request.sendPost('/base/card/registe/lock',data);
  },
  //登记门禁卡使用信息
  cardInfo(data){
    return request.sendPost('/base/card/registe/use',data);
  },
  //注销门禁卡在门锁的授权
  unbindCardDev(data){
    return request.sendPost('/base/card/unregiste/lock',data);
  },

  // 能耗列表
  getEnergyList(data){
    return request.sendPost('/device/power/days',data);
  },
  //能耗单个房间详情
  getRoomEnergy(data){
    return request.sendPost('/device/power/room',data);
  },

  //总能耗统计
  getEnergy(data){
    return request.sendPost('/device/power/sum',data);
  },

  //设备状态统计
  getDeviceStatus(){
    return request.sendGet('/device/status');
  },
}
