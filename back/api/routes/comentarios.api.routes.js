import { Router } from 'express';
import * as controller from '../controllers/comentarios.controller.api.js';

const router = Router();

router.get('/comments', controller.getComments);
router.post('/comments', controller.createComment);
router.get('/comments/:entityId', controller.getCommentsByEntity);

export default router;
