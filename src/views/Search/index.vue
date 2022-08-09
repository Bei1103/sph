<template>
  <div>
    <TypeNav></TypeNav>
    <div class="main">  
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
           <!-- 需要子组件提交点击的内容，发给父组件 -->
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removecategoryName">x</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removekeyword">x</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removetrademark">x</i></li>
            <!-- 属性的面包屑 -->
            <li class="with-x" v-for="(item,index) in searchParams.props" :key="index">{{item.split(":")[1]}}<i @click="removeprops(index)">x</i></li>

          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradmarkInfo="tradmarkInfo" @attrinfo="attrinfo"></SearchSelector>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- //可以写在计算属性里actvie： -->
                <!-- <li :class="{active : searchParams.order.indexOf('1')!=-1}">
                  <a href="#">综合</a>
                </li>
                <li :class="{active : searchParams.order.indexOf('2')!=-1}">
                  <a href="#">销量</a>
                </li> -->
                <li :class="{active : isOne}" @click="dianji('1')">
                  <a href="#">综合<span v-show="isOne" class="iconfont" :class="{' icon-up':isasc,' icon-down':isdesc}"></span></a>
                </li>
                <li :class="{active : isTwo}"  @click="dianji('2')">
                  <a href="#">销量<span v-show="isTwo" class="iconfont" :class="{' icon-up':isasc,' icon-down':isdesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods, index) in goodsList" :key="index">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 用${}是因为是动态的 -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img :src="goods.defaultImg">
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{
                      goods.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command"
                      >已有<span>{{ goods.price }}</span
                      >人评价</i
                    >
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <!-- <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div> -->
            <!-- 分页器：测试分页器阶段，这里的 数据将来需要替换的 -->
            <!-- 当前页面1，页面内容3个，一共91条，页码5 -->
            <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getpageNo="getpageNo"></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "../../components/SearchSelector";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "",
  // props:['keyword','a','b','k']
  data() {
    return {
      //带给服务器参数
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:asc",
        pageNo: 8,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    //复杂的写法：为了给服务器传参数
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName= this.$route.query.categoryName;
    // this.searchParams.keyword= this.$route.params.keyword
    // 整合参数
    Object.assign(this.searchParams,this.$route.query,this.$route.params)
    // console.log(this.searchParams)
  },
  //因为组件挂载完成只执行一次，所以为了以后根据不同的数据请求写成方法
  mounted() {
    // this.$store.dispatch('GetSearchList',{});
    this.getDate();
  },
  //将仓库的数据拿出来用
  //但是容易出错
  //去仓库里用getters
  computed: {
    // ...mapState({
    //   goodslist:state=>state.search.GetSearchList.goodsList
    // })
    ...mapGetters(["goodsList", "AttrsList", "TrademarkList"]),
    isOne(){
      return this.searchParams.order.indexOf('1')!=-1;
    },
    isTwo(){
      return this.searchParams.order.indexOf('2')!=-1;
    },
    isasc(){
      return this.searchParams.order.indexOf('asc')!=-1;
    },
    isdesc(){
      return this.searchParams.order.indexOf('desc')!=-1;
    },
    //获取search模块展示产品一共多少天数据
    ...mapState({
      total:state=>state.search.GetSearchList.total
    })
    
  },
  methods: {
    //向服务器发送请求获取模块数据，根据参数不同返回不同的数据进行展示
    getDate() {
      //第二个参数是传给服务器的参数
      this.$store.dispatch("GetSearchList", this.searchParams);
    },
    //删除面包屑
    removecategoryName(){
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;

      this.getDate();
      //地址栏也要修改
      //需要严谨一点，删除掉query，不需要删params
      if(this.$route.params){
      this.$router.push({name:"search",params:this.$route.params})
      }
    },
    // 删除关键字
    removekeyword(){
      //给服务器带的参数serachParams的keyword置空
        this.searchParams.keyword = undefined;
        // 再次发请求
        this.getDate();
        //进行路由跳转
         if(this.$route.query){
      this.$router.push({name:"search",query:this.$route.query})
      }
        //通知兄弟组件Header清除关键字
        this.$bus.$emit("clear");
    },
    // 删除品牌
    removetrademark(){
      this.searchParams.trademark = undefined;
      this.getDate();
    },
    //自定义事件回调
    //触发是在子组件
    tradmarkInfo(trademark){
      console.log("ws",trademark);
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getDate();
    },
    //收集平台属性的回调函数
    attrinfo(Attrs,item){
      console.log(Attrs,item);
      //参数格式整理好
      let pro = `${Attrs.attrId}:${item}:${Attrs.attrName}`;
      // this.searchParams.props.push(pro);
      //数组去重
      if(this.searchParams.props.indexOf(pro)==-1){
        this.searchParams.props.push(pro);
      }
      //再次发请求
      this.getDate();
    },
    //删除平台属性
    removeprops(index){
      //再次整理参数
      this.searchParams.props.splice(index,1)
      // //再次发请求
      this.getDate();
      console.log(123)
    },
    dianji(flag){
      //flag是新参，代表1和2
       console.log(flag);
       //获取一开始点击的状态
      //  let orderOrder = this.searchParams.order;
       //获取最开始的状态
       let orderflag = this.searchParams.order.split(":")[0];
       let ordershort = this.searchParams.order.split(":")[1];
       console.log(orderflag,ordershort);
       //准备有一个新的order值
        let newOrder = '';
        //判断确定是综合
        if(flag==orderflag){
          newOrder = `${orderflag}:${ordershort=="desc"?"asc":"desc"}`
        }else{
          newOrder = `${flag}:${`desc`}`
        }
        this.searchParams.order = newOrder;
        this.getDate();
    },
    //自定义事件回调函数，获取当前第几页
    getpageNo(pageNo){
      //整理带给服务器的参数
      this.searchParams.pageNo = pageNo;
      this.getDate();
    }
  },
  // 监听数据变化:若发生变化,再次发起请求
  watch:{
      // 监听$route
      //为了再发一次请求,使页面发生相应变化
      $route(newValue,oldValue){
            Object.assign(this.searchParams,this.$route.query,this.$route.params)
            this.getDate();
            console.log(this.searchParams);
            //每次请求完成,将把123级分类id清空
            this.searchParams.category2Id = '';
            this.searchParams.category3Id = '';
            this.searchParams.category1Id = '';
      }
      // $route(){
      //   console.log(123);
      // }
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>