var mongoose = require('mongoose');

const VarsSchema = new mongoose.Schema({
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

const Var = mongoose.model("Var", VarsSchema, "vars");
module.exports = Var;