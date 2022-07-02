var mongoose = require('mongoose');

const VarsSchema = new mongoose.Schema({
    name: { 

    },
    type: { },
    description: {  },
    timeframe: { }, 
    user: { 
        type: String,
        default: '629fda217f9dde18926c12a7'
    },
    measurement: { },
    tags: { },
    created: {

    },
    values: {
        
    },
    dashboards: {

    },
    followers: {
        
    },
    childs:{
        
    }
})

const Var = mongoose.model("Var", VarsSchema, "vars");
module.exports = Var;