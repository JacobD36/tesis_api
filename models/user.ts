import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    nombres: {
        type: String,
        required: [true, 'Ingrese los nombres del usuario'],
        uppercase: true
    },
    apellidos: {
        type: String,
        required: [true, 'Ingrese los apellidos del usuario'],
        uppercase: true
    },
    correo: {
        type: String,
        required: [true, 'Ingrese el correo del usuario']
    },
    password: {
        type: String,
        required: [true, 'Ingrese la contraseña del usuario']
    },
    img: String,
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

export default model('User', UserSchema);