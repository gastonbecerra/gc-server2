var express = require('express');
var varsRouter = express.Router();

var vars = require('../models/vars')

varsRouter.get('/', async (req, res)=>{ 
    res.send( await vars.find({}) )
})

varsRouter.post('/', async (req, res)=>{
    console.log(req.body);
    const {name,type,description,timeframe,created,user,share,tags} = req.body.data;
    console.log(name,type,description,timeframe,created,user,share,tags);
})

module.exports = varsRouter;