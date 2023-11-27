const express = require('express');
const { dbConection } = require('./DataBase/config');
require('dotenv').config();

console.log(process.env);


//Crear el servidor de express//

const app = express();

//Base de Datos//

dbConection();


//Directorio publico//

app.use(express.static('public'));

//Lectura y parseo del body//
app.use(express.json());

//Rutas//

//TODO:auth // crear,login,renew
app.use('/api/auth', require('./rutes/auth'));


//TODO: CRUD : Eventos



//Escuchar peticiones//

app.listen(process.env.PORT,() => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});


