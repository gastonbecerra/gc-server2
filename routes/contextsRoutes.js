var express = require("express");
var contextsRouter = express.Router();

var Context = require("../models/Contexts");

//get context by id
contextsRouter.get("/context/:id", function(req, res) {
    Context.findById(req.params.id, function(err, foundContext) {
        if (err) {
            res.status(500).send(err);
        } else {

            /*
            {
                usersInScope: false, // users that fit the rule
                samples: false, // samples that we created ... que hacemos con las variables???
                usersThatRecognize: false // usuarios que se "feeling == part"
                usersStarred: false, // usuarios que le dieron star a la variable
            }
            */

            res.send(foundContext);
        }
    });
}),

//get context by id and user id
contextsRouter.get("/context/:id/:userId", function(req, res) {
    /*
    {
        context: {...}  ,
        user: {
            isInContext: true, // if user fits the rules' conditions
            feeling: A / B / C // if user declared he feels part of the context,
            variablesChecked: false, // que variables consultó el usuario para chusmear en este contexto? macristas ---> mascotas
        }
    }
    */
}),

contextsRouter.get("/samples/:context_id/:var_id", function(req, res) {
    
    // check if there is a sample by context and var
    // if not, create one
    // if yes, check if creation_date is older than XXXX refreshness period; if yes, recreate sample

    // XXXX refreshness period is a super global parameter que dice cuando envejence los contextos

    var samples = {
                context_id: req.params.context_id,
                var_id: req.params.var_id,
                data: {
                    /*
                    algo mas piola deberia considerar la interpretacion de la variable
                    que, llegado el caso, que no hay interpretacion clara... entonces infiera el calculo mas basico (la vieja manera) segun el tipo de variable
                    */

                    /*
                    esto es la vieja manera de hacer los contexots... 
                    suponiendo que la distribucion sea una distribucion estandard
                    */
                   /*
                   esto es para variables numericas
                   */
                    min: false,
                    max: false,
                    avg: false,

                    /*
                    categoricas
                    */
                   categories: {
                        'male': 50,
                        'female': 50
                   },
                   created: false, // cuando?
                   cantidad_perfiles: false                    
                }
            }   
}),

//get context by id, user id a,d vars id
contextsRouter.get("/context/:id/:user_id/:var_id/:extras", function(req, res) {

    /*
    extras puede ser vacio
    o puede ser un conjunto de key value pairs CONDICIONES otro_contexto == kirchenirstas ; otra_variable == daily_spendings_on_beer
    */

    /*
    {
        context: {...}  ,
        user: {...},
        sample: {...},

        user_data: {{
            normal: {}, // normal data
            user
        }}
    }
    */
});

contextsRouter.get("/", async (req, res) => {
  res.send(await Context.find({}));
});

// POST-CREATE NEW CONTEXT
// contextsRouter.post("/", async (req, res) => {
//   console.log(req.body.data);
//   const {
//     name,
//     description,
//     rules,
//     subscribed,
//     circunscribed,
//     tags,
//     created,
//     user,
//   } = req.body.data;

//   const newContext = new Context({
//     name,
//     description,
//     rules,
//     subscribed,
//     circunscribed,
//     tags,
//     created,
//     user,
//   });

//   newContext
//     .save()
//     .then((res) => {
//       res.send(res);
//     })
//     .catch((e) => {
//       res.send({ e: e });
//     });
// });

// UPDATE BY ID
// contextsRouter.put("/:id", async (req, res, next) => {
//   Context.findByIdAndUpdate(
//     req.params.id,
//     {
//       $set: req.body.data,
//     },
//     { new: true },
//     (error, data) => {
//       if (error) {
//         return next(error);
//       } else {
//         res.send(data);
//       }
//     }
//   );
// });

// contextsRouter.delete("/:context_id/:user_id", async (req, res) => {
//   res.send(await Context.deleteOne({ _id: req.params.context_id }));
// });

module.exports = contextsRouter;
