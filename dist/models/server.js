"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../routes/users"));
const auth_1 = __importDefault(require("../routes/auth"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../database/config");
const openai_1 = __importDefault(require("../routes/openai"));
const tesis_1 = __importDefault(require("../routes/tesis"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/users',
            auth: '/api/auth',
            openai: '/api/openai',
            tesis: '/api/tesis'
        };
        this.app = (0, express_1.default)();
        this.webApp = (0, express_1.default)();
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
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, users_1.default);
        this.app.use(this.apiPaths.auth, auth_1.default);
        this.app.use(this.apiPaths.openai, openai_1.default);
        this.app.use(this.apiPaths.tesis, tesis_1.default);
    }
    sockets() {
        this.io.on('connection', (socket) => {
            console.log(`Cliente ${socket.id} conectado`);
            socket.on('disconnect', () => {
                console.log(`Cliente ${socket.id} desconectado`);
            });
            socket.on('mensaje', (data) => {
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
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.webApp.use(express_1.default.static('public'));
        this.webApp.listen(80, () => {
            console.log(`Servidor web corriendo en el puerto: 80`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map