import { Request, Response } from "express";
import { genSaltSync, hashSync } from 'bcryptjs';
import User from "../models/user";

/**
 * 
 * @param { Request } req 
 * @param { Response } res 
 */
export const getUsers = async(req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const skipValue = parseInt(page as string) * parseInt(limit as string) - parseInt(limit as string);
    const limitValue = parseInt(limit as string);

    const [ total, users ] = await Promise.all([
        User.countDocuments({estado: true}),
        User.find({estado: true}).skip(skipValue).limit(limitValue)
    ]);

    res.json({
        total,
        users
    });
}

/**
 * 
 * @param { Request } req 
 * @param { Response } res 
 */
export const getUser = async(req: Request, res: Response) => {
    const id = req.params.id;

    const user = await User.findById(id);

    res.json(user);
}

/**
 * 
 * @param { Request } req 
 * @param { Response } res 
 */
export const postUsers = async(req: Request, res: Response) => {
    const { nombres, apellidos, correo, password, rol } = req.body;
    const user = new User({nombres, apellidos, correo, password, rol});

    //Encriptar la contraseña
    const salt = genSaltSync();
    user.password = hashSync(password, salt);

    //Guardar en BD
    await user.save();

    res.json(user);
}

/**
 * 
 * @param { Request } req 
 * @param { Response } res 
 */
export const putUsers = async(req: Request, res: Response) => {
    const id = req.params.id;
    const { password, google, ...rest} = req.body;

    if(password) {
        const salt = genSaltSync();
        rest.password = hashSync(password, salt);
    }

    const existsEmail = await User.findOne({correo: rest.correo});

    if(existsEmail){
        const userId = String(existsEmail._id);
        if(userId !== id){
            return res.status(400).json({
                msg: 'Ya existe un usuario con el correo: ' + rest.correo
            });
        }
    }

    rest.updatedAt = Date.now();

    const user = await User.findByIdAndUpdate(id, rest, {new: true});

    res.json(user);
}

/**
 * 
 * @param { Request } req
 * @param { Response } res
 */
export const deleteUsers = async(req: Request, res: Response) => {
    const id = req.params.id;

    const user = await User.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(user);
}