//Desestructacion necesaria de express para la ayuda de res.
const { response } = require('express');

const crearUsuario = (req, res = response) => {

    //console.log(req.body);

    res.json({
        ok: true,
        msg: 'registro',
        user: req.body
    })
}

const loginUsuario = (req, res) => {
    res.json({
        ok: true,
        msg: 'login'
    })
}

const revalidarToken = (req, res) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}

//Exporto un objeto ya que voy a tener muchas funciones
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}