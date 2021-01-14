const jwt = require('jsonwebtoken');

const generarJWT = ( uid, nombre, rol ) => {
    //Generar una nueva promesa
    return new Promise( (resolve, reject) => {
        
        const payload = { uid, nombre, rol };

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token ) => {
            if (err) {
                console.log(err);
                reject('No se puedo generar el token');
            }

            resolve(token);
        })
    })

}

module.exports = {
    generarJWT
}