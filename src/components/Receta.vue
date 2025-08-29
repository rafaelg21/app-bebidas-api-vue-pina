<script setup>
import { ref } from 'vue';
import { useBebidasStore } from '@/stores/bebidas';


const bebidas = useBebidasStore();

defineProps({
        receta: {
            type: Object,
            required: true
        }
});

const imgSelected = ref('');

const moverImg = (id) => {
   imgSelected.value = id;
}
</script>
<template>
    <div class="border shadow-lg ">
        <div class="overflow-hidden">

            <img id="img{{ receta.idDrink }}"
                :src="receta.strDrinkThumb" 
                :alt="`Imagen de la receta ${receta.strDrink}`"
                class="hover:scale-105 transition-transform duration-300 hover:rotate-2"
                :class="{
                    'scale-105 transition-transform duration-300 rotate-2': imgSelected === 'img' + receta.idDrink
                }"
                />

        </div>
        <div class="p-5">
            <h2 class="text-2xl truncate font-extrabold">{{ receta.strDrink }}</h2>
            <button 
            type="button"
            class="w-full p-3 mt-5 rounded-lg bg-orange-500 hover:bg-orange-300 text-white font-extrabold uppercase cursor-pointer"
            @mouseover="moverImg('img' + receta.idDrink)"
            @mouseleave="moverImg('')"
            @click="bebidas.seleccionarBebida(receta.idDrink)"
            >
               Ver Receta
            </button>
        </div>

    </div>
</template>



