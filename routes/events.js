
const {Router} = require('express');
const {check} = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const router=Router();
const {validarJWT}=require('../middlewares/validar-jwt')




//todas tienen que esta validad.
router.use(validarJWT);


router.get('/', getEventos)

router.post('/',crearEvento);

router.put('/:id',actualizarEvento);

router.delete('/:id',eliminarEvento)

module.exports=router;