const { Router } = require('express');
const MenuController = require('./controllers/MenuController');
const routes = Router();


routes.get('/list', MenuController.index);
routes.post('/create', MenuController.store);

module.exports = routes;