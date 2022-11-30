"use strict";
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
        limit: 5,
        pages: 1
      },
      coupons: []
    };
  },
  methods: {
    checked(i) {
      this.active = i;
      this.reqObj.status = i + 1;
      common_vendor.index.$sendRequest({
        url: "/api/public/v1/home/swiperdata",
        method: "GET",
        success: (res) => {
          console.log(res);
        }
      });
    }
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
  }, $data.active == 0 ? {} : {}, {
    c: $data.active == 1
  }, $data.active == 1 ? {} : {}, {
    d: $data.active == 2
  }, $data.active == 2 ? {} : {}, {
    e: $data.active == 0
  }, $data.active == 0 ? {
    f: common_vendor.p({
      text: $data.text
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/\u53F2\u5F69\u971Eweb/web/ice_porject/subpkg/coupon/coupon.vue"]]);
wx.createPage(MiniProgramPage);
