import { Router } from "express";
import { login, renewToken } from "../controllers/auth";
import { check } from "express-validator";
import { validFields } from "../middlewares/valid-fields";
import { validJWT } from "../middlewares/valid-jwt";

const authRoutes = Router();

authRoutes.post('/login', [
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validFields
], login);

authRoutes.post('/renew', [
    validJWT,
    check('token', 'El token es obligatorio').not().isEmpty(),
    validFields
], renewToken);

export default authRoutes;