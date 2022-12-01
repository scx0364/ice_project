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
      coupons1: [],
      coupons2: [],
      coupons3: [],
      total: 0,
      isLoading: false
    };
  },
  onLoad() {
    this.getCouponList(this.active);
  },
  computed: __spreadValues({}, common_vendor.mapState(["token"])),
  methods: {
    checked(i) {
      this.active = i;
      this.coupons1 = [], this.coupons2 = [], this.coupons3 = [], this.total = 0;
      this.getCouponList(i);
    },
    getCouponList(i) {
      let that = this;
      this.reqObj.status = i + 1;
      this.isLoading = true;
      common_vendor.index.request({
        url: "http://192.168.121.56:8787/api/demo/list",
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
          that.coupons1 = [...that.coupons1, ...res.data.data.data.filter((x) => x.status == 1)];
          that.coupons2 = [...that.coupons2, ...res.data.data.data.filter((x) => x.status == 2)];
          that.coupons3 = [...that.coupons3, ...res.data.data.data.filter((x) => x.status == 3)];
          that.total = res.data.data.total;
        }
      });
    }
  },
  onReachBottom() {
    console.log(this.total);
    console.log(this.reqObj.pages);
    if (this.reqObj.limit * this.reqObj.pages >= this.total) {
      common_vendor.index.$showMsg("\u6570\u636E\u52A0\u8F7D\u5B8C\u6BD5\uFF01");
      return;
    }
    this.reqObj.pages += 1;
    if (this.isLoading)
      return;
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
        b: common_vendor.o(($event) => $options.checked(i)),
        c: common_vendor.n(i == $data.active ? "active" : ""),
        d: i
      };
    }),
    b: $data.active == 0
  }, $data.active == 0 ? {
    c: common_vendor.f($data.coupons1, (item, i, i0) => {
      return {
        a: common_vendor.t(item.money),
        b: i
      };
    })
  } : {}, {
    d: $data.active == 1
  }, $data.active == 1 ? {
    e: common_vendor.f($data.coupons2, (item2, i, i0) => {
      return {
        a: common_vendor.t(item2.money),
        b: i
      };
    })
  } : {}, {
    f: $data.active == 2
  }, $data.active == 2 ? {
    g: common_vendor.f($data.coupons3, (item3, i, i0) => {
      return {
        a: common_vendor.t(item3.money),
        b: i
      };
    })
  } : {}, {
    h: $data.active == 0
  }, $data.active == 0 ? {
    i: common_vendor.p({
      text: $data.text
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/ice_project/subpkg/coupon/coupon.vue"]]);
wx.createPage(MiniProgramPage);
