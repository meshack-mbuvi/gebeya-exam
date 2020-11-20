import { ItemController } from '../controllers';

import { Router } from 'express';

const router = Router();

router.get('/', ItemController.All);
router.get('/:id', ItemController.One);

export default router;
