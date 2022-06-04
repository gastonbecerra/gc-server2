var express = require('express');
var varsRouter = express.Router();

var Var = require('../models/vars')

varsRouter.get('/', async (req, res)=>{ 
    res.send( await Var.find({}) )
})

varsRouter.post('/', async (req, res)=>{    
    const {name,type,description,timeframe,created,user,tags} = req.body.data;
    
    const newVar = new Var({
        name,
        type,
        description,
        timeframe,
        created,
        user,
        tags
    })

    newVar.save()
    .then((data)=>{
        res.send(data)
    })
    .catch((e)=>{
        res.status(404).send(e);
    })
})

varsRouter.put('/:id', async  (req, res, next)=>{
  Var.findByIdAndUpdate(req.params.id, {
    $set: req.body.data
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(true)
    }
  })
})

module.exports = varsRouter;