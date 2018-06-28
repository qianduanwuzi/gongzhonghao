<template>
  <div class="shop_container">
    <div class="header">
        礼卡在线
    </div> 
    <div v-if='step==1' class="content_box">
      <!--固定显示内容-->
      <card :header="{title:cardHeader}">
        <div slot="content" class="flex-column">
          <div class="vux-1px-l right_border">
            <span>￥{{card.price}}元</span>
            <br/>
            面值
          </div>
          <div class="right_border" @click="showExpress(false)">
            <span>{{cardStatus}}</span>
            <br/>
            商品
          </div>
          <div @click="showExpress(true)">
            <span>{{orderStatus}}</span>
            <br/>
            物流
          </div>
        </div>
      </card>
      <!--已下单显示内容-->
      <div v-if="hasPlaceOrder">
        <div v-if="!expressShow">
          <div class="product-desc">已选商品({{card.type==1?'单选':'多选'}})</div>
          <table>
            <tr class="product-display" v-for="(item,index) in order.product" :key="item.id" >
              <td class="product-image" @click='showImage(index)'>
                <div class="image-display">
                  <img :src="item.image[0]" alt="" class="previewer-img">
                </div>
              </td>
              <td class="product-content">
                <h4>{{item.title + index}}</h4>
                <p>{{item.desc}}</p>
                <p style="color: #ff6600" v-if="limitShip(index)" @click="showShipLimit(index)">发货限制</p>
              </td>
              <td class="product-price">
                ￥{{item.price.toFixed(2)}}
              </td>
              <td class="product-select">
              </td>
            </tr>
          </table>
        </div>
        <div v-if="expressShow" class="express-display">
          <div class="express-title vux-1px-b">
            物流追踪
          </div>
          <div class="express-content">
            <timeline>
              <timeline-item v-for="item in express" :key="item.id">
                <h4>{{item.content}}</h4>
                <p>{{item.date}}</p>
              </timeline-item>
            </timeline>
          </div>
        </div>
      </div>
      <!--未下单显示内容-->
      <div v-if="!hasPlaceOrder" class="product-list-display">
        <div class="product-desc">可选商品({{card.type==1?'单选':'多选'}})</div>
        <table>
          <tr class="product-display" v-for="(item,index) in card.product" :key="item.id" >
            <td class="product-image" @click='showImage(index)'>
              <div class="image-display">
                <img :src="item.image[0]" alt="" class="previewer-img">
              </div>
            </td>
            <td class="product-content">
              <h4>{{item.title + index}}</h4>
              <p>{{item.desc}}</p>
              <p style="color: #ff6600" v-if="limitShip(index)" @click="showShipLimit(index)">发货限制</p>
            </td>
            <td class="product-price">
              ￥{{item.price.toFixed(2)}}
            </td>
            <td class="product-select" @click="select(index)">
              <icon :type="icon(index)"></icon>
            </td>
          </tr>
        </table>
    </div>
    <!--下单结算-->
    <div v-if="canSettle" class="background confirm-bar flex-column">
      <div class="right_border">
        已选{{count}}个,共{{total}}元
      </div>
      <div @click="goStepTwo">
        确定选择
      </div>
    </div>
  </div>
  <!--下单填写信息界面-->
  <div v-if='step==2' class="content_box">
    <div class="default-title">
      <div class="left-option">已选商品<span v-if='card.product.length>1' class="button-reselect" @click='back()'>返回重选</span></div>
      <div class="right-option">
        <span class="button-redrawer" @click='showBrief()'>{{selectProductBrief()}}</span>
      </div>
    </div>
    <div class='product-brief' v-if="showProductBrief">
      <table>
        <tr v-for="item in selectedProduct" :key="item.id">
          <td >{{item.title}}</td>
          <td >￥{{item.price.toFixed(2)}}</td>
        </tr>
      </table>
    </div>
    <div class="default-title">填写收货信息</div>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input title="收货人" v-model="order.user" placeholder="收货人姓名" ></x-input>
      <x-input type='tel' title="手机号" placeholder="收货人手机号" v-model="order.mobile" ></x-input>
      <x-address title="送货地址" v-model="order.address" raw-value :list="addressData" value-text-align="left" placeholder="请选择地址"></x-address>
      <x-textarea title="详细地址" v-model="order.street" placeholder="请输入详细街道地址"></x-textarea>
      <datetime v-model="order.date" confirm-text="确认" cancel-text="取消"
                :start-date="startDate" :end-date="endDate"
                title="发货时间" value-text-align="left" placeholder="默认为收到订单立即发货"></datetime>
    </group>
    <group class="submit-button">
      <x-button type="primary" @click.native='submitOrder()'>提交订单</x-button>
    </group>
    <popup v-model="popupShow">
      <div class="popup0">
        <group>
          <x-input title="券卡密码" type='password' readonly v-model="password" placeholder="输入券卡密码"></x-input>
        </group>
        <grid :rows="3">
          <grid-item v-for="i in [1,2,3]" :key="i" @click.native="onClickPad(i)">
            <span class="grid-center">{{i}}</span>
          </grid-item>
        </grid>
        <grid :rows="3">
          <grid-item v-for="i in [4,5,6]" :key="i" @click.native="onClickPad(i)">
            <span class="grid-center">{{i}}</span>
          </grid-item>
        </grid>
        <grid :rows="3">
          <grid-item v-for="i in [7,8,9]" :key="i" @click.native="onClickPad(i)">
            <span class="grid-center">{{i}}</span>
          </grid-item>
        </grid>
        <grid :rows="3">
          <grid-item v-for="i in ['返回',0,'删除']" :key="i" @click.native="onClickPad(i)">
            <span class="grid-center">{{i}}</span>
          </grid-item>
        </grid>
      </div>
    </popup>
  </div>
  <!--下单成功-->
  <div v-if="step==3" class="content_box">
      <!-- <msg title="订单已提交" description="将在3s后返回订单详情" :buttons="buttons" icon="success"></msg> -->
     <msg title="提蟹成功" description=""  icon="success"></msg>
     <div style="width: 90%; margin: auto">
        <div>
            您的订单我们已收到
        </div>    
        <div>
            您可以再我的蟹券页面查询物流信息
        </div> 
        <div>
            大闸蟹属于生鲜水产，无法提供退货服务
        </div> 
        <div style="margin-top: 10px">
            请务必及时收货
        </div> 
        <div>
            收货时请注意开箱检查，如发现死蟹，请按照范例拍照理赔
        </div> 
     </div>
    <self-btn name="我知道了" :styles="{'background-color': '#1AAD19', 'margin-top': '20px'}" widths="80%" @click="clickHandler"></self-btn>
  </div>
  <toast v-model="toastShow" type="text" width="20em" :is-show-mask="showMask" :time="toastTime">{{toastMsg}}</toast>
  <previewer :list="imageList" ref="previewer" :options="options"></previewer>
</div>
</template>

<script>
import {
  Icon,
  Toast,
  Card,
  Popup,
  Group,
  Cell,
  CellFormPreview,
  Previewer,
  XButton,
  XAddress,
  ChinaAddressV3Data,
  XInput,
  Datetime,
  XTextarea,
  Grid,
  GridItem,
  Msg,
  Timeline,
  TimelineItem
} from "vux";

export default {
  components: {
    Icon,
    Toast,
    Card,
    Popup,
    Group,
    Cell,
    CellFormPreview,
    Previewer,
    XButton,
    XAddress,
    ChinaAddressV3Data,
    XInput,
    Datetime,
    XTextarea,
    Grid,
    GridItem,
    Msg,
    Timeline,
    TimelineItem
  },
  computed: {
    canSettle() {
      return this.count > 0;
    },
    title() {
      return "券卡提货系统";
    },
    total() {
      let price = 0;
      this.selectedProduct.forEach(item => {
        price += item.price;
      });
      return price;
    },
    count() {
      return this.selectedProduct.length;
    },
    selectedPreview() {
      let preview = [];
      this.selectedProduct.forEach(item => {
        preview.push({
          label: this.selectedProduct[i].title,
          value: `￥${this.selectedProduct[i].price.toFixed(2)}`
        });
      });
      return preview;
    },
    cardHeader() {
      return `${this.card.name}(NO:${this.card.no})`;
    },
    options: {
      getThumbBoundsFn(index) {
        let thumbnail = document.querySelectorAll(".previewer-img")[index];
        let pageYScroll =
          window.pageYOffset || document.documentElement.scrollTop;
        let rect = thumbnail.getBoundingClientRect();
        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
      }
    },
    startDate() {
      //TODO 开始日期
      return "2017-04-10";
    },
    endDate() {
      //TODO 截止日期
      return "2018-05-19";
    },
    hasPlaceOrder() {
      return this.card.order !== undefined;
    },
    cardStatus() {
      return this.card.order === undefined ? "未提货" : "查看已选商品";
    },
    orderStatus() {
      return this.order.express === undefined ? "无" : "查看物流信息";
    }
  },
  methods: {
    clickHandler() {

    },
    icon(index) {
      return this.isSelect(index) ? "success-circle" : "circle";
    },
    showToast(msg, time, showMask) {
      this.toastMsg = msg;
      this.toastShow = true;
      if (time) {
        this.toastTime = time;
      }
      if (showMask) {
        this.showMask = showMask;
      }
    },
    select(index) {
      if (this.card.type === 1) {
        this.singleSelect(index);
      } else {
        this.multiSelect(index);
      }
    },
    limitShip(index) {
      //TODO 是否有发货限制
      return true;
    },
    showShipLimit(index) {
      //TODO 发货限制描述
      this.showToast("地区仅限江浙沪", 10000);
    },
    initView() {
      //多选一
      if (this.card.type === 1) {
        this.singleSelect(0);
      }
    },
    singleSelect(index) {
      if (!this.isSelect(index)) {
        this.selectedProduct.pop();
        this.selectedProduct.push(this.card.product[index]);
      }
    },
    multiSelect(index) {
      if (this.isSelect(index)) {
        this.removeProduct(index);
      } else {
        //选择后大于总价，提醒不能选择
        if (
          parseFloat(this.total + this.card.product[index].price) >
          parseFloat(this.card.price)
        ) {
          this.showToast(
            "超出券卡面值,请先放弃一件已选商品或选择其他价格更低商品"
          );
        } else {
          this.addProduct(index);
        }
      }
    },
    goStepTwo() {
      let flag = false;
      if (this.card.type !== 1) {
        flag = this.card.product.some(item => {
          return this.card.price - this.total >= item.price;
        });
      }

      if (flag) {
        const _this = this;
        this.$vux.confirm.show({
          title: "友情提示",
          content: `您可以继续选择价格低于￥${(
            this.card.price - this.total
          ).toFixed(2)}的商品,卡内余额不能再次消费,是否继续选择?`,
          onCancel() {
            _this.step = 1;
            console.log("plugin cancel");
          },
          onConfirm() {
            _this.step = 2;
            console.log("plugin confirm");
          }
        });
      } else {
        this.step = 2;
      }
    },
    back() {
      this.step = 1;
    },
    addProduct(index) {
      this.selectedProduct.push(this.card.product[index]);
    },
    removeProduct(index) {
      let i = this.selectedProduct.indexOf(this.card.product[index]);
      this.selectedProduct.splice(i, 1);
    },
    isSelect(index) {
      return this.selectedProduct.indexOf(this.card.product[index]) !== -1;
    },
    showImage(index) {
      this.imageList.splice(1, this.imageList.length);
      for (let i in this.card.product[index].image) {
        this.imageList.push({
          src: this.card.product[index].image[i],
          w: 600,
          h: 600
        });
      }
      this.$refs.previewer.show(index);
    },
    onDateChange(date) {
      console.log(date);
      //TODO 判断时间
    },
    submitOrder() {
      if (this.order.user.length < 1) {
        this.showToast("请输入收货人姓名");
        return;
      }
      if (this.order.mobile.length < 7) {
        this.showToast("请输入收货人手机号");
        return;
      }
      if (this.order.address.length < 3) {
        this.showToast("请输入收货人地址");
        return;
      }
      if (this.order.street.length < 3) {
        this.showToast("请输入详细街道信息");
        return;
      }

      this.password = "";
      this.popupShow = true;
      //TODO 检测时间和日期
    },
    showBrief() {
      this.showProductBrief = !this.showProductBrief;
    },
    selectProductBrief() {
      if (this.showProductBrief) {
        return "收起▽";
      } else {
        return `已选择${this.count}件商品,共￥${this.total.toFixed(2)}元 >>`;
      }
    },
    onClickPad(i) {
      if ("返回" == i) {
        this.popupShow = false;
      } else if ("删除" == i) {
        this.password = this.password.slice(0, -1);
      } else {
        this.password += i;
        if (this.password.length === 6) {
          this.popupShow = false;
          //TODO 检测密码
          let uri = `/card/order`;
          let param = {
            no: this.card.no,
            password: this.password
          };
          this.showToast("正在提交订单...", 10000, true);
          this.order.product = this.selectedProduct;
          this.step = 3;
        }
      }
    },
    showExpress(show) {
      if (!this.hasPlaceOrder) {
        this.showToast("您尚未提货");
        return;
      }
      this.expressShow = show;
    }
  },
  mounted() {
    /* let uri = `/order?sid=${sid}&sn=${sn}`;
      this.$http.get(uri).then(data=>{

      }).catch(err=>{

      });*/
  },

  data() {
    return {
      toastShow: false, //是否显示toast提醒
      toastTime: 2000, //toast提醒显示时间
      toastMsg: "", //toast提醒内容
      showMask: false, //显示toast时是否允许点击
      popupShow: false, //显示密码输入框
      step: 1, //提货下单阶段
      selectedProduct: [], //已选商品
      expressShow: true,
      imageList: [], //临时的一个图片显示列表
      showProductBrief: false, //控制是否显示已选商品简介
      password: "", //密码
      express: [
        {
          content: "【广东】 广州市 已发出",
          date: "2016-04-17 12:00:00"
        },
        {
          content: "申通快递员 广东广州 收件员 xxx 已揽件",
          date: "2016-04-16 10:23:00"
        },
        {
          content: "商家正在通知快递公司揽件",
          date: "2016-04-15 9:00:00"
        }
      ], //快递状态
      order: {
        //订单状态
        user: "",
        mobile: "",
        address: [],
        street: "",
        date: "",
        product: [
          {
            id: "1",
            image: ["http://placeholder.qiniudn.com/60x60/ff9500/ffffff"],
            title: "商品名称",
            desc: "商品详细描述述商品详细描述商品详细描述",
            price: 1200.0
          },
          {
            id: "2",
            image: ["http://placeholder.qiniudn.com/60x60/ff9500/ffffff"],
            title: "商品名称",
            desc: "商品详细描述",
            price: 400.0
          }
        ]
      },
      addressData: ChinaAddressV3Data, //省市区
      card: {
        //券卡信息
        name: "中秋大礼至尊卡",
        type: 2,
        no: "1234567890123456",
        price: 1980.0,
        dateRange: [],
        dateRepeat: false,
        status: "未兑换",
        //order:{id:"1111111"},
        region: {
          province: [],
          city: []
        },
        product: [
          {
            id: "1",
            image: ["http://placeholder.qiniudn.com/60x60/ff9500/ffffff"],
            title: "商品名称",
            desc: "商品详细描述述商品详细描述商品详细描述",
            price: 1200.0
          },
          {
            id: "2",
            image: ["http://placeholder.qiniudn.com/60x60/ff9500/ffffff"],
            title: "商品名称",
            desc: "商品详细描述",
            price: 400.0
          },
          {
            id: "3",
            image: ["http://placeholder.qiniudn.com/60x60/ff9500/ffffff"],
            title: "商品名称",
            desc: "商品详细描述",
            price: 320.0
          },
          {
            id: "4",
            image: ["http://placeholder.qiniudn.com/60x60/ff9500/ffffff"],
            title: "商品名称",
            desc: "商品详细描述",
            price: 120.0
          },
          {
            id: "5",
            image: ["http://placeholder.qiniudn.com/60x60/ff9500/ffffff"],
            title: "商品名称",
            desc: "商品详细描述",
            price: 120.0
          },
          {
            id: "6",
            image: ["http://placeholder.qiniudn.com/60x60/ff9500/ffffff"],
            title: "商品名称",
            desc: "商品详细描述",
            price: 120.0
          }
        ]
      },
      buttons: [
        {
          type: "primary",
          text: "查看订单",
          link: "/dashboard/refresh"
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.shop_container {
  .right_border {
    border-right: 1px solid #c7c7c7;
  }
  .previewer-img {
    width: 60px;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    background: #ff6600;
    text-align: center;
    line-height: 46px;
    height: 46px;
    font-size: 18px;
    color: #fff;
  }
  .content_box {
    margin-top: 46px;
  }
  .background {
    background: #ff6600;
    color: white;
    border-top: dashed 1px white;
  }

  .flex-column {
    display: flex;
    padding: 10px 0;
    vertical-align: middle;
  }
  .flex-column span {
    color: #ff3300;
  }

  .flex-column > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }

  .card-info {
    margin-top: 96px;
  }
  .confirm-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
  }
  .product-list-display {
    margin-top: 10px;
    margin-bottom: 60px;
  }
  .product-desc {
    margin-top: 10px;
    margin-left: 5px;
    padding: 10px;
    color: darkgray;
    font-size: 13px;
  }
  table {
    margin-left: 10px;
    margin-right: 10px;
    padding: 15px;
    border-bottom: 1px inset lightgray;
    border-top: 1px outset lightgray;
    border-collapse: collapse;
    width: 94%;
  }
  tr {
    border-bottom: 1px dashed lightgray;
  }
  tr td {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .product-image {
    width: 15%;
    height: 100%;
    display: flex;
  }
  .image-display {
    margin: auto;
  }
  .product-content {
    width: 70%;
    padding-left: 15px;
  }
  .product-content h4 {
    margin: 0;
    color: #35495e;
    font-size: 13px;
  }
  .product-content p {
    margin: 0;
    color: darkgray;
    font-size: 12px;
  }
  .product-price {
    width: 10%;
    color: #ff6600;
    padding-left: 15px;
    padding-right: 15px;
  }

  .product-select {
    width: 5%;
    max-width: 50px;
  }

  .button-reselect {
    border: 1px solid lightgray;
    padding: 3px;
    border-radius: 5px;
    font-size: 12px;
    color: #ff6600;
    float: right;
    margin-left: 15px;
  }
  .button-redrawer {
    padding: 3px;
    color: #3399ff;
    font-size: 12px;
    margin: auto;
  }

  .submit-button {
    width: 90%;
    margin: auto;
  }
  .default-title {
    margin: 10px;
    color: darkgray;
    font-size: 14px;
    position: relative;
    display: flex;
  }
  .left-option {
    float: left;
    margin-bottom: 5px;
  }
  .right-option {
    float: right;
    position: relative;
    margin-bottom: 5px;
    margin-left: 10px;
    text-align: right;
  }

  .product-brief table {
    font-size: 13px;
    color: darkgray;
  }

  .product-brief td {
    text-align: right;
  }
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }
  .express-display {
    margin-left: 5px;
    margin-right: 5px;
  }
  .express-title {
    margin-top: 10px;
    margin-left: 5px;
    padding: 10px;
    color: darkgray;
    font-size: 13px;
  }
  .express-content h4 {
    color: #464c5b;
    font-weight: normal;
  }
  .express-content p {
    color: darkgray;
  }
}
</style>
