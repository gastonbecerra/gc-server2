var mongoose = require('mongoose');

const VariablesSchema = new mongoose.Schema({
    hashtag : {
        type: {}
    },
    name: {
        type: {}
    },
    category : {
        type: {}
    },
    timeframe : {
        type: {}
    },
    scale : {
        type: {}
    },
    concept : {
        type: {}
    },
    privacy : {
        type: {}
    },
    description : {
        type: {}
    } ,
    key : {
        type: {}
    },
    user : {
        type: {}
    } ,
    timestamp : {
        type: Date,
        default: Date.now()
    },
    followers: {
        type: {}
    }
})

const Variable = mongoose.model("Vars", VariablesSchema, "vars");
module.exports = Variable;