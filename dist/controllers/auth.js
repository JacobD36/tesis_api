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
exports.renewToken = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const jwt_build_1 = require("../helpers/jwt-build");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ correo });
        if (!user) {
            return res.status(400).json({
                msg: 'Correo no encontrado'
            });
        }
        if (!user.estado) {
            return res.status(400).json({
                msg: 'Usuario no válido'
            });
        }
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Password incorrecto'
            });
        }
        if (user.rol !== 'ADMIN_ROLE') {
            return res.status(400).json({
                msg: 'Usuario no autorizado'
            });
        }
        const token = yield (0, jwt_build_1.jwtBuild)(user.id);
        res.json({
            user,
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Contactar al administrador'
        });
    }
});
exports.login = login;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        yield (0, jwt_build_1.newToken)(token).then((data) => {
            res.json({
                token: data,
                user: req.body.user
            });
        }, (err) => {
            res.status(400).json({
                msg: 'No se pudo renovar el token'
            });
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Contactar al administrador'
        });
    }
});
exports.renewToken = renewToken;
//# sourceMappingURL=auth.js.map