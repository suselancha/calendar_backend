//Desestructacion necesaria de express para la ayuda de res.
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {

    //console.log(req.body);
    const { correo, clave } = req.body;

    try {
        //let porque lo voy a renombrar y/o reutilizar
        //let usuario = await Usuario.findOne({ correo: correo }); --> Es lo mismo q abajo
        let usuario = await Usuario.findOne({ correo });
        //console.log(usuario);

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }
        
        usuario = new Usuario(req.body);
        usuario.rol = "ADMIN";
        usuario.activo = true;

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.clave = bcrypt.hashSync( clave, salt );

        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.nombre);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.nombre,
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

    const { correo, clave } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario no existe con ese correo'
            });
        }

        //Confirmas los passwords
        const validPassword = bcrypt.compareSync(clave, usuario.clave);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Clave incorrecta'
            });
        }

        if (!usuario.activo) {
            return res.status(200).json({
                ok: false,
                msg: 'Usuario No Activado'
            });
        }

        //Si existe el mail y el password es valido, generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.nombre);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.nombre,
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
    const { uid, nombre } = req;

    //Generar un nuevo JWT y retornarlo
    const token = await generarJWT(uid, nombre);

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