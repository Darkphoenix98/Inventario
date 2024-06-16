const {Router} = require('express');
const{
    createTipoEquipo,
    getTipoEquipos,
    getTipoEquipoPorID,
    updateTipoEquipoPorId,
    deleteTipoEquipo

} =require('../controllers/tipoEquipo');

const router = Router();

const validarJWT = require('../middleware/validar-jwt');
const validarRolAdmin = require('../middleware/validar-rol-admin');
router.use(validarJWT.validarJWT);

/**
 * Obtiene todos 
 */
router.get('/',validarRolAdmin, getTipoEquipos);

/**
 * Obtiene por id
 */
router.get('/:id',validarRolAdmin, getTipoEquipoPorID);

/**
 * Crear 
 */
router.post('/',validarRolAdmin, createTipoEquipo );

/**
 * Actualiza por id
 */
router.put('/:id',validarRolAdmin, updateTipoEquipoPorId);

/**
 * elimina por id
 */
router.put('/:id',validarRolAdmin, deleteTipoEquipo);

module.exports = router;