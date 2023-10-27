"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCSV = exports.postTesis = void 0;
const tesis_1 = __importDefault(require("../models/tesis"));
const csv_writer_1 = require("csv-writer");
const fs_1 = __importDefault(require("fs"));
/**
 * Guarda los cuestionarios en la base de datos
 * @param { Request }req
 * @param { Response } res
 */
const postTesis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userAnswers = req.body;
    const tesis = new tesis_1.default(userAnswers);
    yield tesis.save();
    res.json(tesis);
});
exports.postTesis = postTesis;
/**
 * Genera un CSV con toda la data y la exporta
 * @param { Request }req
 * @param { Response } res
 */
const getCSV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tesis = yield tesis_1.default.find();
    const record = [];
    const csvFileName = 'exported_data.csv';
    const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
        path: csvFileName,
        header: [
            { id: 'edad', title: 'Edad' },
            { id: 'distrito', title: 'Distrito' },
            { id: 'genero', title: 'Genero' },
            { id: 'genero_otro', title: 'Otro Genero' },
            { id: 'es_estudiante', title: 'Es Estudiante' },
            { id: 'carrera', title: 'Carrera' },
            { id: 'ciclo', title: 'Ciclo' },
            { id: 'tiene_hijos', title: 'Tiene Hijos' },
            { id: 'hijos', title: 'Hijos' },
            { id: 'puesto', title: 'Puesto' },
            { id: 'dependencia', title: 'Dependencia' },
            { id: 'grado_padre', title: 'Grado Padre' },
            { id: 'grado_madre', title: 'Grado Madre' },
            { id: 'p11', title: 'GB11' },
            { id: 'p12', title: 'GB12' },
            { id: 'p13', title: 'GB13' },
            { id: 'p14', title: 'GB14' },
            { id: 'p15', title: 'GB15' },
            { id: 'p16', title: 'GB16' },
        ],
        fieldDelimiter: ',',
        encoding: 'utf8'
    });
    tesis.forEach((tesis) => {
        record.push({
            edad: tesis.get('user.edad'),
            distrito: tesis.get('user.distrito'),
            genero: tesis.get('user.genero'),
            genero_otro: tesis.get('user.genero_otro'),
            es_estudiante: tesis.get('user.es_estudiante'),
            carrera: tesis.get('user.carrera'),
            ciclo: tesis.get('user.ciclo'),
            tiene_hijos: tesis.get('user.tiene_hijos'),
            hijos: tesis.get('user.hijos'),
            puesto: tesis.get('user.puesto'),
            dependencia: tesis.get('user.dependencia'),
            grado_padre: tesis.get('user.grado_padre'),
            grado_madre: tesis.get('user.grado_madre'),
            p11: tesis.get('data.0.value'),
            p12: tesis.get('data.1.value'),
            p13: tesis.get('data.2.value'),
            p14: tesis.get('data.3.value'),
            p15: tesis.get('data.4.value'),
            p16: tesis.get('data.5.value'),
        });
    });
    console.log(record);
    // Escribe los datos en el archivo CSV
    csvWriter.writeRecords(record)
        .then(() => {
        // Envia el archivo CSV como respuesta
        res.attachment(csvFileName);
        const fileStream = fs_1.default.createReadStream(csvFileName);
        fileStream.pipe(res);
    })
        .catch((error) => {
        res.status(500).send('Error al generar el archivo CSV: ' + error);
    });
});
exports.getCSV = getCSV;
//# sourceMappingURL=tesis.js.map