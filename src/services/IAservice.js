import { openrouter } from '@/lib/ia' 
import { streamText } from 'ai'

export default {
    async generarReceta(prompt) {
        const resultado = await streamText({
            //model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
            //model: openrouter('google/gemma-3-27b-it:free'),
            //model: openrouter('deepseek/deepseek-chat-v3-0324:free'),
            model: openrouter('google/gemini-2.0-flash-exp:free'),
            prompt: prompt,
            system: "Eres un experto en coctelería. Responde con una receta de cóctel o bebidas de cafe detallada y creativa basada en la solicitud del usuario. Incluye ingredientes, cantidades y pasos de preparación.",
            temperatura: 0.7, // que tan creativa quieres que sea la IA 0 no mucho 1 mucho
        })

       
        return resultado.textStream
    }
}