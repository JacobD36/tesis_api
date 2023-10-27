import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

RoleSchema.methods.toJSON = function() {
    const { __v, _id, ...role } = this.toObject();
    role.id = _id;
    return role;
}

export default model('Role', RoleSchema);