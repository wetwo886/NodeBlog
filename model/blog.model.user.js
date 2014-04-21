//@description    用户表
//@author         wetwo886


"use strict"
var db = require('../common/db');
var commonUtils = require('../common/utils');

var modelName = 'User',
    collectionName = 'user',
    Schema = db.mongoose.Schema;

var UserSchema = new Schema({
  '_id': Number,
  'userName': String,
  'pwd': String,
  'power': String,
  'status': Number,
  'createDate': Date,
  'modifyDate': Date
}, { collection: collectionName });


UserSchema.virtual('vcreateDate').get(function () {
  return commonUtils.formatDate(this.createDate);
});

UserSchema.virtual('vmodifyDate').get(function () {
  return commonUtils.formatDate(this.modifyDate);
});


var UserModel = db.mongoose.model(modelName, UserSchema);


/// <summary>根据指定的条件查找数据</summary>
var find = exports.login = function (condition, callback) {
  UserModel.find(condition, function (error, docs) {
    callback && callback(error, docs);
  })
}


/// <summary>状态值枚举</summary>
var STATUS = exports.STATUS = {
  ACTIVE: 1,
  LOCK: 2,
  PASSWD: 3
};
