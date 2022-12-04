"use strict";
var common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    token: JSON.parse(common_vendor.index.getStorageSync("token") || "0"),
    num: 0,
    seconds: 3,
    timer: null,
    redirectInfo: null
  },
  getters: {},
  mutations: {
    updateToken(state, token) {
      state.token = token;
    },
    updateData(state, num) {
      state.num = num;
    },
    showTips(state, seconds) {
      common_vendor.index.showToast({
        icon: "none",
        title: "\u8BF7\u767B\u5F55\u540E\u518D\u64CD\u4F5C\uFF01" + state.seconds + "\u79D2\u540E\u8DF3\u8F6C\u767B\u5F55\u9875\u9762",
        mask: true,
        duration: 1500
      });
    },
    decreatSeconds(state) {
      return state.seconds--;
    },
    updateRedirectInfo(state, info) {
      state.redirectInfo = info;
    }
  },
  actions: {
    naveToLogin(context, info) {
      context.state.seconds = 3;
      context.commit("showTips");
      context.state.timer = setInterval(() => {
        context.commit("decreatSeconds");
        if (context.state.seconds <= 0) {
          clearInterval(context.state.timer);
          common_vendor.index.navigateTo({
            url: "/pages/my/my",
            success: () => {
              context.commit("updateRedirectInfo", info);
            }
          });
          return;
        }
        context.commit("showTips", context.state.seconds);
      }, 1e3);
    }
  }
});
exports.store = store;
