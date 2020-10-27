/*
    Rutas de Usuarios / Auth
    Acceso: host + /api/auth
*/

//Una forma
/*const express = require('express');
const router = express.Router;*/

//Otra forma
const { Router } = require('express');
const router = Router();

//Desestructurar funcion que viene del controlador
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

router.post('/new', crearUsuario );

router.post('/', loginUsuario );

router.get('/renew', revalidarToken );

module.exports = router;
