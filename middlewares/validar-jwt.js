
const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res=response, next) => {

    //x-token en los HEADERS
    const token = req.header('x-token');
    //console.log(token );

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        //const payload = jwt.verify(
        const { uid, name } = jwt.verify( //Desesctructuro payload
            token,
            process.env.SECRET_JWT_SEED
        );

        //console.log(payload);
        req.uid = uid;
        req.name = name;

        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();

}

module.exports = {
    validarJWT
}