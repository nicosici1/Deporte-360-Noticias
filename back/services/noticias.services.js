import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("Deporte360")
const collectionNotice = db.collection("Noticias")


async function getNoticias(filter = {}) {

    await client.connect()
    return collectionNotice.find().toArray()
}

async function getNoticiaById(idNoticia) {
    await client.connect()
    return collectionNotice.findOne({ _id: new ObjectId(idNoticia) })
}


async function createNoticia(noticia) {
    await client.connect()
    await collectionNotice.insertOne(noticia)
    return noticia
}

async function deleteNoticia(idNoticia) {
    await client.connect()
    await collectionNotice.deleteOne({ _id: new ObjectId(idNoticia) })
    return {
        id: idNoticia
    }
}

async function replaceNoticia(idNoticia, noticia){
    await client.connect()
    await collectionNotice.replaceOne({_id: new ObjectId(idNoticia)}, noticia)
    return noticia
}

async function editNoticia(idNoticia, noticia){
    await client.connect()
    await collectionNotice.updateOne({ _id: new ObjectId(idNoticia) }, { $set: noticia })
    return noticia
}

// async function getSerieA() {
//     await client.connect()
//     return collectionNotice.find({categoria:"Serie A"}).toArray()
// }

// async function getLaLiga(){
//     await client.connect()
//     return collectionNotice.find({categoria:"La Liga"}).toArray()
// }

// async function getBrasileirao(){
//     await client.connect()
//     return collectionNotice.find({categoria:"Brasileirao"}).toArray()
// }

// async function getPrimera(){
//     await client.connect()
//     return collectionNotice.find({categoria:"Primera Division"}).toArray()
// }

// async function getPremier(){
//     await client.connect()
//     return collectionNotice.find({categoria:"Premier League"}).toArray()
// }



export {
    getNoticias,
    getNoticiaById,
    createNoticia,
    deleteNoticia,
    replaceNoticia,
    editNoticia
    // getBrasileirao,
    // getLaLiga,
    // getPremier,
    // getPrimera,
    // getSerieA
}