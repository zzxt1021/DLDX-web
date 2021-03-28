import request from '../utils/request';

export const SystemService = {
    // 大楼/单元/楼层（树形）
    getBulidingTree(data) {
      return request.sendGet('/base/building/tree/a01');
    },

    // 数据字典(根据父id)
    getSysCodePid(pid){
      return request.sendGet('/system/code/'+pid);
    },

    // 新增数据字典
    editSysCode(data){
      return request.sendPost('/system/code/edit',data);
    },

    // 删除数据字典
    delSysCode(did){
      return request.sendPost('/system/code/remove/'+did);
    },
    
    // 添加大楼/单元/楼层
    addBulidingTree(data){
      let datas=Object.assign(data,{areaId:'a01'});
      return request.sendPost('/base/building/add',datas);
    },

    // 删除大楼/单元/楼层
    delBulidingTree(data){
      return request.sendDelete('/base/building/remove',data);
    }
     
}
