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
    },

    //查询部门
    getDept(data){
      return request.sendPost('/system/dept/list',data);
    },
    //查询人员
    getPeople(data){
      return request.sendPost('/system/user/list',data)
    },
    // 编辑人员
    editPeople(data){
      return request.sendPost('/system/user/edit',data)
    },
    // 删除人员
    delUser(data){
      return request.sendPost('/system/user/remove',data);
    },
    // 编辑部门
    editDept(data){
      return request.sendPost('/system/dept/edit',data);
    },
    // 删除部门
    delDept(data){
      return request.sendPost('/system/dept/remove',data);
    },
    // 所有权限
    allRole(did){
      return request.sendGet('/system/dept/role/'+did);
    },
    // 修改权限
    editRole(data){
      return request.sendPost('/system/dept/addRole',data);
    }
     
}
