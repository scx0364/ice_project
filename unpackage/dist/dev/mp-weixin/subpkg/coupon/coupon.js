"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      text: "\u53BB\u5151\u6362",
      active: 0,
      navList: [
        {
          index: 0,
          title: "\u672A\u4F7F\u7528"
        },
        {
          index: 1,
          title: "\u5DF2\u4F7F\u7528"
        },
        {
          index: 2,
          title: "\u5DF2\u8FC7\u671F"
        }
      ],
      reqObj: {
        status: "",
        limit: 6,
        pages: 1
      },
      coupons0: [],
      coupons1: [],
      coupons2: [],
      total: 0,
      isLoading: false
    };
  },
  onLoad() {
    if (this.token == "0") {
      this.naveToLogin({
        openType: "navigateTo",
        from: "/subpkg/coupon/coupon"
      });
    }
    this.getCouponList(0);
  },
  computed: __spreadValues({}, common_vendor.mapState(["token"])),
  methods: __spreadProps(__spreadValues(__spreadValues({}, common_vendor.mapMutations(["updateData", "timeHandler"])), common_vendor.mapActions(["naveToLogin"])), {
    checked(i, $event) {
      this.active = i;
      switch (i) {
        case 0:
          this.coupons1 = [];
          this.coupons2 = [];
          if (this.coupons0.length != 0) {
            console.log(123);
            return;
          }
        case 1:
          this.coupons0 = [];
          this.coupons2 = [];
          if (this.coupons1.length != 0)
            return;
        case 2:
          this.coupons1 = [];
          this.coupons0 = [];
          if (this.coupons2.length != 0)
            return;
      }
      this.reqObj.pages = 1;
      this.getCouponList(i);
    },
    getCouponList(i) {
      let that = this;
      this.reqObj.status = i + 1;
      this.isLoading = true;
      common_vendor.index.request({
        url: "http://192.168.1.9:8787/api/demo/list",
        method: "POST",
        data: this.reqObj,
        header: {
          "token": this.token
        },
        success: (res) => {
          that.isLoading = false;
          if (res.errMsg != "request:ok") {
            common_vendor.index.$showMsg("\u6570\u636E\u8BF7\u6C42\u5931\u8D25\uFF01");
            return;
          }
          res.data.data.data.forEach((item, index) => {
            item.createtime = this.timeHandler(item.createtime);
            item.to_time = this.timeHandler(item.to_time);
          });
          that.coupons0 = [...that.coupons0, ...res.data.data.data.filter((x) => x.status == 1)];
          that.coupons1 = [...that.coupons1, ...res.data.data.data.filter((x) => x.status == 2)];
          that.coupons2 = [...that.coupons2, ...res.data.data.data.filter((x) => x.status == 3)];
          that.total = res.data.data.total;
        }
      });
    },
    gotoExchange() {
      common_vendor.index.navigateTo({
        url: "/subpkg/exchange_points/exchange_points"
      });
    }
  }),
  onReachBottom() {
    if (this.reqObj.limit * this.reqObj.pages >= this.total) {
      common_vendor.index.$showMsg("\u6570\u636E\u52A0\u8F7D\u5B8C\u6BD5\uFF01");
      return;
    }
    this.reqObj.pages += 1;
    if (this.isLoading)
      return;
    common_vendor.index.$showMsg("\u6570\u636E\u52A0\u8F7D\u4E2D");
    this.getCouponList(this.active);
  }
};
if (!Array) {
  const _easycom_my_button2 = common_vendor.resolveComponent("my-button");
  _easycom_my_button2();
}
const _easycom_my_button = () => "../../components/my-button/my-button.js";
if (!Math) {
  _easycom_my_button();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.navList, (item, i, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.o(($event) => $options.checked(i, $event)),
        c: i,
        d: common_vendor.n(i == $data.active ? "active" : ""),
        e: i
      };
    }),
    b: $data.active == 0
  }, $data.active == 0 ? {
    c: common_vendor.f($data.coupons0, (item, i, i0) => {
      return {
        a: common_vendor.t(item.money),
        b: common_vendor.t(item.createtime),
        c: common_vendor.t(item.to_time),
        d: i
      };
    })
  } : {}, {
    d: $data.active == 1
  }, $data.active == 1 ? {
    e: common_vendor.f($data.coupons1, (item2, i, i0) => {
      return {
        a: common_vendor.t(item2.money),
        b: common_vendor.t(item2.createtime),
        c: common_vendor.t(item2.to_time),
        d: i
      };
    })
  } : {}, {
    f: $data.active == 2
  }, $data.active == 2 ? {
    g: common_vendor.f($data.coupons2, (item3, i, i0) => {
      return {
        a: common_vendor.t(item3.money),
        b: common_vendor.t(item3.createtime),
        c: common_vendor.t(item3.to_time),
        d: i
      };
    })
  } : {}, {
    h: $data.active == 0
  }, $data.active == 0 ? {
    i: common_vendor.o($options.gotoExchange),
    j: common_vendor.p({
      text: $data.text
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/ice_project/subpkg/coupon/coupon.vue"]]);
wx.createPage(MiniProgramPage);
