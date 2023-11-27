/*
Rutas de Usuario / Auth
localhost + /api/auth
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario , loginUsuario , revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/fild-validators');
const { validarJwt } = require('../middlewares/validar-jwt');
const router = Router();

router.post(
    '/new',
    [//Middlewares//    
     check('name','the name is obligatory and must contain more than 3 letters').not().isEmpty().isLength({min:3}),
     check('email','the email is obligatory').isEmail(),
     check('password','the password must contain 6 characters').isLength({min:6}),
     validarCampos
    ], 
    crearUsuario );

router.post(
    '/',
    [//Middlewares//
    check('email','the email is obligatory').isEmail(),
    check('password','the password must contain 6 characters').isLength({min:6}),
    validarCampos
],
    loginUsuario );

router.get('/renew', validarJwt ,revalidarToken );




module.exports = router