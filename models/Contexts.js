var mongoose = require('mongoose');
const ContextsSchema = new mongoose.Schema({})

const Context = mongoose.model("Context", ContextsSchema, "contexts");
module.exports = Context;