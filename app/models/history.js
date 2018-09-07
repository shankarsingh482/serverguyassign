var mongoose = require('mongoose');


var historyschema= mongoose.Schema({

    searched:{

        type:Object
    }
});


module.exports = mongoose.model('History',historyschema);