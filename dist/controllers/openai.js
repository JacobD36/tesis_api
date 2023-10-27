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
Object.defineProperty(exports, "__esModule", { value: true });
exports.openaiPost = void 0;
const openai_1 = require("openai");
const openaiPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { mensaje } = req.body;
    if (!mensaje) {
        return res.status(400).json({
            msg: 'No hay mensaje'
        });
    }
    const configuration = new openai_1.Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const conversation = [
        { role: 'system', content: 'Somos J&F Solutions, ¿en qué podemos ayudarte hoy?' },
        { role: 'user', content: '¿Qué servicios ofrece nuestro negocio?' },
        { role: 'system', content: 'Ofrecemos servicios de desarrollo de software, diseño web, diseño gráfico, marketing digital, entre otros' },
        { role: 'user', content: '¿Cuánto cuesta el servicio de desarrollo de software?' },
        { role: 'system', content: 'El costo del servicio de desarrollo de software es de 1000 dólares' },
        { role: 'user', content: '¿Cuánto cuesta el servicio de diseño web?' },
        { role: 'system', content: 'El costo del servicio de diseño web es de 500 dólares' }
    ];
    const openai = new openai_1.OpenAIApi(configuration);
    const chatCompletion = yield openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [...conversation, {
                role: "user",
                content: mensaje
            }],
        //max_tokens: 150,
        //temperature: 0.9
    });
    conversation.push({ role: "user", content: mensaje });
    conversation.push({ role: "assistant", content: (_a = chatCompletion.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content });
    res.json({
        msg: chatCompletion.data.choices[0].message
    });
});
exports.openaiPost = openaiPost;
//# sourceMappingURL=openai.js.map