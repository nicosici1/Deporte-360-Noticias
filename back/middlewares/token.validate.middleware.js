
import * as tokenService from '../services/token.services.js'

async function tokenVerify(req, res, next) {
    const token = req.headers['auth-token']

    if(!token){
        return res.status(401).json({error: {message: 'Acceso denegado'}})
    } 

    const cuenta = await tokenService.verifyToken(token)

    if(!cuenta){
        return res.status(401).json({error: {message: 'Token invalido'}})
    }

    req.cuenta = cuenta
    
    next()
}

export {
    tokenVerify
}