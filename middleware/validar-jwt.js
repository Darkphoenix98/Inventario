const jwt = require('jsonwebtoken');


const validarJWT = async (req, res, next) => {
    // Obtener el token del encabezado Authorization
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ msg: 'permiso no válido' });
    }

    // Verificar el token
    try {
        const payload = jwt.verify(token, '1234567')
        req.payload = payload;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ msg: 'Token no válido' });
    }
};

module.exports ={
    validarJWT
}
