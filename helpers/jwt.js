const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {
    //Generar una nueva promesa
    return new Promise( (resolve, reject) => {
        
        const payload = { uid, name };

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