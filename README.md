# xiaochengxu-chushou

> A Vue.js project h5-dls分支readme不同（为H5初步开发模板）

# Support
> ui vux  
> vue-cli vuex vue-router  
> axios  

## Step
1.注册公众号，分服务号和订阅号，区别还是较大的  
2.进入开发模式，绑服务器（服务端做自动回复等）、绑定开发者。编辑模式针对中小企业不依赖深度开发（后台直接编辑关键词自动回复，推送等  
3.js接口安全域名（在此域名下可安全调用api），配合nginx(或者直接改server-host)、修改host便于在微信开发者工具中测试  
4.接入js-sdk，可操作wx提供的api，如扫一扫等 官方https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html

## main
1.引入JS文件或者npm install weixin-js-sdk  
2.wx.config({  
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来  
  appId: '', // 必填，公众号的唯一标识  
  timestamp: , // 必填，生成签名的时间戳  
  nonceStr: '', // 必填，生成签名的随机串  
  signature: '',// 必填，签名  
  jsApiList: [] // 必填，需要使用的JS接口列表  
});  
(一般这类签名数据由后端造api传给你，或者前端的服务端server.js用node来搞)  

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
