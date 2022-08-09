import Vue from "vue";
import Vuex from 'vuex';
//需要使用插件一次
Vue.use(Vuex);
// 写法2
// const state = {};
// const mutations = {};
// const actions = {};
// const getters = {};

// 引入小仓库
import home from "./home";
import search from "./search";
//对外暴露Store类的一个实例
export default new Vuex.Store({
    //写法1
    // state:{},//存储数据，状态
    // mutations:{},//修改stata唯一手段
    // actions:{},//可以书写组件的业务逻辑，也可以出来异步
    // getters:{},//理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
    // state,mutations,actions,getters
    modules:{
        home,search
    }
})