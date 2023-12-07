const { Router } = require('express');
const { check } = require('express-validator');
const { validarJwt } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/fild-validators');


const router = Router();

//Todas tienen que pasar por la validacion del JWT//

router.use( validarJwt );

//Obtener evento
router.get('/' , getEventos);

//Crear un nuevo evento//
router.post(
    '/' ,
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','la fecha de inicio es obligatorio').custom( isDate ),
        check('end','la fecha de finalizacion es obligatorio').custom( isDate ),
        validarCampos
    ],
     crearEvento);

//actualizar evento//
router.put('/:id' , actualizarEvento)

//borrar evento//
router.delete('/:id', eliminarEvento)


module.exports = router; 