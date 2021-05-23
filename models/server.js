const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        //Connect database
        this.conectarDB();

        //Middlewares
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        //Lectura y parsea
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.usersPath, require('../routes/users.routes'));

    }
    listen() {

        this.app.listen(this.port, () => {
            console.log('Corriendo el servidor en el puerto', this.port);
        });
    }
}

module.exports = Server;