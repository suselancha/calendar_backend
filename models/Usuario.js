/* Otra forma mas larga
const mongoose = require('mongoose');;
const Schema = mongoose.Schema;
*/

const { Schema, model } = require('mongoose');

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
    rol: String,
    activo: Boolean, 
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = model('Usuario', UsuarioSchema);