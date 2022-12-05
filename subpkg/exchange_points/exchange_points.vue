<template>
	

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
						<text class="points_num">325</text>
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
					<view class="list_item">
						<!-- 抵扣券金额 -->
						<view class="item_money">
							<view class="money_box">
								<text class="money_mark">￥</text>
								<text class="money_count">1</text>
							</view>
							<text class="item_name">抵扣券</text>
						</view>
						<!-- 抵扣券相关信息 -->
						<view class="item_info">
							<text class="item_name">1元抵扣券</text>
							<text class="able_time">兑换之日起7天内有效</text>
							<image src="../../images/points/money.png" mode="" class="pic_money"></image>
							<text class="item_price">20积分</text>
							<button @click="toExchange">兑换</button>
						</view>
					</view>
					<view class="list_item">
						<!-- 抵扣券金额 -->
						<view class="item_money">
							<view class="money_box">
								<text class="money_mark">￥</text>
								<text class="money_count">3</text>
							</view>
							<text class="item_name">抵扣券</text>
						</view>
						<!-- 抵扣券相关信息 -->
						<view class="item_info">
							<text class="item_name">3元抵扣券</text>
							<text class="able_time">兑换之日起7天内有效</text>
							<image src="../../images/points/money.png" mode="" class="pic_money"></image>
							<text class="item_price">55积分</text>
							<button>兑换</button>
						</view>
					</view>
					<view class="list_item">
						<!-- 抵扣券金额 -->
						<view class="item_money">
							<view class="money_box">
								<text class="money_mark">￥</text>
								<text class="money_count">5</text>
							</view>
							<text class="item_name">抵扣券</text>
						</view>
						<!-- 抵扣券相关信息 -->
						<view class="item_info">
							<text class="item_name">5元抵扣券</text>
							<text class="able_time">兑换之日起7天内有效</text>
							<image src="../../images/points/money.png" mode="" class="pic_money"></image>
							<text class="item_price">90积分</text>
							<button>兑换</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	<view class="popup-bg" v-if="display">
	</view>
	<!-- <web-view src="" :webview-styles="webviewStyles"></web-view> -->
</template>

<script>
	export default {
		data() {
			return {
				display:false
			};
		},
		methods: {
			// 点击兑换按钮的处理函数
			toExchange() {
				
				
				// 给页面添加遮罩层
				// 让popup-bg盒子显示
				this.display = true
				// 弹出提示框
				uni.showModal({
					title:'兑换',
					content:'您需要花20积分兑换优惠券',
					cancelColor:'#828282',
					confirmColor:'#447CFF'
				})
			}
		}
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
						height: 114rpx;
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
							height: 54rpx;
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
	.popup-bg {
		// display: none;
		
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		// background-color: #333;
	}

	
</style>
