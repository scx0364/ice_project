<template>
	<view class="container">


		<view class="tab_nav">
			<!-- tab栏 -->
			<view :class="['nav',i==active? 'active':'']" v-for="(item,i) in navList" :key="i">
				<view class="nav_title" @click="checked(i,$event)" :data-num="i">
					{{item.title}}
				</view>

			</view>

		</view>
		<!-- 优惠券区域 -->
		<view class="seletced_item0" v-if="active == 0">
			<!-- 优惠券 -->
			<view class="coupons" v-for="(item,i) in coupons0" :key="i">
				<!-- 左侧金额 -->
				<view class="price_box">
					<view class="price">
						<text class="money_mark">￥</text>
						<text class="num">{{item.money}}</text>
					</view>
					<text class="coupon_name">抵扣券</text>
				</view>
				<!-- 分界线 -->
				<view class="dashed_line">

				</view>
				<!-- 右侧详情 -->
				<view class="coupons_info">
					<text class="activity">活动优惠</text>
					<button type="default" class="to_use">去使用</button>
					<text class="use_time">有效期：<text>{{item.createtime}}</text> ~ <text>{{item.to_time}}</text></text>
				</view>
			</view>
		</view>
		<view class="seletced_item1" v-if="active == 1" v-for="(item2,i) in coupons1" :key="i">
			<!-- 优惠券 -->
			<view class="coupons">
				<!-- 左侧金额 -->
				<view class="price_box">
					<view class="price">
						<text class="money_mark">￥</text>
						<text class="num">{{item2.money}}</text>
					</view>
					<text class="coupon_name">抵扣券</text>
				</view>
				<!-- 分界线 -->
				<view class="dashed_line">

				</view>
				<!-- 右侧详情 -->
				<view class="coupons_info">
					<text class="activity">活动优惠</text>
					<view class="to_use">已使用</view>
					<text class="use_time">有效期：<text>{{item2.createtime}}</text> ~ <text>{{item2.to_time}}</text> </text>
				</view>
			</view>

		</view>
		<view class="seletced_item1" v-if="active == 2" v-for="(item3,i) in coupons2" :key="i">
			<!-- 优惠券 -->
			<view class="coupons">
				<!-- 左侧金额 -->
				<view class="price_box">
					<view class="price">
						<text class="money_mark">￥</text>
						<text class="num">{{item3.money}}</text>
					</view>
					<text class="coupon_name">抵扣券</text>
				</view>
				<!-- 分界线 -->
				<view class="dashed_line">

				</view>
				<!-- 右侧详情 -->
				<view class="coupons_info">
					<text class="activity">活动优惠</text>
					<view class="to_use">已过期</view>
					<text class="use_time">有效期：<text>{{item3.createtime}}</text> ~ <text>{{item3.to_time}}</text></text>
					<!-- <text class="use_time">有效期：<text>{{timeHandler(1657890345)}}</text> ~ <text>{{timeHandler(1657890788)}}</text></text> -->
				</view>
			</view>

		</view>
		<my-button :text="text" v-if="active == 0" @myevent="gotoExchange"></my-button>
    
	</view>
</template>

<script>

	import {
		mapState,
		mapMutations,
		mapActions,
    mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				text: '去兑换',
				active: 0,
				navList: [{
						index: 0,
						title: '未使用'
					},
					{
						index: 1,
						title: '已使用'
					},
					{
						index: 2,
						title: '已过期'
					}
				],
				// 请求的参数对象
				reqObj: {
					status: '', // 状态:1,2,3
					limit: 6, // 每页数量
					pages: 1 // 当前的页码
				},
				// 优惠券列表
				coupons0: [],
				coupons1: [],
				coupons2: [],
				// 优惠券总数
				total: 0,
				// 定义节流阀，防止重复请求
				isLoading: false
			};
		},
		// 页面加载
		onLoad() {
      
			// 判断是否登录，如果没有登录，就跳转到登录页面
			if(this.token == '0') {
				this.naveToLogin({
				  openType: 'navigateTo',
				  from: '/subpkg/coupon/coupon'
				})
			}
			// this.getCouponList(this.active)
			this.getCouponList(0)
			
		},
		computed: {
			...mapState(['token']),
      
		},
		methods: {
			...mapMutations(['updateData','timeHandler']),
			...mapActions(['naveToLogin']),

			checked(i, $event) {
				// console.log(this.total)
				this.active = i
				

				switch (i) {
					case 0:
					
						// 点击当前的标题，让另外两个标题下的数据清空
						this.coupons1 = []
						this.coupons2 = []
						// 如果在当前标题下重复点击标题，判断是否有数据，如果有就直接return，从而避免重复请求数据，导致数据无限叠加
						if (this.coupons0.length != 0) {
							console.log(123)
							return
						}
						case 1:
							this.coupons0 = []
							this.coupons2 = []
							if (this.coupons1.length != 0) return
						case 2:
							this.coupons1 = []
							this.coupons0 = []
							if (this.coupons2.length != 0) return

				}
				this.reqObj.pages = 1
				// console.log(555)
				// 请求数据
				this.getCouponList(i)

			},




			// 请求数据的方法
			getCouponList(i) {
				let that = this
				// 状态为当前的索引号+1
				this.reqObj.status = i + 1

				// 发起请求，获取优惠券列表信息
				// 开始请求，打开节流阀
				this.isLoading = true
				
				uni.request({
					url: 'http://192.168.1.9:8787/api/demo/list',
					method: 'POST',
					data: this.reqObj,
					header: {

						'token': this.token

					},
					success: (res) => {

						// 请求完成，关闭节流阀
						that.isLoading = false
						// 判断请求是否失败
						if (res.errMsg != 'request:ok') {
							uni.$showMsg('数据请求失败！')

							return
						}
						// let a = 0
						// let b = 0
						// console.log(res.data.data.data)
						res.data.data.data.forEach((item,index) => {
							// console.log(item.createtime)
							// console.log(item.to_time)
							// 调用时间处理函数，把时间戳处理为年月日的格式
							 // a = this.timeHandler(item.createtime)
							 item.createtime = this.timeHandler(item.createtime)
							 // b = this.timeHandler(item.to_time)
							 item.to_time = this.timeHandler(item.to_time)
							
						})
						// console.log(res.data.data.data)
						// console.log(a)
						// console.log(b)
						// 请求成功，更新优惠券列表,将新旧数据拼接，防止覆盖
						that.coupons0 = [...that.coupons0, ...res.data.data.data.filter(x => x.status == 1)]
						that.coupons1 = [...that.coupons1, ...res.data.data.data.filter(x => x.status == 2)]
						that.coupons2 = [...that.coupons2, ...res.data.data.data.filter(x => x.status == 3)]
						// 更新优惠券总数
						that.total = res.data.data.total

					}
				})

			},
			// 处理时间的函数
			// timeHandler(time) {
			// 	let alltime = new Date(time)
			// 	let year = alltime.getFullYear()
			// 	let month = alltime.getMonth() + 1
			// 	let day = alltime.getDay()
			// 	let hmonth = month < 10? '0' + month:month
			// 	let hday = day < 10? '0' + day:day
			// 	return year +'.' + hmonth + '.' + hday 
			// },
			// 点击按钮跳转到兑换页面
			gotoExchange() {
				uni.navigateTo({
					url:'/subpkg/exchange_points/exchange_points'
				})
			}
		},
		// 触底刷新
		onReachBottom() {
			// 判断是否还有下一页数据
			if (this.reqObj.limit * this.reqObj.pages >= this.total) {
				uni.$showMsg('数据加载完毕！')
				return
			}
			
			// 如果还有数据，让当前的页码自增加1
			this.reqObj.pages += 1
			// 判断是否有请求正在执行
			if (this.isLoading) return
			// 如果没有请求正在执行，则请求下一页数据,选中项不变
			uni.$showMsg('数据加载中')
			this.getCouponList(this.active)
		}

	}
</script>

<style lang="scss">
	.container {
		padding-bottom: 150rpx;
	}

	.tab_nav {
		height: 94rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #fff;

		.nav {
			font-size: 32rpx;

		}

		.active {
			color: #447cff;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				top: 48rpx;
				left: 24rpx;
				width: 48rpx;
				height: 4rpx;
				background-color: #447cff;
				border-radius: 200px;

			}
		}

	}

	.seletced_item0 {
		box-sizing: border-box;
		padding: 0 32rpx;

		.coupons {
			display: flex;
			align-items: center;
			height: 184rpx;
			background: linear-gradient(105deg, #fee6b8, #f8d998 100%);
			border: 2rpx solid #b38d57;
			border-radius: 24rpx;
			box-shadow: 0 9rpx 14rpx 0 rgba(254, 230, 183, 0.44);
			margin-top: 24rpx;

			.price_box {
				height: 136rpx;
				width: 92rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-left: 44rpx;

				.money_mark {
					font-size: 26rpx;
					color: #8B5121;
				}

				.num {
					font-size: 62rpx;
					font-weight: 700;
					color: #8B5121;
				}

				.coupon_name {
					font-size: 26rpx;
					color: #A98854;
				}
			}

			.dashed_line {
				height: 128rpx;
				margin-left: 36rpx;
				border-left: 1rpx dashed #B38D57;
			}

			.coupons_info {
				position: relative;
				width: 434rpx;
				height: 92rpx;
				margin-left: 36rpx;

				.activity {
					position: absolute;
					top: 0;
					left: 0;
					font-size: 32rpx;
					color: #8b5121;
				}

				.to_use {
					position: absolute;
					top: 0;
					right: 0;
					width: 148rpx;
					height: 46rpx;
					line-height: 46rpx;
					font-size: 28rpx;
					color: #fff;
					background-color: #b38d57;
					border-radius: 92rpx;
				}

				.use_time {
					position: absolute;
					left: 0;
					bottom: 0;
					font-size: 22rpx;
					color: #828282;
				}
			}
		}
	}

	.seletced_item1 {
		box-sizing: border-box;
		padding: 0 32rpx;

		.coupons {
			display: flex;
			align-items: center;
			height: 184rpx;
			background: #fff;

			border-radius: 24rpx;
			box-shadow: 0 9rpx 14rpx 0 rgba(240, 240, 240, 0.44);
			margin-top: 24rpx;

			.price_box {
				height: 136rpx;
				width: 92rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-left: 44rpx;
				color: #989898;

				.money_mark {
					font-size: 26rpx;

				}

				.num {
					font-size: 62rpx;
					font-weight: 700;

				}

				.coupon_name {
					font-size: 26rpx;

				}
			}

			.dashed_line {
				height: 128rpx;
				margin-left: 36rpx;
				border-left: 1rpx dashed #989898;
			}

			.coupons_info {
				position: relative;
				width: 434rpx;
				height: 92rpx;
				margin-left: 36rpx;
				color: #989898;

				.activity {
					position: absolute;
					top: 0;
					left: 0;
					font-size: 32rpx;


				}

				.to_use {
					position: absolute;
					top: 0;
					right: 0;
					width: 148rpx;
					height: 46rpx;
					text-align: center;
					line-height: 46rpx;
					font-size: 28rpx;
					// color: #fff;
					background-color: #fff;
					border-radius: 92rpx;
					border: none;
				}

				.use_time {
					position: absolute;
					left: 0;
					bottom: 0;
					font-size: 22rpx;

				}
			}
		}
	}
</style>
