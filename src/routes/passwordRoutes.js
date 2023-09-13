import { Router } from 'express';

import PasswordController from '../controllers/PasswordController';

const router = new Router();

router.post('/', PasswordController.generateCode);
router.patch('/code/', PasswordController.validateCode);

export default router;
