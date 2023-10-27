"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const valid_fields_1 = require("../middlewares/valid-fields");
const valid_jwt_1 = require("../middlewares/valid-jwt");
const authRoutes = (0, express_1.Router)();
authRoutes.post('/login', [
    (0, express_validator_1.check)('correo', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    valid_fields_1.validFields
], auth_1.login);
authRoutes.post('/renew', [
    valid_jwt_1.validJWT,
    (0, express_validator_1.check)('token', 'El token es obligatorio').not().isEmpty(),
    valid_fields_1.validFields
], auth_1.renewToken);
exports.default = authRoutes;
//# sourceMappingURL=auth.js.map