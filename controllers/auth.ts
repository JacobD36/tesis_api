import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import User from "../models/user";
import { jwtBuild, newToken } from "../helpers/jwt-build";

export const login = async(req: Request, res: Response) => {
    const { correo, password } = req.body;
    try {
        const user = await User.findOne({correo});
        if(!user){
            return res.status(400).json({
                msg: 'Correo no encontrado'
            });
        }

        if(!user.estado){
            return res.status(400).json({
                msg: 'Usuario no válido'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password as string);

        if(!validPassword){
            return res.status(400).json({
                msg: 'Password incorrecto'
            });
        }

        if(user.rol !== 'ADMIN_ROLE'){
            return res.status(400).json({
                msg: 'Usuario no autorizado'
            });
        }

        const token = await jwtBuild(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Contactar al administrador'
        });
    }
}

export const renewToken = async(req: Request, res: Response) => {
    const { token } = req.body;
    
    try {
        await newToken(token).then((data) => {
            res.json({
                token: data,
                user: req.body.user
            });
        }, (err) => {
            res.status(400).json({
                msg: 'No se pudo renovar el token'
            });
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Contactar al administrador'
        });
    }
}