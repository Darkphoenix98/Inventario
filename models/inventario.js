const { Schema, model } = require('mongoose');

const InventarioSchema = Schema({
    serial: {   
        type: String,
        required: [true, 'Debe colocar un Serial'],
        unique: true
    },
    modelo:{
        type:String,
        required:true,
        
    },
    descripcion:{
        type:String,
        required:true
    },
    imagen:{
        type:String,
        required:true,
        unique: true

    }, 
    color:{
        type:String,
        required:true
    },
    fecha_compra:{
        type:Date,
        required:true
    },
    precio:{
        type:String,
        required:true
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },

    // resto de atributos fk
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
     },
     marca: {
        type: Schema.Types.ObjectId,
        ref: 'Marca',
        required: true
     },
     estadoEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'EstadoEquipo',
        required: true
     },
     tipoEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'TipoEquipo',
        required: true
     }


});

module.exports = model('Inventario', InventarioSchema);


