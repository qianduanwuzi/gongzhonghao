<template>
   <div class="container">
          <!-- <header class="header" ref="header">
             <x-icon v-if="$route.name.includes('_')" type="ios-arrow-left" size="30" class="arrowLeft" @click="$router.back()"></x-icon>
             <span>{{title}}</span><span> </span>      
        </header>  -->
       <div class="body">
           <router-view></router-view>
       </div>
       <footer class="footer" v-show="!$route.name.includes('_')" ref="footer">
              <flexbox :gutter="0">
                <flexbox-item v-for="one in bottomMenus" :key="one.name" >
                   <router-link :to="one.url">
                       <img :src="curUrl.includes(one.url)? one.acicon : one.icon" alt="">
                        <div class="menu">{{one.name}}</div>
                    </router-link>
                </flexbox-item>
              </flexbox>
       </footer>
   </div>
</template>
<script>
import {bottomMenus} from './bottomMenu'
export default {
    data() {
        return {
            bottomMenus,
            curUrl: ''
        }
    },
    computed:{
        // title() {
        //     return this.$route.name.includes('_')?  this.$route.name.split('_')[1] : this.$route.name
        // }
    },
    created() {
            
    },
    mounted() {
        this.curUrl = this.$route.fullPath;
        // console.log(this.$route, this.$router)
    },
    methods: {

    },
    watch:{
        "$route": {
            deep: true,
            handler: function(val, old) {
                this.curUrl = val.fullPath;
                // console.log(val, this.$router)
                // this.$nextTick(() => {
                //     if(document.getElementsByClassName('in')[0]) {
                //         console.log(document.querySelector('header').nextSibling.nextSibling.style.height)
                //         console.log(document.querySelector('header').nextSibling.nextSibling.style.marginTop = document.getElementsByClassName('in')[0].offsetHeight + 'px')
                //     }
                // })
                // home
                // supply
                // traderecord
                // mine

            }
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    // .header{
    //     line-height: 34px;
    //     background-color: #0095F5;
    //     color: #fff;
    //     font-size: 18px;
    //     font-weight: bold;
    //     text-align: center;
    //     position: relative;
    //     .arrowLeft{
    //         position: absolute;
    //         left: 0;
    //         top: 50%;
    //         transform: translateY(-50%) 
    //     }
    // }
    .body{
    }
    .footer{
        width: 100%;
        position: fixed;
        bottom: 0;
        // height: 49px;
        padding-bottom: 5px;
        background-color: #0095F5;
        .menu{
            text-align: center;
            color: #fff;
            font-size: 9px;
        }
        img{
            margin: auto;
            width: 27px;
            height: 27px;
            margin-top: 7.5px;
        }
    }
}
</style>

