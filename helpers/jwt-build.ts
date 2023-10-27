import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.SECRETPRIVATEKEY as string;

export const jwtBuild = (uid: string) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, secret, {
            expiresIn: '24h'
        }, (err, token) => {
            if(err){
                reject('No se pudo generar el JWT');
            }else{
                resolve(token);
            }
        });
    });
}

export const newToken = (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if(err){
                reject('No se pudo generar el JWT');
            }else{
                const data: JwtPayload | string = jwt.verify(token, secret);
                const { uid } = JSON.parse(JSON.stringify(data));
                jwt.sign({ uid }, secret, {
                    expiresIn: '24h'
                }, (err, token) => {
                    if(err){
                        reject('No se pudo generar el JWT');
                    }else{
                        resolve(token);
                    }
                });
            }
        });
    });
}