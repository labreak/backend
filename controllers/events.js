
//importo aca response express y se lo asigno a res para tener las ayudas al trabajar.
const{response}=require('express');
const Evento=require('../models/Evento')




const getEventos=async(req,res=response)=>{

    
   
 
 
     res.status(201).json({
         ok:true,
         msg:'GetEventos'
         
     });
  
 
  

}

const crearEvento= async (req,res=response)=>{

    const evento= new Evento(req.body);




    try {
        evento.user=req.uid;
   const eventoGuardado= await evento.save();

     res.json({
        ok:true,
        eventoGuardado
     })
     
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"hable con su administrador"
        })
    }


  


 

 
}


const actualizarEvento=async (req,res=response)=>{

   


    res.json({
        ok:true,
        msg:'Actualizar evento'
       

    })
}

const eliminarEvento=async (req,res=response)=>{

   


    res.json({
        ok:true,
        msg:'Eliminar evento'
       

    })
}
module.exports={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento

}