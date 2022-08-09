<template>
   <div class="swiper-container" ref="floor1Swiper">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(carousel, index) in list"
                    :key="carousel.id"
                  >
                    <img :src="carousel.imgUrl" />
                  </div>
                </div>

                <div class="swiper-pagination"></div>


                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
</template>
<script>
import Swiper from 'swiper'
export default {
    name:'Carsousel',
    //传过来用的list
    props:['list'],
     watch: {
    list: {
      //因为是父组件传递过来的数据，所以floor组件的数据并没有发生变化
      immediate: true, //不管数据有没有变化都要立刻监听
      handler() {
        //现在已经可以监听了，但是v-for的结构还是没有部办法确定，所以还要用nexttick方法
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.floor1Swiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
        console.log("ws123");
      },
    },
  },
}
</script>

<style>

</style>