var express = require('express');
var varsRouter = express.Router();

var Var = require('../models/vars')

varsRouter.get('/', async (req, res)=>{ 
    res.send( await Var.find({}) )
})

varsRouter.post('/', async (req, res)=>{    
    const {
      name,
      type,
      description,
      timeframe,
      user,
      measurement,
      tags,
      created
    } = req.body.data;
    
    const newVar = new Var({
      name,
      type,
      description,
      timeframe,
      user,
      measurement,
      tags,
      created
    })

    newVar.save()
    .then((res)=>{
        res.send(res)
    })
    .catch((res)=>{
        res.send({e: e, res});
    })
})

varsRouter.put('/:id', async  (req, res, next)=>{
  Var.findByIdAndUpdate(req.params.id, {
    $set: req.body.data
  }, { new: true },(error, data) => {
    if (error) {
      return next(error);
    } else {
      res.send(data)
    }
  })
})


varsRouter.delete('/:var_id/:user_id', async (req, res)=>{
  res.send(await Var.deleteOne({_id: req.params.var_id}));
})

module.exports = varsRouter;