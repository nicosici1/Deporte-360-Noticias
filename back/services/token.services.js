
import jwt from 'jsonwebtoken'
import { MongoClient, ObjectId } from "mongodb";


const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("Deporte360")
const collectionTokens = db.collection("Tokens")


async function crearToken(cuenta) {

    const token = jwt.sign(cuenta, "CLAVE SECRETA")

    await client.connect()

    await collectionTokens.insertOne({token, cuenta_id: new ObjectId(cuenta._id) })

    return token
}


async function verifyToken(token) {
    try {
        await client.connect()
        const payload = jwt.verify(token, "CLAVE SECRETA")

        const exist = await collectionTokens.findOne({ token, cuenta_id: new ObjectId(payload._id) })

        if (!exist) {
            return null
        }

        return payload

    } catch (err) {
        return null
    }
}


async function eliminarToken(token){
    await client.connect()

    await collectionTokens.deleteOne({token})

}


 

export {
    crearToken,
    verifyToken,
    eliminarToken,
   
}


