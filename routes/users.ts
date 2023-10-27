import { Router } from "express";
import { deleteUsers, getUser, getUsers, postUsers, putUsers } from "../controllers/users";
import { check } from "express-validator";
import { emailExists, existsUserByID, isValidRole, validID } from "../helpers/db-validators";
import { validFields } from "../middlewares/valid-fields";
import { haveRole } from "../middlewares/valid-roles";
import { validJWT } from "../middlewares/valid-jwt";

const userRouter = Router();

userRouter.get('/', [
    validJWT,
    check('page', 'El parámetro page debe ser un número').optional().isNumeric(),
    check('limit', 'El parámetro limit debe ser un número').optional().isNumeric(),
    validFields
], getUsers);
userRouter.get('/:id', [
    validJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsUserByID),
    validFields
], getUser);
userRouter.post('/', [
    validJWT,
    check('nombres', 'Al menos un nombre es requerido').not().isEmpty(),
    check('apellidos', 'Al menos un apellido es requerido').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail().custom(emailExists),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('rol').custom(isValidRole),
    validFields
], postUsers);
userRouter.put('/:id', [
    validJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsUserByID),
    check('rol', 'El rol es requerido').not().isEmpty(),
    check('rol').custom(isValidRole),
    validFields
], putUsers);
userRouter.delete('/:id', [
    validJWT,
    haveRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsUserByID),
    validFields
], deleteUsers);

export default userRouter;