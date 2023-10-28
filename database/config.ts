import mongoose from 'mongoose';

export const dbConnection = async() => {
    try {
        //const url = process.env.MONGODB_CNN || '';
        const url = 'mongodb://crmUser:kbjnfqfsfy79@127.0.0.1:27017/tesis?authSource=admin';
        await mongoose.connect(url ,{
            serverSelectionTimeoutMS: 5000,
            family: 4,
        });

        console.log('Base de datos online');
    } catch (error) {
        throw new Error(`Error al iniciar la base de datos: ${error}`);
    }
}