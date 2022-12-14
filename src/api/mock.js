//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css"
// console.log(nprogress);
//start():进度条开始，done：进度条结束

//1.例如axios对象方法create，去创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const request = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现/api
    baseURL:"/mock",
    //代表超时时间 5S
    timeout:5000,
});
//请求拦截器interceptors：在发送请求之前，请求拦截器可以检测到，可以在请求 发出之前做一些事情
request.interceptors.request.use((config)=>{
    //config:配置对象。对象里面有一个属性很重要，header 请求头
    //进度条开始动   
    nprogress.start();
    return config;
    
})

//响应拦截器
request.interceptors.response.use((res)=>{
    //成功的回调函数：服务器 相应数据回来后，响应拦截器可以检测到，可以做一些事情
    nprogress.done();   
    return res.data;
    
},(err)=>{
    //失败的回调函数
    return Promise.reject(new Error('faile'));
})

//对外暴露
export default request;