
var mongoose = require('../common/db');
var utils = require('../common/utils');


var model = utils.define({
    mongoose: mongoose,
    name: null,
    columns: null,
    ctor: function () {
        if (!this.name) {
            throw new Error('undefine name');
        }

        if (!this.columns) {
            throw new Error('undefine columns');
        }

        this.schema = mongoose.Schema(this.columns);
        this.model = mongoose.model(this.name, this.schema);
    }
});

exports.model = model;