
const {Router} = require('express');
const {check} = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const router=Router();
const {validarJWT}=require('../middlewares/validar-jwt')




//todas tienen que esta validad.



router.get('/',validarJWT, getEventos)

router.post('/',validarJWT,crearEvento);

router.put('/:id',validarJWT,actualizarEvento);

router.delete('/:id',validarJWT,eliminarEvento)

module.exports=router;