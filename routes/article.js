
var ArticleController = require('../controller/blog.controller.article');
var CommonController = require('../controller/blog.controller.common');

exports.list = function (req, res) {
  var pageIndex = (!req.params.p && 1);
  var pageSize = (!req.params.s && 20);

  ArticleController.query(pageIndex, pageSize, function (error, docs, count) {
    CommonController.getDescription(function (des) {
      res.render('article.html', { data: docs, description: des, count: count, p: pageIndex, s: pageSize });
    });
  });
};



exports.detail = function (req, res) {
  ArticleController.findById(req.params.id, function (doc) {
    CommonController.getDescription(function (des) {
      res.render('detail.html', { data: doc, description: des });
    });

  });
}

