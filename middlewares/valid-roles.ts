import { Request, Response } from "express";

export const isAdminRole = (req: Request, res: Response, next: any) => {
    if(!req.body.user){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { rol, nombres, apellidos } = req.body.user;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombres} ${apellidos} no es administrador - No puede hacer esto`
        });
    }

    next();
}

export const haveRole = (...rols: any[]) => {
    return (req: Request, res: Response, next: any) => {
        if(!req.body.user){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if(!rols.includes(req.body.user.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${rols}`
            });
        }

        next();
    }
}