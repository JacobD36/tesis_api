import { Request, Response } from "express";
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../models/user";
dotenv.config();

const secret = process.env.SECRETPRIVATEKEY || '';

export const validJWT = async(req: Request, res: Response, next: any) => {
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const data: JwtPayload | string = jwt.verify(token, secret);
        const { uid } = JSON.parse(JSON.stringify(data));
        let user = await User.findById(uid);
        const {password, ...rest} = user?.toJSON() as any;
        req.body.user = rest;

        if(!req.body.user){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en BD'
            });
        }

        if(!req.body.user.estado){
            return res.status(401).json({
                msg: 'Token no válido - usuario inactivo'
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
}