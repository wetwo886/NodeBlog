
"use strict"
//获取Model
var UserModel = require('../model/blog.model.article');
var logHelper = require('../common/log.helper');

var collectionName = 'article';

var login = exports.login = function (userName, pwd, callback) {
  if (userName === "" || pwd === "") {
    throw new Error("用户名密码为空");
  }
  else {
    UserModel.find({ userName: userName, pwd: pwd }, function (error, docs) {
      if (error) {
        logHelper.record(error, 'blog.controller.user');
        callback && callback(error, null);
      }
      else {
        if (docs && docs.length > 0 && docs[0].status === UserModel.STATUS.ACTIVE) {
          callback && callback(null, true);
        }


      }
    });
  }

}


