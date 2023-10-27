"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../helpers/db-validators");
const valid_fields_1 = require("../middlewares/valid-fields");
const valid_roles_1 = require("../middlewares/valid-roles");
const valid_jwt_1 = require("../middlewares/valid-jwt");
const userRouter = (0, express_1.Router)();
userRouter.get('/', [
    valid_jwt_1.validJWT,
    (0, express_validator_1.check)('page', 'El parámetro page debe ser un número').optional().isNumeric(),
    (0, express_validator_1.check)('limit', 'El parámetro limit debe ser un número').optional().isNumeric(),
    valid_fields_1.validFields
], users_1.getUsers);
userRouter.get('/:id', [
    valid_jwt_1.validJWT,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existsUserByID),
    valid_fields_1.validFields
], users_1.getUser);
userRouter.post('/', [
    valid_jwt_1.validJWT,
    (0, express_validator_1.check)('nombres', 'Al menos un nombre es requerido').not().isEmpty(),
    (0, express_validator_1.check)('apellidos', 'Al menos un apellido es requerido').not().isEmpty(),
    (0, express_validator_1.check)('correo', 'El correo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('correo', 'El correo no es válido').isEmail().custom(db_validators_1.emailExists),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('rol').custom(db_validators_1.isValidRole),
    valid_fields_1.validFields
], users_1.postUsers);
userRouter.put('/:id', [
    valid_jwt_1.validJWT,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existsUserByID),
    (0, express_validator_1.check)('rol', 'El rol es requerido').not().isEmpty(),
    (0, express_validator_1.check)('rol').custom(db_validators_1.isValidRole),
    valid_fields_1.validFields
], users_1.putUsers);
userRouter.delete('/:id', [
    valid_jwt_1.validJWT,
    (0, valid_roles_1.haveRole)('ADMIN_ROLE'),
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existsUserByID),
    valid_fields_1.validFields
], users_1.deleteUsers);
exports.default = userRouter;
//# sourceMappingURL=users.js.map