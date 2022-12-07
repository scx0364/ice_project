// import api from './utils/api.js'
// 导入store实例对象：
import store from './store'
// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'
import test from './utils/api.js'
// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'http://192.168.1.9:8787/api'
// 请求拦截器
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
  	title:'数据加载中...'
  })
}
// 响应拦截器
// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}
uni.$showMsg = function(title = '数据加载失败！',duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 导入自定义的请求根路径
// import {test} from './utils/api.js'

//全局挂载
Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif



// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$test = test
 app.use(store) // 导入store实例对象
  return {
    app
  }
}
// #endif