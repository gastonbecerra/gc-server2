var mongoose = require('mongoose');

const VarsSchema = new mongoose.Schema({
    name: { 

    },
    type: { },
    description: {  },
    timeframe: { }, 
    user: { 

    },
    measurement: { },
    tags: { },
    created: {

    },
})

const Var = mongoose.model("Var", VarsSchema, "vars");
module.exports = Var;