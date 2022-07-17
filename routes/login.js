const jwt = require('jsonwebtoken');
const secret_token = process.env.SECRET_TOKEN;
var express = require('express');
var loginRouter = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/Users')

function generateToken(user) {
    return jwt.sign({ data : user }, secret_token, { expiresIn: '24h'})
}

loginRouter.post('/signup', async (req,res)=>{
    const { email, password, username } = req.body.data;
    console.log(req.body);
    try{
        let user = await User.find({
            email: email
        });

        if(user.length > 0){
            throw new Error('User already exists');
        }else{
            var hash = bcrypt.hashSync(password, 8);
    
            let newUser = new User({ 
                email: email,
                username: username,
                password: hash
            })
            
            newUser.save()
            .then(user => {
                res.send({
                    token: generateToken(user), 
                    email: `${user.email}`,
                    username: `${user.username}`,
                    id: `${user._id}`
                });
            })
            .catch(error => res.send(error));
        }

    }catch(e){
        res.status(403).send(`${e}`)
    }
})

loginRouter.post('/signin', async (req,res)=>{
    const { email, password } = req.body.data;

    try{
        const user = await User.find({
            email: email
        })
        
        if( !user ){
            throw new Error('User dosnt exist');
        }else{
            const valid = await bcrypt.compare(password, user[0].password);

            if(!valid) throw new Error('Wrong password')

            res.send({
                email: `${user[0].email}`,
                id: `${user[0]._id}`,
                username: `${user[0].username}`,
                token: generateToken(user), 
            });
        }
    }catch(e){
        res.status(403).send(`${e}`)
    }
})

module.exports = loginRouter;
