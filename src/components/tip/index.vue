<template>
     <toast v-model="show" :type="tipInfo.type" :width="tipInfo.width" :time="tipInfo.time">{{tipInfo.msg}}</toast>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "tip",
  props: {
      widths: {},
  },
  data() {
    return {
        show: false,
        tipInfo: {type: '', msg: '', width:'', time: 2000},
    }
  },
  computed: {
    ...mapGetters({
      getTipInfo: "getTipInfo"
    })
  },
  mounted() {
  
  },
     watch: {
        "getTipInfo.timeStamp": function () {
            this.show = true;
            this.tipInfo = this.getTipInfo;
            setTimeout(() => {
                this.show = false
            }, this.getTipInfo.time || 2000)
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
