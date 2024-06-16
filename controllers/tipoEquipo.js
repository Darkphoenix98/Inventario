const { request, response } = require('express');
const TipoEquipo = require('../models/tipoEquipo');

// Crear un nuevo TipoEquipo
const createTipoEquipo = async (req, res) => {
    try {
        const { nombre, estado } = req.body;

        // Verificar si el tipo de equipo ya existe
        const tipoEquipoBD = await TipoEquipo.findOne({ nombre });
        if (tipoEquipoBD) {
            return res.status(400).json({ msg: 'Ya existe el Tipo de Equipo' });
        }

        // Crear una nueva instancia de TipoEquipo con los datos
        const datos = {
            nombre,
            estado,
        
        };

        // Guardar el nuevo tipo de equipo en la base de datos
        const tipoEquipo = new TipoEquipo(datos);
        await tipoEquipo.save();

        // Retornar la respuesta con el objeto creado
        return res.status(201).json(tipoEquipo);
    } catch (e) {
        // Manejar errores
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

// Consultar todos los TipoEquipo
const getTipoEquipos = async (req, res = response) => {
    try {
        const tipoEquipoBD = await TipoEquipo.find();
        return res.json(tipoEquipoBD);
    } catch (e) {
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

// Consultar un TipoEquipo por ID
const getTipoEquipoPorID = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const query = { _id: id };
        const tipoEquipo = await TipoEquipo.findOne(query);
        return res.json(tipoEquipo);
    } catch (e) {
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

// Actualizar un TipoEquipo por ID
const updateTipoEquipoPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        data.fechaActualizacion = new Date();
        const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, data, { new: true });
        return res.status(201).json(tipoEquipo);
    } catch (e) {
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

// Eliminar una Tipo de Equipo por ID
const deleteTipoEquipo = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const tipoEquipo = await TipoEquipo.findByIdAndDelete(id);
        if (!tipoEquipo) {
            return res.status(404).json({ msg: 'No se encontró el tipo de equipo' });
        }
        return res.status(200).json({ msg: 'Tipo de equipo eliminada correctamente' });
    } catch (e) {
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

module.exports = {
    createTipoEquipo,
    getTipoEquipos,
    getTipoEquipoPorID,
    updateTipoEquipoPorId,
    deleteTipoEquipo
};
