import { Router } from 'express';
import itemRoutes from './item';
import userRoutes from './user';
import cartRoutes from './cart';

const router = Router();
router.use('/items', itemRoutes);
router.use('/users', userRoutes);
router.use('/cart', cartRoutes);

export default router;
