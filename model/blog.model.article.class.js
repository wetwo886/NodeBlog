/*article model*/
"use strict"
var db = require('../common/db');
var modelName = 'ArticleClass';
var collectionName = 'articleClass';
var Schema = db.mongoose.Schema;

var ArticleClassSchema = exports.ArticleClassSchema = new Schema({
  '_id': Number,
  'name': String,
  'createDate': Date,
  'modifyDate': Date
}, { collection: collectionName });

var ArticleClassModel = exports.ArticleClassModel = db.mongoose.model(modelName, ArticleClassSchema);

var add = exports.add = function (options, callback) {
  var articleClass = new ArticleClassModel();
  articleClass._id = options.id;
  articleClass.name = options.name;
  articleClass.createDate = new Date();
  articleClass.modifyDate = new Date();
  articleClass.save(function (error) {
    callback && callback(error, articleClass);
  });
}



