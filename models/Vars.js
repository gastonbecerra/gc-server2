var mongoose = require('mongoose');
const VarsSchema = new mongoose.Schema({})

const Var = mongoose.model("Var", VarsSchema, "vars");
module.exports = Var;