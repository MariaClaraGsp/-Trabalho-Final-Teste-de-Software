import express from 'express';
import cadastroRoute from './cadastro.js';
import produtosRoute from './produtos.js';
import { router as loginRoute } from './login.js';


const router = express.Router();

router.use('/clientes',cadastroRoute);
router.use(loginRoute);
router.use('/produtos',produtosRoute);

export default router;
