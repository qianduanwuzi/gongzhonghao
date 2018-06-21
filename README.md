# xiaochengxu-chushou

> A Vue.js project

## branch
    * master 生产分支  
    * dev 开发分支  
    * h5-dls 开发web移动端基于vue开发的模板分支

## 基本说明
    * 本文基于vue开发，应用了vue-router和vuex，也结合了vue文档中filters、directives、plugins、components等一系列开发。*  
    * 本文基于axios做了封装，方便全局处理* 
    * 应用了vw做适配，因只考虑移动端，故vw通畅，如接入pc，请慎重*  
    * 应用sass预处理器，结合嵌套、mixin、@import、函数式便于开发*  
    * 应用了postcss后处理器，可直接按设计稿px直接写css，postcss会在编译期间转成vw*  

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

