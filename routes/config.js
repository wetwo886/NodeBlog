//@desctription   Route规则及Url生成
//@author         wetwo886


/// <summary>视图模板定义</summary>
var getViewTemplates = exports.getViewTemplates = function () {
  return {
    //全局视图
    global: {
      //首页
      'index': 'index.html',
      //控制台
      'console':'console.html'
    },
    //文章
    article: {
      //列表
      list: 'articles.html',
      //详细
      detail: 'detail.html',
    }
  };
}

/// <summary>获取详情Url</summary>
/// <param name="key" type="String">id或者urlkey</param>
var getArticleUrl = exports.getArticleUrl = function (key) {
  return '/article-detail-' + key + '.html';
}

/// <summary>获取列表URL</summary>
/// <param name="P" type="Number">页码</param>
/// <param name="s" type="Number">页大小</param>
/// <param name="c" type="Numbert">分类编号</param>
var getArticleListUrl = exports.getArticleListUrl = function (p, s, c) {
  if (c) {
    return '/articles-' + s + '-' + p + '-' + c + '.html';
  }
  else {
    return '/articles-' + s + '-' + p + '.html';
  }

}

