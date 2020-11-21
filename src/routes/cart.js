import { CartController } from '../controllers';

import { Router } from 'express';

const router = Router();

router.post('/', CartController.AddItemToCart);
router.get('/', CartController.AllCartItems);
router.delete('/', CartController.RemoveItemFromCart);

export default router;
