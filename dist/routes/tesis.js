"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tesis_1 = require("../controllers/tesis");
const tesisRoutes = (0, express_1.Router)();
tesisRoutes.post('/save', tesis_1.postTesis);
tesisRoutes.get('/', tesis_1.getCSV);
tesisRoutes.put('/update', tesis_1.putTesis);
exports.default = tesisRoutes;
//# sourceMappingURL=tesis.js.map