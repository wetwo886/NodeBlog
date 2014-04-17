
var ArticleController = require('../controller/blog.controller.article');
var CommonController = require('../controller/blog.controller.common');

exports.list = function (req, res) {

    ArticleController.query(1, 2, function (error, docs) {
        res.render('article.html', { data: docs });
    });
};



exports.detail = function (req, res) {
    ArticleController.findById(req.params.id, function (doc) {
        CommonController.getDescription(function (error, des) {
            res.render('detail.html', { data: doc, description: des });
        })

    });
}

