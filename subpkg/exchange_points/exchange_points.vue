<template>
  <view class="points_container">
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
        
        <button >
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
            <text class="item_price">1元抵扣券</text>
            <text class="able_time">兑换之日起7天内有效</text>
            <text class="item_price">20积分</text>
            <button>兑换</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
.points_container {
  background-color: #a6ceff;
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
    padding: 20rpx 24rpx ;
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
      
      width: 702rpx;
      height: 108rpx;
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
        right: 0;
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
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 28rpx 24rpx;
      margin-top: 28rpx;
      border-radius: 24rpx;
      .list_title {
        font-size: 34rpx;
      }
      .list_item {
        width: 100%;
        display: flex;
        margin-top: 32rpx;
        &:nth-child(1) {
          margin-top: 24rpx;
        }
        .item_money {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 128rpx;
          height: 114rpx;
          background: linear-gradient(90deg,#ff7249, #ffa68b 100%);
          border-radius: 12rpx;
          .money_box {
            width: 48rpx;
            height: 67rpx;
            .money_mark {
              font-size: 28rpx;
              color: #8B5121;
            }
            .money_count {
              font-size: 36rpx;
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
          .item_price {
            font-size: 28rpx;
          }
          .able_time {
            position: absolute;
            top: 43rpx;
            font-size: 24rpx;
            color: #939393;
          }
          .item_price {
            font-size: 24rpx;
            color: #FF9900;
            font-weight: 700;
            &::before {
              content: '';
              display: block;
              width: 44rpx;
              height: 44rpx;
              background: url(../../images/points/money.png);
            }
          }
        }
        
      }
    }
  }
}
</style>
