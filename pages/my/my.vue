<template>
  <view class="my_container">
    <view class="my_info">
      <!-- 昵称头像区域 -->
      <view class="my_selfinfo">
        <!-- <image src="../../images/my/avatar.png" mode="" class="my_avatar"></image> -->
        <image :src="userInfo.avatar" mode="" class="my_avatar"></image>
        <!-- <image src="../../images/my/coco.png" mode="" class="my_avatar"></image> -->
        <text class="my_nickname">{{userInfo.nickname}}</text>
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
            <text class="times_num">{{times.q_num}}</text><text>次</text>
          </view>
        </view>
        <view class="item_box">
          <text class="times">我的积分</text>
          <view class="times_box">
            <text class="times_num">{{times.jifen}}</text><text>分</text>
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
          <view class="cate_item" @click="goToCoupon">
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
      <!-- <button type="default" class="btn_login" open-type="getPhoneNumber" @getphonenumber="getphonenumber">登录</button> -->
      <button type="default" class="btn_login" open-type="getUserInfo" @getuserinfo="getUserInfo"
        v-show="!token || is_display">登录</button>
    </view>


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
      
        userInfo: {
          avatar: "../../static/my-img/coco.png",
          
          nickname: "未登录"
        },

        flag: false,
        times: {
          q_num: 0,
          jifen: 0
        },
		// 登录按钮是否显示
		is_display:false
      };
    },
    computed: {
      ...mapState(['token','redirectInfo','baseUrl','handled_time']),
      
     
    },
    onLoad() {
      // this.$test()
      // console.log(this.$timeHandler(2994533896))
      // console.log(this.handled_time)
      // 如果用户已经登录了，页面加载时请求用户信息，渲染头像昵称
      if (this.token) {
        this.getUserMess()

      }
     
    },
    methods: {
      // 引入index.js中更新token的方法
      ...mapMutations(['updateToken','updateRedirectInfo','timeHandler']),
      // 引入index.js中的倒计时跳转方法
      ...mapActions(['naveToLogin']),
      getUserInfo(e) {
        this.flag = true
        // console.log(e.detail)
        let that = this
        
        uni.login({

          success: (res) => {
            // console.log(res.code)
            // 判断是否登录成功
            if (res.errMsg != 'login:ok') return uni.showToast({
              icon: 'none',
              title: '登录失败'
            })
            // console.log(1)
            // 准备参数对象
            const query = {
              // rawData:e.detail.rawData,
              // signature:e.detail.signature,
              encryptedData: encodeURIComponent(e.detail.encryptedData),
              iv: encodeURIComponent(e.detail.iv),
              code: res.code
            }
            // 发起请求，携带code换取token
            const res1 = uni.$http.post('/demo/login', query)


            res1.then(data => {

              console.log(data.data)
              if (data.data.code != 1) {
                uni.$showMsg('登录失败！')
                // console.log(2)
                return
              } else {
                // 更新token的值

                that.updateToken(data.data.data.token)
				// 隐藏登录按钮
				this.is_display = false
                // console.log(that.token)
                this.saveTokenToStorage(data.data.data.token)
                uni.showToast({
                  icon: 'none',
                  title: '登录成功！'
                })
                
                // 判断重定向信息对象是否为空，如果不为空，则导航回原来的页面
                // console.log(this.redirectInfo)
                if(this.redirectInfo && this.redirectInfo.openType == 'navigateTo' ) {
                  uni.navigateTo({
                    url:this.redirectInfo.from,
                    // 导航成功之后，将redirectInfo重置为空
                    complete: () => {
                      this.updateRedirectInfo(null)
                    }
                  })
                }
                // 页面重载
                this.reLoadPages()
                
              }



            })

          }
        })
      },
      // 将token保存在本地
      saveTokenToStorage(tok_string) {
        uni.setStorageSync('token', JSON.stringify(tok_string))
      },

      // 页面重载
      reLoadPages() {
        const pages = getCurrentPages()
        // 声明一个pages使用getCurrentPages方法
        const curPage = pages[pages.length - 1]
        // 声明一个当前页面
        curPage.onLoad(curPage.options) // 传入参数
        curPage.onShow()
        curPage.onReady()
        // 执行刷新
        // 请求用户信息
        this.getUserMess()
      },
      // 请求用户信息
      getUserMess() {
        // console.log(this.token)
        uni.request({
          url: this.baseUrl + 'demo/user_info',
          method: 'POST',
          header: {
            'content-type': 'application/json',
            'token': this.token
          },
		  
          // 返回用户信息，头像昵称
          success: (res2) => {
            // console.log(res2.data)
			// 如果token无效，需要重新登录
			if(res2.data.code == 401) {
				console.log(this.is_display)
				// this.naveToLogin({
				//   openType: 'navigateTo',
				//   from: '/pages/my/my'
				// })
				// 让登录按钮显示，提醒用户重新登录
				this.is_display = true
				uni.$showMsg('登录信息过期，请重新登录！')
			}
            // 更新用户信息
            this.renewUserInfo(res2.data.data.user_info, res2.data.data)
            // 将用户信息储存在本地
            // 更新取冰次数
          },
        })
        
      },
      //更新用户信息
      renewUserInfo(info, times) {
        this.userInfo = info
        this.times = times
        // 将用户信息储存在本地
        // this.saveUserinfoToStorage(this.userInfo)
      },
      // 点击优惠券，跳转到优惠券页面
      goToCoupon() {
        // 这是用来测试的，之后在哪个页面需要判断登录就在哪个页面调用
        // this.naveToLogin({
        //   openType: 'navigateTo',
        //   from: '/pages/my/my'
        // })
        // 判断是否登录
        if (this.token == '0') return uni.$showMsg('请先登录！')
        uni.navigateTo({
          url: '/subpkg/coupon/coupon'
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
    z-index: 1;
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
        border-radius: 66rpx;
        // background-color: white;
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
        color: #C2C2C2;

        .times_box {
          margin-top: 24rpx;

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
      box-shadow: 0px 1rpx 0px 0px rgba(0, 0, 0, 0.18) inset;
      border-radius: 79rpx;
      position: fixed;
      bottom: 51rpx;
      left: 40rpx;
    }
  }
</style>
