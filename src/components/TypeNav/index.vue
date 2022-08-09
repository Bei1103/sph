<template>
  <div class="type-nav">
    <div class="container">
      <!-- <h1>{{categoryList}}</h1> -->
      <div @mouseleave="leavesIndex" @mouseenter="enterIndex">
      <h2 class="all">全部商品分类</h2>
     <transition name="sort">
      <div class="sort" v-show="show">
        <div class="all-sort-list2" @click="goSearch">
          <div class="item" v-for="(item,index) in categoryList.slice(0,15)" :key="item.categoryId" :class="{cur:curreentIndex==index}">
            <h3 @mouseenter="changIndex(index)" >
              <a :data-categoryName="item.categoryName" :data-category1Id="item.categoryId">{{item.categoryName}}</a>
            </h3>
            <div class="item-list clearfix" :style="{display:curreentIndex==index?'block':'none'}">
              <div class="subitem" v-for="item2 in item.categoryChild" :key="item2.categoryId">
                <dl class="fore">
                  <dt>
                    <!-- <a href="">{{item2.categoryName}}</a> -->
                    <a :data-categoryName="item2.categoryName" :data-category2Id="item2.categoryId">{{item2.categoryName}}</a>

                  </dt>
                  <dd>
                    <em v-for="item3 in item2.categoryChild" :key="item3.categoryId">
                      <!-- <a href="">{{item3.categoryName}}</a> -->
                      <a :data-categoryName="item3.categoryName" :data-category3Id="item3.categoryId">{{item3.categoryName}}</a>

                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          
        </div>
      </div>
     </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import _ from  'lodash'
export default {
    name:'TypeNav',
    data() {
      return {
        //存储用户鼠标移去哪个一级分类
        curreentIndex:-1,
        show:true
      }
    },
    //组件挂载完毕：可以向服务器发请求
    mounted(){
      //通知Vuex发请求，获取数据，存储在仓库（写在APP.vue中，只执行一次就可）
      // this.$store.dispatch('categoryList');
      //如果仓库的actions里没写categoryList就会报错:[vuex] unknown action type: categoryList
      
      console.log("挂载完毕后隐藏");
      if(this.$route.path!='/'){
        this.show = false
      }
    },
    computed:{
      //这样就可以传入到<TypeNav>中了
      ...mapState({
        //  categoryList:(state)=>{
        //    console.log(state);
        //    //右边需要的是一个函数，当使用这个计算属性的时候，右边函数会执行一次
        //    //注入一个参数state。其实是大仓库的数据
        //    return state.home.categoryList
        //  }
        //可以简写为
        categoryList:state=>state.home.categoryList
      })
    },
    methods:{
      // changIndex(index){
      //   console.log(index);
      //   this.curreentIndex = index;
      // },
      // 换成es5写法:
      changIndex:_.throttle(function(index){
                console.log(index);
        this.curreentIndex = index;
      },600),
      leavesIndex(){
        console.log(666);
        this.curreentIndex = -1;
        if(this.$route.path!='/'){
          this.show = false;
        }
      },
      enterIndex(){
        if(this.$route.path!='/'){
          this.show = true
        }
      },
      //进行路由跳转方法
      goSearch(event){
        //如果用声明导航，会出现卡顿
        //最好的解决方法：编程式导航+事件委派
        //存在的问题：事件委派，是把全部的子节点【h3.dt。dl。em】的事件全部委派到父节点
        //点击a标签，才会进行路由跳转【怎么能确定点击的一点是a标签？】
        //存在另一个问题，即使你能确定点击的是a标签，如何区分一级二级三级分类的标签

        //第一个问题：把子节点当中a标签，我加上中定义属性data-categoryName，其余子节点是没有的
        let e = event.target;//获取到当前节点事件
        console.log(e);
        //节点有一个属性dataset属性，可以获取节点的中定义属性和属性值
        console.log(e.dataset);
        let {categoryname,category1id,category2id,category3id} = e.dataset;
        console.log(category1id);
        //如果标签有categoryname一定是a标签

        //完成三级联动的路由跳转与传递参数
        // this.$router.push({name:"search",query:{categoryName:'xxx',2id:'xx'}})
        if(categoryname){
          //判断一级二级三级分类
          //整理路由跳转参数
          let location = {name:'search'};
          let query = {categoryName:categoryname};
          if(category1id){
              query.category1Id = category1id;
          }else if(category2id){
              query.category2Id = category2id;
          }else{
              query.category3Id = category3id;
          }
          console.log(location)
          //整理参数
          // location.query =query; 
          // this.$router.push(location);
          //合并query和params参数
          //判断是否有params参数，有的就带上一起传
          if(this.$route.params){
            location.params = this.$route.params;
            location.query = query;
            this.$router.push(location)
          }
         
        }

      }
    }
};
</script>

<style lang='less'>
.type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }
                    .cur{
                      background: #e1251b;
                    }
                }
            }

            //过度动画(进入)
            .sort-enter {
              height: 0px;
              transform: rotate(0deg);
            }
            //过度动画(进入)
            .sort-enter-to{
              height: 461px;
              transform: rotate(360deg);
            }
            //结束
            .sort-enter-active{
              transition: all .10s linear;
            }
        }
    }

</style>