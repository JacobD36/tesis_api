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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validJWT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
dotenv_1.default.config();
const secret = process.env.SECRETPRIVATEKEY || '';
const validJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const data = jsonwebtoken_1.default.verify(token, secret);
        const { uid } = JSON.parse(JSON.stringify(data));
        let user = yield user_1.default.findById(uid);
        const _a = user === null || user === void 0 ? void 0 : user.toJSON(), { password } = _a, rest = __rest(_a, ["password"]);
        req.body.user = rest;
        if (!req.body.user) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en BD'
            });
        }
        if (!req.body.user.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario inactivo'
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
});
exports.validJWT = validJWT;
//# sourceMappingURL=valid-jwt.js.map