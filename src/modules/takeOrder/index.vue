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
    validate() {
         if(this.name == '预约提醒') {
            // if(this.form.phone.trim().length != 11) {
            //     this.errMsg = '请输入正确的手机号'
            //     return false
            // }
            // if(!this.form.code.trim()) {
            //     this.errMsg = '请输入正确的条形码'
            //     return false
            // }
            // if(!this.form.msCode.trim()) {
            //     this.errMsg = '请输入正确的验证码'
            //     return false
            // }
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
    scan() {
        alert('调用sdk 扫一扫')
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
