import { UserController } from '../controllers';

import { Router } from 'express';

const router = Router();

router.post('/signup', UserController.CreateUser);
router.post('/login', UserController.Login);

export default router;
