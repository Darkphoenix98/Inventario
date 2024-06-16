const express = require('express');


const app = express();
const {  mongoConn } = require('./databases/configuration');
mongoConn()

const cors = require('cors');

const Usuarios = require('./routes/usuario');
const Inventarios = require('./routes/inventario');
const EstadoEquipos = require('./routes/estadoEquipo');
const Marcas = require('./routes/marca');
const TipoEquipos = require('./routes/tipoEquipo');
const Auth = require('./routes/Auth');


//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use('/usuarios',Usuarios);
app.use('/inventarios', Inventarios);
app.use('/estadoEquipos', EstadoEquipos);
app.use('/marcas', Marcas);
app.use('/tipoEquipos', TipoEquipos);
app.use('/Auth', Auth);

module.exports = app;