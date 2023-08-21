import * as ligasServices from '../../services/noticias.ligas.services.js';

async function getLigas(req, res) {
  const filter = req.query;

  try {
    const ligas = await ligasServices.getLigas(filter);
    res.status(200).json(ligas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las Ligas' });
  }

}


async function createLiga(req, res) {
  const liga = {
      nombre: req.body.nombre
      
  }

  console.log(liga, 'liga create de api')

  try {
      await ligasServices.createLiga(liga);
      res.status(201).json(liga);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la liga' });
  }
}


export {
    getLigas,
    createLiga
}