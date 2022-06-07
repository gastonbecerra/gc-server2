var express = require('express');
var contextsRouter = express.Router();

var Context = require('../models/contexts')

contextsRouter.get('/', async(req, res)=>{ 
    res.send( await Context.find({}) )
})

// POST-CREATE NEW CONTEXT
contextsRouter.post('/', async (req, res)=>{    
    console.log(req.body.data);
    const {
        name,
        description,
        rules,
        subscribed,
        circunscribed,
        tags,
        created,
        user
    } = req.body.data;
    
    const newContext = new Context({
        name,
        description,
        rules,
        subscribed,
        circunscribed,
        tags,
        created,
        user
    })

    newContext.save()
    .then((res)=>{
        res.send(res)
    })
    .catch((res)=>{
        res.send({e: e, res});
    })
})

// UPDATE BY ID
contextsRouter.put('/:id', async  (req, res, next)=>{
    Context.findByIdAndUpdate(req.params.id, {
      $set: req.body.data
    }, { new: true },(error, data) => {
      if (error) {
        return next(error);
      } else {
        res.send(data)
      }
    })
  })

module.exports = contextsRouter;