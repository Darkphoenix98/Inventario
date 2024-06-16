const {Router} = require('express');
const{
    createUsuario,
    getUsuarios,
    getUsuarioPorID,
    updateUsuarioPorId,
    deleteUsuario

} =require('../controllers/usuario');

const router = Router();

const validarJWT = require('../middleware/validar-jwt');
const validarRolAdmin = require('../middleware/validar-rol-admin');

router.use(validarJWT.validarJWT);
/**
 * Obtiene todos 
 */
router.get('/',validarRolAdmin, getUsuarios);

/**
 * Obtiene por id
 */
router.get('/:id',validarRolAdmin,  getUsuarioPorID);

/**
 * Crear 
 */
router.post('/',validarRolAdmin, createUsuario);

/**
 * Actualiza por id
 */
router.put('/:id',validarRolAdmin,  updateUsuarioPorId);

/**
 * elimina por id
 */
router.put('/:id',validarRolAdmin,  deleteUsuario);


module.exports = router;
