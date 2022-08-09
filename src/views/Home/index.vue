<template>
  <div>
       <TypeNav></TypeNav>
      <list></list>
      <Today></Today>
      <Rank></Rank>
      <Like></Like>
      <!-- 采用了父组件和子组件通信，：list="floor"，子组件用props：【‘floor’】接收 -->
      <Floor v-for="floor in FloorList" :key="floor.id" :list="floor"></Floor>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import List from "@/views/Home/List/index.vue"
import Today from "@/views/Home/Today/index.vue"
import Rank from "@/views/Home/Rank/index.vue"
import Like from "@/views/Home/Like/index.vue"
import Floor from "@/views/Home/Floor/index.vue"
export default {
components:{
  List,
  Today,
  Rank,
  Like,
  Floor
},
mounted(){
  this.$store.dispatch('getFloorList')
},
computed:{
  ...mapState({
    FloorList:(state)=>state.home.getFloorList
  })
}
}
</script>

<style>

</style>