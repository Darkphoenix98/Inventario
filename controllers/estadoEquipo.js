const { request, response } = require('express');
const EstadoEquipo = require('../models/estadoEquipo');



// crear
const CreateEstadoEquipo = async (req, res) => {
    try {
        const {nombre, estado } = req.body;

        // Verificar si el cliente existe ya existe
        const estadoEquipoBD = await EstadoEquipo.findOne({ nombre });
        if (estadoEquipoBD) {
            return res.status(400).json({ msg: 'Ya existe Estado' });
        }
        // Agregar 
        const datos = {
            nombre, 
            estado   
        };

        // Crear instancia del cliente con los datos
        const estadoEquipo = new EstadoEquipo(datos);
 
        // Guardar el cliente en la base de datos
        await estadoEquipo.save();

        // Retornar la respuesta con el objeto cliente creado
        return res.status(201).json(estadoEquipo);
    } catch (e) {
        // Manejar errores
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};


// Consultar todos los EstadoEquipo
const getEstadoEquipos = async (req, res = response) => {
    try {
        const estadoEquipoBD = await EstadoEquipo.find();
        return res.json(estadoEquipoBD);
    } catch (e) {
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

/**
 * 
 */
// Consultar un EstadoEquipo por ID
const getEstadoEquipoPorID = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const query = { _id: id };
        const estadoEquipo = await EstadoEquipo.findOne(query);
        return res.json(estadoEquipo);
    } catch (e) {
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};
/**
 */
// Actualizar un EstadoEquipo por ID
const updateEstadoEquipoPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        data.fechaActualizacion = new Date();
        const estadoEquipo = await EstadoEquipo.findByIdAndUpdate(id, data, { new: true });
        return res.status(201).json(estadoEquipo);
    } catch (e) {
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

// Eliminar un EstadoEquipo por ID
const deleteEstadoEquipo = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const estadoEquipo = await EstadoEquipo.findByIdAndDelete(id);
        if (!estadoEquipo) {
            return res.status(404).json({ msg: 'No se encontró el Estado del Equipo' });
        }
        return res.status(200).json({ msg: 'Estado del Equipo eliminado correctamente' });
    } catch (e) {
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};



module.exports = {
    
    CreateEstadoEquipo,
    getEstadoEquipos,
    getEstadoEquipoPorID,
    updateEstadoEquipoPorId,
    deleteEstadoEquipo


} 