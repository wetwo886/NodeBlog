var NodeCache = require('node-cache');
var dataCache = new NodeCache({
    stdTTL: 3600,//缓存时间
    checkperiod: 0
});

var get = exports.get = function (key, callback) {
    dataCache.get(key, function (error, data) {
        callback && callback(error, data);
    });
}

var set = exports.set = function (key, data, callback) {
    dataCache.set(key, data, function (error, success) {
        console.log(success);
        callback && callback(error, success);
    })
}