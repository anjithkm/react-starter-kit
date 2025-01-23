import { Router } from 'express';

import itemRoute from '@/routes/item.routes';
import authRoute from '@/routes/auth.routes';

const router = Router();

router.use('/item', itemRoute);
router.use('/aurh', authRoute);

export default router;