import express, { Application } from 'express';
import userRouter from '../routes/users';
import authRoutes from "../routes/auth";
import cors from 'cors';
import { dbConnection } from '../database/config';
import openaiRoutes from '../routes/openai';
import tesisRoutes from '../routes/tesis';

class Server {
    private app: Application;
    private webApp: Application;
    private port: string;
    private server: any;
    private io: any;
    private apiPaths = {
        usuarios: '/api/users',
        auth: '/api/auth',
        openai: '/api/openai',
        tesis: '/api/tesis'
    }

    constructor() {
        this.app = express();
        this.webApp = express();
        this.port = process.env.PORT || '8080';

        // Implementación de websockets
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        });

        this.dbConnection();
        this.middlewares();
        this.routes();

        // Sockets
        this.sockets();
    }

    async dbConnection() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRouter);
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.openai, openaiRoutes);
        this.app.use(this.apiPaths.tesis, tesisRoutes)
    }

    sockets() {
        this.io.on('connection', (socket: any) => {
            console.log(`Cliente ${socket.id} conectado`);

            socket.on('disconnect', () => {
                console.log(`Cliente ${socket.id} desconectado`);
            });

            socket.on('mensaje', (data: any) => {
                console.log(data);
                this.io.emit('mensaje-nuevo', data);
            });
        });
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        });
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.webApp.use(express.static('public'));
        this.webApp.listen(80, () => {
            console.log(`Servidor web corriendo en el puerto: 80`);
        });
    }
}

export default Server;