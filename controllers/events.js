
//importo aca response express y se lo asigno a res para tener las ayudas al trabajar.
const{response}=require('express');
const { restart } = require('nodemon');
const Evento=require('../models/Evento')




const getEventos=async(req,res=response)=>{

const eventos=await Evento.find().populate('user','name');
 
 
     res.status(201).json({
         ok:true,
         eventos
         
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

    const eventoId=req.params.id;

    try {
        const evento=await Evento.findById(eventoId);
        const uid=req.uid;

        if(!evento){
          return  res.status(404).json({
                ok:false,
                msg:"El evento seleccionado no existe"
            });
        }
        
        if(evento.user.toString()!==uid){
            return res.status(401).json({
                ok:false,
                msg:"ud no tiene permiso para editar el evento"
            })
        }

        const nuevoEvento={
            ...req.body,
            user:uid
        }


        const eventoActualizado=await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new:true});

        res.json({
            ok:true,
            evento:eventoActualizado
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Problema actualizando evento."
        });
    }


   


    
}

const eliminarEvento=async (req,res=response)=>{
    const eventoId=req.params.id;
 

   try {
    const evento=await Evento.findById(eventoId);
    const uid=req.uid;

    if(!evento){
       return res.status(404).json({
            ok:false,
            msg:"El evento seleccionado no existe"
        });
    }
    
    if(evento.user.toString()!==uid){
        return res.status(401).json({
            ok:false,
            msg:"ud no tiene permiso para editar el evento"
        })
    }

  


    const eventoEliminado=await Evento.findByIdAndDelete(eventoId)

    
    res.json({
        ok:true,
        msg:"Evento Eliminado correctamente"
    });

} catch (error) {
    console.log(error)
    res.status(500).json({
        ok:false,
        msg:"Problema actualizando evento."
    });
}




}
module.exports={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento

}