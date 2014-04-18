"use strict"
var commonModel = require('../model/blog.model.common');
var logHelper = require('../common/log.helper');

var getSidebar = exports.getSidebar = function (callback) {
  commonModel.getSidebar(function (data) {
    callback && callback(data);
  });
}