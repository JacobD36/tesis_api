"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newToken = exports.jwtBuild = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.SECRETPRIVATEKEY;
const jwtBuild = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el JWT');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.jwtBuild = jwtBuild;
const newToken = (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                reject('No se pudo generar el JWT');
            }
            else {
                const data = jsonwebtoken_1.default.verify(token, secret);
                const { uid } = JSON.parse(JSON.stringify(data));
                jsonwebtoken_1.default.sign({ uid }, secret, {
                    expiresIn: '24h'
                }, (err, token) => {
                    if (err) {
                        reject('No se pudo generar el JWT');
                    }
                    else {
                        resolve(token);
                    }
                });
            }
        });
    });
};
exports.newToken = newToken;
//# sourceMappingURL=jwt-build.js.map