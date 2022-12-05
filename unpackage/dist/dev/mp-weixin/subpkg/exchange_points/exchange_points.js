"use strict";
var common_vendor = require("../../common/vendor.js");
var common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      display: false
    };
  },
  methods: {
    toExchange() {
      this.display = true;
      common_vendor.index.showModal({
        title: "\u5151\u6362",
        content: "\u60A8\u9700\u8981\u82B120\u79EF\u5206\u5151\u6362\u4F18\u60E0\u5238",
        cancelColor: "#828282",
        confirmColor: "#447CFF"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$1,
    b: common_assets._imports_1$1,
    c: common_assets._imports_1$1,
    d: common_vendor.o((...args) => $options.toExchange && $options.toExchange(...args)),
    e: common_assets._imports_1$1,
    f: common_assets._imports_1$1,
    g: $data.display
  }, $data.display ? {} : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/ice_project/subpkg/exchange_points/exchange_points.vue"]]);
wx.createPage(MiniProgramPage);
