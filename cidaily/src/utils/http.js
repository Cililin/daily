import axios from "axios";
//treeshaker

const _axios = axios.create({ //使用axios库创建一个配置了基础URL的axios实例
    baseURL: "https://apis.netstart.cn/zhihudaily",

});

//请求拦截器 浏览器在发起请求之前拦截下来 可以在此处配置？如权限认证 登录认证
_axios.interceptors.request.use(config => {
    return config;
}, err => {
    return Promise.reject(err);
});

//响应拦截器 在服务器发送数据到浏览器，这个数据还没有传到组件时，对数据进行处理
//如简化服务器端的数据
_axios.interceptors.response.use(res => {
    return res;
});

export default _axios; //公开配置好的axios对象