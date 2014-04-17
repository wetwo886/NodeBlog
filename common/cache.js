//@description  缓存管理
//@author       wetwo886


"use strict"
//获取混存模块，采用第三方node-cache
var NodeCache = require('node-cache');
//实例化缓存对象
var dataCache = new NodeCache({
  //缓存时间
  stdTTL: 3600,
  //缓存检查间隔
  checkperiod: 0
});


/// <summary>获取缓存</summary>
/// <param name="key" type="String">缓存标志</param>
/// <param name="callback" type="Function">回调函数</param>
var get = exports.get = function (key, callback) {
  dataCache.get(key, function (error, data) {
    //判断是否存在缓存 && 判断标志位是否存在
    if (data && data[key]) {
      callback && callback(error, data[key]);
    }
    //缓存失效或者不存在返回null
    else {
      callback && callback(error, null);
    }
    
  });
}

/// <summary>设置缓存</summary>
/// <param name="key" type="String">缓存标志</param>
/// <param name="data" type="Object">待缓存的数据</param>
/// <param name="callback" type="Function">回调函数</param>
var set = exports.set = function (key, data, callback) {
  //保存缓存
  dataCache.set(key, data, function (error, success) {
    callback && callback(error, success);
  })
}