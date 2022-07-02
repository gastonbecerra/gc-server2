var mongoose = require('mongoose');

const ContextsSchema = new mongoose.Schema({
    name: {},
    description: {},
    rules: {},
    subscribed: {},
    circunscribed: {},
    tags: {},
    created: {},
    user: {
        type: String,
        default: '629fda217f9dde18926c12a7'
    },
    samples: {
        type: {},
        default: 0
    }
})

const Context = mongoose.model("Context", ContextsSchema, "contexts");
module.exports = Context;