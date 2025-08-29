import { ref, computed } from 'vue'
import {defineStore} from 'pinia'
import { useFavoritosStore } from './favoritos'
import { useBebidasStore } from './bebidas'

export const useModalStore = defineStore('modal', () =>{

    const favoritos = useFavoritosStore();
    const bebidas = useBebidasStore();
    const modal = ref(false)

    function handleClickModal() {
        modal.value = !modal.value
    }

    const textBoton = computed(() => {
        return favoritos.existeFavorito() ? "Eliminar de Favoritos" : "Agregar a Favoritos";
    });

    return {
        modal,
        handleClickModal,
        textBoton
    }

})