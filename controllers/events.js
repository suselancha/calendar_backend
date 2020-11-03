const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');
const Evento = require('../models/Evento');

const getEventos = (req, res = response) => {

    res.json({
        ok:true,
        msg: 'getEventos'
    })
}

const crearEvento = async(req, res = response) => {

    // Verificar que tengo el evento
    console.log(req.body);

    const evento = new Evento(req.body);

    try {
        //Viene del payload del token
        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const actualizarEvento = (req, res = response) => {

    res.json({
        ok:true,
        msg: 'actualizarEvento'
    })

}

const eliminarEvento = (req, res = response) => {

    res.json({
        ok:true,
        msg: 'eliminarEvento'
    })

}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}