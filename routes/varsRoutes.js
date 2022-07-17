// var express = require('express');
// var varsRouter = express.Router();

// var Var = require('../models/vars')

// varsRouter.get('/', async (req, res)=>{ 
//     res.send( await Var.find({}) )
// })

// varsRouter.post('/', async (req, res)=>{    
//   try{
//     console.log(req.body);
//       const {
//         hashtag,
//         categories,
//         timeframe,
//         scale,
//         concept,
//         privacy,
//         description, 
//         key,
//         user,
//         name 
//         //timestamp
//       } = req.body.data;

//     let previous_var = await Var.find({hashtag:hashtag});

//     if(previous_var.length > 0){
//         res.send({
//             msg: "Var already exists",
//             data: previous_var
//         })        
//     }else{
//       const newVar = new Var({
//         hashtag,
//         category: categories,
//         timeframe,
//         scale,
//         concept,
//         privacy,
//         description, 
//         key,
//         user,
//         name
//       })
  
//       newVar.save()
//       .then((res)=>{
//           res.send(res)
//       })
//       .catch((e)=>{
//           res.send({e: e});
//       })
//     }
//   }catch(e){
//       res.send({err: e});
//   }
// })

// varsRouter.put('/:id', async  (req, res, next)=>{
//   Var.findByIdAndUpdate(req.params.id, {
//     $set: req.body.data
//   }, { new: true },(error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.send(data)
//     }
//   })
// })

// varsRouter.delete('/:var_id/:user_id', async (req, res)=>{
//   res.send(await Var.deleteOne({_id: req.params.var_id}));
// })

// module.exports = varsRouter;