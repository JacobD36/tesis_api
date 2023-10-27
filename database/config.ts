import mongoose from 'mongoose';

export const dbConnection = async() => {
    try {
        const url = process.env.MONGODB_CNN || '';
        await mongoose.connect(url);

        console.log('Base de datos online');
    } catch (error) {
        throw new Error(`Error al iniciar la base de datos: ${error}`);
    }
}