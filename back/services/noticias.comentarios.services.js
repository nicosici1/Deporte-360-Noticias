import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("Deporte360");
const collectionComments = db.collection("Comentarios");

async function createComment(comment) {
  await client.connect();
  await collectionComments.insertOne(comment);
  return comment;
}

async function getComment(filter = {}) {
  await client.connect();
  return collectionComments.find(filter).toArray();
}

async function getComments(filter = {}) {
  await client.connect();
  return collectionComments.find(filter).toArray();
}

async function getCommentsByEntity(entityId) {
  await client.connect();
  return collectionComments.find({ entityId: entityId }).toArray();
}

export {
  getComment,
  getComments,
  getCommentsByEntity,
  createComment
};

 
