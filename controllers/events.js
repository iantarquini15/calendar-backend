const { express } = require('express');
const Evento = require('../models/Evento');



// getEventos

const getEventos = async ( req , res = express.response ) => {

    const eventos = await Evento.find()
                                .populate('user','name');
   res.json({
    ok: true,
    eventos
   });
}

// crearEvento

const crearEvento = async ( req , res = express.response) => {

    const evento = new Evento( req.body );
    
    try {

        evento.user = req.uid;
        
         const eventoGuardado = await evento.save();

         res.json({
            ok: true,
            evento: eventoGuardado
         });


    } catch (error) {
        console.log( error );

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
    
    
   
}

//actualizarEvento

const actualizarEvento = async( req , res = express.response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);

        if(!evento) {
        return res.status(404).json({
            ok: false,
            msg: 'Evento no existe con ese Id'
         });
        }

        if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId , nuevoEvento, { new: true });

        res.json({
            ok: true,
            evento: eventoActualizado
        })

        
    } catch (error) {
       console.log(error)
       res.status(500).json({
        ok: false,
        msg: 'hablar con el administrador'
       }) 
    }
 
}

//eliminarEvento

const eliminarEvento = async( req , res = express.response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);

        if(!evento) {
        return res.status(404).json({
            ok: false,
            msg: 'Evento no existe con ese Id'
         });
        }

        if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

         await Evento.findByIdAndDelete(eventoId , nuevoEvento, { new: true });

        res.json({
            ok: true
        })

        
    } catch (error) {
       console.log(error)
       res.status(500).json({
        ok: false,
        msg: 'hablar con el administrador'
       }) 
    }
    
}


module.exports = {
    crearEvento,
    getEventos,
    actualizarEvento,
    eliminarEvento
}