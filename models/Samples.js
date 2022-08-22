var mongoose = require('mongoose');

const SamplesSchema = new mongoose.Schema({
    context: {},
    variable: {},
    data : {
            min: 0,
            max: 0,
            avg: 0
    }, 
    created: {}, 
    cantidad_perfiles: 0,
})

const Sample = mongoose.model("Sample", SamplesSchema, "samples");
module.exports = Sample;