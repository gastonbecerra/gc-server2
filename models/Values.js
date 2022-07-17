var mongoose = require('mongoose');

const ValuesSchema = new mongoose.Schema({
    value : {
        type: {}
    },
    user : {
        type: {}
    },
    var : {
        type: {}
    },
    comment : {
        type: {}
    } ,
    timestamp : {
        type: Date,
        default: Date.now()
    },
})

const Value = mongoose.model("Value", ValuesSchema, "values");
module.exports = Value;