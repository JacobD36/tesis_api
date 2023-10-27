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
exports.deleteUsers = exports.putUsers = exports.postUsers = exports.getUser = exports.getUsers = void 0;
const bcryptjs_1 = require("bcryptjs");
const user_1 = __importDefault(require("../models/user"));
/**
 *
 * @param { Request } req
 * @param { Response } res
 */
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = req.query;
    const skipValue = parseInt(page) * parseInt(limit) - parseInt(limit);
    const limitValue = parseInt(limit);
    const [total, users] = yield Promise.all([
        user_1.default.countDocuments({ estado: true }),
        user_1.default.find({ estado: true }).skip(skipValue).limit(limitValue)
    ]);
    res.json({
        total,
        users
    });
});
exports.getUsers = getUsers;
/**
 *
 * @param { Request } req
 * @param { Response } res
 */
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_1.default.findById(id);
    res.json(user);
});
exports.getUser = getUser;
/**
 *
 * @param { Request } req
 * @param { Response } res
 */
const postUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombres, apellidos, correo, password, rol } = req.body;
    const user = new user_1.default({ nombres, apellidos, correo, password, rol });
    //Encriptar la contraseña
    const salt = (0, bcryptjs_1.genSaltSync)();
    user.password = (0, bcryptjs_1.hashSync)(password, salt);
    //Guardar en BD
    yield user.save();
    res.json(user);
});
exports.postUsers = postUsers;
/**
 *
 * @param { Request } req
 * @param { Response } res
 */
const putUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const _a = req.body, { password, google } = _a, rest = __rest(_a, ["password", "google"]);
    if (password) {
        const salt = (0, bcryptjs_1.genSaltSync)();
        rest.password = (0, bcryptjs_1.hashSync)(password, salt);
    }
    const existsEmail = yield user_1.default.findOne({ correo: rest.correo });
    if (existsEmail) {
        const userId = String(existsEmail._id);
        if (userId !== id) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el correo: ' + rest.correo
            });
        }
    }
    rest.updatedAt = Date.now();
    const user = yield user_1.default.findByIdAndUpdate(id, rest, { new: true });
    res.json(user);
});
exports.putUsers = putUsers;
/**
 *
 * @param { Request } req
 * @param { Response } res
 */
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_1.default.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(user);
});
exports.deleteUsers = deleteUsers;
//# sourceMappingURL=users.js.map