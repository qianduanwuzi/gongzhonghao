<template>
    <div class="icontainer" :style="{'width': widths}">
        <input :type="types" :style="styles" :value="value" 
        @input="$emit('input', $event.target.value)" 
        @focus="focusHandler" 
        @blur="blurHandler" 
        :placeholder="placeholder" 
        :class="['input', showSearch? 'sinput': '']" 
        ref="s-input" >
         <div v-if="showSearch" class="ignore">
            <!-- <x-icon type="ios-search" size="30"></x-icon> -->
            <img src="https://skl-h5.oss-cn-hangzhou.aliyuncs.com/search-icon.png" alt="">
            <span>搜索</span>
         </div>
         <span class="slot">
            <slot ></slot>
         </span>
         <span v-if="eventName" @click="$emit('clickHandler')" class="eventName">{{eventName}}</span>
    </div>
</template>
<script>
export default {
  props: {
    value: {},
    placeholder: {
      default: "",
      type: String
    },
    placeholderAalign: {
      // placehoder 位置 'center'
      default: "left",
      type: String
    },
    showSearch: {
      // 控制icon-search显示
      default: false,
      type: Boolean
    },
    styles: {
      // 修改input样式
      default: () => {},
      type: Object
    },
    widths: {
      default: "100%",
      type: String
    },
    iconName: {
      default: "",
      type: String
    },
    types: {
      default: "txt",
      type: String
    },
    eventName: {
      default: "",
      type: String
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$slots.default && this.$slots.default.length) {
        // 获取css样式里的padding-left
        let old = this.getStyle(this.$refs["s-input"], "paddingLeft");
        // style覆盖css
        if (this.$refs["s-input"].style.paddingLeft) {
          this.$refs["s-input"].style.paddingLeft =
            this.$refs["s-input"].style.paddingLeft + 5 + "px";
        } else {
          // 只有css
          this.$refs["s-input"].style.paddingLeft =
            Number(old ? old.split("px")[0] : 0) + 5 + "px";
        }
      }
    });
  },
  methods: {
    focusHandler() {
      this.$emit("update:showSearch", false);
      this.$emit("focus");
    },
    blurHandler() {
      if (!this.value.trim()) this.$emit("update:showSearch", true);
      this.$emit("blur");
    },
    getStyle(obj, attr) {
      if (obj.currentStyle) {
        return obj.currentStyle[attr];
      } else {
        return document.defaultView.getComputedStyle(obj, null)[attr];
      }
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
.icontainer {
  position: relative;
  margin: 0 auto;
  .input {
    width: 100%;
    height: 35px;
    outline: none;
    border: 1px solid #c4cfd6;
    border-radius: 4.5px;
    -webkit-appearance: none;
    display: block;
    margin: 0 auto;
    background-color: #fff;
    padding-left: 20px;
  }
  .sinput {
    background-color: #f5f6f8;
  }
  .ignore {
    color: #666;
    opacity: 0.4;
    font-size: 12px;
    display: flex;
    align-items: center;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    img {
      width: 14.5px;
      margin-right: 4px;
    }
  }
  .slot {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
  }
  .eventName {
    height: 30px;
    line-height: 30px;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #0095f5;
  }
  input::-webkit-input-placeholder {
    /* WebKit browsers */
    font-size: 12px;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-size: 12px;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-size: 12px;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    font-size: 12px;
  }
}
</style>
