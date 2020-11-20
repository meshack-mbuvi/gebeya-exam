import { Router } from 'express';
import itemRoutes from './item';
import userRoutes from './user';

const router = Router();
router.use('/items', itemRoutes);
router.use('/users', userRoutes);

export default router;
