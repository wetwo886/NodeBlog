//@description    文章相关路由控制
//@author         wetwo886

//文章控制器
var ArticleController = require('../controller/blog.controller.article');
//通用控制器
var CommonController = require('../controller/blog.controller.common');
//获取route配置
var route = require('./config');
//获取路由


//获取View配置
var viewTemplates = route.getViewTemplates();

/// <summary>列表路由</summary>
/// <param name="req" type="Object">请求参数</param>
/// <param name="res" type="Object">响应对象</param>
exports.list = function (req, res) {
  //默认页码，页大小
  var pageSize = 20, pageIndex = 1;
  //获取参数中的页大小，页码
  if (req.params.length === 2 || req.params.length == 3) {
    var pageSize = + req.params[0];
    var pageIndex = +req.params[1];
  }
  //页码大于20，设置为20
  if (pageSize > 20) {
    pageSize = 20;
  }

  //获取数据
  ArticleController.query(pageIndex, pageSize, function (error, docs, count) {
    //总页数
    var pageCount = Math.ceil(count / pageSize);

    //获取Sidebar数据
    CommonController.getSidebar(function (des) {
      //渲染页面
      res.render(viewTemplates.article.list,
        {
          data: docs,
          sidebar: des,
          page: { count: pageCount, p: pageIndex, s: pageSize },
          detailUrlFun: route.getArticleUrl,
          listUrlFun: route.getArticleListUrl,
        });
    });
  });
};

/// <summary>详情页</summary>
/// <param name="req" type="Object">请求参数</param>
/// <param name="res" type="Object">响应对象</param>
exports.detail = function (req, res) {
  //获取数据
  ArticleController.findById(req.params[0], function (doc) {
    //获取Sidebar数据
    CommonController.getSidebar(function (des) {
      //渲染页面
      res.render(viewTemplates.article.detail, { data: doc, sidebar: des });
    });

  });
}


///// <summary>获取sidebar数据</summary>
//var getSidebar = function (callback) {
//  CommonController.getSidebar(function (data) {
//    //渲染页面
//    callback && callback(data);
//  });
//}

