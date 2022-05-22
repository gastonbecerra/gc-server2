var express = require('express');
var varsRouter = express.Router();

var vars = require('../models/vars')

varsRouter.get('/', async(req, res)=>{ 
    res.send( await vars.find({}) )
})

module.exports = varsRouter;