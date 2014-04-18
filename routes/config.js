//@desctription   Route管理及Url生成
//@author         wetwo886

var routes = require('./')
var user = require('./user');
var article = require('./article');

/// <summary>视图模板定义</summary>
var getViewTemplates = exports.getViewTemplates = function () {
  return {
    //列表页模板
    articles: 'articles.html',
    //详情页模板
    detail: 'detail.html',
    //首页模板
    index: 'index.html'
  };
}

/// <summary>设置路由规则,参数一般都采用正则捕获组获取</summary>
/// <param name="app" type="Objec">Express 实例对象</param>
var setRule = exports.setRule = function (app) {
  //首页
  app.get('/', routes.index);
  //列表页，参数1：分页大小;参数2：页码
  app.get(/articles-(.+)-(.+)\.html/i, article.list);
  //详情页，参数1：id或者urlkey
  app.get(/article-(.+)\.html/i, article.detail);
}

/// <summary>获取详情Url</summary>
/// <param name="key" type="String">id或者urlkey</param>
var getArticleUrl = exports.getArticeUrl = function (key) {
  return '/detail-' + id + '.html';
}

/// <summary>获取列表URL</summary>
/// <param name="P" type="Number">页码</param>
/// <param name="s" type="Number">页大小</param>
var getArticleListUrl = exports.getArticleListUrl = function (p, s) {
  return '/articles-' + s + '-' + p + '.html';
}


