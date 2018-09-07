var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var csvSchema= new Schema({

    book_name: { type: String },

    author_name: { type: String},

    subject: { type: String }

});

module.exports = mongoose.model('CsvFile', csvSchema);
