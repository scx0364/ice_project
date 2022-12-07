//导入createStore方法
import { createStore } from 'vuex'
// 创建store实例对象
const store = createStore({
	state:{//存放状态
		
		// token:''
		token: JSON.parse(uni.getStorageSync('token') || '0'),
		// 自定义属性
		num :0,
    // 定义倒计时的秒数
    seconds: 3,
    // 定时器timer
    timer:null,
    // 重定向的信息对象，包括跳转方式openType和从哪个页面跳转到登录的from
    redirectInfo:null,
	// 请求的根路径
	baseUrl:'http://192.168.1.9:8787/api/',
	// 年月日格式的时间
  handled_time:null
	

	},
	getters:{
    
		
},
	mutations:{
		// 更新token值
		updateToken(state,token) {
			state.token = token
		},
		// 更新自定义属性值
		updateData(state,num) {
			state.num = num
		},
    
     // 展示倒计时效果
     showTips(state,seconds) {
       uni.showToast({
         icon:'none',
         title:'请登录后再操作！' + state.seconds +'秒后跳转登录页面',
         mask:true,
         duration:1500
       })
     },
     // 秒数减1
     decreatSeconds(state) {
      return state.seconds --
     },
     // 更新重定向信息对象
     updateRedirectInfo(state,info) {
       state.redirectInfo = info
     },
	 // 处理时间的函数
	 timeHandler(state,time) {
	 	let alltime = new Date(time)
	 	let year = alltime.getFullYear()
	 	let month = alltime.getMonth() + 1
	 	let day = alltime.getDay()
	 	let hmonth = month < 10? '0' + month:month
	 	let hday = day < 10? '0' + day:day
	 	// return year +'.' + hmonth + '.' + hday 
	 	state.handled_time = year +'.' + hmonth + '.' + hday 
	 },
     
},
	actions:{
    // 倒计时导航跳转到登录页面
    // 调用该方法时需传递重定向信息对象
    naveToLogin(context,info) {
      // 可以通过context.state.状态名拿到state中定义的状态
      // console.log(context.state.seconds)
      // 多次调用，需要在执行之前重置seconds的值
      context.state.seconds = 3
      // 首先提示登录
      context.commit('showTips')
      // 开启定时器实现倒计时效果
      context.state.timer = setInterval(() => {
         
        // 先让秒数减1
        context.commit('decreatSeconds')
        // 判断秒数是否小于0
        // console.log(context.state.seconds)
        if(context.state.seconds <= 0) {
          // 清除定时器
          clearInterval(context.state.timer)
          // 跳转到登录页面
          uni.navigateTo({
            url:'/pages/my/my',
            // 跳转成功的回调函数
            success: () => {
              // 调用更新重定向信息的方法，将具体的值以参数传递给该方法
              context.commit('updateRedirectInfo',info)
              // console.log(context.state.redirectInfo)
            }
          })
          // 终止后续代码运行，不再展示提示消息
          return
        }
        // 再调用提示消息，将秒数更新
        context.commit('showTips',context.state.seconds)
        
        
      },1000)
    }
}

})
export default store // 将store实例共享出去