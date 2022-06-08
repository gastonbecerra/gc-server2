const jwt = require('jsonwebtoken');

exports.veryfy = (req, res, next) => {
    //send token withour any object notation
    let token = req.header('auth-token')    
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}