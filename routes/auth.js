/*
    Acceso: host + /api/auth
*/

//Una forma
/*const express = require('express');
const router = express.Router;*/

//Otra forma
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

//Desestructurar funcion que viene del controlador
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

router.post(
    '/new',
    [ //Middlewares q se ejecutan secuencialmente
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio').isEmail(),
        check('clave', 'El clave debe de ser de 6 caracteres').isLength({ min:6 }),
        validarCampos
    ],
    crearUsuario );

router.post(
    '/',
    [
        check('correo', 'El correo es obligatorio').isEmail(),
        check('clave', 'El clave debe de ser de 6 caracteres').isLength({ min:6 }),
        validarCampos
    ],
    loginUsuario );

router.get('/renew', validarJWT, revalidarToken );

module.exports = router;
