"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("../../common/vendor.js");
var common_assets = require("../../common/assets.js");
function rand(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min);
}
const wybPopup = () => "../../components/wyb-popup/wyb-popup.js";
const _sfc_main = {
  components: {
    wybPopup
  },
  data() {
    return {
      isRotate: false,
      prizeList: ["\u79EF\u5206", "\u65B0\u4EBA\u7EA2\u5305", "\u7CBE\u9009\u597D\u5238", "\u8C22\u8C22\u53C2\u4E0E", "\u79EF\u5206", "\u65B0\u4EBA\u7EA2\u5305", "\u60CA\u559C\u793C\u5305", "\u65B0\u4EBA\u7EA2\u5305"],
      angle: 0,
      prizeInfo: [],
      reqObj: {
        status: 1,
        limit: 8,
        page: 1,
        type: 3
      }
    };
  },
  onLoad() {
    this.getPrizeInfo();
  },
  computed: __spreadValues({}, common_vendor.mapState(["baseUrl", "token"])),
  methods: {
    rotate() {
      if (this.isRotate)
        return;
      this.angle = 0;
      setTimeout(() => {
        let len = this.prizeList.length;
        let num = rand(0, len - 1);
        let prize = this.prizeList[num];
        let angle = 360 / len * num + rand(4, 40);
        this.angle = 8 * 360 + angle;
        console.log("\u5956\u54C1\uFF1A", prize, num, angle, this.angle, len);
        this.isRotate = true;
        setTimeout(() => {
          this.isRotate = false;
          this.$refs.pop.show();
        }, 5e3);
      }, 300);
    },
    getPrizeInfo() {
      let that = this;
      this.prizeInfo = [];
      common_vendor.index.request({
        url: this.baseUrl + "demo/user_integral_record_list",
        method: "POST",
        data: this.reqObj,
        header: {
          "token": this.token
        },
        success: (res) => {
          if (res.data.code == 401) {
            this.naveToLogin({
              openType: "navigateTo",
              from: "/subpkg/lucky_prize/lucky_prize"
            });
          }
          res.data.data.data.data.forEach((item, index) => {
            item.create_time = that.$timeHandler(item.create_time, "-");
          });
          this.prizeInfo = [...this.prizeInfo, ...res.data.data.data.data];
          console.log(this.prizeInfo);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_wyb_popup2 = common_vendor.resolveComponent("wyb-popup");
  _easycom_wyb_popup2();
}
const _easycom_wyb_popup = () => "../../components/wyb-popup/wyb-popup.js";
if (!Math) {
  _easycom_wyb_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$3,
    b: common_assets._imports_1$2,
    c: $data.isRotate ? 1 : "",
    d: `rotate(${$data.angle}deg)`,
    e: common_vendor.o(($event) => $options.rotate()),
    f: common_vendor.o(($event) => $options.rotate()),
    g: common_assets._imports_2$2,
    h: common_vendor.f($data.prizeInfo, (item, i, i0) => {
      return {
        a: common_vendor.t(item.create_time),
        b: common_vendor.t(item.integral)
      };
    }),
    i: common_assets._imports_3$1,
    j: common_assets._imports_4$1,
    k: common_vendor.sr("pop", "ebd4912c-0"),
    l: common_vendor.p({
      mode: "size-fixed",
      type: "center",
      height: "564",
      width: "412",
      radius: "20",
      showCloseIcon: true,
      closeIconPos: "bottom-right",
      closeIcon: "../../static/my-img/close.png",
      closeIconSize: "82",
      vertOffset: "-80",
      horiOffset: "165",
      maskClickClose: false,
      maskAlpha: "0.7",
      negativeTop: "30"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/ice_project/subpkg/lucky_prize/lucky_prize.vue"]]);
wx.createPage(MiniProgramPage);
