<template>
	<view class="tab_nav">
		<!-- tab栏 -->
		<view  :class="['nav',i==active? 'active':'']" v-for="(item,i) in navList" :key="i">
			<view class="nav_title"  @click="checked(i)">
				{{item.title}}
			</view>
			
		</view>
		
	</view>
	<!-- 优惠券区域 -->
	<view class="seletced_item0" v-if="active == 0">
		<!-- 优惠券 -->
		<view class="coupons">
			<!-- 左侧金额 -->
			<view class="price_box">
				<view class="price">
					<text class="money_mark">￥</text>
					<text class="num">6</text>
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
				<text class="use_time">有效期：2022.11.19 ~ 2022.11.26</text>
			</view>
		</view>
	</view>
	<view class="seletced_item1" v-if="active == 1">
		<!-- 优惠券 -->
		<view class="coupons">
			<!-- 左侧金额 -->
			<view class="price_box">
				<view class="price">
					<text class="money_mark">￥</text>
					<text class="num">6</text>
				</view>
				<text class="coupon_name">抵扣券</text>
			</view>
			<!-- 分界线 -->
			<view class="dashed_line">
				
			</view>
			<!-- 右侧详情 -->
			<view class="coupons_info">
				<text class="activity">活动优惠</text>
				<view  class="to_use">已使用</view>
				<text class="use_time">有效期：2022.11.19 ~ 2022.11.26</text>
			</view>
		</view>
		
	</view>
	<view class="seletced_item1" v-if="active == 2">
		<!-- 优惠券 -->
		<view class="coupons">
			<!-- 左侧金额 -->
			<view class="price_box">
				<view class="price">
					<text class="money_mark">￥</text>
					<text class="num">6</text>
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
				<text class="use_time">有效期：2022.11.19 ~ 2022.11.26</text>
			</view>
		</view>
		
	</view>
	<my-button :text="text" v-if="active == 0"></my-button>
</template>

<script>
	export default {
		data() {
			return {
				text:'去兑换',
				active:0,
				navList:[{
					index:0,
					title:'未使用'
				},
				{
					index:1,
					title:'已使用'
				},
				{
					index:2,
					title:'已过期'
				}],
				// 请求的参数对象
				reqObj:{
					status:'', // 状态
					limit:5, // 每页数量
					pages:'' // 当前的页码
				}
			};
		},
		methods:{
			checked(i) {
				this.active = i
			}
		}
	}
</script>

<style lang="scss">
.tab_nav {
	height: 94rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: #fff;
	.nav {
		font-size: 32rpx;
		
	}
	.active{
		color: #447cff;
		position: relative;
		&::after{
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
		background: linear-gradient(105deg,#fee6b8, #f8d998 100%);
		border: 2rpx solid #b38d57;
		border-radius: 24px;
		box-shadow: 0 9rpx 14rpx 0 rgba(254,230,183,0.44);
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
		border: 2rpx dashed #B38D57;
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
		
		border-radius: 24px;
		box-shadow: 0 9rpx 14rpx 0 rgba(240,240,240,0.44);
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
		border: 2rpx dashed #989898;
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
