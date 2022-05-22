var express = require('express');
var sheetRouter = express.Router();

var Sheet = require('../models/Sheets')

sheetRouter.get('/', async(req, res)=>{ 
    res.send( await Sheet.find({}) )
})

module.exports = sheetRouter;