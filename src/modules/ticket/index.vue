<template>
    <div class="ticker_container">
        <div class="header" ref="header">
            <!-- <img src="" alt="" class="wx_img"> -->
            <div>图片</div>
            <div class="wx_name">微信名</div>
            <div class="ex_tel">手机号</div>
            <div class="edit_txt">修改</div>
        </div>
         <scroller lock-x :height="viewHeight+'px'" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="viewHeight">
            <div class="list_box">
                <div v-for="(one, index) in dataList" :key="index" class="each">
                    <div>出手阳澄湖大闸蟹 礼品卡</div>
                    <div>面值：{{one}}元</div>
                    <div>序号：{{one}}</div>
                    <!-- 不同状态的处理 -->
                    <div class="handle_box">
                        <span class="state">已提货</span><span class="state_handler">查看物流</span> 
                    </div>
                </div>
                 <!-- <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
                    <thead>
                    <tr class="reTr">
                        <th style="width: 54%;padding-left: 15px;text-align:left">卡号/卡密</th>
                        <th class="alignSty">交易状态</th>
                        <th class="alignSty">到账金额</th>
                    </tr>
                    </thead>
                    <tbody>
                      <template v-for="(one, index) in dataList">
                        <tr class="alignSty" v-for="sone in one.card_info_list" :key="sone.id" :style="{'background': index % 2 == 0? 'rgba(255, 255, 255)':'rgba(239,242,246, .4)'}" @click="$router.push('/traderecord/'+sone.id)">
                              <td style="padding-left: 15px;" class="alignSty"><div v-setfm>{{sone.card_no}}</div><div v-setfm class="pw">{{sone.card_pwd}}</div></td>
                              <td class="alignSty" :style="{'color':(sone.card_state_code == 0 || sone.card_state_code == 1)? '#27d8a0' : '#f95353'}">{{sone.card_state}}</td>
                              <td class="alignSty" v-setfm>{{sone.cost? '¥'+sone.cost : '-'}}</td>
                        </tr>
                      </template>  
                    </tbody>
                </x-table> -->
                <div v-if="!dataList.length" class="noData">没有数据</div> 
                <div v-else>
                  <load-more tip="" v-show="hasData"></load-more>
                  <divider v-show="!hasData"> 我也是有底线的 </divider>
                </div> 
              
            </div>
        </scroller>
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
    </div>
</template>


<script>
export default {
    data() {
        return {
            dataList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1,11,],
            viewHeight: 0,
            hasData: true,
        }
    },
    mounted() {
        this.computHeight()
    },
    methods: {
        //  scroll可视高度
        computHeight() {
            this.viewHeight =
                document.documentElement.clientHeight -
                (this.$refs.header ? this.compuFloatHeight(this.$refs.header) : 0) -
                this.compuFloatHeight(this.$parent.$refs.footer) -
                this.compuFloatHeight(this.$refs.footer)
            },
        // 精确计算浮点height（offsetHeight会被四舍五入）
        compuFloatHeight(el) {
            return el.getBoundingClientRect().bottom - el.getBoundingClientRect().top;
        },
        onScrollBottom() {
            if (this.onFetching) {
                // do nothing
            } else {
                this.onFetching = true
                setTimeout(() => {
                    this.hasData = true;
                    // if(this.searchParams.curr_pag >= this.pageMaxNum) {
                    //     this.hasData = false;
                    // }else {
                    //     this.searchParams.curr_pag += 1
                    //     let list = []
                    //     api.get("-1/app/recordList", this.searchParams).then(res => {
                    //         list =  res.result.order_list;
                    //         if(!list.length) {
                    //         // 无数据
                    //             this.hasData = false;
                    //         } else {
                    //             this.hasData = true;
                    //             this.dataList = this.dataList.concat(list)
                    //             this.$nextTick(() => {
                    //                 this.$refs.scrollerBottom.reset();
                    //             });
                    //         }
                    //     });
                    // }
                    this.onFetching = false;
                }, 200);
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.ticker_container{
    .header{
        width: 90%;
        margin: auto;
        display: flex;
        .wx_name{
            padding: 0 5px
        }
        .ex_tel{
            padding: 0 5px
        }
        .edit_txt{
            padding: 0 5px;
            color: #0095F5;
        }
    }
    .list_box{
        .each{
            width: 90%;
            border-radius: 4px;
            margin: 20px auto;
            border: 1px solid #ddd;
            padding: 15px;
            // height: 50px;
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
         width: 80%;
         margin: auto;
         padding: 10px;
         text-align: center;
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
