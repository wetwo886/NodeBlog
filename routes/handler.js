//@description    路由处理
//@author         wetwo886

var index = require('./index')
var user = require('./user');
var article = require('./article');
var console=require('./console');

/// <summary>设置路由规则,参数全部采用正则捕获组（匿名）获取</summary>
/// <param name="app" type="Objec">Express 实例对象</param>
var setRule = exports.setRule = function (app) {
  //首页
  app.get('/', index.index);
  //列表页，参数1：分页大小;参数2：页码;参数3：分类编号
  app.get(/articles-(.+)-(.+)(?:-(.+))*\.html/i, article.list);
  //详情页，参数1：id或者urlkey
  app.get(/article-detail-(.+)\.html/i, article.detail);

  //控制台
  app.get(/console.html/i, console.index);
}

