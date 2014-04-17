/*mongodb connection*/

"use strict";

var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.db);


exports.mongoose = mongoose;


