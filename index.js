const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } =  require('./database/config');

//console.log(process.env);

//Crear el servidor de express
const app = express();

//Base de Datos
dbConnection();

//CORS Capa de Seguridad del API
app.use(cors());

//Diretorio Público usando Middleware use
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );
app.use('/api/usuarios', require('./routes/usuarios') );


//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
})