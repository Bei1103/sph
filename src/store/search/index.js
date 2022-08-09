import {reGetSearchList} from '@/api'
const state = {
    GetSearchList:{}
};
const mutations = {
    GETSEARCHLIS(state,GetSearchList){
        state.GetSearchList =GetSearchList;
    }
};
const actions = {
    async GetSearchList({commit},params={}){
        let result = await reGetSearchList(params);
        console.log(result);
        if(result.code==200){
            commit("GETSEARCHLIS",result.data)
        }
    }
};
//简化仓库中的数据getters
const getters = {
    //这里传进去的是state
    goodsList(state){
        // console.log(state);
        //如果没网就容易出现问题，所以看看返回什么就加上空的
        return state.GetSearchList.goodsList||[];
    },
    AttrsList(state){
        // console.log(state);
        return state.GetSearchList.attrsList||[];
    },
    TrademarkList(state){
        // console.log(state);
        return state.GetSearchList.trademarkList||[];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}