"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var store_index = require("./store/index.js");
var utils_api = require("./utils/api.js");
if (!Math) {
  "./pages/my/my.js";
  "./subpkg/coupon/coupon.js";
  "./subpkg/exchange_points/exchange_points.js";
  "./subpkg/points_records/points_records.js";
  "./subpkg/lucky_prize/lucky_prize.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("\u5F53\u524D\u7EC4\u4EF6\u4EC5\u652F\u6301 uni_modules \u76EE\u5F55\u7ED3\u6784 \uFF0C\u8BF7\u5347\u7EA7 HBuilderX \u5230 3.1.0 \u7248\u672C\u4EE5\u4E0A\uFF01");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/ice_project/App.vue"]]);
common_vendor.index.$http = common_vendor.$http;
common_vendor.$http.baseUrl = "http://192.168.1.9:8787/api";
common_vendor.$http.beforeRequest = function(options) {
  common_vendor.index.showLoading({
    title: "\u6570\u636E\u52A0\u8F7D\u4E2D..."
  });
};
common_vendor.$http.afterRequest = function() {
  common_vendor.index.hideLoading();
};
common_vendor.index.$showMsg = function(title = "\u6570\u636E\u52A0\u8F7D\u5931\u8D25\uFF01", duration = 1500) {
  common_vendor.index.showToast({
    title,
    duration,
    icon: "none"
  });
};
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.config.globalProperties.$timeHandler = utils_api.timeHandler;
  app.use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
