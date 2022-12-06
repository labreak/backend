
const {Router} = require('express');
const {check} = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const router=Router();
const {validarCampos}=require('../middlewares/validar-campos');
const {validarJWT}=require('../middlewares/validar-jwt')




//todas tienen que esta validad.
router.use(validarJWT);


router.get('/', getEventos)

router.post('/',
[
    check('title',"El titulo es obligatio").not().isEmpty(),
    check('start','La fecha de inicio es obligatoria').custom(isDate),
    check('end','La fecha de fin es obligatoria').custom(isDate),
    validarCampos
],
crearEvento);

router.put('/:id',actualizarEvento);

router.delete('/:id',eliminarEvento)

module.exports=router;