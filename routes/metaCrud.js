var express = require("express");
var crudRouter = express.Router();
let User = require("../models/Users");
let Var = require("../models/vars");
let Sheet = require("../models/Sheets");
let Context = require("../models/Contexts");
let Value = require("../models/Values");
var ObjectId = require("mongoose").Types.ObjectId;

let modelObject = {
  users: User,
  vars: Var,
  sheets: Sheet,
  contexts: Context,
  values: Value,
};

function returnModel(model) {
  try {
    return modelObject[model];
  } catch (e) {
    console.log(e);
  }
}

//GET ELEMENTS BY TYPE
crudRouter.get("/:type", async (req, res) => {
  try {
    req.params.limit === undefined
      ? (req.params.limit = 100)
      : (req.params.limit = req.params.limit);
    var Model = returnModel(req.params.type);
    var data = await Model.find({}).limit(req.params.limit);
    res.send(data);
  } catch (e) {
    res.send({ err: e });
  }
});

//GET ELEMENTS BY TYPE WITH ? LIMIT
crudRouter.get("/:type/:operator", async (req, res) => {
  
  if (!isNaN(req.params.operator)) { //RETURN DOCS BY TYPE AND WITH LIMIT   
    req.params.operator === undefined
      ? (req.params.operator = 10)
      : (req.params.operator = req.params.operator);
    var Model = returnModel(req.params.type);
    var data = await Model.find({}).limit(req.params.operator);
    res.send(data);
  } else {
    User.countDocuments({ _id: req.params.operator }, function (err, count) {
      if (count > 0) { //RETURN DOCS BY TYPE AND USER
        var model = returnModel(req.params.type);
        model
          .find({ user: req.params.operator })
          .then((data) => {
            res.send(data);
          })
          .catch((e) => {
            res.send({ err: e });
          });
      } else { //RETURN DOCS BY TYPE AND ID
        if (ObjectId.isValid(req.params.operator)) {
          var model = returnModel(req.params.type);
          try {
            model
              .findById(req.params.operator)
              .then((data) => {
                res.send(data);
              })
              .catch((e) => {
                res.send({ err: e });
              });
          } catch (e) {
            res.send({ err: e });
          }
        }
      }
    });
  }
});

crudRouter.post('/values/:user_id', async (req, res)=>{
  console.log(req.params);
  console.log(req.body);
  var Model = returnModel("values");
  try{
    var values =  await Model.find(        
      { $and: [
          {var: { $in: req.body.data.vars } },     
          {user: req.params.user_id}    
      ] }
  )
  res.send(values);
  }catch(e){
    res.send({err: e});
  }
})

//POST NEW DOCUMENT
crudRouter.post("/:type", async (req, res) => {
  var Model = returnModel(req.params.type);
  const { ...props } = req.body.data;
  var document = new Model(props);
  document
    .save()
    .then((response) => {
      res.send(response);
    })
    .catch((e) => {
      console.log(e);
      res.send({ e: e });
    });
});

//UPDATE DOCUMENT
crudRouter.put("/:type/:id", async (req, res) => {
  var Model = returnModel(req.params.type);
  Model.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body.data,  
    },
    { new: true },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

//DELETE DOCUMENT
crudRouter.delete("/:type/:id", async (req, res) => {
  console.log(req.params.id);
  var Model = returnModel(req.params.type);
  Model.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

module.exports = crudRouter;





// function validateId(id) {
//     User.countDocuments({ _id: id }, function (err, count) {
//       if (count > 0) {
//         console.log("User exists");
//         return true;
//       } else {
//         if (ObjectId.isValid(id)) {
//           console.log("document exists");
//           return true;
//         } else {
//           console.log("document dont exists");
//           return false;
//         }
//       }
//     });
//   }
// function logOriginalUrl(req, res, next) {
//   console.log("Request URL:", req.originalUrl);
//   next();
// }

// function logMethod(req, res, next) {
//   console.log("Request Type:", req.method);
//   next();
// }

// const logStuff = [logOriginalUrl, logMethod];
// crudRouter.use(logStuff);