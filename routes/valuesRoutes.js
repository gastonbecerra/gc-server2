var express = require('express');
var valuesRoutes = express.Router();
// var Values = require('../models/values');

//GET ALL VALUES BY VARS AND USER

valuesRoutes.get('/:user_id/:vars', async(req, res)=>{
    console.log(req.params.user_id);
    console.log(req.params.vars);
})

module.exports = valuesRoutes;