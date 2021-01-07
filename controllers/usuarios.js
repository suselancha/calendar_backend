const { response } = require('express');
const Usuario = require('../models/Usuario');

const listarUsuarios = async(req, res = response) => {

    //console.log('Listando usuarios');
    try {
        const usuarios = await Usuario.find();

        if ( !usuarios ) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontraron usuarios'
            });
        }

        res.json({
            ok: true,
            usuarios
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    } 
    
}

const listarUsuariosActivos = async(req, res = response) => {

    //console.log(req);
    const query = req.query;
    try {
        const usuarios = await Usuario.find({ activo:query.activo});

        if ( !usuarios ) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontraron usuarios'
            });
        }

        res.json({
            ok: true,
            usuarios
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    } 
    
}

//Exporto un objeto ya que voy a tener muchas funciones
module.exports = {
    listarUsuarios,
    listarUsuariosActivos
}