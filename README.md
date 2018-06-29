# xiaochengxu-chushou

> A Vue.js project

## Step
1.注册公众号，分服务号和订阅号，区别还是较大的
2.进入开发模式，绑服务器（服务端做自动回复等）、绑定开发者。编辑模式针对中小企业不依赖深度开发（后台直接编辑关键词自动回复，推送等）
3.js接口安全域名（在此域名下可安全调用api），配合nginx、修改host便于在微信开发者工具中测试
4.接入js-sdk，可操作wx提供的api，如扫一扫等。
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
