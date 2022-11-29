"use strict";
var common_vendor = require("../../common/vendor.js");
var common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {};
  },
  onLoad() {
  },
  methods: {
    getphonenumber(e) {
      console.log(e);
    },
    getUserInfo() {
      common_vendor.index.login({
        success: (res) => {
          console.log(res.code);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.p({
      type: "forward",
      color: "#DCDCDC"
    }),
    c: common_assets._imports_1,
    d: common_assets._imports_2,
    e: common_assets._imports_3,
    f: common_assets._imports_4,
    g: common_assets._imports_5,
    h: common_vendor.o((...args) => $options.getphonenumber && $options.getphonenumber(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/\u53F2\u5F69\u971Eweb/web/ice_porject/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
