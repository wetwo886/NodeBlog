"use strict"
var commonModel = require('../model/blog.model.common');
var logHelper = require('../common/log.helper');

var getDescription = exports.getDescription = function (callback) {
    commonModel.getDescription(function (data) {
        callback && callback(data);
    });
}