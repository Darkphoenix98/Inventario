const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { generarJWT } = require('../helper/jwt');

const Auth = async (req = request, res = response) => {
    try {
        // Validar si hay errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extraer email y password del cuerpo de la solicitud
        const { email, password } = req.body;

        // Verificar si el usuario existe en la base de datos
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const passwordCorrecto = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecto) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const token = generarJWT({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
            estado: usuario.estado
        });

        const { _id, nombre, rol, email: userEmail } = usuario;
        res.status(200).json({ _id, nombre, rol, email: userEmail, token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};

module.exports = {
    Auth
};
