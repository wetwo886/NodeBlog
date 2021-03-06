﻿/*article model*/
"use strict"
var db = require('../common/db');

var ArticleClass = require('../model/blog.model.article.class');

var commonUtils = require('../common/utils');

var modelName = 'Article',
    collectionName = 'article',
    Schema = db.mongoose.Schema;

var ArticleSchema = new Schema({
  '_id': Number,
  'title': String,
  'content': String,
  'author': String,
  'readQty': Number,
  'postQty': Number,
  'class': [{ type: Number, ref: 'ArticleClass' }],
  'createDate': Date,
  'modifyDate': Date,
  'urlkey': String
}, { collection: collectionName });


ArticleSchema.virtual('vcreateDate').get(function () {
  return commonUtils.formatDate(this.createDate);
});

ArticleSchema.virtual('vmodifyDate').get(function () {
  return commonUtils.formatDate(this.modifyDate);
});


var ArticleModel = db.mongoose.model(modelName, ArticleSchema);

var add = exports.add = function (options, callback) {
  var article = new ArticleModel();
  article._id = options.id;
  article.author = options.author;
  article.title = options.title;
  article.content = options.content;
  article.createDate = new Date();
  article.modifyDate = new Date();
  article.class = options.class;
  article.readQty = 0;
  article.postQty = 0;
  article.save(function (error) {
    callback && callback(null);
  });
}

var findById = exports.findById = function (id, callback) {
  ArticleModel
    .find({ _id: id })
    .populate({ path: 'class' })
    .exec(function (err, docs) {
      callback(err, docs.length > 0 ? docs[0] : {});
    });
}


var removeById = exports.removeById = function (id, callback) {
  ArticleModel.remove({ _id: id }, function (err, count) {
    callback && callback(err, count);
  });
}

var query = exports.query = function (condition, skip, limit, callback) {
  !condition && (condition = {});
  ArticleModel
    .find(condition)
    .sort('-modifyDate')
    .skip(skip)
    .limit(limit)
    .populate({ path: 'class' })
    .exec(function (error, docs) {
      ArticleModel.count(condition, function (error, count) {
        callback && callback(error, docs, count);
      });
    });
}

