"use strict"

var ArticleClassModel = require('./blog.model.article.class');
var Cache = require('../common/cache');
var Sync = require('../common/sync');

var CACHEKEY = {
    DESCRIPTION: 'DESCRIPTION'
}

var getDescription = exports.getDescription = function (callback) {
    //获取缓存
    Cache.get(CACHEKEY.DESCRIPTION, function (data) {
        //存在缓存
        if (data) {
            console.log('缓存存在');
            callback && callback(data);
            return;
        }
        console.log('构建缓存');
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
        //初始化同步队列
        var sync = new Sync([loadDespotion, loadArticleClass, loadArchive], function () {
            Cache.set(CACHEKEY.DESCRIPTION, data);
            Cache.get(CACHEKEY.DESCRIPTION, function (data) {
                console.log(data);
            })

            callback && callback(data);
        });
        //执行队列
        sync.execute();
    });
}
