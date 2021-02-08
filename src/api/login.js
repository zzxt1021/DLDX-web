import request from '../utils/request';

export const LoginService = {
  // 登录
  login(data) {
    return request.sendPost('/login', data);
  },
  // 登出
  loginOut(data) {
    return request.sendPost('/login/out', data);
  },
  // 修改用户
  editUser(data){
    return request.sendPost('/system/user/edit',data);
  }
}
