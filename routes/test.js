var express = require('express');
var testRouter = express.Router();

var Sheet = require('../models/Sheets')

testRouter.get('', (req, res)=>{ res.send("hola")})

testRouter.get('/x/:xx', (req, res)=>{ res.send( req.params.xx )})

testRouter.get('/sheets', async(req, res)=>{ 
    res.send( await Sheet.find({}) )
})

module.exports = testRouter;