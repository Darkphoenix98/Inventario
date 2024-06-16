const dotenv = require('dotenv').config();
const app = require('./app');


// configuraciones
app.set('port', process.env.PORT );


// escucha
app.listen(app.get('port'), () => {
    console.log(`Arranca el servidor en el puerto: ${app.get('port')}`)
});