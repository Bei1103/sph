import Vue from 'vue'
import App from './App.vue'
//引入全局的三级联动
import TypeNav from './components/TypeNav'
Vue.component(TypeNav.name,TypeNav)
//引入全局的轮播图
import Carsousel from '@/components/Carousel'
Vue.component(Carsousel.name,Carsousel)
//引入分页
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)
//引入路由
import router from './router'
//引入仓库
import store from './store'
//引入mock
import '@/mock/mockServer'
//引入swiper样式
import "swiper/css/swiper.css"
//测试
import {reqCategoryList} from '@/api';
reqCategoryList();
Vue.config.productionTip = false

new Vue({

  //注册路由
  router,
  //注册仓库
  store,
  render: h => h(App),
  //全局事件总线$bus配置
  // this就是Vue
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount('#app')
