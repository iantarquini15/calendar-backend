const express = require('express');
const { dbConection } = require('./DataBase/config');
const cors = require('cors');
require('dotenv').config();

console.log(process.env);


//Crear el servidor de express//

const app = express();

//Base de Datos//

dbConection();

//CORS//
app.use(cors());


//Directorio publico//

app.use(express.static('public'));

//Lectura y parseo del body//
app.use(express.json());

//Rutas//

//TODO:auth // crear,login,renew
app.use('/api/auth', require('./rutes/auth'));
app.use('/api/events', require('./rutes/events'));


//TODO: CRUD : Eventos



//Escuchar peticiones//

app.listen(process.env.PORT,() => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});  


