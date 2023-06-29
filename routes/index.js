import { Router } from 'express';
import userRouters from './usuario/userRouters.js';

const router = Router();

router.use('/user', userRouters);

export default router;
