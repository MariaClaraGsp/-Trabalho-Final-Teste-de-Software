import express from 'express';
import cadastroRoute from './cadastro.js';
import produtosRoute from './produtos.js';
import loginRoutes from './login.js';


const router = express.Router();

router.use('/clientes',cadastroRoute);
router.use('/login', loginRoutes);
router.use('/produtos',produtosRoute);

export default router;
