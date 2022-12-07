<template>
	<view class="points_records_container">
		<view class="points_box">
			<view class="t_left">
				<text>可用积分</text>
				<text>352</text>
				<text>累计获得 5268积分，剩余352可用</text>
			</view>
			<view class="t_right">
				<image src="../../images/points/cordescorn.png" mode=""></image>
			</view>
			<view class="small_decr">
				
			</view>
			<view class="big_decr">
				
			</view>
		</view>
		<view class="points_records_info">
			
			<!-- tab栏 -->
			<view class="nav" >
				<view :class="['records_title',i==active? 'active':'']" v-for="(item,i) in navList" :key="i" @click="changeTab(i)" >
					
						{{item.title}} 
						
				</view>
			</view>
			<!-- 下拉框 -->
			<uni-data-select v-model="value" :localdata="range" class="select-box" placeholder="全部" :clear="false" @change="change"></uni-data-select>
			<view class="records_content" v-if="active == 0">
				<!-- 循环填充内容的盒子 -->
				<view class="records_list" v-for="(item1,i1) in infoList">
					<view class="lft_type">
						<text class="getPoints">{{item1.item_name}}</text>
						<text class="t_date">2022-11-26</text>
					</view>
					<view class="rgt_num">
						+{{item1.num}}
					</view>
				</view>
			</view>
			
			<view class="records_content1" v-if="active == 1">
				<!-- 循环填充内容的盒子 -->
				<view class="records_list" v-for="(item2,i2) in infoList1">
					<view class="lft_type">
						<text class="getPoints">{{item2.item_name}}</text>
						<text class="t_date">2022-11-26</text>
					</view>
					<view class="rgt_num">
						-{{item2.num}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapMutations } from 'vuex';
import { mapState,mapActions} from 'vuex';
	export default {
		
		data() {
			return {
				active:0,
				navList:[
					{
						index:0,
						title:'获得明细'
					},
					{
						index:1,
						title:'使用记录'
					}
				],
				infoList:[
					{
						item_name:'签到领积分',
						num:13
					},{
						item_name:'完成订单',
						num:8
					},{
						item_name:'抽奖',
						num:26
					},{
						item_name:'签到领积分',
						num:10
					},
				],
				infoList1:[
					{
						item_name:'签到领积分',
						num:11
					},{
						item_name:'完成订单',
						num:3
					},{
						item_name:'抽奖',
						num:24
					},{
						item_name:'签到领积分',
						num:9
					},
				],
				range:[{
					value:0,text:"全部"
				},{
					value:1,text:"签到"
				},{
					value:2,text:"订单"
				},{
					value:3,text:"抽奖"
				},],
				// 请求积分数据列表的对象
				reqObj:{
					status:1,
					limit:8,
					page:1,
					type:0
				},
				// 数据总数
				total:0
					
				
			};
		},
		computed:{
			...mapState(['baseUrl','token'])
		},
		methods:{
			...mapActions(['naveToLogin']),
			...mapMutations(['timeHandler']),
			// 点击标题切换内容
			changeTab(i) {
				// console.log(i)
				// 让active的值等于当前标题的索引，以添加样式以及切换到对应的内容
				this.active = i
				// 请求数据
				this.getNavList(i)
			},
			// 下拉框的事件
			change(e) {
			      console.log(e)
				  this.reqObj.type = e
				  this.getNavList(this.active)
			    },
			// 请求数据的方法
			getNavList(i) {
				// console.log(this.token)
				this.reqObj.status = i + 1
				uni.request({
					url: this.baseUrl + 'demo/user_integral_record_list',
					method:'POST',
					data: this.reqObj,
					header: {
						'token': this.token
						},
					// 请求成功的回调函数
					success: (res) => {
						// 判断code是否等于1
						// console.log(res.data.code)
						if(res.data.code == 401 ) {
							// TODO：登录
							this.naveToLogin({
								  openType: 'navigateTo',
								  from: '/subpkg/points_records/points_records'
							})
							// console.log(this.token)
						}
						console.log(res.data.data.data.data)
						console.log(this.timeHandler(1491635035))
						res.data.data.data.data.forEach((item,index) => {
							// console.log(item.create_time)
							// console.log(item.to_time)
							// 调用时间处理函数，把时间戳处理为年月日的格式
							 // a = this.timeHandler(item.createtime)
							 item.create_time = this.timeHandler(item.create_time)
							 // b = this.timeHandler(item.to_time)
							 // item.to_time = this.timeHandler(item.to_time)
							 // console.log(item.create_time)
							
						})
						// 筛选状态为1的数据，与原来的infolist拼接
						this.infoList = [...this.infoList,...res.data.data.data.data.filter(x => x.status == 1)]
						this.infoList1 = [...this.infoList1,...res.data.data.data.data.filter(x => x.status == 2)]
						// console.log(this.infoList)
						// console.log(this.infoList1)
						// 修改数据总数
						this.total = res.data.data.data.total
						// console.log(this.total) 
					}
					}) 
						
					
				
			}
		}
	}
</script>

<style lang="scss">
.points_records_container {
	position: relative;
	background-color: #fff;
	// overflow: hidden;
	.points_box {
		display: flex;
		height: 512rpx;
		background: linear-gradient(180deg,#eef7ff, #ffffff 100%);
		overflow: hidden;
		position: relative;
		.t_left {
			display: flex;
			flex-direction: column;
			margin-left: 55rpx;
			margin-top: 66rpx;
			text {
				&:nth-child(1) {
					font-size: 28rpx;
					color: #333;
					
				}
				&:nth-child(2) {
					font-size: 64rpx;
					font-weight: 700;
					color: #447CFF;
					
				}
				&:nth-child(3) {
					font-size: 24rpx;
					
					color: #333;
					
				}
			}
			
		}
		.t_right {
			margin-top: 66rpx;
			margin-left: 98rpx;
			image {
				width: 164rpx;
				height: 166rpx;
			}
		}
		.small_decr {
			position: absolute;
			top: 84rpx;
			left: 422rpx;
			width: 40rpx;
			height: 40rpx;
			background: linear-gradient(108deg,#ffcf30 0%, rgba(255,255,255,0.00) 100%);
			border-radius: 50%;
			
		}
		.big_decr {
			position: absolute;
			right: 0;
			top: 246rpx;
			width: 64rpx;
			height: 64rpx;
			background: linear-gradient(108deg,rgba(255,234,166,0.00) 0%, #ffe99f 100%);
			border-radius: 50%;
			
		}
	}
	.points_records_info {
		width: 100%;
		position: absolute;
		top: 316rpx;
		z-index: 999;
		background-color: #fff;
		border-radius: 24rpx 24rpx 0 0;
		.select-box {
			position: absolute;
			top: 28rpx;
			right: 32rpx;
		}
		.nav {
			height: 114rpx;
			display: flex;
			line-height: 114rpx;
			padding: 0 32rpx;
			.records_title {
				width: 176rpx;
				height: 66rpx;
				line-height: 66rpx;
				text-align: center;
				border-radius: 72rpx;
				color: #828282;
				font-size: 28rpx;
				margin-top: 24rpx;
				&:nth-child(2) {
					margin-left: 20rpx;
				}
			}
			.active {
				background-color: #447CFF;
				color: #fff;
			}
		}
		
		.records_content {
			.records_list {
				box-sizing: border-box;
				height: 141rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 24rpx 32rpx;
				box-shadow: 0px -1rpx 0px 0px rgba(0,0,0,0.10) inset; 
				.lft_type {
					
					display: flex;
					flex-direction: column;
					// justify-content: space-between;
					height: 93rpx;
					.getPoints {
						font-size: 28rpx;
						color: #333;
					}
					.t_date {
						font-size: 24rpx;
						color: #828282;
						margin-top: 12rpx;
					}
				}
				.rgt_num {
					font-size: 48rpx;
					color: #447CFF;
					// font-weight: 700;
				}
			}
		}
		
		
		
		.records_content1 {
			.records_list {
				box-sizing: border-box;
				height: 142rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 24rpx 32rpx;
				box-shadow: 0px -1rpx 0px 0px rgba(0,0,0,0.10) inset; 
				.lft_type {
					
					display: flex;
					flex-direction: column;
					// justify-content: space-between;
					height: 94rpx;
					.getPoints {
						font-size: 28rpx;
						color: #333;
					}
					.t_date {
						font-size: 24rpx;
						color: #828282;
						margin-top: 12rpx;
					}
				}
				.rgt_num {
					font-size: 48rpx;
					color: #EC5446;
					// font-weight: 700;
				}
			}
		}
		
	}
}
</style>
