const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');
const { eventNames } = require('../models/Evento');
const Evento = require('../models/Evento');

const getEventos = async(req, res = response) => {

    const eventos = await Evento.find()
                                .populate('user', 'name');
                                //.populate('user', 'name password');

    res.json({
        ok:true,
        eventos
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

const actualizarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        // Verifico que exista el evento
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe'
            });
        }

        // Verifico que sea el mismo usuario que creo el evento que lo quiere modificar
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios de editar este evento'
            });
        }

        // Obtengo la nueva data
        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        //Actualiza, pero devuelve el objeto sin actualizar
        //const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento);
        //Actualiza, y devuelve el objeto actualizado, con la ultima opcion
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.json({
            ok: true,
            evento: eventoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const eliminarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        // Verifico que exista el evento
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe'
            });
        }

        // Verifico que sea el mismo usuario que creo el evento que lo quiere modificar
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios de eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete(eventoId);


        res.json({
            ok: true
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}