import { Router } from "express";
import { getCSV, postTesis, putTesis } from "../controllers/tesis";

const tesisRoutes = Router();

tesisRoutes.post('/save', postTesis);
tesisRoutes.get('/', getCSV);
tesisRoutes.put('/update', putTesis);

export default tesisRoutes;