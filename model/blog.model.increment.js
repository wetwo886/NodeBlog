/*increment model*/
var db = require('../common/db');

var modelName = 'Increment',
    collectionName = 'increment',
    Schema = db.mongoose.Schema;


var IncrementSchema = new Schema({
  '_id': String,
  'maxIndex': Number
}, { collection: collectionName });


var IncrementModel = db.mongoose.model(modelName, IncrementSchema);

var getId = exports.getId = function (collectionName, callback) {
  IncrementModel
    .findOne({ '_id': collectionName })
    .exec(function (error, doc) {
      if (error) {
        callback(error, null);
      }
      else {
        var returnIndex = 0;
        if (doc) {
          returnIndex = doc.maxIndex;
          doc.maxIndex += 1;
          doc.save();
        }
        else {
          doc = new IncrementModel();
          doc._id = collectionName;
          doc.maxIndex = 1;
          doc.save(function (error, doc) {
            callback && callback(null, returnIndex)
          });
        }
       
      }
    })
}