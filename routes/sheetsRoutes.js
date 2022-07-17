// var express = require('express');
// var sheetRouter = express.Router();

// var Sheet = require('../models/Sheets')

// sheetRouter.get('/', async(req, res)=>{ 
//     res.send( await Sheet.find({}) )
// })

// sheetRouter.post('/', async (req, res)=>{    
//     const {
//         name,
//         vars,
//         contexts,
//         share,
//         chart,
//         tags,
//         created,
//         user,
//         followers,
//         description,
//         childs,
//       } = req.body.data;
  
//       const newSheet = new Sheet({
//         name,
//         vars,
//         contexts,
//         share,
//         chart,
//         tags,
//         created,
//         user,
//         followers,
//         description,
//         childs,
//       })
  
//       newSheet.save()
//       .then((res)=>{
//           res.send(res)
//       })
//       .catch((e)=>{
//           res.send({e: e});
//       })
// })


// sheetRouter.put('/:id', async  (req, res, next)=>{
//     Sheet.findByIdAndUpdate(req.params.id, {
//       $set: req.body.data
//     }, { new: true },(error, data) => {
//       if (error) {
//         return next(error);
//       } else {
//         res.send(data)
//       }
//     })
//   })

// module.exports = sheetRouter;