//当前模块：API进行统一管理
import request from "./request";
import mockRequests from "./mock"
//三级联动接口
///api/product/getBaseCategoryList get 无参数
//对外暴露  其他能使用该函数
export const reqCategoryList = () =>{
    //发请求:axios发请求返回结果Promise对象
    return request({url:'/product/getBaseCategoryList',metod:'get'});
}

//获取轮播图数据
export const reqGetBannerList = () =>{
    return mockRequests.get('/banner')
}
//获取floor数据
export const reqGetFloorList = () =>{
    return mockRequests.get('/floor')
}
//获取Search数据
///api/list post 有参数 params为空参
export const reGetSearchList = (params) =>{
    return request({url:'/list',method:'post',data:params})
}

//获取产品详情信息数据接口Detail
