// import api from '../api';
const setBodyStore = {
    state:{
        timeStamp: 0, 
        type: 'success',
        msg: '',
        width: '100px',
        time: 2000,
    },
    //处理异步
    actions: {
        setTip({commit},p) {
            console.log('come in')
            p.timeStamp = new Date().getTime();
            commit('SET_TIP', p)
        }
    },
    //只能mutations更新state，必须同步
    mutations:{
        SET_TIP: (state, param) => {
            console.log(Object.assign(state, param))
        }
    },
    //获取state的值
    getters: {
        getTipInfo: (state) => state
    }
}

export default setBodyStore