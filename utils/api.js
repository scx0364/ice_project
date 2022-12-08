// function test() {
// 	console.log(1111)
// }

// 处理时间的函数
function timeHandler(time,split) {
	let renew_time = time * 1000
	let alltime = new Date(renew_time)
	let year = alltime.getFullYear()
	let month = alltime.getMonth() + 1
	let day = alltime.getDay()
	let hmonth = month < 10 ? '0' + month : month
	let hday = day < 10 ? '0' + day : day
	return year + split + hmonth + split + hday 
	// return year + '.' + hmonth + '.' + hday
}

export default timeHandler
