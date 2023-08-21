import express from 'express'
/* import NoticiasRoute from './api/routes/noticias.routes.js' */
import NoticiasRoute from './api/routes/noticias.api.routes.js'
import NoticiasRouteApi from './api/routes/noticias.api.routes.js'
import cors from 'cors'
import path from 'node:path'
import CuentasRoute from './api/routes/cuenta.api.routes.js'
import commentRoute from './api/routes/comentarios.api.routes.js';
import ligasRoute from './api/routes/ligas.api.routes.js';


import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import { crearCuenta } from './api/controllers/cuenta.api.controller.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
app.use(cors())

app.use('/api', express.json())

app.use('/', express.static('public'))

app.use('/', NoticiasRoute)
app.use('/api', NoticiasRouteApi)
app.use('/api', CuentasRoute)
app.use('/api', commentRoute)
app.use('/api', ligasRoute)


/* app.use('front/src/imagenes', express.static(path.join(__dirname, 'imagenes'))); */

app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));


app.listen(2222, function(){
    console.log('servidor corriendo en el host http://localhost:2222')
})



