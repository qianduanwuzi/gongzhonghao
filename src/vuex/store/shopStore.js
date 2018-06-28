
const setBodyStore = {
    state:{
        login: false,
        user:{},
        isLoading: false,
        direction: 'forward',
        scrollTop: 0,
        headerShow: true,
        headerTitle:'礼卡在线',
        leftOption:false,
        rightOption:false,
    },
    //处理异步
    actions: {
        updatePosition ({commit}, top) {
            commit({type: 'updatePosition', top: top})
          }
    },
    //只能mutations更新state，必须同步
    mutations:{
        updateLoadingStatus (state, payload) {
            state.isLoading = payload.isLoading
          },
          updateDirection (state, payload) {
            state.direction = payload.direction
          },
          updatePosition (state, payload) {
            state.scrollTop = payload.top
          },
          updateLogin(state,payload){
            state.login = true;
            state.user = payload.user;
          },
          showHeader(state,payload){
            state.headerShow = payload.show;
            state.leftOption = payload.left;
            state.rightOption = payload.right;
            state.headerTitle = payload.title;
          }
    },
    //获取state的值
    getters: {
        isLogin: state => state.login
    }
}

export default setBodyStore


