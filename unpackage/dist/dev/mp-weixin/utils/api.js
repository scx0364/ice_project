"use strict";
var common_vendor = require("../common/vendor.js");
const BASE_URL = "https://api-hmugo-web.itheima.net";
const sendRequest = (options) => {
  common_vendor.index.request({
    url: BASE_URL + options.url,
    method: options.method || "GET",
    data: options.data || {},
    header: options.header || {},
    success: (res) => {
      options.success(res);
    },
    fail: (err) => {
      common_vendor.index.showToast({
        title: "\u8BF7\u6C42\u63A5\u53E3\u5931\u8D25"
      });
      reject(err);
    }
  });
};
exports.sendRequest = sendRequest;
