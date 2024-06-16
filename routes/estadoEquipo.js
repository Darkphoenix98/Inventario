const { Router } = require('express');

const { 
    
    CreateEstadoEquipo,
    getEstadoEquipos,
    getEstadoEquipoPorID,
    updateEstadoEquipoPorId,
    deleteEstadoEquipo

} = require('../controllers/estadoEquipo');

const router = Router();

const validarJWT = require('../middleware/validar-jwt');
const validarRolAdmin = require('../middleware/validar-rol-admin');

router.use(validarJWT.validarJWT);

/**
 * Obtiene todos 
 */
router.get('/', validarRolAdmin, getEstadoEquipos);

/**
 * Obtiene por id
 */
router.get('/:id', validarRolAdmin, getEstadoEquipoPorID);

/**
 * Crear 
 */
router.post('/', validarRolAdmin, CreateEstadoEquipo );

/**
 * Actualiza por id
 */
router.put('/:id', validarRolAdmin, updateEstadoEquipoPorId);

/**
 * elimina por id
 */
router.delete('/:id', validarRolAdmin, deleteEstadoEquipo);


module.exports = router;