var express = require('express');
var contextsRouter = express.Router();

var contexts = require('../models/contexts')

contextsRouter.get('/', async(req, res)=>{ 
    res.send( await contexts.find({}) )
})

module.exports = contextsRouter;