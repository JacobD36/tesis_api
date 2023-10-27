import { Router } from "express";
import { openaiPost } from "../controllers/openai";

const openaiRoutes = Router();

openaiRoutes.post('/', openaiPost);

export default openaiRoutes;