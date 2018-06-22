<template>
  <div id="app">
    <router-view/>
    <tip></tip> 
  </div>
</template>

<script>
import Tip from "@/components/tip"; 
export default {
  components: {Tip},
  name: 'App'
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px; */
  height: 100%;
  -webkit-overflow-scrolling: touch;
}

/*全局样式*/
html,
body {
  font-family: "Microsoft YaHei" !important;
  margin: 0;
  padding: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

body {
  font-size: 12px;
  color: #666666;
}

* {
  -webkit-text-size-adjust: none;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: #666;
}

img {
  width: 100%;
  display: block;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: rgba(102, 102, 102, 0.3);
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  color: rgba(102, 102, 102, 0.3);
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  color: rgba(102, 102, 102, 0.3);
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: rgba(102, 102, 102, 0.3);
}
</style>
