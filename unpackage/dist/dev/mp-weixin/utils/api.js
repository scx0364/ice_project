"use strict";
function timeHandler(time, split) {
  let renew_time = time * 1e3;
  let alltime = new Date(renew_time);
  let year = alltime.getFullYear();
  let month = alltime.getMonth() + 1;
  let day = alltime.getDay();
  let hmonth = month < 10 ? "0" + month : month;
  let hday = day < 10 ? "0" + day : day;
  return year + split + hmonth + split + hday;
}
exports.timeHandler = timeHandler;
