import * as comentariosServices from '../../services/noticias.comentarios.services.js';

async function getComments(req, res) {
  const filter = req.query;

  try {
    const comments = await comentariosServices.getComments(filter);
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
}

async function createComment(req, res) {
  const comment = {
    comentario: req.body.comentario,
    /* author: req.body.author, */
    entityId: req.body.entityId,
    fecha_publicacion: req.body.fecha_publicacion
  };

  if (!comment.entityId || comment.entityId.trim() === '') {
    return res.status(400).json({ error: 'El campo entityId es obligatorio' });
  }

  try {
    await comentariosServices.createComment(comment);
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el comentario' });
  }
}

async function getCommentsByEntity(req, res) {
  try {
    const { entityId } = req.params;
    const comments = await comentariosServices.getCommentsByEntity(entityId);
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
}

export {
  createComment,
  getCommentsByEntity,
  getComments
};