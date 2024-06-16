const jwt = require('jsonwebtoken');

const generarJWT = (usuario) => {
  
    const payload = {
        _id: usuario._id,
        nombre: usuario.nombre, 
        email: usuario.email,
        rol: usuario.rol,
        estado: usuario.estado
    };

    const token = jwt.sign(payload, '1234567', { expiresIn: '2h' });

    return token;
};

module.exports = {
    generarJWT
};
