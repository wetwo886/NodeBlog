"use strict"
var commonModel = require('../model/blog.model.common');
var logHelper = require('../common/log.helper');

/// <summary>获取右边公共内容</summary>
var getSidebar = exports.getSidebar = function (callback) {
  commonModel.getSidebar(function (data) {
    callback && callback(data);
  });
}

/// <summary>设置登陆用户</summary>
var setLoginUser = exports.setLoginUser = function () {
  
}