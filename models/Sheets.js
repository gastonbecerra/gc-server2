var mongoose = require('mongoose');
const SheetsSchema = new mongoose.Schema({})

const Sheet = mongoose.model("Sheet", SheetsSchema, "sheets");
module.exports = Sheet;