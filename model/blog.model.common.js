//@description    通用信息
//@author         wetwo886

"use strict"
//分类Model
var ArticleClassModel = require('./blog.model.article.class');
//缓存
var Cache = require('../common/cache');
//同步任务队列
var Sync = require('../common/sync');
//缓存标志
var CACHEKEY = {
  //描述
  SIDEBAR: 'SIDEBAR'
}

/// <summary>获取描述，如果存在缓存则直接从缓存中获取，否则从数据库中获取并更新缓存</summary>
/// <param name="callback" type="Function">回调函数</param>
var getDescription = exports.getSidebar = function (callback) {
  //获取缓存
  Cache.get(CACHEKEY.SIDEBAR, function (error, data) {
    //存在缓存
    if (data) {
      callback && callback(data);
      return;
    }
    //不存在则重新生成缓存
    var data = {
      'description': '',
      'articleClass': [],
      'archive': []
    };
    //加载描述
    var loadDespotion = function (next) {
      data.description = '<h4>关于作者</h4>' +
                         '<p>美国著名科幻奇幻小说家乔治·R·R·马丁所著的史诗奇幻小说系列，是当代奇幻文学一部影响深远的里程碑式的作品。</p>' +
                         '<p>于1996年初第一卷问世时，便以别具一格的结构、浩瀚辽阔的视野、错落有致的情节和生动活泼的语言，迅速征服了欧美文坛。</p>' +
                         '<p>迄今，本作已被译为三十多种文字，并在各个国家迭获大奖。</p>';
      next();
    }
    //加载分类
    var loadArticleClass = function (next) {
      data.articleClass = [{ name: 'nodeJS', _id: 0 }, { name: 'js', _id: 1 }, { name: 'C#', _id: 2 }];
      next();
    }
    //加载归档
    var loadArchive = function (next) {
      data.archive = [
          { month: '2013-12', count: 12 },
          { month: '2014-01', count: 18 },
          { month: '2014-02', count: 29 },
          { month: '2014-02', count: 30 }];
      next();
    }
    //初始化任务队列
    var sync = new Sync([loadDespotion, loadArticleClass, loadArchive], function () {
      //设置缓存
      Cache.set(CACHEKEY.SIDEBAR, data);
      callback && callback(data);
    });
    //执行队列
    sync.execute();
  });
}
