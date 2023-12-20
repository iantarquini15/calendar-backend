const express = require('express');
const bcrypt = require('bcryptjs');

const { generarJsonWebToken } = require('../helpers/jwt');
const Usuario = require('../models/usuario');




 const crearUsuario = async(req,res = express.response)=>{
    const { email , password} = req.body;

  try {

    let usuario = await Usuario.findOne({ email });
    if(usuario){
        return res.status(400).json({
            ok: false,
            msg: 'el email de este usuario ya existe'
        })
    }
     usuario = new Usuario(req.body);

    //encriptar contraseña//
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password , salt);

    await usuario.save();
    
    // Generar Json Web token //
    const token = await generarJsonWebToken( usuario.id , usuario.name )

     res.status(201).json({
        ok:true,
        uid:usuario.id,
        name: usuario.name,
        token
    });

  } catch (error) {
    console.log(error);
    
    res.status(500).json({
        ok: false,
        msg: 'comunicarse con el administrador'
    })
    
  }
   

};

const loginUsuario = async (req,res = express.response)=>{

    const {email,password} = req.body;

    try {
        let usuario =  await Usuario.findOne({email});

        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'el usuario no existe con ese correo'
            });
        }

        //confirmar las passwords//

        const validPaswords = bcrypt.compareSync( password , usuario.password );
        
        if(!validPaswords){
            return res.status(400).json({
                ok:false,
                msg: 'Password incorrecto'
            });
        }

        //generar nuestro token//
        const token = await generarJsonWebToken( usuario.id , usuario.name )


        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        console.log(error);
    
        res.status(500).json({
            ok: false,
            msg: 'comunicarse con el administrador'
        })
        
    }
}
    

const revalidarToken = async (req,res = express.response)=>{

  const { uid , name } = req;

    const token =  await generarJsonWebToken( uid , name )

    res.json({
        ok:true,
        uid,name,
        token
    })
}


module.exports = {
   crearUsuario,
   loginUsuario,
   revalidarToken
} 