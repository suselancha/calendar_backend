/*
    Acceso: host + /api/auth
*/

//Una forma
/*const express = require('express');
const router = express.Router;*/

//Otra forma
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

//Desestructurar funcion que viene del controlador
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { userLoginValidator, userRegisterValidator } = require('../validators/auth');

router.post('/new', userRegisterValidator, validarCampos, crearUsuario );

router.post('/', userLoginValidator, validarCampos, loginUsuario );

router.get('/renew', validarJWT, revalidarToken );

module.exports = router;
