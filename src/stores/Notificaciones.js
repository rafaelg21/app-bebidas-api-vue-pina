import {ref, watch } from 'vue'
import {defineStore} from 'pinia'


export const useNotificacionesStore = defineStore('notificaciones', () => {
  
  
    const texto = ref('')
    const error = ref('')
    const mostrar = ref(false)



    watch(mostrar, () => {
        if (mostrar.value) {
            setTimeout(() => {
                texto.value = ''
                error.value = ''
                mostrar.value = false
            }, 3000);
        }
    });

    // const $reset = () => {
    //     texto.value = ''
    //     error.value = ''
    //     mostrar.value = false
    // }

  return {
    texto,
    error,
    mostrar,
    
  }
})