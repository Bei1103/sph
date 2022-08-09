1.先在组件发送请求：
    mounted(){
        this.$store.dispatch('getBannerList')
    },
2.先在api文件夹中index.js：
        （1）：import xxx from "xxx"
         (2):获取数据
         export const reqgetBannerList = () =>{
                 return mockRequests.get('/banner')
            }

3.然后在api文件夹中创建对应的js文件
        进行路径封装例如：request.js

4.去对应的仓库js文件中修改，导入对应的包
        1）：先修改actions，通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
       例：    async categoryList({commit}){
                let result = await reqCategoryList();
                 if(result.code==200){
                       commit("CATEGORYLIST",result.data);
                 }
            },
        2）：再修改mutations
        例：        CATEGORYLIST(state,categoryList){
                        state.categoryList = categoryList;
                    }   
        3）：最后修改state：初始化数据

5.去组件使用的mapstate：
...mapState({
            //home里面的方法getBannerList
            bannerList:state => state.home.getBannerList
        })







        静态页面变动态：
        写接口api
        仓库3连环，存储数据
        展示