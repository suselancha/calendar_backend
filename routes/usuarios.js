/*
    Acceso: host + /api/usuarios
*/

const { Router } = require('express');
const router = Router();

//Desestructurar funcion que viene del controlador
const { listarUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

/* Todos tiene que pasar por la validacion del Mimddleware JWT
Cualquier peticion que se encuentre debajo de esto va a tener que tener su token (ruta protegida)
Si necesito una ruta publica, la ubico antes*/
router.use(validarJWT);

router.get('/', listarUsuarios );

module.exports = router;