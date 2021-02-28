import request from '../utils/request';

export const RoomService = {
    // 查询房间(按楼层合并)
    getRoomWithFloor(data) {
      return request.sendPost('/base/room/byfloor',data);
    },

    // 查询房间列表
    getRoomList(data){
        return request.sendPost('/base/room/list',data);
    },

    // 根据房间查询所属设备
    getRoomDevices(data){
      return request.sendPost('/base/room/devices',data);
    },

    // 房间查询
    getRoom(id){
      return request.sendGet('/base/room/'+id);
    },

    // 新增房间
    editRoom(data){
      return request.sendPost('/base/room/add',data);
    },
    // 修改房间
    updateRoom(data){
      return request.sendPost('/base/room/edit',data);
    },
   
    // 删除房间
    delRoom(data){
      return request.sendDelete('/base/room/remove',data);
    },

    // 查询模板
    getRoomTemplate(data){
      return request.sendPost('/base/room-template/list',data);
    },
     // 查看单个模板信息
     checkRoomTem(id){
      return request.sendGet('/base/room-template/'+id);
    },
    // 删除模板
    delRoomTemplate(data){
      return request.sendDelete('/base/room-template/remove',data)
    },
    // 新增删除模板
    editRoomTemplate(data){
      return request.sendPost('/base/room-template/add',data)
    },

    // 订单列表
    getOrderList(data){
      return request.sendPost('/room/contract/list',data);
    },
    //新增订单
    addOrder(data){
      return request.sendPost('/room/contract/add',data);
    },
    //办理入住
    checkInRoom(data){
      return request.sendPost('/room/contract/checkin',data);
    },
    // 退房
    checkOutRoom(id){
      return request.sendPost('/room/contract/checkout/'+id);
    },
    // 按床退房
    checkOutRoomBad(roomid,contractId){
      return request.sendPost('/room/contract/checkout/'+roomid+'/'+contractId);
    },
    //修改订单
    editOrder(data){
      return request.sendPost('/room/contract/edit',data);
    },
    //根据房间id查询订单
    checkContractByRomm(id){
      return request.sendGet('/room/contract/current/'+id);
    },
    //根据订单id查询订单信息
    checkContract(id){
      return request.sendGet('/room/contract/'+id);
    },

    //房间状态数量
    getRoomStatus(){
      return request.sendGet('/base/room/status');
    },
}
