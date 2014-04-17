
var ArticleController = require('../controller/blog.controller.article');
var CommonController = require('../controller/blog.controller.common');

exports.list = function (req, res) {

    //var content = [
    //                  '<p>我是黑暗中的利剑，长城上的守卫。</p>',
    //                  '<p>我是抵御寒冷的烈焰，破晓时分的光线。</p>',
    //                  '<p>我是唤醒眠者的号角，守护王国的铁卫。</p>',
    //                  '<p>长夜将至，我从今开始守望，至死方休。</p>',
    //                  '<p>我将不娶妻、不封地、不生子。</p>',
    //                  '<p>我将不戴宝冠，不争荣宠。我将尽忠职守，生死於斯。</p>',
    //                  '<p>我将生命与荣耀献给守夜人，今夜如此，夜夜皆然。</p>',
    //                  '<p>我不是私生子琼恩·雪诺，我父亲是临冬城主，国王之手艾德·史塔克公爵，我母亲是星坠城的亚夏拉·戴恩。</p>',
    //                  '<p>我兄长是北境之王，少狼主罗柏·史塔克。</p>',
    //                  '<p>我是史塔克家族的荣耀，我是琼恩·史塔克。</p>'];


    //ArticleController.add({
    //  title: 'title,守夜人!',
    //  content: content.join(' '),
    //  author: 'peidongdong',
    //  readQty: 5,
    //  postQty: 10,
    //  'class': [4]
    //});


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

