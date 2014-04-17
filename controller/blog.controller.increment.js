var Increment = require('../model/blog.model.increment');
var logHelper = require('../common/log.helper');

var getId = exports.getId = function (collectionName,callback) {
  Increment.getId(collectionName, function (error, id) {
    if (error) {
      logHelper.record(error, 'blog.controller.increment');
      callback(error, null);
    }
    else {
      callback(null, id);
    }
  });
}