
//importo aca response express y se lo asigno a res para tener las ayudas al trabajar.
const{response}=require('express');




const getEventos=async(req,res=response)=>{

   
 
 
     res.status(201).json({
         ok:true,
         msg:'GetEventos'
         
     });
  
 
  

}

const crearEvento= async (req,res=response)=>{

   


    res.status(202).json({
        ok:true,
        msg:'CrearEvento'
    });


 

 
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