/*记录错误日志*/
var util = require('util');

var record = exports.record = function (message, file) {
  var content = [
    'log file:' + file + ',date:' + new Date(),
    'content:' + message
  ];

  util.log(content.join('\r\n'));
}