import * as cuentaSchema from '../schemas/cuentas.schemas.js'


async function validacionCuenta(req, res, next){
   return cuentaSchema.cuenta.validate(req.body, {abortEarly: false, stripUnknown: true})
    .then((cuenta)=>{
        req.body = cuenta
        next()
    })
    .catch((error)=>{
        res.status(400).json({error: 'Error al crear la cuenta', error})
    })
}

export {
    validacionCuenta
}