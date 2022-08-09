import { reqCategoryList } from "@/api";
import { reqGetBannerList } from "@/api";
import { reqGetFloorList } from "@/api";
//home模块小仓库
const state = {
    //state中的默认初始值不瞎写，服务器返回对象，就是对象，返回数组就是数组
    categoryList : [],
    getBannerList: [],
    getFloorList:[]
};
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    GETBANNEERLIST(state,getBannerList){
        state.getBannerList = getBannerList;
    },
    GETFLOORLIST(state,getFloorList){
        state.getFloorList = getFloorList;
    }
};
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}){
        let result = await reqCategoryList();
        console.log(result);
        if(result.code==200){
            commit("CATEGORYLIST",result.data);
        }
    },
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        console.log(result);
            if(result.code==200){
                commit("GETBANNEERLIST",result.data);
            }
    },
    async getFloorList({commit}){
        let result = await reqGetFloorList();
        console.log(result);
        if(result.code == 200){
            commit("GETFLOORLIST",result.data);
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}