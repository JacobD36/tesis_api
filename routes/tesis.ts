import { Router } from "express";
import { getCSV, postTesis } from "../controllers/tesis";

const tesisRoutes = Router();

tesisRoutes.post('/save', postTesis);
tesisRoutes.get('/', getCSV);

export default tesisRoutes;