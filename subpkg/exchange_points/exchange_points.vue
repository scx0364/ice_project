<template>
	
		<page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
		<view class="points_container ">
			<view class="pic_box">
				<image src="../../images/points/points_pic.png" class="points_pic" mode="heightFix"></image>
			</view>
			<view class="welfare_box">
				<view class="blank_mark">
				</view>
				<view class="to_get_points">
					<view class="blank_bg">
					</view>
					<view class="points_num_box">
						<text class="points_num">{{totalPoints}}</text>
						<text class="points_text">积分</text>
					</view>

					<button>
						<image src="../../images/points/money.png" mode=""></image>
						<text>领积分</text>
					</button>
				</view>
				<!-- 积分兑换列表 -->
				<view class="list_box">
					<text class="list_title">积分换福利</text>
					<view class="list_item" >
						<!-- 抵扣券金额 -->
						<view class="item_money">
							<view class="money_box">
								<text class="money_mark">￥</text>
								<text class="money_count">{{exchangeList.money_count}}</text>
							</view>
							<text class="item_name">抵扣券</text>
						</view>
						<!-- 抵扣券相关信息 -->
						<view class="item_info">
							<text class="item_name">{{exchangeList.money_count}}元抵扣券</text>
							<text class="able_time">兑换之日起7天内有效</text>
							<image src="../../images/points/money.png" mode="" class="pic_money"></image>
							<text class="item_price">{{exchangeList.item_price}}积分</text>
							<button @click="open">兑换</button>
						</view>
					</view>
					
					
					<view class="list_item" >
						<!-- 抵扣券金额 -->
						<view class="item_money">
							<view class="money_box">
								<text class="money_mark">￥</text>
								<text class="money_count">{{exchangeList.money_count}}</text>
							</view>
							<text class="item_name">抵扣券</text>
						</view>
						<!-- 抵扣券相关信息 -->
						<view class="item_info">
							<text class="item_name">{{exchangeList.money_count}}元抵扣券</text>
							<text class="able_time">兑换之日起7天内有效</text>
							<image src="../../images/points/money.png" mode="" class="pic_money"></image>
							<text class="item_price">{{exchangeList.item_price}}积分</text>
							<button @click="open">兑换</button>
						</view>
					</view>
						
					</view>
				</view>
				
				
				
			</view>
		
	<!-- <view class="popup-bg" v-if="display">
	</view> -->
  <!-- <button @click="open">打开弹窗</button> -->
  <uni-popup ref="popup" type="dialog" @change="change">
  	<uni-popup-dialog type="info" mode="base" title="兑换" :content="'您需要花' + exchangeList.item_price + '积分兑换优惠券'" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
  </uni-popup>
  <wyb-popup ref="pop" mode="size-fixed" type="center" height="588" width="538" radius="20" :showCloseIcon="true" closeIconPos="bottom-right"  
  closeIcon="../../static/my-img/close.png" closeIconSize="82" vertOffset="-130" horiOffset="228" 
  :maskClickClose= "false" maskAlpha="0.7">
      <view class="popup-content">
          <image src="../../images/points/Frame.png" mode="" class="pop_pic"></image>
		  <text>兑换成功</text>
		  <button>前往查看</button>
      </view>
  </wyb-popup>


</template>

<script>
	import wybPopup from '@/components/wyb-popup/wyb-popup.vue'
	export default {
		components: {
		    wybPopup
		},
		data() {
			return {
				display:false,
				// 控制遮罩层穿透
				show:false,
				// 积分兑换抵扣券数据列表
				exchangeList:{
					money_count:1,
					item_price:20
				},
				imgSrc:'',
				
				// 积分总数
				// totalPoints:325
				totalPoints:JSON.parse(uni.getStorageSync('points') || '300')
			};
		},
		onLoad() {
			
		},
		methods: {
			change(e) {
				this.show = e.show
			},
			open() {
      			this.$refs.popup.open()
      		},
      		/**
      		 * 点击取消按钮触发
      		 * @param {Object} done
      		 */
      		close() {
      			// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
      			// ...
      			this.$refs.popup.close()
      		},
      		/**
      		 * 点击确认按钮触发
      		 * @param {Object} done
      		 * @param {Object} value
      		 */
      		confirm() {
      			// 输入框的值
      			// console.log(value)
      			// TODO 做一些其他的事情，手动执行 close 才会关闭对话框
      			// ...
				// 判断积分总数是否符合兑换条件
				if(this.totalPoints < this.exchangeList.item_price) {
					uni.$showMsg('积分不足！')
					this.$refs.popup.close()
					return
				} else {
					// 点击确认，总积分数减掉已经兑换的积分数
					this.totalPoints = this.totalPoints - this.exchangeList.item_price
					// 把积分总数保存到本地
					this.savePointsToStorage(this.totalPoints)
				}
				
      			this.$refs.popup.close()
				
				this.$refs.pop.show()
      		},
			// 将积分总数保存在本地的方法
			savePointsToStorage(poin_string) {
			  uni.setStorageSync('points', JSON.stringify(poin_string))
			},
			// 请求图片的方法
			
		},
		
	}
</script>

<style lang="scss">
	.points_container {
		position: relative;
		z-index: 0;
		// display: none;
		background-color: #a6ceff;
		padding-bottom: 96rpx;

		.pic_box {
			height: 780rpx;

			image {
				height: 100%;
			}
		}

		.welfare_box {
			position: relative;
			top: -40rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-sizing: border-box;
			background-color: #2277ff;
			border-radius: 24rpx;
			padding: 20rpx 24rpx;

			.blank_mark {
				width: 80rpx;
				height: 8rpx;
				background: #ffffff;
				border-radius: 49rpx;
			}

			.to_get_points {
				position: relative;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				border-radius: 24rpx;
				width: 718rpx;
				height: 128rpx;
				background-color: #ffffff;
				padding: 24rpx;
				margin-top: 24rpx;

				.blank_bg {
					width: 80rpx;
					height: 80rpx;
					background-color: #24b0ff;
					border-radius: 50%;
				}

				.points_num_box {
					margin-left: 16rpx;
				}

				.points_num {
					font-size: 56rpx;
					color: #447cff;
					font-weight: 700;
				}

				.points_text {

					font-size: 24rpx;
					color: #828282;
				}

				button {
					position: absolute;
					right: 24rpx;
					display: flex;
					align-items: center;
					width: 172rpx;
					height: 72rpx;
					padding: 0;
					margin: 0;
					background-color: #447cff;
					border-radius: 81rpx;

					image {
						display: block;
						width: 56rpx;
						height: 56rpx;
						margin-left: 12rpx;
						margin-right: 4rpx;
					}

					text {
						display: inline-block;
						font-size: 28rpx;
						line-height: 28rpx;
						color: #fff;
					}
				}
			}

			.list_box {
				width: 726rpx;
				background-color: #fff;
				box-sizing: border-box;
				padding: 28rpx 24rpx;
				margin-top: 24rpx;
				border-radius: 24rpx;

				.list_title {
					font-size: 34rpx;
					font-weight: 700;
					color: #333;
				}

				.list_item {
					width: 670rpx;
					height: 131rpx;
					display: flex;
					margin-top: 32rpx;

					&:nth-child(1) {
						margin-top: 24rpx;
					}

					.item_money {
						display: flex;
						flex-direction: column;
						align-items: center;
						// justify-content: space-around;
						width: 128rpx;
						height: 122rpx;
						background: linear-gradient(90deg, #FEE6B8, #F8D998 100%);
						border-radius: 12rpx;
						margin-top: 8.5rpx;

						.money_box {
							width: 48rpx;
							height: 67rpx;
							margin-top: 8rpx;

							.money_mark {
								font-size: 28rpx;
								color: #8B5121;
							}

							.money_count {
								font-size: 48rpx;
								color: #8B5121;
								font-weight: 700;
							}
						}

						.item_name {
							font-size: 24rpx;
							color: #A98854;
						}
					}

					.item_info {
						position: relative;
						width: 520rpx;
						height: 131rpx;
						margin-left: 22rpx;

						// margin-top: 4.5rpx;
						.item_name {
							font-size: 28rpx;
							font-weight: 700;
							color: #333;
						}

						.able_time {
							position: absolute;
							top: 50rpx;
							left: 4rpx;
							// margin-top: 4rpx;
							font-size: 24rpx;
							line-height: 24rpx;
							color: #939393;
						}

						.pic_money {
							position: absolute;
							bottom: 5rpx;
							left: 0;
							display: inline-block;
							width: 44rpx;
							height: 44rpx;

						}

						.item_price {
							position: absolute;
							bottom: 10rpx;
							left: 48rpx;
							font-size: 24rpx;
							color: #FF9900;
							font-weight: 700;

						}

						button {
							position: absolute;
							bottom: 0;
							right: -5rpx;
							width: 136rpx;
							height: 58rpx;
							line-height: 54rpx;
							color: #fff;
							background: linear-gradient(180deg, #669aff 50%, #0f6fff 100%);
							border-radius: 129rpx;
							font-size: 24rpx
						}
					}

				}
			}
		}



	}
	// .popup-bg {
	// 	// display: none;
		
	// 	position: fixed;
	// 	top: 0;
	// 	left: 0;
	// 	z-index: 999;
	// 	width: 100%;
	// 	height: 100%;
	// 	background-color: rgba(0, 0, 0, 0.7);
	// 	// background-color: #333;
	// }

	.popup-content {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 538rpx;
		height: 588rpx;
		background: linear-gradient(180deg,#c1e5ff, #ffffff 100%, #ffffff 100%);
		border-radius: 20rpx;
		image {
			display: block;
			
			width: 156rpx;
			height: 156rpx;
			margin-top: 112rpx;
		}
		text {
			font-size: 36rpx;
			color: #333;
			margin-top: 40rpx;
		}
		button {
			width: 434rpx;
			height: 80rpx;
			background-color: #447cff;
			color: #fff;
			font-size: 32rpx;
			line-height: 80rpx;
			margin-top: 80rpx;
			border-radius: 66rpx;
		}
	}
</style>
