var express = require("express");
var contextsRouter = express.Router();

var Context = require("../models/Contexts");
var Value = require("../models/Values");
var Sample = require("../models/Samples");
// var Variable = require("../models/Vars");
var Variable = require("../models/Variables"); // 2do: revisar. genere esta copia por el problema del metacrud

async function get_users_by_rules( rules ) {
    console.log("** searching for users under the rules");
    var conditions = [] // esto deberia ser un objeto, no un array
    rules.forEach(element => {
        if (element.operation == "lt") { conditions.push( { var: element.variable, value: { $lt: element.value } } ) }
        if (element.operation == "gt") { conditions.push( { var: element.variable, value: { $gt: element.value } } ) }
        if (element.operation == "eq") { conditions.push( { var: element.variable, value: element.value } ) }
    });
    console.log (conditions)
    const vals = await Value.find(conditions[0]) // 2do: eso [0] fue la manera de darle forma de json. un desastre
    // 2do: armo condicion a mano para poder testear la busqueda. falta ver como convertir a objeto
    
    // 2do: la busqueda deberia especificar:
    // - que queremos valores dentro de una expiration date LISTO
    // - que queremos usuarios unicos FILTRADO ABAJO
    var expired_date = Date.now() - 50 * 24 * 60 * 60 * 1000; // 50 dias antes de la fecha actual
    // const vals = await Value.find({
    //     var: 'daily spendings on veggies (currency (ARS))',
    //     value: { '$gt': '1' },
    //     timestamp: { $gte : new Date(expired_date) } // expiracion para no tomar miles de datos
    // })
    var users = []
    vals.forEach(element => {
        if (!users.includes(element.user)) {
            users.push(element.user)
        }
    } )

    // console.log(users);    
    return users;
}

async function users_reached_by_rules( rules ) {
    const users = await get_users_by_rules(rules);
    if (users) {
        return(users.length)
    } else {
        return false;
    }
}

async function get_sample( context, variable ) {
    const sample = await Sample.findOne({context: context, variable: variable}); // 2do: aca hay que llamar a la ultima sample, falta el sort y el limit?
    return(sample);
}

async function create_sample( context, variable ) {
    console.log("creating new sample");

    // 2do: la historia es asi:
    // - busco informacion de la variable, para ver como se calcula la muestra
    // - subseteo entre usuarios del contexto los que tienen una valor de la variable
        // - que no este expirado
        // - que no este repetido?
    // - busco los valores para esos usuarios de esta variable
    // - creo una muestra con los valores de los usuarios, siguiendo la logica que determina la variable


    // - busco informacion de la variable, para ver como se calcula la muestra
    console.log("** getting variable info");
    const var_info = await Variable.findById(variable); // 2do: esto esta dando null... Variable lo armé para saltear el metacrud

    // - subseteo entre usuarios del contexto los que tienen una valor de la variable
    console.log("** recruiting users for sample ");
    const context2 = await Context.findById(context) // 2do: aca hay algo raro en el flow, no deberia necesitar llamar al contexto, otra puta vez
    if (context){
        users_context = await get_users_by_rules(context2.rules)
        if (users_context) {
            // console.log(users_context);

            // - busco los valores para esos usuarios de esta variable
            console.log("** searching for users values for variable " + var_info.name);
            const vals = await Value.find({
                var: var_info.name,
                user: users_context
                // timestamp: { $gte : new Date(expired_date) } // 2do: - que no este expirado
                // xxx // 2do: - que no este repetido el usuario? tiene sentido?
            })
            // console.log(vals)

            // - creo una muestra con los valores de los usuarios, siguiendo la logica que determina la variable
            console.log("** calculating sample of variable " + var_info.name + " for context " + context2.name);

            /*
            2do: la manera de calcular la muestra tiene que depender de la manera de interpretar la variable
            para esto, creo que hay que inventar una especie de repositorio de componentes por tipo de variable, que incluya la definición de como calcular samples, y como armar graficos
            y que, llegado el caso, que no hay interpretacion clara... entonces infiera el calculo mas basico (la vieja manera) segun el tipo de variable
            */

            /*
            por ahora, vamos con la vieja manera de calcular la muestra... asumiendo que la variable es una cantidad y que interesa su distribucion
            */
            data = [];
            vals.forEach(element => {
                data.push(element.value)
            })
             
            var sample_data = {
                min : Math.min(...data),
                max : Math.max(...data),
                avg : data.reduce((a, b) => a + b, 0) / data.length,
            }
            console.log(sample_data);
            
            /*
            2do: para variables categoricas (y para variables con otras temporalidades) hay que calcualr otra cosa
            */
            // categories: {
            //     'male': 50,
            //     'female': 50
            // },

        } else {
            console.log("NO USERS REACHED BY RULES"); // 2do: tiene que haber una manera de salir por aca. devolver 400
        }
    }

    var sample_return = {
        context,
        variable,
        data: sample_data,
        created: new Date(), // cuando?
        cantidad_perfiles: 0                    
    }  
    try{
        const new_sample = await Sample.create(sample_return);
        return new_sample;
    }catch(err){
        console.log('locura maxima del error locuencio')
        return(err);
    }
}

contextsRouter.get("/sample/:context_id/:var_id", async (req, res)=> {

    const refreshness_period = 2; // minutos
    var create_new_sample = false;
    var sample = await get_sample(req.params.context_id, req.params.var_id);
    
    // check if there is a sample by context and var
    if (sample) {
        console.log("sample found");
        // if sample.created is older than refreshness_period, recreate sample
        var creation_date = new Date(sample.created);
        var expired_date = Date.now() - refreshness_period * 60 * 1000; // si fueran dias: refreshness_period * 24 * 60 * 60 * 1000;

        console.log("** creation_date: " + creation_date + " /// expired_date: " + expired_date);

        if (creation_date > expired_date) {   
            console.log("current sample");
            res.send(sample);
        } else {
            console.log("expired sample");
            create_new_sample = true;
        }
    } else {
        console.log("no sample for this context and var");
        create_new_sample = true;
    }

    if (create_new_sample) {
        create_sample(req.params.context_id, req.params.var_id)
        .then((new_sample) => {
            console.log("message new sample created");
            res.send(new_sample);            
        })
        .finally((new_sample) => {
            console.log("finally");
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
    }    

}),

//get context by id
contextsRouter.get("/context/:id", async (req, res)=> {
    try{
        const context = await Context.findById(req.params.id)
        var stats = await users_reached_by_rules(context.rules);
        var users = await get_users_by_rules(context.rules); // este dato no va. solo estroy probando la funcion

        console.log(stats);
        res.send({
            context : { context },
            users : { users },
            stats: { 
                users_reached_by_rules : stats,
                samples: false,
                users_starred : false,
                users_that_recognize : false,
                users_in_scope : false,
            }    
        });    
    }catch(err){
        res.status(500).json({message: err.message});
    }    
})    

//get context by id and user id
// contextsRouter.get("/context/:id/:userId", function(req, res) {
//     /*
//     {
//         context: {...}  ,
//         user: {
//             isInContext: true, // if user fits the rules' conditions
//             feeling: A / B / C // if user declared he feels part of the context,
//             variablesChecked: false, // que variables consultó el usuario para chusmear en este contexto? macristas ---> mascotas
//         }    
//     }    
//     */ 
// }),   

//get context by id, user id a,d vars id
// contextsRouter.get("/context/:id/:user_id/:var_id/:extras", function(req, res) {

//     /*
//     extras puede ser vacio
//     o puede ser un conjunto de key value pairs CONDICIONES otro_contexto == kirchenirstas ; otra_variable == daily_spendings_on_beer
//     */

//     /*
//     {
//         context: {...}  ,
//         user: {...},
//         sample: {...},

//         user_data: {{
//             normal: {}, // normal data
//             user
//         }}
//     }
//     */
// });

contextsRouter.get("/", async (req, res) => {
  res.send(await Context.find({}));
});

module.exports = contextsRouter;