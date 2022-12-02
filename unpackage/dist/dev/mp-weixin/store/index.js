"use strict";
var common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    token: JSON.parse(common_vendor.index.getStorageSync("token") || "0"),
    num: 0
  },
  getters: {},
  mutations: {
    updateToken(state, token) {
      state.token = token;
    },
    updateData(state, num) {
      state.num = num;
    }
  },
  actions: {}
});
exports.store = store;
