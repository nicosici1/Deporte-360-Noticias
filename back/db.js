import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017")

client.connect()
    .then(function () {
        console.log("se establecio la conexion")
        const db = client.db("Deporte360")

        db.collection("Noticias").insertOne({ name: "Hola desde Node" })
    })
    .catch(function (error) {
        console.log('no se conecto', error)
    })