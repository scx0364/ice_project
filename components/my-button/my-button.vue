<template>
	<view>
		<button  class="btn" >{{text}}</button>
	</view>
</template>

<script>
	export default {
		name:"my-button",
		props:{
				// 按钮里的文字
				text:{
					type:String,
					default:''
			}
		},
		data() {
			return {
				
		}
	}
	}
</script>

<style lang="scss">
.btn {
		width: 670rpx;
		height: 88rpx;
		line-height: 88rpx;
		// line-height: 55rpx;
		background-color: #447CFF;
		color: #fff;
		font-size: 32rpx;
		font-weight: 700;
		box-shadow: 0px 1rpx 0px 0px rgba(0,0,0,0.18) inset;
		border-radius: 79rpx;
		position: fixed;
		bottom: 51rpx;
		left: 40rpx;
	}
</style>