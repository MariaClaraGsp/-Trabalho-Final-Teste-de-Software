import express from 'express';
import cadastroRoute from './cadastro.js';
import { router as loginRoute } from './login.js';

const router = express.Router();

router.use(cadastroRoute);
router.use(loginRoute);

export default router;
