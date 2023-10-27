"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const openai_1 = require("../controllers/openai");
const openaiRoutes = (0, express_1.Router)();
openaiRoutes.post('/', openai_1.openaiPost);
exports.default = openaiRoutes;
//# sourceMappingURL=openai.js.map