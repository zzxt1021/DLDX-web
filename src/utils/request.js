import axios from 'axios';

const baseUrl = '';
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 600000
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject();
    }
);
service.sendGet = (url, params) => {
    let token = localStorage.getItem('ms_token') || '';
    return service.request({
        url: baseUrl+url,
        method: 'GET',
        headers:{
            'Content-Type':'application/json;charset=UTF-8',
            'token':token,
            'client':'web'
        },
        data:params
        //params: params
    });
};
service.sendPost = (url, data) => {
    let token = localStorage.getItem('ms_token') || '';
    return service.request({
        url: baseUrl+url,
        method: 'POST',
        headers:{
            'Content-Type':'application/json;charset=UTF-8',
            'token':token,
            'client':'web'
        },
        data: data
    });
};
service.sendDelete = (url, data) => {
    let token = localStorage.getItem('ms_token') || '';
    return service.request({
        url: baseUrl+url,
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json;charset=UTF-8',
            'token':token,
            'client':'web'
        },
        data: data
    });
};
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject(response);
        }
    },
    error => {
        return Promise.reject(error);
    }
);

export default service;
