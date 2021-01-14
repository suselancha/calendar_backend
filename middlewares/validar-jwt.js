
const { response } = require('express');
const jwt = require('jsonwebtoken');
const moment = require('moment');

// ================
// Verificar Token
// ================
const validarJWT = (req, res=response, next) => {

    //x-token en los HEADERS
    const token = req.header('x-token');
    //console.log(token);

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        //const payload = jwt.verify(
        const { uid, nombre, exp, rol } = jwt.verify( //Desesctructuro payload
            token,
            process.env.SECRET_JWT_SEED
        );

        if(exp <= moment.unix()) {
            return res.status(401).json({
                ok: false,
                msg: 'Token expirado'
            });
        }
        //console.log(rol);
        req.uid = uid;
        req.nombre = nombre;
        req.rol = rol;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();

};

// ================
// Verificar AdminRol
// ================
const validaAdminRol = (req, res=response, next) => {

    //console.log('ROL ACTUAL: ' + req.rol);
    if(req.rol === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            msg: 'El usuario no es administrador'
        });
    }
   
};

module.exports = {
    validarJWT,
    validaAdminRol
}