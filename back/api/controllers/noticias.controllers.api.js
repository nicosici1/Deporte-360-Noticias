import * as service from '../../services/noticias.services.js'
import * as comentariosServices from '../../services/noticias.comentarios.services.js'

function getNoticias(req, res) {
    const filter = req.query

    console.log(filter)
    service.getNoticias(filter)
        .then(function (noticias) {
            res.status(200).json(noticias)
        })
}


async function createNoticias(req, res) {
    const noticia = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        sinopsis: req.body.sinopsis,
        imagen: req.body.imagen,
        autor: req.body.autor,
        tags: req.body.tags,
        categoria: req.body.categoria,
        fecha_publicacion: req.body.fecha_publicacion,
        comentarios: req.body.comentarios,
        liga: req.body.liga //agregado ultimo
    }

    console.log(noticia, 'noticia create de api')

    try {
        await service.createNoticia(noticia);
        res.status(201).json(noticia);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la noticia' });
    }
}


async function getNoticiaById(req, res) {
    try {
        const { idNoticia } = req.params;

        const noticia = await service.getNoticiaById(idNoticia);

        if (noticia) {
            const comentarios = await comentariosServices.getCommentsByEntity(idNoticia);
            res.status(200).json({ noticia, comentarios });
        } else {
            res.status(404).json({ error: { message: `Noticia #${idNoticia} no encontrada` } });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'Error al obtener la noticia' } });
    }
}

function replaceNoticia(req, res) {
    const idNoticia = req.params.idNoticia

    const noticia = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        sinopsis: req.body.sinopsis,
        imagen: req.body.imagen,
        autor: req.body.autor,
        tags: req.body.tags,
        categoria: req.body.categoria,
        fecha_publicacion: req.body.fecha_publicacion,
        comentarios: req.body.comentarios,
        liga: req.body.liga //agregado ultimo
    }

    service.replaceNoticia(idNoticia, noticia)
        // service.replaceProyect(idProyect, req.body) 
        .then(function (noticia) {
            if (noticia) {
                res.status(200).json(noticia)
            }
            else {
                res.status(404).json({ message: "La notÃ­cia no funciona" })
            }
        })
}

function updateNoticia(req, res) {
    const idNoticia = req.params.idNoticia

    const noticia = {}

    if (req.body.nombre) {
        noticia.nombre = req.body.nombre
    }

    if (req.body.descripcion) {
        noticia.descripcion = req.body.descripcion
    }

    if (req.body.sinopsis) {
        noticia.sinopsis = req.body.sinopsis
    }

    if (req.body.fecha_publicacion) {
        noticia.fecha_publicacion = req.body.fecha_publicacion
    }
    
    if (req.body.liga) {
        noticia.liga = req.body.liga //AGREGAD0 ULTIMO
    }

    service.editProyect(idNoticia, noticia)
        .then(function (noticia) {
            if (noticia) {
                res.status(200).json(noticia)
            }
            else {
                res.status(404).json({ message: "La noticia no funciona" })
            }
        })
}

function deleteNoticia(req, res) {
    const idNoticia = req.params.idNoticia;


    service.deleteNoticia(idNoticia)
        .then(function (noticia) {
            if (noticia) {
                res.status(200).json(noticia);
            } else {
                res.status(404).json({ error: { message: " Noticia #${idNoticia} no encontrada " } });
            }
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ error: "Error al eliminar la noticia" });
        });
}


export {
    getNoticias,
    createNoticias,
    getNoticiaById,
    replaceNoticia,
    updateNoticia,
    deleteNoticia
}