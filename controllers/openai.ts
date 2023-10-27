import { Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';
import { ChatCompletionRequestMessage } from 'openai/dist/api';

export const openaiPost = async(req: Request, res: Response) => {
    const { mensaje } = req.body;

    if(!mensaje) {
        return res.status(400).json({
            msg: 'No hay mensaje'
        });
    }

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const conversation: ChatCompletionRequestMessage[] = [
        { role: 'system', content: 'Somos J&F Solutions, ¿en qué podemos ayudarte hoy?' },
        { role: 'user', content: '¿Qué servicios ofrece nuestro negocio?'},
        { role: 'system', content: 'Ofrecemos servicios de desarrollo de software, diseño web, diseño gráfico, marketing digital, entre otros'},
        { role: 'user', content: '¿Cuánto cuesta el servicio de desarrollo de software?'},
        { role: 'system', content: 'El costo del servicio de desarrollo de software es de 1000 dólares'},
        { role: 'user', content: '¿Cuánto cuesta el servicio de diseño web?'},
        { role: 'system', content: 'El costo del servicio de diseño web es de 500 dólares'}
    ];

    const openai = new OpenAIApi(configuration);

    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [...conversation, {
            role: "user", 
            content: mensaje
        }],
        //max_tokens: 150,
        //temperature: 0.9
    });

    conversation.push({role: "user", content: mensaje});
    conversation.push({role: "assistant", content: chatCompletion.data.choices[0].message?.content});

    res.json({
        msg: chatCompletion.data.choices[0].message
    });
};