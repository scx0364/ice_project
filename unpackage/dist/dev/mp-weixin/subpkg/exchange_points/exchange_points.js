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
    open() {
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close();
    },
    confirm(value) {
      console.log(value);
      this.$refs.popup.close();
    },
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
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$1,
    b: common_assets._imports_1$1,
    c: common_assets._imports_1$1,
    d: common_vendor.o((...args) => $options.toExchange && $options.toExchange(...args)),
    e: common_assets._imports_1$1,
    f: common_assets._imports_1$1,
    g: $data.display
  }, $data.display ? {} : {}, {
    h: common_vendor.o((...args) => $options.open && $options.open(...args)),
    i: common_vendor.o($options.close),
    j: common_vendor.o($options.confirm),
    k: common_vendor.p({
      type: "info",
      mode: "base",
      title: "\u5151\u6362",
      content: "\u60A8\u9700\u8981\u82B120\u79EF\u5206\u5151\u6362\u4F18\u60E0\u5238",
      message: "\u6210\u529F\u6D88\u606F",
      duration: 2e3,
      ["before-close"]: true
    }),
    l: common_vendor.sr("popup", "ec77fec0-0"),
    m: common_vendor.p({
      type: "dialog"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/\u53F2\u5F69\u971Eweb/web/ice_porject/subpkg/exchange_points/exchange_points.vue"]]);
wx.createPage(MiniProgramPage);
