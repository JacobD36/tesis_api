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
exports.alowedCollections = exports.validID = exports.existsUserByID = exports.emailExists = exports.isValidRole = void 0;
const role_1 = __importDefault(require("../models/role"));
const user_1 = __importDefault(require("../models/user"));
const isValidRole = (rol) => __awaiter(void 0, void 0, void 0, function* () {
    if (rol) {
        const rolExists = yield role_1.default.findOne({ rol });
        if (!rolExists) {
            throw new Error(`El rol ${rol} no está registrado en la BD`);
        }
    }
});
exports.isValidRole = isValidRole;
const emailExists = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExists = yield user_1.default.findOne({ correo });
    if (emailExists) {
        throw new Error(`El correo ${correo} ya está registrado en la BD`);
    }
});
exports.emailExists = emailExists;
const existsUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existsUserByID = yield user_1.default.findById(id);
    if (!existsUserByID) {
        throw new Error(`El id ${id} no existe`);
    }
});
exports.existsUserByID = existsUserByID;
const validID = (id) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error(`El id ${id} no es un id válido`);
    }
};
exports.validID = validID;
const alowedCollections = (collection, collections) => {
    const included = collections.includes(collection);
    if (!included) {
        throw new Error(`La colección ${collection} no está permitida, colecciones permitidas: ${collections}`);
    }
    return true;
};
exports.alowedCollections = alowedCollections;
//# sourceMappingURL=db-validators.js.map