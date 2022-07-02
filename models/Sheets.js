var mongoose = require('mongoose');
const SheetsSchema = new mongoose.Schema({
    name: {}, 
    description: {},
    vars: {},
    contexts: {},
    share: {},
    chart: {},
    tags: {} , 
    created: {},
    user: { } ,
    followers:{  },
    childs: { },
})

const Sheet = mongoose.model("Sheet", SheetsSchema, "sheets");
module.exports = Sheet;