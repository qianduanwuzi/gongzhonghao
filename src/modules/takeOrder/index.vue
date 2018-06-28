<template>
    <div class="take_container">
        <self-input widths="90%" :styles="{'height': '45px','font-size':'12px'}" v-model="form.code" placeholder="扫条形码或输入数字" class="ignore" @focus="$emit('focus')" @blur="$emit('blur')" eventName="扫一扫" @clickHandler="scan" ref="code">
        </self-input>
        <div class="tip_notake" @click="$router.push({path: '/ticket'})" v-show="num">您有{{num}}张蟹券未提货，点击查看</div>
        <self-input  v-if="name == '预约提醒'" widths="90%" :styles="{'height': '45px','font-size':'12px'}" v-model="form.phone" placeholder="请输入手机号" class="ignore" @focus="$emit('focus')" @blur="$emit('blur')" :eventName="eventName" @clickHandler="clickHandler" ref="code">
        </self-input>
         <self-input v-if="name == '预约提醒'" widths="90%" :styles="{'height': '45px','font-size':'12px'}" v-model="form.msCode" placeholder="请输入短信验证码" class="ignore" @focus="$emit('focus')" @blur="$emit('blur')" eventName="">
        </self-input>
        <self-btn :name="name" class="btn" @click="clickBtn" widths="90%"></self-btn>
        <div class="errMsg">{{errMsg}}</div>
        <div class="tip">
            <div for="" class="label">温馨提示</div>
            <div class="content">
                阳澄湖大闸蟹于每年霜降后成熟，直至冬至结束。请于2018年10月23日至12月22日提蟹。
            </div>    
        </div>    
    </div>
</template>


<script>
export default {
  data() {
    return {
      form: {
        phone: "",
        code: "",
        msCode: "",
      },
      name: "预约提醒",
      eventName: '获取验证码',
      errMsg: '',
      num: 2,
    };
  },
  mounted() {
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '', // 必填，公众号的唯一标识
        timestamp: '', // 必填，生成签名的时间戳 服务端生成
        nonceStr: '', // 必填，生成签名的随机串  服务端生成
        signature: '',// 必填，签名 服务端生成
        jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
    });
    wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });
      this.$nextTick(() => {
          console.log(this.$route.query.code)
        //    api.get(`api/wx/shop/1?code=${this.$route.query.code}`).then(res => {

        //    })
        //   code 可拿信息 、 调token令牌
        if(new Date().getTime() < new Date('2018-10-23').getTime()) this.name = '预约提醒'
        else this.name = '提蟹'
      })
      
  },
  methods: {
    //  发送短信
    clickHandler() {
        let _this = this;
    //   api.post("-1/ajax/smsz", formData).then(res => {
        _this.eventName = "正在发送";
        let s = 60;
        var t = setInterval(() => {
          s -= 1;
          _this.eventName = s + "s";
          if (s == 0) {
            clearInterval(t);
            _this.eventName = "获取验证码";
          }
        }, 1000);
    //   });
    },
    // 验证
    validate() {
         if(this.name == '预约提醒') {
            if(this.form.phone.trim().length != 11) {
                this.errMsg = '请输入正确的手机号'
                return false
            }
            if(!this.form.code.trim()) {
                this.errMsg = '请输入正确的条形码'
                return false
            }
            if(!this.form.msCode.trim()) {
                this.errMsg = '请输入正确的验证码'
                return false
            }
            this.errMsg = ''
            return true
        }else {
            return true
        }
    },
    clickBtn() {
        if(this.name == '预约提醒') {
            if(this.validate()) {
                console.log(this.$store)
                this.$store.dispatch('setTip', { type: 'success', msg: '预约成功，我们将在最佳品蟹时间以短信方式提醒您', time: 5000, width: '300px' } )
                // this.$router.push({path: '/ticket'})
                this.$router.push({path: '/shop'})
            }
        }else {
            this.$router.push({path: '/shop'})
        }
     
    },
    // 扫描二维码
    scan() {
        alert('调用sdk 扫一扫');
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            }
        });
    },
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/com.scss';
.take_container {
    .tip_notake{
        height: 20px;
        margin-top: 10px;
        text-align: center;
        @include set_font(16px, #ff6600);
    }
  .ignore {
    margin-top: 15px;
  }
  img {
    width: 17px;
  }
  .btn {
    width: 90%;
    margin-top: 15px;
  }
  .errMsg{
      width: 90%;
      margin: auto;
      height: 20px;
      text-align: right;
      color: red;
  }
  .tip{
     .label{
         text-align: center;
     }
     .content{
         width: 90%;
         margin: auto;
     } 
  }
}
</style>
