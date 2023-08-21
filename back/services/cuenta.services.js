 
import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb';

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("Deporte360")
const collectionCuentas = db.collection("Cuentas")


async function crearCuenta(cuenta) {
  try {
    const cuentaExist = await collectionCuentas.findOne({ userName: cuenta.userName });
    if (cuentaExist) {
      throw new Error('La cuenta ya existe');
    }

    const nuevaCuenta = { ...cuenta, rol: 'user' };
    const salt = await bcrypt.genSalt(10);
    nuevaCuenta.password = await bcrypt.hash(cuenta.password, salt);

    await collectionCuentas.insertOne(nuevaCuenta);
  } catch (error) {
    console.error('Error al crear la cuenta', error);
    throw error;
  }
}
 


async function editCuenta(idCuenta, cuenta){
  await client.connect()
  await collectionCuentas.updateOne({ _id: new ObjectId( idCuenta) }, { $set: cuenta })
  return cuenta
}

//AGREGADO RECIENTEMENTE
async function getCuentas(filter = {}) {

    await client.connect()
    return collectionCuentas.find().toArray()
}



async function deleteCuenta(idCuenta) {
  await client.connect()
  await collectionCuentas.deleteOne({ _id: new ObjectId(idCuenta) })
  return {
      _id: idCuenta
  }
}

async function getCuentaById(idCuenta) {
  await client.connect()
  return collectionCuentas.findOne({ _id: new ObjectId(idCuenta) })
}



async function login(cuenta){
    await client.connect()

    const cuentaExist = await collectionCuentas.findOne({userName: cuenta.userName })
    if(!cuentaExist){
        throw new Error('La cuenta no existe')
    }
    const isMatch = await bcrypt.compare(cuenta.password, cuentaExist.password)

        if(!isMatch){
            throw new Error('Contraseña incorrecta')
        }

        return {...cuentaExist, password:undefined} //Al pasarle UNDEFINED no le enviamos los datos del password
}

    
export {
    crearCuenta,
    deleteCuenta,
    editCuenta,
    login,
    getCuentas,
    getCuentaById
}