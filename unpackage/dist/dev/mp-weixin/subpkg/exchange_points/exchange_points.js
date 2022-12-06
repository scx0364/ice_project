"use strict";
var common_vendor = require("../../common/vendor.js");
var common_assets = require("../../common/assets.js");
const wybPopup = () => "../../components/wyb-popup/wyb-popup.js";
const _sfc_main = {
  components: {
    wybPopup
  },
  data() {
    return {
      display: false,
      show: false,
      exchangeList: {
        money_count: 1,
        item_price: 20
      },
      imgSrc: "",
      totalPoints: JSON.parse(common_vendor.index.getStorageSync("points") || "300")
    };
  },
  onLoad() {
  },
  methods: {
    change(e) {
      this.show = e.show;
    },
    open() {
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close();
    },
    confirm() {
      if (this.totalPoints < this.exchangeList.item_price) {
        common_vendor.index.$showMsg("\u79EF\u5206\u4E0D\u8DB3\uFF01");
        this.$refs.popup.close();
        return;
      } else {
        this.totalPoints = this.totalPoints - this.exchangeList.item_price;
        this.savePointsToStorage(this.totalPoints);
      }
      this.$refs.popup.close();
      this.$refs.pop.show();
    },
    savePointsToStorage(poin_string) {
      common_vendor.index.setStorageSync("points", JSON.stringify(poin_string));
    }
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_wyb_popup2 = common_vendor.resolveComponent("wyb-popup");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_wyb_popup2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_wyb_popup = () => "../../components/wyb-popup/wyb-popup.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_wyb_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: "overflow:" + ($data.show ? "hidden" : "visible"),
    b: common_assets._imports_0$1,
    c: common_vendor.t($data.totalPoints),
    d: common_assets._imports_1$1,
    e: common_vendor.t($data.exchangeList.money_count),
    f: common_vendor.t($data.exchangeList.money_count),
    g: common_assets._imports_1$1,
    h: common_vendor.t($data.exchangeList.item_price),
    i: common_vendor.o((...args) => $options.open && $options.open(...args)),
    j: common_vendor.t($data.exchangeList.money_count),
    k: common_vendor.t($data.exchangeList.money_count),
    l: common_assets._imports_1$1,
    m: common_vendor.t($data.exchangeList.item_price),
    n: common_vendor.o((...args) => $options.open && $options.open(...args)),
    o: common_vendor.o($options.close),
    p: common_vendor.o($options.confirm),
    q: common_vendor.p({
      type: "info",
      mode: "base",
      title: "\u5151\u6362",
      content: "\u60A8\u9700\u8981\u82B1" + $data.exchangeList.item_price + "\u79EF\u5206\u5151\u6362\u4F18\u60E0\u5238",
      message: "\u6210\u529F\u6D88\u606F",
      duration: 2e3,
      ["before-close"]: true
    }),
    r: common_vendor.sr("popup", "487c8f72-0"),
    s: common_vendor.o($options.change),
    t: common_vendor.p({
      type: "dialog"
    }),
    v: common_assets._imports_2$1,
    w: common_vendor.sr("pop", "487c8f72-2"),
    x: common_vendor.p({
      mode: "size-fixed",
      type: "center",
      height: "588",
      width: "538",
      radius: "20",
      showCloseIcon: true,
      closeIconPos: "bottom-right",
      closeIcon: "http://192.168.1.9:8787/uploads/20221116/frame.png",
      closeIconSize: "82",
      vertOffset: "-130",
      horiOffset: "228",
      maskClickClose: false,
      maskAlpha: "0.7"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/ice_project/subpkg/exchange_points/exchange_points.vue"]]);
wx.createPage(MiniProgramPage);
