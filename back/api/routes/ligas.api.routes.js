import { Router } from 'express';

import * as controller from '../controllers/ligas.controller.api.js'

const router = Router();

router.get('/ligas', controller.getLigas);
router.post('/ligas', controller.createLiga);

export default router;
