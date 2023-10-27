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
    res.header('Content-Type', 'text/csv; charset=utf-8');
    res.header('Content-Disposition', 'attachment; filename=exported_data.csv');
    const tesis = await Tesis.find();
    const record: any[] = [];
    const csvFileName = 'exported_data.csv';
    const csvWriter = createObjectCsvWriter({
        path: csvFileName,
        header: [
            { id: 'edad', title: 'EDAD' },
            { id: 'distrito', title: 'DISTRITO' },
            { id: 'genero', title: 'GÉNERO' },
            { id: 'genero_otro', title: 'OTRO GÉNERO' },
            { id: 'es_estudiante', title: 'ES ESTUDIANTE' },
            { id: 'carrera', title: 'CARRERA' },
            { id: 'ciclo', title: 'CICLO' },
            { id: 'tiene_hijos', title: 'TIENE HIJOS' },
            { id: 'hijos', title: 'NRO. HIJOS' },
            { id: 'puesto', title: 'PUESTO' },
            { id: 'dependencia', title: 'DEPENDENCIA' },
            { id: 'grado_padre', title: 'GRADO PADRE' },
            { id: 'grado_madre', title: 'GRADO MADRE' },
            { id: 'p11', title: 'GB11' },
            { id: 'p12', title: 'GB12' },
            { id: 'p13', title: 'GB13' },
            { id: 'p14', title: 'GB14' },
            { id: 'p15', title: 'GB15' },
            { id: 'p16', title: 'GB16' },
            { id: 'p17', title: 'GB17' },
            { id: 'p18', title: 'GB18' },
            { id: 'p19', title: 'GB19' },
            { id: 'p110', title: 'GB110' },
            { id: 'p111', title: 'GB111' },
            { id: 'p112', title: 'GB112' },
            { id: 'p113', title: 'GB113' },
            { id: 'p114', title: 'GB114' },
            { id: 'p115', title: 'GB115' },
            { id: 'p116', title: 'GB116' },
            { id: 'p117', title: 'GB117' },
            { id: 'p118', title: 'GB118' },
            { id: 'p119', title: 'GB119' },
            { id: 'p120', title: 'GB120' },
            { id: 'p121', title: 'GB121' },
            { id: 'p122', title: 'GB122' },
            { id: 'p123', title: 'GB123' },
            { id: 'p124', title: 'GB124' },
            { id: 'p125', title: 'GB125' },
            { id: 'p126', title: 'GB126' },
            { id: 'p127', title: 'GB127' },
            { id: 'p128', title: 'GB128' },
            { id: 'p129', title: 'GB129' },
            { id: 'p130', title: 'GB130' },
            { id: 'p21', title: 'PIL21' },
            { id: 'p22', title: 'PIL22' },
            { id: 'p23', title: 'PIL23' },
            { id: 'p24', title: 'PIL24' },
            { id: 'p25', title: 'PIL25' },
            { id: 'p26', title: 'PIL26' },
            { id: 'p27', title: 'PIL27' },
            { id: 'p28', title: 'PIL28' },
            { id: 'p29', title: 'PIL29' },
            { id: 'p210', title: 'PIL210' },
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
            p17: tesis.get('data.6.value'),
            p18: tesis.get('data.7.value'),
            p19: tesis.get('data.8.value'),
            p110: tesis.get('data.9.value'),
            p111: tesis.get('data.10.value'),
            p112: tesis.get('data.11.value'),
            p113: tesis.get('data.12.value'),
            p114: tesis.get('data.13.value'),
            p115: tesis.get('data.14.value'),
            p116: tesis.get('data.15.value'),
            p117: tesis.get('data.16.value'),
            p118: tesis.get('data.17.value'),
            p119: tesis.get('data.18.value'),
            p120: tesis.get('data.19.value'),
            p121: tesis.get('data.20.value'),
            p122: tesis.get('data.21.value'),
            p123: tesis.get('data.22.value'),
            p124: tesis.get('data.23.value'),
            p125: tesis.get('data.24.value'),
            p126: tesis.get('data.25.value'),
            p127: tesis.get('data.26.value'),
            p128: tesis.get('data.27.value'),
            p129: tesis.get('data.28.value'),
            p130: tesis.get('data.29.value'),
            p21: tesis.get('data.30.value'),
            p22: tesis.get('data.31.value'),
            p23: tesis.get('data.32.value'),
            p24: tesis.get('data.33.value'),
            p25: tesis.get('data.34.value'),
            p26: tesis.get('data.35.value'),
            p27: tesis.get('data.36.value'),
            p28: tesis.get('data.37.value'),
            p29: tesis.get('data.38.value'),
            p210: tesis.get('data.39.value'),
        });
    });

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