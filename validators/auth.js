const { check } = require('express-validator');

const userRegisterValidator = [
    check('nombre')
        .not()
        .isEmpty()
        .withMessage('El nombre es obligatorio'),
    check('apellido')
        .not()
        .isEmpty()
        .withMessage('El apellido es obligatorio'),
    check('correo')
        .not()
        .isEmpty()
        .withMessage('El correo es obligatorio'),
    check('clave')
        .not()
        .isEmpty()
        .isLength({ min:5 })
        .withMessage('La clave debe de ser de 5 caracteres')
]

const userLoginValidator = [
    check('correo')
        .isEmail()
        .withMessage('El correo es obligatorio'),
    check('clave')
        .isLength({ min:5 })
        .withMessage('El clave debe de ser de 5 caracteres')
]

module.exports = {
    userRegisterValidator,
    userLoginValidator
}