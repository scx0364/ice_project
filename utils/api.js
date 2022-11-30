// const BASE_URL = 'http://192.168.121.56:8787/api'
const BASE_URL = 'https://api-hmugo-web.itheima.net'
 
export const sendRequest = (options) => {
	uni.request({
		url: BASE_URL + options.url,
		method: options.method || 'GET',
		data: options.data || {},
    header:options.header || {},
		success: (res) => {
			options.success(res)
 
		},
		fail: (err) => {
			uni.showToast({
				title: "请求接口失败"
			})
			reject(err)
		}
	})
 
}