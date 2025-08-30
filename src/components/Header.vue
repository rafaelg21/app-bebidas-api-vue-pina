<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useBebidasStore } from '../stores/bebidas';
import { useNotificacionesStore } from '@/stores/Notificaciones'

const route = useRoute();
const store = useBebidasStore();
const notificaciones = useNotificacionesStore();

const paginaInicio = computed(() => route.name === 'home');

const handleSubmit = () => {
    if(Object.values(store.busqueda).includes('')) {

        notificaciones.$patch({
            mostrar: true,
            texto: 'Todos los campos son obligatorios',
            error: true
        })
        //*funciona igual con esta sintaxis
        // notificaciones.texto = 'Todos los campos son obligatorios';
        // notificaciones.mostrar = true;
        // notificaciones.error = true;
        return;
    }
    store.obtenerRecetas();
}
</script>
<template>
    <header class="bg-slate-800"
            :class="{ header: paginaInicio }"    
    >
        <div class="mx-auto container px-5 py-16">
            <div class="flex justify-between items-center">
                    <div>
                        <RouterLink :to="{ name: 'home' }">
                            <img class="w-32" src="/img/logo.svg"></img>
                        </RouterLink>
                    </div>

                    <nav class="flex gap-4 text-white uppercase font-bold">
                        <RouterLink 
                        :to="{ name: 'home' }"
                        class="hover:text-orange-400"
                        active-class="text-orange-500"
                        >
                            Inicio
                        </RouterLink>
                        <RouterLink 
                        :to="{ name: 'favoritos' }"
                        class="hover:text-orange-400"
                        active-class="text-orange-500"
                        >
                            Favoritos
                        </RouterLink>

                         <RouterLink 
                        :to="{ name: 'ia' }"
                        class="hover:text-orange-400"
                        active-class="text-orange-500"
                        >
                            Generar con IA
                        </RouterLink>
                    </nav>
            </div>
            <form
                v-if="paginaInicio"
                class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                @submit.prevent="handleSubmit"
            >
                <div class="space-y-4">
                    <label 
                        class="block text-white uppercase font-extrabold text-lg"
                    for="ingrediente">Nombre o Ingrediente</label>
                    <input  id="ingrediente" 
                            type="text" 
                            class="w-full p-3 rounded-lg focus:outline-none" 
                            placeholder="Nombre o Ingrediente ej: Vodka, tequila, etc"
                            v-model="store.busqueda.nombre"
                            >
                </div>

                <div class="space-y-4">
                    <label 
                        class="block text-white uppercase font-extrabold text-lg"
                    for="categoria">Categoría</label>
                    <select id="categoria"                         
                            class="w-full p-3 rounded-lg focus:outline-none" 
                            v-model="store.busqueda.categoria"
                    >
                            <option value="">-- Selecciona una categoría --</option>
                            <option 
                                v-for="categoria in store.categorias" 
                                :key="categoria.strCategory"
                                :value="categoria.strCategory"
                            >
                                {{ categoria.strCategory }}
                            </option>
                    </select>
                </div>

                <input type="submit" 
                        class="w-full p-3 rounded-lg bg-orange-800 hover:bg-orange-900 text-white font-extrabold uppercase cursor-pointer"
                    value="Buscar Recetas" 
                />

            </form>
        </div>        
    </header>
</template>
<style>
    .header {
        background-image: url('/img/bg.jpg');
        background-size: cover;
        background-position: center;
    }
</style>

