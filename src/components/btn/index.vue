<template>
    <div class="btnBox" :style="Object.assign({}, styles, {'width': widths})" @click="$emit('click')">
        {{name}}
    </div>
</template>
<script>
export default {
  props: {
      name: {
          default: '',
          type: String
      },
      styles: {
          default: () => {},
          type: Object
      },
      widths: {
          default: '',
          type: String
      }
  }
}
</script>
<style lang="scss" scoped>
.btnBox{
    background-color: #ff6600;
    line-height: 45px;
    height: 45px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    border-radius: 4.5px;
    font-weight: bold;
    width: 100%;
    margin: auto;
}
</style>
