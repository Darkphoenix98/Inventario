const { request, response } = require('express');
const Marca = require('../models/marca');

// Crear una nueva Marca
const createMarca = async (req, res) => {
    try {
        const { nombre, estado } = req.body;

        // Verificar si la marca ya existe
        const marcaBD = await Marca.findOne({ nombre });
        if (marcaBD) {
            return res.status(400).json({ msg: 'Ya existe la Marca' });
        }

        // agregar
        const datos = {
            nombre,
            estado,
           
        };

        // Guardar la nueva marca en la base de datos
        const marca = new Marca(datos);
        await marca.save();

        // Retornar la respuesta con el objeto creado
        return res.status(201).json(marca);
    } catch (e) {
        // Manejar errores
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

// Consultar todas las Marcas
const getMarcas = async (req, res = response) => {
    try {
        const marcaBD = await Marca.find();
        return res.json(marcaBD);
    } catch (e) {
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

// Consultar una Marca por ID
const getMarcaPorID = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const query = { _id: id };
        const marca = await Marca.findOne(query);
        return res.json(marca);
    } catch (e) {
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

// Actualizar una Marca por ID
const updateMarcaPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        data.fechaActualizacion = new Date();
        const marca = await Marca.findByIdAndUpdate(id, data, { new: true });
        return res.status(201).json(marca);
    } catch (e) {
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

// Eliminar una Marca por ID
const deleteMarca = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const marca = await Marca.findByIdAndDelete(id);
        if (!marca) {
            return res.status(404).json({ msg: 'No se encontró la Marca' });
        }
        return res.status(200).json({ msg: 'Marca eliminada correctamente' });
    } catch (e) {
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

module.exports = {
    createMarca,
    getMarcas,
    getMarcaPorID,
    updateMarcaPorId,
    deleteMarca
};
