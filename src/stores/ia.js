import { ref } from 'vue'
import { defineStore } from 'pinia'
import IAservice from '@/services/IAservice'

export const useIAStore = defineStore('ia', () =>{

    const prompt = ref('')
    const respuesta = ref('')
    const cargando = ref(false)

    async function generarReceta() {
        console.log('API KEY:', import.meta.env.VITE_OPENROUTER_KEY);
        respuesta.value = "";
        cargando.value=true;
        const resultado = await IAservice.generarReceta(prompt.value)
        for await(const texto of resultado ){
           respuesta.value += texto
        }
        cargando.value=false;
        
    }

    return {
        prompt,
        respuesta,
        generarReceta,
        cargando
    }
})