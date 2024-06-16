const {Router} = require('express');
const{
    createMarca,
    getMarcas,
    getMarcaPorID,
    updateMarcaPorId,
    deleteMarca

} =require('../controllers/marca');

const router = Router();

const validarJWT = require('../middleware/validar-jwt');
const validarRolAdmin = require('../middleware/validar-rol-admin');

router.use(validarJWT.validarJWT);

/**
 * Obtiene todos 
 */
router.get('/', validarRolAdmin, getMarcas);

/**
 * Obtiene por id
 */
router.get('/:id',validarRolAdmin, getMarcaPorID);

/**
 * Crear 
 */
router.post('/',validarRolAdmin, createMarca);

/**
 * Actualiza por id
 */
router.put('/:id', validarRolAdmin, updateMarcaPorId );

/**
 * eliminaa por id
 */
router.delete('/:id', validarRolAdmin, deleteMarca );



module.exports = router;