

const express= require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors=require('cors');


//Crear servidor express
const app=express();

//Base de datos
dbConnection();
// cors
app.use(cors())

//Rutas
//este middleware es para parsear lo que viene el body.
app.use(express.json());
//con este middleware le digo que todo lo que entre en api/auth siga la logica de rutas de auth.js
app.use('/api/auth',require('./routes/auth'));



//Directorio publico.

app.use(express.static('public'));

//Escuchar peticiones.
app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}` )
})