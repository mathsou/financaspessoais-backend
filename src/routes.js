const express = require ('express');
const connection = require('./database/connection');


const routes = express.Router();

const authMiddleware = require('./middlewares/auth');

const autenticacaoController = require('./controllers/autenticacaoController');
const usuarioController = require('./controllers/usuarioController');
const cartaoController = require('./controllers/cartaoController');
const adminController = require('./controllers/adminController');
const bandeiraController = require('./controllers/bandeiraController');
const lojaController = require('./controllers/lojaController');
const comprasController = require('./controllers/comprasController');
const faturasController = require('./controllers/faturasController');
const mesesController = require('./controllers/mesesController');
const sessionController = require('./controllers/sessionController');
const validaUserController = require('./controllers/validaUserController');
const pagarFaturaController = require('./controllers/pagarFaturaController');


routes.post('/validaUser', validaUserController.index);
routes.post('/session', sessionController.create);
routes.post('/usuarios', usuarioController.create);

routes.get('/bandeira', bandeiraController.index);
routes.get('/loja', lojaController.index);
routes.get('/meses', mesesController.index);

routes.use(authMiddleware);

routes.get('/autenticacao', autenticacaoController.token);

routes.get('/usuarios', usuarioController.index);
routes.get('/cartoes', cartaoController.index);
routes.get('/admin', adminController.index);
routes.get('/compras', comprasController.index);
routes.get('/faturas', faturasController.index);
routes.get('/cartoes/:id', cartaoController.index);
routes.get('/admin/:cod', adminController.index);
routes.get('/compras/:id', comprasController.index);

routes.post('/cartoes', cartaoController.create);
routes.post('/bandeira', bandeiraController.create);
routes.post('/loja', lojaController.create);
routes.post('/compras', comprasController.create);
routes.post('/meses', mesesController.create);
routes.get('/pagarFatura/:fatura', pagarFaturaController.pagar);

routes.delete('/cartoes/:id', cartaoController.delete);
routes.delete('/compras/:id', comprasController.delete);

routes.put('/usuarios', usuarioController.modify);
routes.put('/cartoes', cartaoController.modify);
routes.put('/admin', adminController.modify);
routes.put('/bandeira/:id', bandeiraController.modify);
routes.put('/loja/:id', lojaController.modify);
routes.put('/compras', comprasController.modify);
routes.put('/meses', mesesController.modify);


module.exports = routes;