import { Schema, model } from 'mongoose';

const TesisSchema = new Schema({
    user: {
        edad: {
            type: Number,
        },
        genero: {
            type: String,
            uppercase: true
        },
        genero_otro: {
            type: String,
            uppercase: true
        },
        distrito: {
            type: String,
            uppercase: true
        },
        es_estudiante: {
            type: String,
        },
        carrera: {
            type: String,
            uppercase: true
        },
        ciclo: {
            type: String,
        },
        tiene_hijos: {
            type: String
        },
        hijos: {
            type: Number,
        },
        esta_laborando: {
            type: Boolean,
        },
        puesto: {
            type: String,
            uppercase: true
        },
        dependencia: {
            type: String,
            uppercase: true
        },
        grado_padre: {
            type: String,
            uppercase: true
        },
        grado_madre: {
            type: String,
            uppercase: true
        },
        email: {
            type: String,
            default: ''
        },
        auth: {
            type: Boolean,
            default: false
        }
    },
    data: [
        {
            id: {
                type: Number
            },
            num: {
                type: Number
            },
            value: {
                type: Number
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

TesisSchema.methods.toJSON = function() {
    const { __v, _id, ...tesis } = this.toObject();
    tesis.uid = _id;
    return tesis;
}

export default model('Tesis', TesisSchema);