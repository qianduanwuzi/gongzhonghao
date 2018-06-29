<template>
    <div class="ticker_container">
        <div class="header" ref="header">
            <flexbox :gutter="0" style="text-align: center">
                <flexbox-item :class="['flex_item', 'right_border']">
                    <div>
                          <!-- <img :src="weInfo.img" alt=""> -->
                    </div>
                    <div class="label">头像</div>
                </flexbox-item>
                <flexbox-item  :class="['flex_item', 'right_border']">
                    <div class="val">{{wxInfo.name}}</div>
                    <div class="label">昵称</div>
                </flexbox-item>
                <flexbox-item :class="['flex_item']">
                    <div class="val">{{wxInfo.tel}}<span class="edit_tel" @click="editTel">修改</span></div>
                    <div class="label">手机号</div>
                </flexbox-item>
            </flexbox>
            <!-- <img src="" alt="" class="wx_img"> -->
            <!-- <div>图片</div>
            <div class="wx_name">微信名</div>
            <div class="ex_tel">15150268315</div>
            <div class="edit_txt">修改</div> -->
        </div>
         <!-- <scroller lock-x :height="viewHeight+'px'" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="viewHeight">
            <div class="list_box">
                <div v-for="(one, index) in dataList" :key="index" class="each">
                    <div>出手阳澄湖大闸蟹 礼品卡</div>
                    <div>面值：{{one}}元</div>
                    <div>序号：{{one}}</div>
                    <div class="handle_box">
                        <span class="state">已提货</span><span class="state_handler">查看物流</span> 
                    </div>
                </div>
                <div v-if="!dataList.length" class="noData">没有数据</div> 
                <div v-else>
                  <load-more tip="" v-show="hasData"></load-more>
                  <divider v-show="!hasData"> 我也是有底线的 </divider>
                </div> 
              
            </div>
        </scroller> -->
        <div class="list_box" :style="{height: viewHeight+'px'}">
            <div v-for="(one, index) in dataList" :key="index" class="each">
                <div>出手阳澄湖大闸蟹 礼品卡</div>
                <div>面值：{{one}}元</div>
                <div>序号：{{one}}</div>
                <div class="handle_box">
                    <span class="state">已提货</span><span class="state_handler">查看物流</span> 
                </div>
            </div>
            <!-- <div v-if="!dataList.length" class="noData">没有数据</div> 
            <div v-else>
                <load-more tip="" v-show="hasData"></load-more>
                <divider v-show="!hasData"> 我也是有底线的 </divider>
            </div>  -->
        </div>
        <div class="footer_box" ref="footer">
            <div>
                我们已将你的蟹券存放到您的个人中心
            </div>
            <div>
                您可直接通过出手服务号--》我的蟹券进入查看
            </div>
            <div class="btn" @click="$router.push({path:'/takeororder'})">
                添加
            </div>
        </div>
         <confirm v-model="showEdit"
            show-input
            ref="confirm5"
            title="修改手机号"
            @on-confirm="onConfirm"
           >
        </confirm>
    </div>
</template>


<script>
import { Card } from "vux";
export default {
    components: {Card},
    data() {
        return {
            showEdit: false,
            wxInfo: {img:'', name:'__proto__', tel:15150268315},
            // 模拟数据
            dataList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1,11,],
            viewHeight: 0,
            hasData: true,
        }
    },
    mounted() {
        this.computHeight()
    },
    methods: {
        editTel() {
            this.showEdit = true;
        },
        onConfirm (value) {
            this.$refs.confirm5.setInputValue('')
            alert(value)
        },
        //  scroll可视高度
        computHeight() {
            this.viewHeight =
                document.documentElement.clientHeight -
                 this.compuFloatHeight(this.$refs.header) -
                this.compuFloatHeight(this.$parent.$refs.footer) 
                - this.compuFloatHeight(this.$parent.$refs.header) -
                this.compuFloatHeight(this.$refs.footer)
            },
        // 精确计算浮点height（offsetHeight会被四舍五入）
        compuFloatHeight(el) {
            return el.getBoundingClientRect().bottom - el.getBoundingClientRect().top;
        },
        // onScrollBottom() {
        //     if (this.onFetching) {
        //         // do nothing
        //     } else {
        //         this.onFetching = true
        //         setTimeout(() => {
        //             this.hasData = true;
        //             // if(this.searchParams.curr_pag >= this.pageMaxNum) {
        //             //     this.hasData = false;
        //             // }else {
        //             //     this.searchParams.curr_pag += 1
        //             //     let list = []
        //             //     api.get("-1/app/recordList", this.searchParams).then(res => {
        //             //         list =  res.result.order_list;
        //             //         if(!list.length) {
        //             //         // 无数据
        //             //             this.hasData = false;
        //             //         } else {
        //             //             this.hasData = true;
        //             //             this.dataList = this.dataList.concat(list)
        //             //             this.$nextTick(() => {
        //             //                 this.$refs.scrollerBottom.reset();
        //             //             });
        //             //         }
        //             //     });
        //             // }
        //             this.onFetching = false;
        //         }, 200);
        //     }
        // },
    }
}
</script>

<style lang="scss" scoped>
.ticker_container{
    .header{
        width: 100%;
        margin: auto;
        padding: 10px 0px;
        text-align: center;
        border-bottom: 1px solid #E5E5E5;
        .flex_item{
            .val{
                color: #ff6600;
                .edit_tel{
                    margin-left: 2px;
                    font-size: 14px;
                }
            }   
            .label{

            }
        }
        .right_border{
            border-right: 1px solid #c7c7c7;
        }
        .wx_name{
            padding: 0 5px
        }
        .ex_tel{
            padding: 0 5px
        }
        .edit_txt{
            padding: 0 5px;
            color: #ff6600;
        }
    }
    .list_box{
        overflow-y: auto;
        .each{
            width: 90%;
            border-radius: 4px;
            margin: 20px auto;
            border: 1px solid #ddd;
            padding: 15px;
        }
        .handle_box{
            text-align: right;
            .state{
                margin-right: 10px;
            }
            .state_handler{
                width: 30px;
                margin-right: 10px;
            }
        }
    }
    .footer_box{
         width: 100%;
         margin: auto;
         padding: 10px;
         text-align: center;
        position: fixed;
        bottom: 40px;
        z-index: 10001;
        background: white;
         .btn{
             width: 100px;
             line-height: 30px;
             border: 1px solid #ddd;
             border-radius: 2px;
             margin:10px auto;
         }
    }
}
</style>
