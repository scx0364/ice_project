"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-button",
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  emits: ["myevent"],
  data() {
    return {};
  },
  methods: {
    myevent() {
      this.$emit("myevent");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.text),
    b: common_vendor.o((...args) => $options.myevent && $options.myevent(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/\u53F2\u5F69\u971Eweb/web/ice_porject/components/my-button/my-button.vue"]]);
wx.createComponent(Component);
