
"use strict"
//获取Model
var Article = require('../model/blog.model.article');
var ArticleClass = require('../model/blog.model.article.class');
var IncrementController = require('./blog.controller.increment');
var logHelper = require('../common/log.helper');

var collectionName = 'article';


var query = exports.query = function (pageIndex, pageSize, callback) {
  //ArticleClass.add({
  //  id: 1,
  //  name:'NodeJs'
  //});

  //ArticleClass.add({
  //  id: 2,
  //  name: 'javascript'
  //});

  //ArticleClass.add({
  //  id: 3,
  //  name: 'C#'
  //});


  //Article.add({
  //  id: 1,
  //  title: '守夜人',
  //  content: '守夜人守夜人守夜人守夜人守夜人守夜人守夜人守夜人守夜人守夜人',
  //  author: 'pdd',
  //  'class':[1]
  //});

  //Article.add({
  //  id: 2,
  //  title: '冰与火之歌',
  //  content: '守夜人守夜人守夜人守夜人守夜人守夜人守夜人守夜人守夜人守夜人',
  //  author: 'pdd',
  //  'class': [2]
  //});


  //Article.add({
  //  id: 3,
  //  title: '冰与火之歌',
  //  content: 'XXXXXX守夜人守夜人守夜人守夜人守夜人守夜人守夜人守夜人守夜人守夜人',
  //  author: 'pdd',
  //  'class': [2]
  //});


  //Article.add({
  //  id: 4,
  //  title: '冰与火之歌',
  //  content: 'XXXXXX守夜人守夜人守夜人守夜人守夜人守夜人守夜人守夜人守夜人守夜人',
  //  author: 'pdd',
  //  'class': [2]
  //});

  var skip = (pageIndex - 1) * pageSize;
  Article.query({},skip, pageSize, function (error, docs,count) {
    if (error) {
      logHelper.record(error, 'blog.controller.article');
      callback && callback(error, {},0);
    }
    else {
      callback && callback(null, docs, count);
    }
  });
}


var add = exports.add = function (options,callback) {
  IncrementController.getId(collectionName, function (error, id) {
    options.id = id;
    Article.add(options);
  });

}


var findById = exports.findById = function (id, callback) {
    Article.findById(id, function (error, doc) {
        if (error) {
            logHelper.record(error, 'blog.controller.artilce');
        }
        else {
            callback && callback(doc);
        }
    })
}