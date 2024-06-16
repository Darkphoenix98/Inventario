const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
    try {
        // Extraer campos del cuerpo de la solicitud
        const { nombre, email, password, rol, estado } = req.body;

        // Validar si hay errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Verificar si el usuario ya existe por email
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Crear una instancia de Usuario con los datos
        usuario = new Usuario({
            nombre,
            email,
            password,
            rol,
            estado,
        
        });

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        // Guardar el nuevo usuario en la base de datos
        await usuario.save();

        // Retornar la respuesta con el objeto creado
        return res.status(201).json(usuario);
    } catch (e) {
        // Manejar errores
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

// Consultar todos los usuarios
const getUsuarios = async (req, res = response) => {
    try {
        const usuario = await Usuario.find();
        return res.json(usuario);
    } catch (e) {
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

// Consultar un usuario por ID
const getUsuarioPorID = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        return res.json(usuario);
    } catch (e) {
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

// Actualizar un usuario por ID
const updateUsuarioPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        data.fechaActualizacion = new Date();

        // Encriptar nueva contraseña si se está actualizando
        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
        }

        const usuario = await Usuario.findByIdAndUpdate(id, data, { new: true });
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        return res.status(201).json(usuario);
    } catch (e) {
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

// Eliminar un usuario por ID
const deleteUsuario = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndDelete(id);
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        return res.status(200).json({ msg: 'Usuario eliminado correctamente' });
    } catch (e) {
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

module.exports = {
    createUsuario,
    getUsuarios,
    getUsuarioPorID,
    updateUsuarioPorId,
    deleteUsuario
};
