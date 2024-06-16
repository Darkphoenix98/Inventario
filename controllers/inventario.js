const { request, response } = require('express');
const Inventario = require('../models/inventario');
const EstadoEquipo = require('../models/estadoEquipo');
const Marca = require('../models/marca');
const TipoEquipo = require('../models/tipoEquipo');
const Usuario = require('../models/usuario');


/**
 * crear
 */
const createInventario = async (req = request, res = response) => {
    try{
         const { usuario ,estadoEquipo, marca, tipoEquipo } = req.body;
         console.log(req.body)

         //  usuario
         const usuarioDB = await Usuario.findOne({
            _id: usuario._id
        });
        if(!usuarioDB){
            return res.status(400).json({
                msj: 'No existe usuario'
            })     
        }

        
         // estadoEquipo
         const estadoEquipoBD = await EstadoEquipo.findOne({
            _id: estadoEquipo._id
        });
        if(!estadoEquipoBD){
            return res.status(400).json({
                msj: 'No existe estadoEquipo'
            })
        }
        //  marca
        const marcaDB = await Marca.findOne({
            _id: marca._id
        });
        if(!marcaDB){
            return res.status(400).json({
                msj: 'No existe marca'
            })     
        }
        //  tipoEquipo
        const tipoEquipoDB = await TipoEquipo.findOne({
            _id: tipoEquipo._id
        });
        if(!tipoEquipoDB){
            return res.status(400).json({
                msj: 'No existe tipoEquipo'
            })     
        }
       
         
        // Agregar campos adicionales
        const {serial,
            modelo,
            descripcion,
            imagen,
            color,
            fecha_compra,
            precio } = req.body;
            
        const datos = {
            serial,
            modelo,
            descripcion,
            imagen,
            color,
            fecha_compra,
            precio
        };

        // Crear instancia de Proyecto con los datos
        const inventario = new Inventario ({ ...datos, ...req.body });

        // Guardar el proyecto en la base de datos
        await inventario .save();

        // Retornar la respuesta con el objeto proyecto creado
        return res.status(201).json(inventario );
    } catch (e) {
        // Manejar errores
        return res.status(500).json({
            msj: e.message || 'Error interno del servidor'
        });
    }
};


/**
 * Consultar inventario 
 * 
 */
const getInventarios  = async (req, res = response) => {
    try{
        const inventarioBD = await Inventario.find()
        .populate({
            path: 'usuario' 
        })
        .populate({
            path: 'estadoEquipo'  
        }) 
        .populate({
            path: 'marca'  
        }) 
        .populate({
            path: 'tipoEquipo'  
        }) 
       
        return res.json(inventarioBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}


// actualizar por ID
const updateInventarioPorId = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const data = req.body;
        data.fechaActualizacion = new Date()
        const inventario = await Inventario.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(inventario);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}


// Get por ID
const getInventarioPorId = async (req, res = response) => {
    try {
        const { id } = req.params;
        const inventario = await Inventario.findById(id)
            .populate('usuario')
            .populate('estadoEquipo')
            .populate('marca')
            .populate('tipoEquipo');

        if (!inventario) {
            return res.status(404).json({ msj: 'inventario no encontrado' });
        }

        return res.json(inventario);
    } catch (error) {
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
}
// Eliminar un inventario por ID
const deleteInventario = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const inventario = await Inventario.findByIdAndDelete(id);
        if (!inventario) {
            return res.status(404).json({ msg: 'No se encontró el inventario' });
        }
        return res.status(200).json({ msg: 'Inventario eliminado correctamente' });
    } catch (e) {
        return res.status(500).json({ msg: e.message || 'Error interno del servidor' });
    }
};

module.exports = { 
    createInventario,
    getInventarios,
    getInventarioPorId,
    updateInventarioPorId,
    deleteInventario

}





