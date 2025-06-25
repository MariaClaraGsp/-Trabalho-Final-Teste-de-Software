import express from 'express';
import cadastroRoute from './cadastro.js';
import produtosRoute from './produtos.js';
import loginRoutes from './login.js';
import clientesRoutes from './clientes.js';


const router = express.Router();

router.use('/clientes',cadastroRoute);
router.use('/login', loginRoutes);
router.use('/produtos',produtosRoute);
router.use('/clientes', clientesRoutes);

export default router;
