//Desestructacion necesaria de express para la ayuda de res.
const { response } = require('express');

const crearUsuario = (req, res = response) => {

    //console.log(req.body);
    const { name, email, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'registro',
        //user: req.body
        name,
        email,
        password
    })
}

const loginUsuario = (req, res = response) => {

    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}

const revalidarToken = (req, res = response) => {
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