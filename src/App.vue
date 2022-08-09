<template>
  <div id="app">

      <Header v-show="$route.meta.show"></Header>

          <router-view></router-view>
                <HelloWorld></HelloWorld>
      <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import HelloWorld from '@/components/HelloWorld'
import Header from "./components/Header"
import Footer from "./components/Footer"
export default {
//注册
name:"",
components:{
  Header,
  Footer,
  HelloWorld
},
mounted(){
  //只执行一次，节省发请求，直接存储在仓库，后访问仓库的数据
        this.$store.dispatch('categoryList');
}
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
