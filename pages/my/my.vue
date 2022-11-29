<template>
	<view class="my_container">
		<view class="my_info">
			<!-- 昵称头像区域 -->
			<view class="my_selfinfo">
				<image src="" mode="" class="my_avatar"></image>
				<text class="my_nickname">美少女战士</text>
				<!-- 签到按钮 -->
				<button type="default" class="sign">
				<text>签到</text>
				<image src="../../images/my/corn.png" mode=""></image>
				
				<uni-icons type="forward" color="#DCDCDC" class="forward"></uni-icons>
					
				</button>
			</view>
		<!-- 取冰次数 -->
			
		</view>
		<view class="cor_container">
			<view class="cor_box">
				<view class="item_box">
					<text class="times">取冰次数</text>
					<view class="times_box">
						<text class="times_num">18</text><text>次</text>
					</view>	
				</view>
				<view class="item_box">
					<text class="times">我的积分</text>
					<view class="times_box">
						<text class="times_num">898</text><text>分</text>
					</view>
					
				</view>
			</view>
		</view>
		<view class="function_container">
			<view class="functions_box">
				<!-- 标题 -->
				<text class="functions">常用功能</text>
				<!-- 功能分类 -->
				<view class="func_cate">
					<view class="cate_item">
						<image src="../../images/my/ice.png" mode=""></image>
						<text>取冰记录</text>
					</view>
					<view class="cate_item">
						<image src="../../images/my/youhuiquan.png" mode=""></image>
						<text>优惠券</text>
					</view>
					<view class="cate_item">
						<image src="../../images/my/daili.png" mode=""></image>
						<text>代理登录</text>
					</view>
					<view class="cate_item">
						<image src="../../images/my/gift.png" mode=""></image>
						<text>积分抽奖</text>
					</view>
					<view class="cate_item">
						<image src="../../images/my/location.png" mode=""></image>
						<text>取冰样点</text>
					</view>
				</view>
			</view>
			<!-- 登录按钮 -->
			<button type="default" class="btn_login" open-type="getPhoneNumber" @getphonenumber="getphonenumber">登录</button>
		</view>
	
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
    onLoad() {
      // 页面加载时获取用户的登录code
      // this.getUserInfo()
    },
    methods:{
      getphonenumber(e) {
        console.log(e)
        
      },
      getUserInfo() {
        uni.login({
          success: (res) => {
            console.log(res.code)
            // 判断是否登录成功
            // if(res.errMsg != 'login:ok') return uni.showToast({
            //   icon:'none',
            //   title:'登录失败！'
            // })
            
          }
        })
      }
      
    }
	}
</script>

<style lang="scss">
.my_container {
	position: relative;
	
}	
.my_info {
	position: absolute;
	z-index: 1 ;
	box-sizing: border-box;
	height: 404rpx;
	width: 100%;
	background-color: #447CFF;
	padding: 60rpx 32rpx 0 32rpx;
	.my_selfinfo {
		position: relative;
		height: 132rpx;
		display: flex;
		align-items: center;
		
		.my_avatar {
			display: block;
			width: 132rpx;
			height: 132rpx;
			background-color: white;
		}
		.my_nickname {
			font-size: 36rpx;
			// font-size: 18px;
			margin-left: 20rpx;
			color: #fff;
			font-weight: 500;
		}
		.sign {
			
			width: 148rpx;
			height: 56rpx;
			line-height: 56rpx;
			position: absolute;
			right: 36rpx;
			font-size: 24rpx;
			border-radius: 48rpx;
			// font-size: 12px;
			image {
				display: inline-block;
				width: 48rpx;
				height: 48rpx;
				position: absolute;
				top: 4rpx;
				left: 4rpx;
				
				
			}
				
			text {
				display: inline-block;
				margin-left: 20rpx;
			}
			.forward {
				position: absolute;
				right: 2rpx;
				top: 0rpx;
			}
			
		}
	}
		
	
}
.cor_container {
		position: absolute;
		top: 229rpx;
		left: 32rpx;
		z-index: 999;
		.cor_box {
			
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 686rpx;
			height: 175rpx;
			background-color: black;
			border-radius: 24rpx;
			box-shadow: 0 9rpx 4rpx 0 rgba(0, 0, 0, 0.06);
			.item_box {
				display: flex;
				flex-direction: column;
				// justify-content: space-between;
				align-items: center;
				font-size: 24rpx;
				color:#C2C2C2;
				.times_box {
					margin-top: 24rpx ;
					.times_num {
						font-size: 48rpx;
					}
				}
			}
		}
	}
.function_container {
	box-sizing: border-box;
	width: 100%;
	// height: 1900rpx;
	background-color: #F7F8FA;
	// background-color: #cc42fe;
	position: absolute;
	top: 337rpx;
	z-index: 2;
	border-radius: 30rpx 30rpx 0 0;
	padding-top: 103rpx;
	padding-left: 32rpx;
	padding: 103rpx 32rpx 0;
	.functions {
		font-size: 28rpx;
		font-weight: 700;
	}
	.func_cate {
		display: flex;
		flex-wrap: wrap;
		// width: 686rpx;
		height: 396rpx;
		background-color: #fff;
		border-radius: 20rpx;
		margin-top: 24rpx;
		padding: 44rpx 0 0 24rpx;
		.cate_item {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			width: 122rpx;
			height: 136rpx;
			margin-right: 50rpx;
			image {
				display: block;
				width: 80rpx;
				height: 80rpx;
				// background-color: #447CFF;
			}
			text {
				font-size: 26rpx;
				
			}
			&:nth-child(4) {
				margin-right: 0;
			}
		}
	}
	.btn_login {
		width: 670rpx;
		height: 88rpx;
		line-height: 88rpx;
		background-color: #447CFF;
		font-size: 32rpx;
		font-weight: 700;
		box-shadow: 0px 1rpx 0px 0px rgba(0,0,0,0.18) inset;
		border-radius: 79rpx;
		position: fixed;
		bottom: 51rpx;
		left: 40rpx;
	}
}
</style>
