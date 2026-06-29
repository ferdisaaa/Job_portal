import { Router } from 'express';
import { loginUser } from '../controllers/auth.controller';

const router: Router = Router();

// POST /api/login — Login user
router.post('/login', loginUser);

export default router;
