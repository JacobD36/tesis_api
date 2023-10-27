import { Request, Response} from 'express';
import Tesis from '../models/tesis';
import { createObjectCsvWriter } from 'csv-writer';
import fs from 'fs';

/**
 * Guarda los cuestionarios en la base de datos
 * @param { Request }req 
 * @param { Response } res 
 */
export const postTesis = async(req: Request, res: Response) => {
    const userAnswers = req.body;
    const tesis = new Tesis(userAnswers);
    await tesis.save();
    res.json(tesis);
}

/**
 * Genera un CSV con toda la data y la exporta
 * @param { Request }req 
 * @param { Response } res 
 */
export const getCSV = async(req: Request, res: Response) => {
    const tesis = await Tesis.find();
    const record: any[] = [];
    const csvFileName = 'exported_data.csv';
    const csvWriter = createObjectCsvWriter({
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
        const fileStream = fs.createReadStream(csvFileName);
            fileStream.pipe(res);
        })
        .catch((error) => {
        res.status(500).send('Error al generar el archivo CSV: ' + error);
    });
}