import Vue from 'vue'
import Vuex from 'vuex'
// import setBodyStore from "./store/setBodyStore"
import setTipStore from "./store/setTipStore"
Vue.use(Vuex)

const store = new Vuex.Store(
  {
    modules: {
    //   setBodyStore,
      setTipStore
    }
  }
)

export default store