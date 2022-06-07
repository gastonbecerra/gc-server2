var mongoose = require('mongoose');

const ContextsSchema = new mongoose.Schema({
    name: {},
    description: {},
    rules: {},
    subscribed: {},
    circunscribed: {},
    tags: {},
    created: {},
    user: {},
})

const Context = mongoose.model("Context", ContextsSchema, "contexts");
module.exports = Context;