const jwt = require('jsonwebtoken');

const validarRolAdmin = (req, res, next) => {
    // Verificar si el usuario tiene el rol de Administrador
    if (req.payload.rol !== 'Administrador') {
        return res.status(403).json({ msg: 'No tienes permisos de administrador' });
    }
    next();
};

module.exports = validarRolAdmin;