/*
    Event Routes
    /api/events

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
//Desestructurar funcion que viene del controlador
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/idDate');

const router = Router();

// Todos tiene que pasar por la validacion del Mimddleware JWT
// Cualquier peticion que se encuentre debajo de esto va a tener que tener su token (ruta protegida)
// Si necesito una ruta publica, la ubico antes
router.use(validarJWT);


// Obtener eventos
router.get('/', getEventos);


// Crear un nuevo evento
router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento);


// Actualizar evento
router.put('/:id', actualizarEvento);


// Borrar evento
router.delete('/:id', eliminarEvento);




module.exports = router;



