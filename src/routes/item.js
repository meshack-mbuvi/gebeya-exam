import { ItemController } from '../controllers';

import { Router } from 'express';

const router = Router();

router.post('/', ItemController.Add);
router.get('/', ItemController.All);
router.get('/:id', ItemController.One);
router.put('/:id', ItemController.Edit);
router.delete('/:id', ItemController.Delete);

export default router;
