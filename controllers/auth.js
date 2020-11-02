//Desestructacion necesaria de express para la ayuda de res.
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const validarCampos = require('../middlewares/validar-campos');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {

    //console.log(req.body);
    const { email, password } = req.body;

    try {
        //let porque lo voy a renombrar y/o reutilizar
        //let usuario = await Usuario.findOne({ email: email }); --> Es lo mismo q abajo
        let usuario = await Usuario.findOne({ email });
        //console.log(usuario);

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }
        
        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrador'
            });
    }
}

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario no existe con ese correo'
            });
        }

        //Confirmas los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Si existe el mail y el password es valido, generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const revalidarToken = async(req, res = response) => {

    //Desestructuro req
    const { uid, name } = req;

    //Generar un nuevo JWT y retornarlo
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    })
}

//Exporto un objeto ya que voy a tener muchas funciones
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}