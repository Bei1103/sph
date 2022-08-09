<template>
  <div class="pagination">
    <h1>{{startNumAndEndNum}}--当前页码{{pageNo}}</h1>
    <button @click="$emit('getpageNo',pageNo-1)"> 上一页</button>
    <button v-if="startNumAndEndNum.start >1" @click="$emit('getpageNo',1)">1</button>   
    <button v-if=" startNumAndEndNum.start >2">···</button>  

     <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page>=startNumAndEndNum.start" @click="$emit('getpageNo',page)" :class="{active: pageNo == page}">{{page}}</button>    
    
    
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getpageNo',totalPage)">{{totalPage}}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('getpageNo',pageNo + 1)">下一页</button> 
    <button style="margin-left: 30px">共{{total}}条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    // 从 父组件接收的props参数
    props:["pageNo","pageSize","total","continues"],
    // 计算属性
    computed:{
      //总共多少页
      totalPage(){
        //向上取整
        return Math.ceil(this.total/this.pageSize)
      },
      //计算出连续的页面的起始数字与结束数字
      startNumAndEndNum(){
        const {pageNo,totalPage,continues} = this
        //先定义两个变量存储起来的起始数字与结束数字
        let start = 0,end= 0;
        //连续的页码数字5，
        // 异常的情况总页面不够5页
        if(continues > totalPage){
          start = 1;
          end = totalPage;
        }else{
          //连续页码5，总页数大于5  parseInt()取整
          start = pageNo - parseInt(continues/2);
          end  = pageNo + parseInt(continues/2)
          //如果出现负数
          if(start < 1){
            start = 1;
            end = continues;
          }
          // 如果出现最后一页大于全部页数
          if(end > totalPage){
            end = totalPage;
            start = totalPage - contiues + 1 ;
          }
          return {start,end}
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  .active{
    background: skyblue;
  }
</style>
