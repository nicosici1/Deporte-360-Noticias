import { Router } from 'express'
import * as controller from '../controllers/noticias.controllers.api.js'
import { tokenVerify } from '../../middlewares/token.validate.middleware.js'


const route = Router()
 

route.use('/noticias', tokenVerify)

route.get('/noticias', controller.getNoticias)

route.post('/noticias/new', controller.createNoticias)
route.get('/noticias/:idNoticia', controller.getNoticiaById)
route.put('/noticias/:idNoticia/edit', controller.replaceNoticia)
route.patch('/noticias/:idNoticia/edit', controller.updateNoticia) 
route.delete('/noticias/:idNoticia/delete', controller.deleteNoticia) 



export default route

