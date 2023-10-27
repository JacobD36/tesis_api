import Role from "../models/role";
import User from "../models/user";


export const isValidRole = async(rol: string) => {
    if(rol){
        const rolExists = await Role.findOne({rol});
        if(!rolExists){
            throw new Error(`El rol ${rol} no está registrado en la BD`);
        }
    }
}

export const emailExists = async(correo: string) => {
    const emailExists = await User.findOne({correo});
    if(emailExists){
        throw new Error(`El correo ${correo} ya está registrado en la BD`);
    }
}

export const existsUserByID = async(id: string) => {
    const existsUserByID = await User.findById(id);
    if(!existsUserByID){
        throw new Error(`El id ${id} no existe`);
    }
}

export const validID = (id: string) => {
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        throw new Error(`El id ${id} no es un id válido`);
    }
}

export const alowedCollections = (collection: string, collections: string[]) => {
    const included = collections.includes(collection);
    if(!included){
        throw new Error(`La colección ${collection} no está permitida, colecciones permitidas: ${collections}`);
    }
    return true;
}