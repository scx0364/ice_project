<template>

	<view class="relative">
		
		<image src="../../static/my-img/bj.png"  class="" style="width: 100%; height: 1448rpx;"></image>
		<image src="../../images/points/lucky.png" mode="" class="title"></image>
		<image src="../../images/points/describ.png" mode="" class="describ"></image>
		<view class="zhuan flexCenter">
			<view class="shadow_box">
				
			</view>
			<image src="../../static/my-img/turn2.png"  class="zhuanBox"
				:class="{'rotate':isRotate}" :style="{transform:`rotate(${angle}deg)`}"
				style="width:634rpx;height:634rpx;"></image>
			<image src="../../static/my-img/zz.png"  @click="rotate()" class="an "
				style="width:214rpx;height:214rpx;"></image>
		</view>
		
		<text class="consum_points">
			每20积分可抽一次
		</text>
		<button class="try_now" @click="rotate()">立即抽奖</button>
		<image src="../../images/points/lucky_records.png" class="lucky_records"></image>
		
		<view class="list_container">
			
				
			
			<view class="box_out">
				<view class="box_inner">
					
				</view>
			</view>
			<view class="scroll_container">
				
			
			<scroll-view scroll-y="true" class="scroll_y" scroll-x="false" >
			<view class="list_box">
				<view class="list_title">
					<view class="time">
						中奖时间
					</view>
					<view class="prize">
						获得奖品
					</view>
				</view>
				<view class="list_content" v-for="(item,i) in prizeInfo">
					<view class="time">
						{{item.create_time}}
					</view>
					<view class="t_prize">
						积分+{{item.integral}}
					</view>
				</view>
				
			</view>
			</scroll-view>
			</view>
		</view>
		
		<!-- <view>1. 注册或未参与过此活动的用户</view>
			<view>2. 红包奖励直接到用户账号，可以用于商城购物</view>
			<view>3. 参与活动时，需要分享给好友一起参与</view> -->
	</view>
	<!-- 
		<view>1. 注册或未参与过此活动的用户</view>
			<view>2. 红包奖励直接到用户账号，可以用于商城购物</view>
			 <view>3. 参与活动时，需要分享给好友一起参与</view> --> 
	<!-- </view> -->
	<wyb-popup ref="pop" mode="size-fixed" type="center" height="564" width="412" radius="20" :showCloseIcon="true" closeIconPos="bottom-right"
	closeIcon="../../static/my-img/close.png" closeIconSize="82" vertOffset="-80" horiOffset="165" 
	:maskClickClose= "false" maskAlpha="0.7" negativeTop="30">
	    <view class="popup-content">
			<view class="prize_info">
				<text class="b_tex">恭喜你</text>
				<text class="s_tex">抽中2元优惠券</text>
			</view>
	        <image src="../../images/points/disgif.png" mode="" class="pop_pic"></image>
			  
			  <image src="../../images/points/btn_pic.png" class="to_see"></image>
	    </view>
	</wyb-popup>
</template>
<script>
	
	//生成随机数（下面也有一个）
	function rand(min, max) {
		return parseInt(Math.random() * (max - min + 1) + min);
	}
	import {mapState} from 'vuex'
	import wybPopup from '@/components/wyb-popup/wyb-popup.vue'
	export default {
		components: {
		    wybPopup
		},
		data() {
			return {
				isRotate: false, //是否旋转
				prizeList: ['积分', '新人红包', '精选好券', '谢谢参与', '积分', '新人红包', '惊喜礼包', '新人红包'], //奖品列表，决定旋转角度
				angle: 0, //旋转角度
				// 中奖信息
				prizeInfo:[],
				// 请求积分数据列表的对象
				reqObj:{
					status:1,
					limit:8,
					page:1,
					type:3
				},
			}
		},
		onLoad() {
			
			this.getPrizeInfo()
		},
		computed:{
			...mapState(['baseUrl','token'])
		},
		methods: {
			rotate() {
				if (this.isRotate) return;
				this.angle = 0;
				setTimeout(() => {
					let len = this.prizeList.length;
					let num = rand(0, len - 1); //随机奖品，可以改成后端返回的。
					// let num=7;	//随机奖品，可以改成后端返回的。
					let prize = this.prizeList[num];
					// let angle=360/8*num+rand(0,44);//不排除转到中间线
					let angle = 360 / len * num + rand(4, 40); //排除转到中间线
					this.angle = (8 * 360 + angle); //旋转圈数8 + 奖品角度
					console.log('奖品：', prize, num, angle, this.angle, len)
					this.isRotate = true;
					setTimeout(() => {
						this.isRotate = false;
						this.$refs.pop.show()
						// uni.showToast({
						// 	title: prize,
						// 	icon: 'none',
						// 	duration: 3000
						// })
					}, 5000)
				}, 300)
			},
			// 请求中奖信息的方法
			getPrizeInfo() {
				let that = this
				// 每次重新加载页面时，先清空prizeInfo
				this.prizeInfo = []
				uni.request({
					url: this.baseUrl + 'demo/user_integral_record_list',
					method:'POST',
					data: this.reqObj,
					header: {
						'token': this.token
						},
					// 请求成功的回调函数
					success: (res) => {
						
						
						// 判断code是否等于401
						
						if(res.data.code == 401 ) {
							// TODO：登录
							this.naveToLogin({
								  openType: 'navigateTo',
								  from: '/subpkg/lucky_prize/lucky_prize'
							})
							// console.log(this.token)
						}
						// console.log(res.data.data.data.data)
						// console.log(that.$timeHandler(1491635035))
						res.data.data.data.data.forEach((item,index) => {
							// console.log(item.create_time)
							
							// 调用时间处理函数，把时间戳处理为年月日的格式
							
							 item.create_time = that.$timeHandler(item.create_time,'-')
							 
							 // console.log(item.create_time)
							
						})
						// 将请求回来的数据赋值给prizeInfo
						this.prizeInfo = [...this.prizeInfo,...res.data.data.data.data]
						console.log(this.prizeInfo)
					}
					}) 
						
					
			}
		}
	}
</script>

<style lang="scss">
	.relative {
		background-color: #50a7ff;
	}
	.title {
		position: absolute;
		top: 56rpx;
		left: 112rpx;
		display: block;
		width: 526rpx;
		height: 123rpx;
	}
	.describ {
		position: absolute;
		top: 201rpx;
		left: 109rpx;
		display: block;
		width: 523rpx;
		height: 63rpx;
	}
	.zhuan {
		width: 634rpx;
		height: 634rpx;
		
		position: absolute;
		
		top: 336rpx;
		
		left: 58rpx;
		
	}
	.shadow_box {
		width: 634rpx;
		height: 634rpx;
		border-radius: 50%;
		position: absolute;
		top: 18rpx;
		background: #305dff;
		box-shadow: 25.67rpx 48.59rpx 95.35rpx 0 rgba(33,80,189,0.51); 
		
	}

	.zhuanBox {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	
	.an {
		
		position:absolute;
		
		top: 181rpx;
		left:210rpx;
		
	}

	// .an:active {
	// 	transform: scale(0.95);
	// }
	.consum_points {
		position: absolute;
		top: 1022rpx;
		left: 261rpx;
		font-size: 28rpx;
		color: #0532a5;
		text-shadow: 1rpx 3rpx 0 #fff; 
	}
	.try_now {
		position: absolute;
		top: 1080rpx;
		left: 173rpx;
		width: 404rpx;
		height: 100rpx;
		color: #fff;
		font-weight: 700;
		background: linear-gradient(180deg,#c2dbff, #1070ff, #014fc3, #1070ff, #0048b5);
		border-radius: 105rpx;
		box-shadow: 0 9rpx 8rpx 0 rgba(26,103,219,0.65);
	}
	.lucky_records {
		display: block;
		width: 550rpx;
		height: 68rpx;
		position: absolute;
		top: 1301rpx;
		left: 100rpx;
	}
	.list_container {
		position: absolute;
		top: 1410rpx;
		left: 22rpx;
		width: 706rpx;
		.box_out {
			position: relative;
			width: 706rpx;
			height: 34rpx;
			background: #196bbe;
			border-radius: 87rpx;
			.box_inner {
				position: absolute;
				top: 8rpx;
				left: 14rpx;
				width: 678rpx;
				height: 18rpx;
				background: #0f2d99;
				border-radius: 87rpx;
			}
		}
		.scroll_container {
			width: 100%;
			 position: absolute;
			 top: 10rpx;
			 height: 1000rpx;
			 padding-top: 10rpx;
		}
		.scroll_y {
			position: absolute;
			top: 10rpx;
			height: 1000rpx;
		}
		.list_box {
			position: absolute;
			// top: 8rpx;
			left: 32rpx;
			width: 648rpx;
			height: 1500rpx;
			background-color: #fff;
			box-sizing: border-box;
			// padding: 10rpx 24rpx 0;
			padding: 0rpx 24rpx ;
			.list_title {
				position: sticky;
				// bottom: 920rpx;
				top: 10rpx;
				left: 32rpx;
				height: 90rpx;
				line-height: 90rpx;
				display: flex;
				font-size: 32rpx;
				color:#447cff;
				font-weight: 700;
				text-align: center;
				box-shadow: 0px -1rpx 0px 0px rgba(0,0,0,0.06) inset; 
				.time {
					width: 300rpx;
					height: 100%;
					
				}
				.prize {
					width: 300rpx;
					height: 100%;
					color: #EC5446;
				}
				
			}
			.list_content {
				height: 90rpx;
				line-height: 90rpx;
				display: flex;
				font-size: 26rpx;
				color:#828282;
				
				text-align: center;
				box-shadow: 0px -1rpx 0px 0px rgba(0,0,0,0.06) inset; 
				.time {
					width: 300rpx;
					height: 100%;
					
				}
				.t_prize {
					width: 300rpx;
					height: 100%;
					
				}
			}
		}
	}
	.rotate {
		/* animation: rotate 5s infinite linear; */
		/* animation-timing-function: ease-in-out; */
		/* animation-timing-function: cubic-bezier(0.42, 0, 0.58, 0.9); */
		/* animation-timing-function: cubic-bezier(0.25,0.1,0.25,1); */
		transform: rotate(3800deg);
		transition: transform 5s ease;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}

		100% {
			/* transform: rotate(360deg); */
			transform: rotate(3800deg);
		}
	}
	
	.popup-content {
		position: relative;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 412rpx;
		height: 564rpx;
		background: rgba(0,0,0,0.0070);
		// background: rgba(0,0,0,0.70);
		// border-radius: 20rpx;
		.prize_info {
			width: 284rpx;
			height: 184rpx;
			display: flex;
			flex-direction: column;
			font-weight: 700;
			text-align: center;
			margin-top: 20rpx;
			.b_tex {
				font-size: 48rpx;
				color: goldenrod;
			}
			.s_tex {
				font-size: 32rpx;
				color: goldenrod;
				margin-top: 20rpx;
			}
		}
		.pop_pic {
			position: absolute;
			top: 162rpx;
			display: block;
			width: 412rpx;
			height: 274rpx;
		}
		.to_see {
			position: absolute;
			// bottom: 130rpx;
			top: 416rpx;
			display: block;
			width:362rpx;
			height: 100rpx;
		}
		
	}
</style>
