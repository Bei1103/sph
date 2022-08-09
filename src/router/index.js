import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//配置路由
const routes = [
  {
    //要传参
    path: '/detail/:skuid',
    component: () => import('../views/Detail/index.vue'),
    meta:{show:true},
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home/index.vue'),
    meta:{show:true},
  },
  {
    path: '/home',
    component: () => import('../views/Home/index.vue'),
    meta:{show:true},
  },
  {
    path: '/search/:keyword?',
    component: () => import('../views/Search/index.vue'),
    meta:{show:true},
    name:'search',
        //路由组件可以传递props数据
    //布尔值写法:params，，，只能传递params
    // props:true, 
    //对象写法：
    // props:{a:1,b:2}
    //函数写法:可以params参数，query参数，通过props传递给路由组件
    // props:($route)=>{
    //   return{keyword:$route.params.keyword,k:$route.query.k}
    // }
    // 或者缩写
    //  props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue'),
    meta:{show:false}
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register/index.vue'),
    meta:{show:true}
  },

]




//解决编程式导航的重复报错问题
//重写push方法||replace方法
//1:先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.push;
// console.log(originPush);

//2:重写push|replace方法
//第一个参数：告诉原来的push方法，你往哪里跳转（原来的内容location）
//第二个参数：成功回调（成功resolve）
//第三个参数：失败回调（失败reject）

VueRouter.prototype.push = function(location,resolve,reject){
  // console.log(this)
  if(resolve &&reject){
    //call||apply区别
    //相同点：都可以调用函数一次，都可以篡改函数上下文一次
    //不同点：call与apply传递参数的时候，call传递参数用逗号隔开，apply方法执行，传递数组
    originPush.call(this,location,resolve,reject);
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}
VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve &&reject){
    originReplace.call(this,location,resolve,reject);
  }else{
    originReplace.call(this,location,()=>{},()=>{})
  }
}


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    // return desired position
    //返回的y就是滚动条最上方
    return { x: 0 ,y:0}
  }
})

export default router
