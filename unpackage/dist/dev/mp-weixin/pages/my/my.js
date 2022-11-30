"use strict";
var common_vendor = require("../../common/vendor.js");
var common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      token: JSON.parse(common_vendor.index.getStorageSync("token") || "0"),
      userInfo: {
        avatar: "../../images/my/avatar.png",
        nickname: "\u672A\u767B\u5F55"
      },
      flag: false,
      times: {
        q_num: 0,
        jifen: 0
      }
    };
  },
  onLoad() {
    if (this.token) {
      this.getUserMess();
    }
  },
  methods: {
    getphonenumber(e) {
    },
    getUserInfo(e) {
      this.flag = true;
      let that = this;
      common_vendor.index.login({
        success: (res) => {
          if (res.errMsg != "login:ok")
            return common_vendor.index.showToast({
              icon: "none",
              title: "\u767B\u5F55\u5931\u8D25"
            });
          console.log(1);
          const query = {
            encryptedData: encodeURIComponent(e.detail.encryptedData),
            iv: encodeURIComponent(e.detail.iv),
            code: res.code
          };
          const res1 = common_vendor.index.$http.post("/demo/login", query);
          res1.then((data) => {
            console.log(data.data);
            if (data.data.msg != "\u767B\u5F55\u6210\u529F") {
              common_vendor.index.$showMsg("\u767B\u5F55\u5931\u8D25\uFF01");
              console.log(2);
              return;
            } else {
              that.token = data.data.data.token;
              this.saveTokenToStorage(data.data.data.token);
              common_vendor.index.showToast({
                icon: "none",
                title: "\u767B\u5F55\u6210\u529F\uFF01"
              });
              this.reLoadPages();
            }
          });
        }
      });
    },
    saveTokenToStorage(tok_string) {
      common_vendor.index.setStorageSync("token", JSON.stringify(tok_string));
    },
    reLoadPages() {
      const pages = getCurrentPages();
      const curPage = pages[pages.length - 1];
      curPage.onLoad(curPage.options);
      curPage.onShow();
      curPage.onReady();
      this.getUserMess();
    },
    getUserMess() {
      common_vendor.index.request({
        url: "/demo/user_info",
        method: "POST",
        header: {
          "content-type": "application/json",
          "token": this.token
        },
        success: (res2) => {
          this.renewUserInfo(res2.data.data.user_info, res2.data.data);
        }
      });
    },
    renewUserInfo(info, times) {
      this.userInfo = info;
      this.times = times;
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
    a: $data.userInfo.avatar,
    b: common_vendor.t($data.userInfo.nickname),
    c: common_assets._imports_0,
    d: common_vendor.p({
      type: "forward",
      color: "#DCDCDC"
    }),
    e: common_vendor.t($data.times.q_num),
    f: common_vendor.t($data.times.jifen),
    g: common_assets._imports_1,
    h: common_assets._imports_2,
    i: common_assets._imports_3,
    j: common_assets._imports_4,
    k: common_assets._imports_5,
    l: common_vendor.o((...args) => $options.getUserInfo && $options.getUserInfo(...args)),
    m: !$data.token
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/\u53F2\u5F69\u971Eweb/web/ice_porject/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
