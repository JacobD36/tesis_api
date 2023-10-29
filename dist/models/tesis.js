"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TesisSchema = new mongoose_1.Schema({
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
TesisSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, tesis = __rest(_a, ["__v", "_id"]);
    tesis.uid = _id;
    return tesis;
};
exports.default = (0, mongoose_1.model)('Tesis', TesisSchema);
//# sourceMappingURL=tesis.js.map