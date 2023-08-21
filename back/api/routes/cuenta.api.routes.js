import {Router} from 'express'
import * as controller from '../controllers/cuenta.api.controller.js'

import { validacionCuenta } from '../../middlewares/cuenta.validate.middleware.js';
import { tokenVerify } from '../../middlewares/token.validate.middleware.js';


const router = Router();

 

router.get('/cuentas',controller.getCuentas)
router.put('/cuentas/:idCuenta', controller.editCuenta);
router.get('/cuenta/:idCuenta', controller.getCuentaById);

router.post('/cuenta',[validacionCuenta], controller.crearCuenta)

router.get('/api/cuenta/exists', controller.cuentaExists);
router.post('/session', [validacionCuenta], controller.login)

router.delete('/session',[tokenVerify], controller.logout)
router.delete('/cuentas/:idCuenta', controller.deleteCuenta) ;


export default router