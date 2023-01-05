
//importo aca response express y se lo asigno a res para tener las ayudas al trabajar.
const{response}=require('express');
const bcrypt=require('bcryptjs');
const Usuario =require('../models/Usuario');
const {generarJWT}=require('../helpers/jwt');


const crearUsuario=async(req,res=response)=>{

    const {email,password}=req.body;


   try {

    let usuario=await Usuario.findOne({email});
    console.log(usuario)
    if(usuario){
        return res.status(400).json({
            ok:false,
            msg:'El correo ya se encuentra registrado'
        })
    }


    usuario=new Usuario(req.body);
    //encriptar contraseña;

    const salt= bcrypt.genSaltSync();
    usuario.password=bcrypt.hashSync(password,salt);

    await usuario.save();

    const token=await generarJWT(usuario.id,usuario.name);
 
 
     res.status(201).json({
         ok:true,
         uid:usuario.id,
         name:usuario.name,
         token
     });
   } catch (error) {
    res.status(500).json({
        ok:false,
        msg:'Contacte con su adminstrador'
    })
   }
 
  

}

const loginUsuario= async (req,res=response)=>{

   
    const{email,password}=req.body


    try {

  const usuario=await Usuario.findOne({email});
    
    if(!usuario){
        return res.status(400).json({
            ok:false,
            msg:'El email no se encuentra registrado'
        })
    }

    // comparamos el password encriptado con el  recibido-
    const validPassword=bcrypt.compareSync(password,usuario.password);

    if(!validPassword){
        return res.status(400).json({
            ok:false,
            msg:'Password incorrecto'
        });
    }

    //Generar JsonWebToken

    const token=await generarJWT(usuario.id,usuario.name);
    res.status(202).json({
        ok:true,
        uid:usuario.id,
        name:usuario.name,
        token
    });


        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Contacte con su adminstrador'
        })
    }

 
}


const revalidarToken=async (req,res=response)=>{

    const uid=req.uid;
    const name=req.uid;

    const token=await generarJWT(uid,name);


    res.json({
        ok:true,
        uid,name,
        token
       

    })
}
module.exports={
    crearUsuario,
    loginUsuario,
    revalidarToken

}