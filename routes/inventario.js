const { Router } = require("express");
const {
    createInventario,
    getInventarios,
    getInventarioPorId,
    updateInventarioPorId,
    deleteInventario
} = require('../controllers/inventario');

const router = Router();
const validarJWT = require('../middleware/validar-jwt');
const validarRolAdmin = require('../middleware/validar-rol-admin');

// Middleware de validación JWT aplicado a todas las rutas
router.use(validarJWT.validarJWT);

/**
 * Obtiene todos los inventarios
 * GET /inventarios/
 */
router.get('/', getInventarios);

/**
 * Crea un nuevo inventario
 * POST /inventarios/
 */
router.post('/', validarRolAdmin, createInventario);

/**
 * Obtiene un inventario por su ID
 * GET /inventarios/:id
 */
router.get('/:id', getInventarioPorId);

/**
 * Actualiza un inventario por su ID
 * PUT /inventarios/:id
 */
router.put('/:id', validarRolAdmin, updateInventarioPorId);

/**
 * Elimina un inventario por su ID
 * DELETE /inventarios/:id
 */
router.delete('/:id', validarRolAdmin, deleteInventario);

module.exports = router;
