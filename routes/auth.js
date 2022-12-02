
const {Router} = require('express');
const {check} = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router=Router();
const {validarJWT}=require('../middlewares/validar-jwt')



//El check requirido de express validator es para que hacer validaciones.


router.post(
    '/new',
    [
        check("name","El nombre es obligatorio ").not().isEmpty(),
        check("email","El email es obligatorio ").isEmail(),
        check("password","El password debe tener mas de 6 caracteres ").isLength({min:6}),
        validarCampos
    ],
    crearUsuario
    );


router.post(
    '/',
    [
        check("email","El email es obligatorio ").isEmail(),
        check("password","El password debe tener mas de 6 caracteres ").isLength({min:6}),
        validarCampos
    ],
    loginUsuario
);


router.get('/renew',validarJWT,revalidarToken);



module.exports=router;