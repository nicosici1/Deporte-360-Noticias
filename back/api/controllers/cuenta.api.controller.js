import * as service from '../../services/cuenta.services.js'
import * as tokenService from '../../services/token.services.js'

import { MongoClient } from "mongodb";
// import bcrypt from 'bcrypt'

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("Deporte360")
const collectionCuentas = db.collection("Cuentas")

//agregado recientemente

function getCuentas(req, res) {
    const filter = req.query

    console.log(filter)
    service.getCuentas(filter)
        .then(function (cuentas) {
            res.status(200).json(cuentas)
        })
}


async function cuentaExists(req, res) {
    try {
      const { userName } = req.query;
      const cuentaExist = await collectionCuentas.findOne({ userName });
  
      res.json({ exists: cuentaExist !== null });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al verificar la existencia de la cuenta' });
    }
  }
 

async function crearCuenta(req, res) {//agregado recien
    try {
      const { userName } = req.body;
      const cuentaExist = await collectionCuentas.findOne({ userName });
  
      if (cuentaExist) {
        // Si la cuenta ya existe, envía una respuesta indicando que la cuenta ya está registrada
        return res.status(400).json({ error: 'La cuenta ya está registrada' });
      }
  
      // Si la cuenta no existe, crea la cuenta utilizando la lógica de la función `service.crearCuenta`
      await service.crearCuenta(req.body);
      // Envía una respuesta exitosa indicando que la cuenta se creó correctamente
      res.status(201).json({ message: 'Cuenta creada con éxito' });


    } catch (error) {
      console.error('Error al crear cuenta', error);
      res.status(500).json({ error: 'Error al crear la cuenta' });
    }
  }


  function editCuenta(req, res) {
    const idCuenta = req.params.idCuenta

    const cuenta = {}

    if (req.body.userName) {
      cuenta.userName = req.body.userName
    }

    if (req.body.password) {
      cuenta.password = req.body.password
    }

    if (req.body.rol) {
      cuenta.rol = req.body.rol
    }
 

    service.editCuenta(idCuenta, cuenta)
        .then(function (cuenta) {
            if (cuenta) {
                res.status(200).json(cuenta)
            }
            else {
                res.status(404).json({ message: "La cuenta no funciona" })
            }
        })
}

function deleteCuenta(req, res) {
  const idCuenta = req.params.idCuenta;

  service.deleteCuenta(idCuenta)
      .then(function (cuenta) {
          if (cuenta) {
              res.status(200).json(cuenta);
          } else {
              res.status(404).json({ error:   " cuenta #${idCuenta} no encontrada "  });
          }
      })
      .catch(function (error) {
          console.error(error);
          res.status(500).json({ error: "Error al eliminar la cuenta" });
      });
}

async function getCuentaById(req, res) {
  try {
      const { idCuenta } = req.params;

      const cuenta = await service.getCuentaById(idCuenta);

      if (cuenta) {
        
          res.status(200).json(cuenta);
      } else {
          res.status(404).json({ error: { message: `Cuenta #${idCuenta} no encontrada` } });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: { message: 'Error al obtener la cuenta' } });
  }
}

async function login(req, res){
    return service.login(req.body)
    .then( async (cuenta) => {
        return {cuenta, token :await tokenService.crearToken(cuenta)}
    })
    .then((datos)=>{
        res.status(200).json(datos)
    })
    .catch((err)=>{
        console.log('Error al iniciar sesion ', err);
    });
}

async function logout(req, res){
    return tokenService.eliminarToken(req.headers['auth-token'])
    .then(()=>{
        res.status(200).json({message: 'Sesion cerrada'})
    })
    .catch((error)=>{
        res.status(400).json({ error: {message: error.message}})
    })
}

export {
    getCuentas,
    cuentaExists,
    crearCuenta,
    deleteCuenta,
    editCuenta,
    login,
    logout,
    getCuentaById
}