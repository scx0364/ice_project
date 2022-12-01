//导入createStore方法
import { createStore } from 'vuex'
// 创建store实例对象
const store = createStore({
	state:{//存放状态
		
		// token:''
		token: JSON.parse(uni.getStorageSync('token') || '0')

	},
	getters:{
},
	mutations:{
		// 更新token值
		updateToken(state,token) {
			state.token = token
		}
},
	actions:{
}

})
export default store // 将store实例共享出去