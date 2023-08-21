import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("Deporte360");
const collectionLigas = db.collection("Ligas");

async function getLigas(filter = {}) {
    try {
      await client.connect();
      const ligas = await collectionLigas.find(filter).toArray();
      return ligas;
    } catch (error) {
      throw new Error('Error al obtener las ligas desde la base de datos');
    } finally {
      await client.close();
    }
}

async function createLiga(liga) {
  await client.connect();
  await collectionLigas.insertOne(liga);
  return liga;
}

export {
  getLigas,
  createLiga
}
