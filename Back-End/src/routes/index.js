//agrupador de rotas 

const express = require('express');
const router = express.Router();

const cadastroRoute = require('./cadastro');
const loginRoute = require('./login');

router.use(cadastroRoute);
router.use(loginRoute);

module.exports = router;
