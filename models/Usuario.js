/* Otra forma mas larga
const mongoose = require('mongoose');;
const Schema = mongoose.Schema;
*/

const { Schema, model } = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido',
};

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true,
        trim: true //Elimina espacios en blanco al inicio y final
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    clave: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: String,
        required: false
    },
    rol: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

//UsuarioSchema.plugin(uniqueValidator, { message: 'Error, {PATH} debe ser único.' })

module.exports = model('Usuario', UsuarioSchema);