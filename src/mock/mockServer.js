//模拟数据的json格式不能留空格，所以要格式化一下
//图片要存在public中，不然打包之后是放在dist文件夹中的
// cnpm install mockjs 
// cnpm install --save mockjs

// 引入mockjs
import Mock from 'mockjs'
//把json数据格式引入进来(json不用对外暴露，但是可以引入)
//webpack默认对外暴露的：图片，json数据格式
import banner from './banner.json'
import floor from './floor.json'

//mock数据：第一个参数是请求地址，第二个参数是：请求数据
Mock.mock("/mock/banner",{code:200,data:banner});//模拟首页轮播图数据
Mock.mock("/mock/floor",{code:200,data:floor})

//最后在入口文件中的引入mockServe.js