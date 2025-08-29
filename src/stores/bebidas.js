import { ref, reactive, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import APIservice from '@/services/APIservice';
import { useModalStore } from '@/stores/modal'

export const useBebidasStore = defineStore('bebidas', () => {

    const modal = useModalStore()
    const categorias = ref([])
    const busqueda = reactive({
        nombre: '',
        categoria: ''
    })

    const recetas = ref([])
    const receta = ref({})

    onMounted(async function() {
        const response = await APIservice.obtenerCategorias();
        categorias.value = response.data.drinks;
    })


    async function obtenerRecetas() {      
        const response = await APIservice.buscarRecetas(busqueda);
        recetas.value = response.data.drinks;  
    }

    async function seleccionarBebida(id){
        const response = await APIservice.buscarReceta(id);
        console.log(response.data.drinks[0]);
        receta.value = response.data.drinks[0];
        modal.handleClickModal()
    }

    const noRecetas = computed(() => {
        return recetas.value.length === 0;
    });

    return {
        categorias,
        busqueda,
        obtenerRecetas,
        noRecetas,
        recetas,
        seleccionarBebida,
        receta
    }
});