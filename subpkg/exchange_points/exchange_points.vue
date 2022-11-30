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
  }
}
</style>
