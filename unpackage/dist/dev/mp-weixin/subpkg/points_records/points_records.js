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
var common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      active: 0,
      navList: [
        {
          index: 0,
          title: "\u83B7\u5F97\u660E\u7EC6"
        },
        {
          index: 1,
          title: "\u4F7F\u7528\u8BB0\u5F55"
        }
      ],
      infoList: [],
      infoList1: [],
      range: [{
        value: 0,
        text: "\u5168\u90E8"
      }, {
        value: 1,
        text: "\u7B7E\u5230"
      }, {
        value: 2,
        text: "\u8BA2\u5355"
      }, {
        value: 3,
        text: "\u62BD\u5956"
      }],
      reqObj: {
        status: 1,
        limit: 8,
        page: 1,
        type: 0
      },
      total: 0,
      isLoading: false
    };
  },
  computed: __spreadValues({}, common_vendor.mapState(["baseUrl", "token"])),
  onReachBottom() {
    console.log(this.reqObj.page);
    console.log(this.total);
    if (this.reqObj.limit * this.reqObj.page >= this.total) {
      common_vendor.index.$showMsg("\u6570\u636E\u52A0\u8F7D\u5B8C\u6BD5\uFF01");
      return;
    }
    this.reqObj.page += 1;
    if (this.isLoading)
      return;
    common_vendor.index.$showMsg("\u6570\u636E\u52A0\u8F7D\u4E2D");
    this.getNavList(this.active);
  },
  onLoad() {
  },
  methods: __spreadProps(__spreadValues({}, common_vendor.mapActions(["naveToLogin"])), {
    changeTab(i) {
      this.active = i;
      switch (i) {
        case 0:
          this.infoList1 = [];
          if (this.infoList.length != 0) {
            console.log(123);
            return;
          }
        case 1:
          this.infoList = [];
          if (this.infoList1.length != 0)
            return;
      }
      this.reqObj.page = 1;
      this.getNavList(i);
    },
    change(e) {
      this.reqObj.page = 1;
      this.infoList = [];
      this.infoList1 = [];
      console.log(e);
      this.reqObj.type = e;
      this.getNavList(this.active);
    },
    getNavList(i) {
      let that = this;
      this.reqObj.status = i + 1;
      this.isLoading = true;
      common_vendor.index.request({
        url: this.baseUrl + "demo/user_integral_record_list",
        method: "POST",
        data: this.reqObj,
        header: {
          "token": this.token
        },
        success: (res) => {
          that.isLoading = false;
          if (res.data.code == 401) {
            this.naveToLogin({
              openType: "navigateTo",
              from: "/subpkg/points_records/points_records"
            });
          }
          res.data.data.data.data.forEach((item, index) => {
            item.create_time = that.$timeHandler(item.create_time, "-");
          });
          this.infoList = [...this.infoList, ...res.data.data.data.data.filter((x) => x.status == 1)];
          this.infoList1 = [...this.infoList1, ...res.data.data.data.data.filter((x) => x.status == 2)];
          console.log(this.infoList);
          this.total = res.data.data.data.total;
          console.log(this.total);
        }
      });
    }
  })
};
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  _easycom_uni_data_select2();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
if (!Math) {
  _easycom_uni_data_select();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$2,
    b: common_vendor.f($data.navList, (item, i, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.n(i == $data.active ? "active" : ""),
        c: i,
        d: common_vendor.o(($event) => $options.changeTab(i), i)
      };
    }),
    c: common_vendor.o($options.change),
    d: common_vendor.o(($event) => _ctx.value = $event),
    e: common_vendor.p({
      localdata: $data.range,
      placeholder: "\u5168\u90E8",
      clear: false,
      modelValue: _ctx.value
    }),
    f: $data.active == 0
  }, $data.active == 0 ? {
    g: common_vendor.f($data.infoList, (item1, i1, i0) => {
      return {
        a: common_vendor.t(item1.explain),
        b: common_vendor.t(item1.create_time),
        c: common_vendor.t(item1.integral)
      };
    })
  } : {}, {
    h: $data.active == 1
  }, $data.active == 1 ? {
    i: common_vendor.f($data.infoList1, (item2, i2, i0) => {
      return {
        a: common_vendor.t(item2.explain),
        b: common_vendor.t(item2.create_time),
        c: common_vendor.t(item2.integral)
      };
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/ice_project/subpkg/points_records/points_records.vue"]]);
wx.createPage(MiniProgramPage);
